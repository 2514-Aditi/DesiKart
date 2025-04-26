const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Adjust payload size limit
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // For URL-encoded payloads

// Import Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const paymentRoutes = require('./routes/paymentRoutes'); // Adjust path if necessary
app.use('/api/payments', paymentRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
