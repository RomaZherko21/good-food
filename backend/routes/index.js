let express = require('express');
let router = express.Router();

let customers = require('./customers.routes');
let products = require('./products.routes');
let auth = require('./auth.routes');

router.use('/customers', customers);
router.use('/products', products);
router.use('/auth', auth);

module.exports = router;
