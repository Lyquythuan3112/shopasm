const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Display category create form
router.get('/create', categoryController.categoryCreateGet);

// Handle category create form submission
router.post('/create', categoryController.categoryCreatePost);

// Display category update form
router.get('/:id/edit', categoryController.categoryUpdateGet);

// Handle category update form submission
router.post('/:id/edit', categoryController.categoryUpdatePost);

// Handle category delete
router.post('/:id/delete', categoryController.categoryDelete);

// Display category list
router.get('/', categoryController.categoryList);

module.exports = router;
