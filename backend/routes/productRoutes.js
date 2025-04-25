const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST: Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body); // Create a new Product object
    await product.save(); // Save the product to MongoDB
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// GET: Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
