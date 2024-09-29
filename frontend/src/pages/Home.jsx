import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/pizzas')
      .then((response) => response.json())
      .then((data) => {
        console.log('Pizzas fetched:', data);
        setPizzas(data);
      })
      .catch((error) => console.error('Error fetching pizzas:', error));
  }, []);

  if (pizzas.length === 0) {
    return <div>No pizzas available</div>;
  }

  return (
    <>
      <Header />
      <div className="pizzas-container">
        {pizzas.map((pizza) => (
          <CardPizza key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </>
  );
};

export default Home;
