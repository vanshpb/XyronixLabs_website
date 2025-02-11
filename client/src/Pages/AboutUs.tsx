import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutUs = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/about-us/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>AboutUs</h1>
      <p>{message}</p>
    </div>
  );
};

export default AboutUs;