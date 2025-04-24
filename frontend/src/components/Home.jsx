// src/home/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home-wrapper'>
      <header>
        <h1>Welcome to DesiKart</h1>
        <p>Connecting You With Natural, Authentic, and Quality Products</p>
      </header>

      <nav>
       <Link to="/">Home</Link>
       <Link to="/login">Login</Link>
       <Link to="/product">Products</Link>
      </nav>

      <section className="hero">
        <h2>Shop Naturally, Live Purely</h2>
        <p>Discover products rooted in tradition, cultivated with care, and delivered with love.</p>
      </section>

      <section className="features">
        <div className="feature-card">
          <img src="https://www.shutterstock.com/image-vector/plate-fruit-icon-simple-solid-600nw-2137423379.jpg" alt="Fresh Produce" />
          <h3>Fresh Produce</h3>
          <p>Explore naturally grown vegetables, fruits, and herbs delivered fresh to your doorstep.</p>
        </div>
        <div className="feature-card">
          <img src="https://www.shutterstock.com/image-vector/chilli-pepper-icon-black-vector-600nw-200440193.jpg" alt="Authentic Flavors" />
          <h3>Authentic Flavors</h3>
          <p>Shop handmade products, spices, snacks, and ingredients you can trust for purity.</p>
        </div>
        <div className="feature-card">
          <img src="https://img.icons8.com/ios-filled/60/leaf.png" alt="Eco-Conscious" />
          <h3>Eco-Conscious</h3>
          <p>Support small-scale producers offering sustainable, natural goods with minimal packaging.</p>
        </div>
        <div className="feature-card">
          <img src="https://img.lovepik.com/free-png/20210926/lovepik-shopping-cart-icon-png-image_401486831_wh1200.png" alt="Easy Shopping" />
          <h3>Easy Shopping</h3>
          <p>Smooth online experience with secure ordering, quick delivery, and real product reviews.</p>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 DesiKart. Nature’s Best, Delivered to You 🌿</p>
      </footer>
    </div>
  );
}

export default Home;
