const nodemailer = require('nodemailer');
const process = require('dotenv').config().parsed;

const transporter = nodemailer.createTransport({
  service: 'Mail.ru',
  auth: {
    user: process.EMAIL_NAME,
    pass: process.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
