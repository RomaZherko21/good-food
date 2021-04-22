const Customer = require('../models/customer.model');

class CustomersController {
  postCustomer(req, res) {
    res.send('postCustomer');
  }
  getCustomer(req, res) {
    res.send('hello');
  }
  getCustomers(req, res) {
    Customer.findAll({ raw: true })
      .then((customers) => {
        res.status(200).send(customers);
      })
      .catch(() => {
        return next(
          createError(500, `Server error: customers was not founded!`)
        );
      });
  }

  getCustomerAccounts(req, res) {
    res.send('/customers/:customerId/accounts');
  }
  getCustomerAccount(req, res) {
    res.send('/customers/:customerId/accounts/:accountId');
  }
}

module.exports = new CustomersController();
