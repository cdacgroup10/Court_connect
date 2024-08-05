import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import "./NavBar.css";
import Logo from "./Images/Logo.png";
import { Button } from "bootstrap";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <li className="nav-item">
            <div className="container">
              {/* <div className="logo">
                <img src={Logo} alt="courtConnect Logo" />
              </div> */}
              <div className="search-bar">
                <input type="text" placeholder="Pune" />
              </div>
            </div>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/play" className="nav-link">
                Play
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/book" className="nav-link">
                Book
              </Link>
            </li>
            <li className="nav-item" id="about-us">
              <Link to="/AboutUs" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faq" className="nav-link">
                FAQ
              </Link>
            </li>
            { <li className="nav-item" id="login-btn">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li> }
          </li>
        </li>
      </ul>
      <div id="login-btn">
        <Link to="/login" className="nav-link">
          Login / Signup &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
