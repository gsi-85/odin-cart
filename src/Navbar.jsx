import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import PropTypes from 'prop-types';

function Navbar({ cart, toggleCart}) {
    console.log(cart.length);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop"> Shop</Link>
        </li>
        <li>
        <button onClick={toggleCart} className="cart-button">
            <span className="shop-icon">
              🛒
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </span>
        </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;