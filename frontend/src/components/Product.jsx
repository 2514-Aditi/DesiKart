import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './Product.css';

const Products = () => {

const [products, setProducts] = useState([]);

const navigate = useNavigate();

// Fetch product data from backend

useEffect(() => {

fetch('http://localhost:5000/api/products')

  .then((res) => res.json())

  .then((data) => setProducts(data))

  .catch((err) => console.error('Error fetching products:', err));

}, []);

return (

<div className="products-page">

  <header>

    <h1>Our Fresh & Natural Products</h1>

    <p>Grown with care, delivered with love</p>

    <button className="buyer-button" onClick={() => navigate('/buyer')}>

      Become a Seller

    </button>

  </header>



  <section className="product-grid">

    {products.length === 0 ? (

      <p style={{ textAlign: 'center', padding: '2rem' }}>No products listed yet.</p>

    ) : (

      products.map((product, index) => (

        <div className="card" key={index}>

          {/* Image */}

          {product.image && (

            <img src={product.image} alt={product.productName} />

          )}



          {/* Name & Category */}

          <h3>{product.productName}</h3>

          <div className="tags">{product.category}</div>



          {/* Price */}

          <div className="price">₹{product.price}</div>



          {/* Description */}

          <p className="description">{product.description}</p><br></br>



          {/* Seller Info */}

          <div className="tags"><strong>Seller:</strong> {product.sellerName}</div>

          <div className="tags"><strong>Contact:</strong> {product.contact}</div>

          <div className="tags"><strong>Address:</strong> {product.address}</div>



          <button className="add-to-cart" onClick={() => navigate('/payment')}>

            Buy Now

          </button>

        </div>

      ))

    )}

  </section>

</div>

);

};

export default Products;