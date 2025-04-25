const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  sellerName: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, default: 'Vegetables' },
  description: { type: String },
  price: { type: Number, required: true },
  contact: { type: String, required: true },
  address: { type: String },
  image: { type: String }, // Base64-encoded image
});

module.exports = mongoose.model('Product', productSchema);
