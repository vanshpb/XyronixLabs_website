import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/gallery/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <p>{message}</p>
    </div>
  );
};

export default Gallery;