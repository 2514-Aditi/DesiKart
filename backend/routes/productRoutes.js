const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Submit product (POST)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products (GET)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router; 
