import React, { useState, useEffect } from 'react';
import Cart from './Cart';

function Shop({cart, setCart, isCartOpen, toggleCart}) {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://fakestoreapi.com/products', { mode: 'cors' });
          if (response.status >= 400) {
            throw new Error('Server responds with error!');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []); // Empty dependency array ensures this runs only once
  
    const handleQuantityChange = (id, value) => {
      setQuantities({
        ...quantities,
        [id]: value,
      });
    };

    const addToCart = (item, quantities) => {
        const newQuantity = quantities[item.id] || 1;
        const itemWithQuantity = { ...item, quantity: newQuantity };
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex >= 0) {
            const updatedCart = cart.map((cartItem, index) =>
                index === existingItemIndex
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, itemWithQuantity]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
      }
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

  return (
    <>
      <ul className='shop'>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${product.id}`}
                name={`quantity-${product.id}`}
                defaultValue={1}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                //onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              />
            <button onClick={() => addToCart(product, quantities)}>Add/Modify to Cart</button>
          </li>
        ))}
    </ul>
    <div className={`cartdrop ${isCartOpen ? 'open' : ''}`}>
        <Cart cart={cart} removeFromCart={removeFromCart} toggleCart={toggleCart} />
    </div>
    </>
  );
}

export default Shop;