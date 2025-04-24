import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/LoginPage';
import Payment from './components/Payment';
import Buyer from './components/Buyer';
import Product from './components/Product';
import { Buffer } from 'buffer';
global.Buffer = Buffer; // This sets the global `Buffer` object in the browser


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
