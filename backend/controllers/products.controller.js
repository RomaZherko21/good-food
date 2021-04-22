const Product = require('../models/product.model');

class ProductsController {
  getProducts(req, res) {
    Product.create({
      name: 'harry potter',
      category: 'books',
      amount: 100,
      price: 285,
      description: 'asdas dasdasd qweq 12 qweqwe',
    }).catch((err) => console.log(err));
    res.end('Created');
  }
  getCategory(req, res) {
    res.send('/products/:category');
  }
  getProduct(req, res) {
    res.send('/products/:category/:id');
  }
}

module.exports = new ProductsController();
