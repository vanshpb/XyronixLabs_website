import React from 'react';
import { Link } from 'react-router-dom';

const errorMessages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Page Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

const ErrorPage = ({ errorCode }) => {
  const errorMessage = errorMessages[errorCode] || 'An unexpected error occurred';

  return (
    <div>
      <h1>{errorCode} - {errorMessage}</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

ErrorPage.defaultProps = {
  errorCode: 404
};

export default ErrorPage;