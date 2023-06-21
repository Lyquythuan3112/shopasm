// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Import dotenv package
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views'); // Specify the directory for views

// MongoDB Connection
const mongodbUri = process.env.MONGODB_URI="mongodb+srv://Andy:123456789aA@asmcloud.3jelcj0.mongodb.net/CloudASM?retryWrites=true&w=majority";

mongoose
  .connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful MongoDB connection
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

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
