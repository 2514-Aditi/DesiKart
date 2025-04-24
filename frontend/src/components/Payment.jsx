import React, { useState } from 'react';
import './Payment.css';

function Payment() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
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
          <select id="payment" name="payment">
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>

          <button type="submit">Place Order</button>
        </form>

        {orderPlaced && <p className="success-message">✅ Order Placed Successfully!</p>}
      </div>
    </div>
  );
}

export default Payment;
