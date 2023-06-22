const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    default: null,
  },
  quantity: {
    type: Number,
    default: null,
  },
  datetime: {
    type: Date,
    default: Date.now,
  }
  
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
