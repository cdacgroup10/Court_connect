import React from 'react';
import './Footer.css'; // Import the CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Book Turf</a>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-info">
          <p>&copy; 2024 CourtConnect All rights reserved.</p>
          <p>Designed by CourtConnect</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
