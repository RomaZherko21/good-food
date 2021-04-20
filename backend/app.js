const process = require("dotenv").config().parsed;
const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const sequelize = require("./config/mySQL");
const cookieParser = require('cookie-parser')
const chalk = require('chalk');

const router = require('./routes/index')

const app = express();

const corsOptions = {
  credentials: true, // Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
  origin: process.CLIENT_URL // Provide CORS policy access to localhost:3000
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser())

sequelize.sync().then(() => {
  app.listen(process.PORT, process.HOST, () => {
    console.log(chalk.blue.bold(`Server has been started: ${process.HOST}:${process.PORT}`));
  })
}).catch(err => console.log(err));

app.use('/', router)