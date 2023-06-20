const Product = require('../models/Product');
const Category = require('../models/Category');
const async = require('async');

exports.productList = function (req, res, next) {
  Product.find()
    .populate('category_id', 'category_name')
    .exec()
    .then(function (products) {
      res.render('product', { products: products });
    })
    .catch(function (err) {
      return next(err);
    });
};

// Display product create form on GET
exports.productCreateGet = async function (req, res, next) {
  try {
    const categories = await Category.find({}, 'category_name');
    res.render('add-product', { title: 'Create Product', categories: categories });
  } catch (err) {
    next(err);
  }
};

// Handle product create on POST
exports.productCreatePost = async function (req, res, next) {
  try {
    const product = new Product({
      product_id: parseInt(req.body.product_id),
      product_name: req.body.product_name,
      category_id: req.body.category_id,
      product_price: parseFloat(req.body.product_price),
      product_description: req.body.product_description,
      product_image: req.file ? req.file.filename : null,
    });

    await product.save();
    res.redirect('/products');
  } catch (err) {
    next(err);
  }
};


// Display product update form on GET
exports.productUpdateGet = function (req, res, next) {
  Promise.all([
    Category.find().exec(),
    Product.findById(req.params.id).exec(),
  ])
    .then(([categories, product]) => {
      if (product === null) {
        const err = new Error('Product not found');
        err.status = 404;
        return next(err);
      }
      res.render('edit-product', {
        title: 'Edit Product',
        categories: categories,
        product: product,
      });
    })
    .catch(next);
};



// Handle product update on POST
exports.productUpdatePost = async function (req, res, next) {
  try {
    const productId = req.params.id;
    const product = {
      product_name: req.body.product_name,
      category_id: req.body.category_id,
      product_price: parseFloat(req.body.product_price),
      product_description: req.body.product_description,
    };

    if (req.file) {
      product.product_image = req.file.filename;
    }

    await Product.findByIdAndUpdate(productId, product, {});
    res.redirect('/products');
  } catch (err) {
    next(err);
  }
};


// Handle product delete on POST
exports.productDelete = async function (req, res, next) {
  try {
    await Product.findByIdAndRemove(req.params.id);

    res.redirect('/products');
  } catch (err) {
    next(err);
  }
};
