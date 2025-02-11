import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/signup/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>SignUp</h1>
      <p>{message}</p>
    </div>
  );
};

export default SignUp;