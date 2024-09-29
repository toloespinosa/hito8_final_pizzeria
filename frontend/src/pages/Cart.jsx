import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, totalAmount } = useCart();
  const { token } = useUser();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const response = await fetch('http://localhost:5001/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ cart }),
    });

    if (response.ok) {
      setMessage('Compra realizada con éxito');
    } else {
      setMessage('Error al realizar la compra');
    }
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((pizza) => (
          <li key={pizza.id}>
            <img src={pizza.img} alt={pizza.name} />
            <h5>{pizza.name}</h5>
            <p>Precio: ${pizza.price}</p>
            <p>Cantidad: {pizza.quantity}</p>
            <button onClick={() => increaseQuantity(pizza.id)}>+</button>
            <button onClick={() => decreaseQuantity(pizza.id)}>-</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalAmount.toLocaleString()}</h3>

      {token ? (
        <button onClick={handleCheckout}>Pagar</button>
      ) : (
        
        <button onClick={() => navigate('/login')}>Iniciar sesión para pagar</button>
      )}

      {message && <p>{message}</p>} 
    </div>
  );
};

export default Cart;
