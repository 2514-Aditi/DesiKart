import React, { useState } from 'react';
import './Buyer.css';

function Buyer() {
  const [formData, setFormData] = useState({
    sellerName: '',
    productName: '',
    category: 'Vegetables',
    description: '',
    price: '',
    contact: '',
    address: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Product submitted!");
      setFormData({
        sellerName: '',
        productName: '',
        category: 'Vegetables',
        description: '',
        price: '',
        contact: '',
        address: '',
        image: '',
      });
    } else {
      alert("Error submitting product: " + result.error);
    }
  };

  return (
    <div>
      <header className="buyer-header">
        <h2>Submit Your Product</h2>
        <p>Empower local commerce by listing your farm-fresh or handmade products.</p>
      </header>

      <form className="buyer-form" onSubmit={handleSubmit}>
        <label htmlFor="sellerName">Your Name</label>
        <input type="text" id="sellerName" name="sellerName" value={formData.sellerName} onChange={handleChange} required />

        <label htmlFor="productName">Product Name</label>
        <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} required />

        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
          <option>Oil</option>
          <option>Poultry</option>
          <option>Handmade Products</option>
        </select>

        <label htmlFor="description">Product Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>

        <label htmlFor="price">Price (INR)</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />

        <label htmlFor="image">Product Image</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />

        <label htmlFor="contact">Contact Number</label>
        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />

        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" value={formData.address} onChange={handleChange}></textarea>

        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
}

export default Buyer;
