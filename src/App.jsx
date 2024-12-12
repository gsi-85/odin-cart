import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Shop from './Shop';
import Navbar from './Navbar';
import './App.css'; // Import the CSS file
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <Router>
      <div>
        <Navbar cart={cart} toggleCart={toggleCart}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop setCart={setCart} cart={cart} isCartOpen={isCartOpen} toggleCart={toggleCart} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;