const express = require('express');
const chat = express.Router();
const ChatController = require('../controllers/chat.controller.js');

chat.get('/', ChatController.startChat);

module.exports = chat;
