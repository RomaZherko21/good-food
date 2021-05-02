const Customer = require('../models/customer.model');
const createError = require('http-errors');

class CustomersController {
  putCustomerMeta(req, res, next) {
    Customer.update(
      { meta: req.body.meta },
      { where: { email: req.body.email } }
    )
      .then(() => {
        res.status(200).json({
          status: 200,
          message: 'Customer was updated!',
        });
      })
      .catch(() => {
        return next(createError(401, `Wrong email!`));
      });
  }
}

module.exports = new CustomersController();
