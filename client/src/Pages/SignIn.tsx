import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/signin/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>SignIn</h1>
      <p>{message}</p>
    </div>
  );
};

export default SignIn;