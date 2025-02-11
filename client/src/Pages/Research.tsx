import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Research = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/research/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Research</h1>
      <p>{message}</p>
    </div>
  );
};

export default Research;