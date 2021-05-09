const express = require('express');
const customers = express.Router();
const customersController = require('../controllers/customers.controller.js');

customers.post('/changeMetaData', customersController.postCustomerMetaData);
// customers.post(
//   '/postCustomerRecipies',
//   customersController.postCustomerRecipies
// );

module.exports = customers;
