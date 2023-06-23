var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Product = require('./models/Product');
var app = express();
require('dotenv').config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Connect to MongoDB
var uri = process.env.MONGODB_URI;
mongoose    
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Routes
var categoryRoutes = require('./routes/categoryRoutes');
var productRoutes = require('./routes/productRoutes');

app.get('/', (req, res) => {
  Product.find()
    .populate('product_id', 'product_name')
    .exec()
    .then((products) => {
      res.render('index', { products: products });
    })
    .catch((error) => {
      next(error);
    });
});

app.use(express.static('public'));
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
