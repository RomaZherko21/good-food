const express = require('express');
const customers = express.Router();
const customersController = require('../controllers/customers.controller.js')

customers.post('/', customersController.postCustomer)
customers.get('/', customersController.getCustomer)
customers.get('/:customerId', customersController.getCustomers)
customers.get('/:ustomerId/accounts', customersController.getCustomerAccounts)
customers.get('/:customerId/accounts/:accountId', customersController.getCustomerAccount)

module.exports = customers;