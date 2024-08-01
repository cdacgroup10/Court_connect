import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import BookTurf from './components/BookTurf';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Play from './components/Play';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import Login from './components/Login';
import Footer from './components/Footer';
import Register from './components/Register';
import RegisterUser from './components/RegisterUser';

function App() {
  return (
    <Router>
    <body>
      <header>
        <Navbar />
      </header>
      <div className='middleContent'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/play" element={<Play />} />
        <Route path="/book" element={<BookTurf />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/registeru" element={<RegisterUser/>}/>

        <Route path="/Register" element={<Register />} />
      </Routes>
      </div>
      <div className='footerclass'>
      <Footer/>
      </div>
      </body>
    </Router>
  );
}

export default App;