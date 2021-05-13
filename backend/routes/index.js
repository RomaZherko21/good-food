let express = require('express');
let router = express.Router();

let customers = require('./customers.routes');
let products = require('./products.routes');
let auth = require('./auth.routes');
let chat = require('./chat.routes');

router.use('/customers', customers);
router.use('/products', products);
router.use('/auth', auth);
router.use('/chat', chat);

module.exports = router;
