import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/pizzas/${id}`)
      .then((response) => response.json())
      .then((data) => setPizza(data))
      .catch((error) => console.error('Error fetching pizza:', error));
  }, [id]);

  if (!pizza) {
    return <div>Cargando pizza...</div>;
  }

  return (
    <div>
      <h1>{pizza.name}</h1>
      <img src={pizza.img} alt={pizza.name} />
      <p>{pizza.desc}</p>
      <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
      <p>Precio: ${pizza.price}</p>
    </div>
  );
};

export default Pizza;
