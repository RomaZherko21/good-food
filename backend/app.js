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
    origin: process.CLIENT_URL,
  },
});

const registerMessageHandlers = require('./handlers/messageHandlers');
const registerUserHandlers = require('./handlers/userHandlers');

const onConnection = (socket) => {
  const { roomId } = socket.handshake.query;
  socket.roomId = roomId;

  socket.join(roomId);

  registerMessageHandlers(io, socket);
  registerUserHandlers(io, socket);

  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
};

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
