const Customer = require('../models/customer.model');
const createError = require('http-errors');

class CustomersController {
  postCustomerMetaData(req, res, next) {
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
  // postCustomerRecipies(req, res, next) {
  //   console.log('here');
  //   Customer.findByPk(req.body.id)
  //     .then((customer) => {
  //       if (!customer) return res.json({ status: 400, message: 'no customer' });

  //       customer
  //         .createProduct({
  //           name: 'Fucking fuck',
  //           ingredients: JSON.stringify([
  //             {
  //               quantity: '1',
  //               name: ' beef roast',
  //               type: 'Meat',
  //             },
  //           ]),
  //           steps: JSON.stringify([
  //             'Place beef roast in crock pot.',
  //             'Mix the dried mixes together in a bowl and sprinkle over the roast.',
  //             'Pour the water around the roast.',
  //             'Cook on low for 7-9 hours.',
  //           ]),
  //           timers: JSON.stringify([0, 0, 0, 420]),
  //           imageURL:
  //             'http://img.sndimg.com/food/image/upload/w_266/v1/img/recipes/27/20/8/picVfzLZo.jpg',
  //           originalURL:
  //             'http://www.food.com/recipe/to-die-for-crock-pot-roast-27208',
  //         })
  //         .catch((err) => console.log(err));
  //       res.status(200).json({
  //         status: 200,
  //         message: 'Customer was founded!',
  //       });
  //     })
  //     .catch(() => {
  //       return next(createError(401, `Wrong email!`));
  //     });
  // }
}

module.exports = new CustomersController();
