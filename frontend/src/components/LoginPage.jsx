import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const navigate = useNavigate(); 

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
        role: signupData.role,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message || 'Signup successful!');
      setActiveTab('login');
    } else {
      alert(data.message || 'Signup failed');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login success!');
      navigate('/product'); // Navigate to the products page after login success
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => switchTab('login')}
        >
          Login
        </button>
        <button
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => switchTab('signup')}
        >
          Signup
        </button>
      </div>

      {/* Login Form */}
      <form
        className={`form ${activeTab === 'login' ? 'active' : ''}`}
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Email ID"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit" className="btn">LOGIN</button>
      </form>

      {/* Signup Form */}
      <form
        className={`form ${activeTab === 'signup' ? 'active' : ''}`}
        onSubmit={handleSignup}
      >
        <input
          type="text"
          placeholder="Full Name"
          required
          value={signupData.fullName}
          onChange={(e) =>
            setSignupData({ ...signupData, fullName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email ID"
          required
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Create Password"
          required
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={signupData.confirmPassword}
          onChange={(e) =>
            setSignupData({ ...signupData, confirmPassword: e.target.value })
          }
        />

        <div className="role-selection">
          <label>Select your role:</label>
          <label>
            <input
              type="radio"
              name="role"
              value="buyer"
              required
              checked={signupData.role === 'buyer'}
              onChange={(e) =>
                setSignupData({ ...signupData, role: e.target.value })
              }
            />{' '}
            Buyer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="seller"
              required
              checked={signupData.role === 'seller'}
              onChange={(e) =>
                setSignupData({ ...signupData, role: e.target.value })
              }
            />{' '}
            Seller
          </label>
        </div>

        <button type="submit" className="btn">SIGN UP</button>
      </form>
    </div>
  );
};

export default LoginPage;
