const process = require('dotenv').config().parsed;
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const router = require('./routes/index');
const sequelize = require('./config/mySQL');

const corsOptions = {
  credentials: true, // Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  origin: process.CLIENT_URL, // Provide CORS policy access to localhost:3000
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', router);

//////////////////////////////////SOCKET//////////////////////////////////////////////////////////////////////
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// получаем обработчики событий
const registerMessageHandlers = require('./handlers/messageHandlers');
const registerUserHandlers = require('./handlers/userHandlers');

const onConnection = (socket) => {
  // выводим сообщение о подключении пользователя
  console.log('User connected');

  // получаем название комнаты из строки запроса "рукопожатия"
  const { roomId } = socket.handshake.query;
  // сохраняем название комнаты в соответствующем свойстве сокета
  socket.roomId = roomId;

  // присоединяемся к комнате (входим в нее)
  socket.join(roomId);

  // регистрируем обработчики
  // обратите внимание на передаваемые аргументы

  registerMessageHandlers(io, socket);
  registerUserHandlers(io, socket);

  // обрабатываем отключение сокета-пользователя
  socket.on('disconnect', () => {
    // выводим сообщение
    console.log('User disconnected');
    // покидаем комнату
    socket.leave(roomId);
  });
};

//function onConnection performed with evere socket connection
io.on('connection', onConnection);

/////////////////////////////////////////////////////////////////////////////////////////////////////
sequelize
  .sync()
  .then(() => {
    server.listen(process.PORT, process.HOST, () => {
      console.log(
        chalk.blue.bold(
          `Server has been started: ${process.HOST}:${process.PORT}`
        )
      );
    });
  })
  .catch((err) => console.log(err));

app.use((error, req, res, next) => {
  console.log(chalk.red.bold('Error status: ' + error.status));
  console.log(chalk.red.bold('Message: ' + error.message));

  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

module.exports.app = app;
