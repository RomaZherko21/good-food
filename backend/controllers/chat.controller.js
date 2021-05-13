const createError = require('http-errors');

class ChatController {
  startChat(req, res, next) {
    res.send('fuck');
  }
}

module.exports = new ChatController();
