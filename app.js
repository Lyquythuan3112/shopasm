// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views'); // Specify the directory for views

var dbURI = "mongodb+srv://Andy:123456789aA@asmcloud.3jelcj0.mongodb.net/CloudASM?retryWrites=true&w=majority";

app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(r => app.listen(process.env.PORT, '0.0.0.0'))// app.listen(process.env.port))
    .catch(e => console.log(e));

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
