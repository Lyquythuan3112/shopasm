const Category = require('../models/Category');

exports.categoryCreateGet = (req, res) => {
  res.render('category_create');
};

exports.categoryCreatePost = (req, res) => {
  const { category_id, category_name } = req.body;
  const category = new Category({ category_id, category_name });
  category.save()
    .then(() => {
      res.redirect('/categories');
    })
    .catch((error) => {
      res.status(400).json({ error: 'Failed to create category' });
    });
};

exports.categoryUpdateGet = (req, res) => {
  const { id } = req.params;
  Category.findById(id)
    .then((category) => {
      res.render('category-edit', { category });
    })  
    .catch((error) => {
      res.status(404).json({ error: 'Category not found' });
    });
};

exports.categoryUpdatePost = (req, res) => {
  const { id } = req.params;
  const { category_id, category_name } = req.body;
  Category.findByIdAndUpdate(id, { category_id, category_name })
    .then(() => {
      res.redirect('/categories');
    })
    .catch((error) => {
      res.status(404).json({ error: 'Category not found' });
    });
};

exports.categoryDelete = (req, res) => {
  const { id } = req.params;
  Category.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/categories');
    })
    .catch((error) => {
      res.status(404).json({ error: 'Category not found' });
    });
};

exports.categoryList = (req, res) => {
  Category.find()
    .then((categories) => {
      res.render('category', { categories });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
