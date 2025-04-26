import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch product data from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter products based on search term
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  // Group products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="products-page">
      <header>
        <h1>Our Fresh & Natural Products</h1>
        <p>Grown with care, delivered with love</p>
        <button className="buyer-button" onClick={() => navigate('/buyer')}>
          Become a Seller
        </button>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>

      <section className="categories-container">
        {Object.keys(groupedProducts).length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No products listed yet.</p>
        ) : (
          Object.keys(groupedProducts).map((category) => (
            <div className="category" key={category}>
              <h2 className="category-title">{category}</h2>
              <div className="product-cards">
                {groupedProducts[category].map((product, index) => (
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
                    <p className="description">{product.description}</p><br />

                    {/* Seller Info */}
                    <div className="tags"><strong>Seller:</strong> {product.sellerName}</div>
                    <div className="tags"><strong>Contact:</strong> {product.contact}</div>
                    <div className="tags"><strong>Address:</strong> {product.address}</div>

                    <button
                      className="add-to-cart"
                      onClick={() => navigate('/payment', {
                        state: { 
                          price: product.price, 
                          productName: product.productName,
                          sellerName: product.sellerName
                        }
                      })}
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Products;
