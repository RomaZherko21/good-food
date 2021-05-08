const Product = require('../models/product.model');
const createError = require('http-errors');
let recipes = require('../data/recipes');
class ProductsController {
  getProducts(req, res) {
    Product.findAll({
      offset: Number(req.query.offset),
      limit: Number(req.query.limit),
    })
      .then((data) => {
        res.status(200).json({
          status: 200,
          data,
        });
      })
      .catch(() => {
        return next(createError(500, `No data!`));
      });
  }
  getCategory(req, res) {
    res.status(200).send('Hello Test');
  }
  getProduct(req, res) {
    res.send('/products/:category/:id');
  }
}

module.exports = new ProductsController();
