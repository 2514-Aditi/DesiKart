const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sellerName: String,
  productName: String,
  category: String,
  description: String,
  price: Number,
  image: String,
  contact: String,
  address: String
});

module.exports = mongoose.model('Product', productSchema);
