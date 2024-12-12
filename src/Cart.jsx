import React from 'react';

function Cart({ cart, removeFromCart, toggleCart }) {

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
      <ul className='cart'>
        <button onClick={toggleCart} className="cart-close">X</button>
        <li>
          <h2>Total: ${total}</h2>
        </li>
        {cart.map((item, index) => (
          <li key={index}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <p>Amount: {item.quantity}</p>
          <p>Total: ${item.price * item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </li>
        ))}
      </ul>
  );
}

export default Cart;