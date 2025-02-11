import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/products/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <p>{message}</p>
    </div>
  );
};

export default Products;