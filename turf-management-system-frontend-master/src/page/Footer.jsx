import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-color">
      <div className="container my-5 footer-container">
        <div className="container-fluid p-4 pb-0">
          <section>
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase text-color">Court Connect</h5>
                <p className="text-color">
                  Welcome to our Court Connect, your ultimate
                  destination for seamless sports experiences! Our platform is
                  designed to simplify the process of booking a turf, making
                  it as easy as 1-2-3!
                </p>
              </div>
              
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <Link to="/about" className="active">
                About Us
              </Link>
                <ul className="list-unstyled mb-0">
                  
                  
                </ul>
              </div>
              <div className="social-icons">
              <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase text-color-4">Contact Us</h5>
                <ul className="list-unstyled mb-0">
                <li><a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram social-icon"></i>
            </a></li>
                  <li><a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook social-icon"></i>
            </a></li>
                  
                </ul>
              </div>
              </div>
              
          </div>
          </section>

          <hr className="mb-4" />

          <section>
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3 text-color">Login from here</span>
              <Link to="/user/login" className="active">
                <button type="button" className="btn btn-outline-light btn-rounded bg-color custom-bg-text">
                  Log in
                </button>
              </Link>
            </p>
          </section>

          <hr className="mb-4" />
        </div>

        <div className="text-center footer-bottom">
          © 2024 Copyright:
          <a className="text-color-3" href="#">
            courtconnect.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
