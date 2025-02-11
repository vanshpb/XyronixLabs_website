import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './Pages/Home.tsx';
import AboutUs from './Pages/AboutUs.tsx';
import Products from './Pages/Products.tsx';
import Services from './Pages/Services.tsx';
import SignIn from './Pages/SignIn.tsx';
import SignUp from './Pages/SignUp.tsx';
import Gallery from './Pages/Gallery.tsx';
import ContactUs from './Pages/ContactUs.tsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);