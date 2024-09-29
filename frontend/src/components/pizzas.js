export const fetchPizzas = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/pizzas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    return [];
  }
};
