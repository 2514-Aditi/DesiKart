const express = require('express');
const router = express.Router();
const { createAccount, makePayment } = require('../utils/stellarPayments');

// Endpoint to create a Stellar account
router.post('/create-account', async (req, res) => {
  try {
    await createAccount();
    res.status(200).send('Stellar account created and funded successfully!');
  } catch (error) {
    console.error('Error creating Stellar account:', error);
    res.status(500).send('Error creating account');
  }
});

// Endpoint to process payment
router.post('/send-payment', async (req, res) => {
  const { senderSecret, receiverPublic, amount } = req.body;

  try {
    console.log(`Processing payment from ${senderSecret} to ${receiverPublic} for amount ${amount}`);

    await makePayment(senderSecret, receiverPublic, amount);
    res.status(200).send('Payment processed successfully!');
  } catch (error) {
    console.error('Error processing Stellar payment:', error.response?.data || error.message || error);
    res.status(500).json({
      message: 'Error processing payment',
      error: error.response?.data?.extras?.result_codes || error.message || error,
    });
  }
});

module.exports = router;