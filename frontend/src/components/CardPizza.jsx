import React from 'react';
import { useCart } from '../context/CartContext'; 

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={pizza.img} alt={pizza.name} />
      <div className="card-body">
        <h5 className="card-title">{pizza.name}</h5>
        <p>{pizza.desc}</p>
        <p>Precio: ${pizza.price}</p>
        <button onClick={() => addToCart(pizza)}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default CardPizza;
