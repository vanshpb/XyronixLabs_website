import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/contact-us/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>ContactUs</h1>
      <p>{message}</p>
    </div>
  );
};

export default ContactUs;