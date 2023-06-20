const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Specify the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const productId = req.body.product_id; // Assuming the product_id is sent in the request body
    const fileName = `product_image-${productId}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});


// Configure multer with the storage
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PNG files are allowed'));
  }
});

router.get('/', productController.productList);
router.get('/create', productController.productCreateGet);
router.post('/create', upload.single('product_image'), productController.productCreatePost);
router.get('/:id/edit', productController.productUpdateGet);
router.post('/:id/edit', upload.single('product_image'), productController.productUpdatePost);
router.post('/:id/delete', productController.productDelete);

module.exports = router;
