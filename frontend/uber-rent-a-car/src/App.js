import React from 'react';
import './App.css';
import NavbarUber from './components/navbar-uber/NavbarUber';
import Carousel from './components/carousel/Carousel';
import Market from './components/market/Market';
import Footer from './components/footer/Footer.js';

function App() {
  return (
    <div className="App">
      <NavbarUber/>
      <Carousel/>
      <Market/>
      <Footer/>
    </div>
  );
}

export default App;
