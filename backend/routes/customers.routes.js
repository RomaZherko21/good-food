const express = require('express');
const customers = express.Router();
const customersController = require('../controllers/customers.controller.js');

customers.put('/changeMeta', customersController.putCustomerMeta);

module.exports = customers;
