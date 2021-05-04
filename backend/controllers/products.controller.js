const Product = require('../models/product.model');
const createError = require('http-errors');

class ProductsController {
  getProducts(req, res) {
    console.log(req.query);
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
    res.send('/products/:category');
  }
  getProduct(req, res) {
    res.send('/products/:category/:id');
  }
}

module.exports = new ProductsController();
