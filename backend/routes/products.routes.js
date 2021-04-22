const express = require('express');
const products = express.Router();
const productsController = require('../controllers/products.controller.js');

products.get('/', productsController.getProducts);
products.get('/:category', productsController.getCategory);
products.get('/:category/:id', productsController.getProduct);

module.exports = products;
