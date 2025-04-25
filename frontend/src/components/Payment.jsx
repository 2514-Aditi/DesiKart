import React, { useState } from 'react';
import './Payment.css';

function Payment() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [stellarPaymentStatus, setStellarPaymentStatus] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null); // New state to store transaction details

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'Cash on Delivery') {
      // Handle Cash on Delivery
      setOrderPlaced(true);
    } else if (paymentMethod === 'Pay with Stellar') {
      // Perform Stellar payment via backend API
      const senderSecret = prompt(
        'Enter your Stellar secret key (this is required for payment):'
      );
      const receiverPublic =
        'GA5M2RSB5SHROKTU2CQCW4PVMNFPSI4M4MCMZHKP6J5ZQSJKDDGKHUKD'; // Store's Stellar public key
      const amount = e.target.quantity.value; // Use the entered quantity as the payment amount

      try {
        const response = await fetch('http://localhost:5000/api/payments/stellar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderSecret,
            receiverPublic,
            amount,
          }),
        });

        if (response.ok) {
          const result = await response.json(); // Result contains transaction details
          setOrderPlaced(true);
          setStellarPaymentStatus('✅ Stellar Payment Successfull, Order Placed!');
          setTransactionDetails(result); // Store transaction details
        } else {
          const errorData = await response.json();
          setStellarPaymentStatus(`❌ Payment Failed: ${errorData.message}`);
        }
      } catch (err) {
        setStellarPaymentStatus('✅ Stellar Payment Successfull, Order Placed!');
        console.error('Error:', err);
      }
    }
  };

  return (
    <div className="payment-page">
      <header>
        <h2>Complete Your Purchase</h2>
      </header>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            defaultValue="1"
            min="1"
            required
          />

          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your full delivery address here..."
            required
          ></textarea>

          <label htmlFor="payment">Payment Method</label>
          <select
            id="payment"
            name="payment"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>Pay with Stellar</option>
          </select>

          <button type="submit">Place Order</button>
        </form>

        {orderPlaced && (
          <p className="success-message">✅ Order Placed Successfully!</p>
        )}

        {stellarPaymentStatus && (
          <p className="stellar-message">{stellarPaymentStatus}</p>
        )}

        {transactionDetails && (
          <div className="transaction-details">
            <h3>Transaction Details</h3>
            <p><strong>Transaction Hash:</strong> {transactionDetails.hash}</p>
            <p><strong>Ledger:</strong> {transactionDetails.ledger}</p>
            <p><strong>Result XDR:</strong> {transactionDetails.result_xdr}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
