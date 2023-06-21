// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();

// // Connect to MongoDB with authentication
// const username = 'Andy';
// const password = '123456789aA';
// const database = 'CloudASM';

// mongoose.connect(`mongodb+srv://${username}:${password}@asmcloud.3jelcj0.mongodb.net/${database}?retryWrites=true&w=majority`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB', error);
//   });

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.set('views', 'views'); // Specify the directory for views

// app.get('/', (req, res) => {
//   res.render('index');
// });

// // Routes
// const categoryRoutes = require('./routes/categoryRoutes');
// const productRoutes = require('./routes/productRoutes');

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// app.use('/categories', categoryRoutes);
// app.use('/products', productRoutes);

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
