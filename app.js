const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB with authentication
// const username = 'Andy';
// const password = '123456789aA';
// const database = 'CloudASM';

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Andy:123456789aA@asmcloud.3jelcj0.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views'); // Specify the directory for views

app.get('/', (req, res) => {
  res.render('index');
});

// Routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

// Serve static files from the "public" directory
app.use(express.static('public'));

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
