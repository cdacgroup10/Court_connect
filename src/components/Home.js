import React from "react";
import "./Home.css";
import courtConnectLogo from "./Images/courtConnectLogo.png";
import Logo from "./Images/Logo.png";
import Event2 from "./Images/Event2.jpg";
import Event3 from "./Images/Event3.jpg";
import Event4 from "./Images/Event4.jpg";
import Event1 from "./Images/Event1.jpg";

import Turf1 from "./Images/Turf1.jpg";
import Turf2 from "./Images/Turf2.jpg";
import Turf3 from "./Images/Turf3.jpg";
import Turf4 from "./Images/Turf4.jpg";

import carasouel1 from "./Images/carasouel1.jpg";
import gameAccessories2 from "./Images/gameAccessories2.jpg";
import carasouel2 from "./Images/carasouel2.jpg";
import ban2 from "./Images/ban2.jpg";
import ban3 from "./Images/ban3.jpg";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

const Home = () => {
  return (
    <div>
      <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={ban2} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={gameAccessories2} class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={ban3} class="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <section className="venues-nearby">
        <h2>Events Nearby</h2>
        <p>
          Seamlessly explore sports venues and play with sports enthusiasts just
          like you!
        </p>
        <div className="venue-carousel">
          <section className="card-container">
            <div className="card">
              <img src={Event2} alt="Card Image 1" />
              <div className="card-content">
                <h3>VolleyBall Event</h3>
                <p>VolleyBall event conducted at GreenBox turf.</p>
                <a href="#" className="btn">
                  Read More
                </a>
              </div>
            </div>

            <div className="card">
              <img src={Event3} alt="Card Image 2" />
              <div className="card-content">
                <h3>Racing event</h3>
                <p>Racing event conducted at pro turf</p>
                <a href="#" className="btn">
                  Read More
                </a>
              </div>
            </div>
            <div className="card">
              <img src={Event4} alt="Card Image 2" />
              <div className="card-content">
                <h3>Yoga Event</h3>
                <p>Yoga event conducted at The Turf Ground.</p>
                <a href="#" className="btn">
                  Read More
                </a>
              </div>
            </div>
            <div className="card">
              <img src={Event1} alt="Card Image 2" />
              <div className="card-content">
                <h3>Cycling Event </h3>
                <p>Cycling event conducted at Sunrise sport</p>
                <a href="#" className="btn">
                  Read More
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section className="book-venues">
      <h2>Book Turfs</h2>
            <div className="venue-list">
            <div className="card">
              <img src={Turf1} alt="Card Image 2"/>
              <div className="card-content">
                  <h3>Sunrise Sports Academy</h3>
                  <p>Bibvewadi Road-Satara</p>
                  <a href="#" className="btn">Book Turf</a>
              </div>
          </div>
          <div className="card">
              <img src={Turf2} alt="Card Image 2"/>
              <div className="card-content">
                  <h3>Satav Patil Sports</h3>
                  <p>City School Kondhwa Budruk</p>
                  <a href="#" className="btn">Book Turf</a>
              </div>
          </div>
          <div className="card">
            <img src={Turf3} alt="Card Image 2" />
            <div className="card-content">
            <h3>Maharashtra Pune Sports Galaxy</h3>
                  <p>Turf Up Kharadi Kharadi</p>
                  <a href="#" className="btn">Book Turf</a>

            </div>
          </div>
          <div className="card">
            <img src={Turf4} alt="Card Image 2" />
            <div className="card-content">
            <h3>Pune Pioneers Football Club</h3>
                  <p>Pandhare Farms Hadapsar</p>
                  <a href="#" className="btn">Book Turf</a>
            </div>
          </div>
        </div>
        <a href="#all-venues" className="see-all">
          See All Venues
        </a>
      </section>
      <section className="discover-games">
        <h2>Discover Games</h2>
        <div className="venue-list">
          <div className="card">
            <img src={Turf1} alt="Card Image 2" />
            <div className="card-content">
              <h3>Tennis</h3>
              {/* <p>This is some example text for Card 2.</p> */}
              <a href="#" className="btn">
                Read More
              </a>
            </div>
          </div>
          <div className="card">
            <img src={Turf2} alt="Card Image 2" />
            <div className="card-content">
              <h3>Badminton</h3>
              {/* <p>This is some example text for Card 2.</p> */}
              <a href="#" className="btn">
                Read More
              </a>
            </div>
          </div>
          <div className="card">
            <img src={Turf3} alt="Card Image 2" />
            <div className="card-content">
              <h3>Cricket</h3>
              {/* <p>This is some example text for Card 2.</p> */}
              <a href="#" className="btn">
                Read More
              </a>
            </div>
          </div>
          <div className="card">
            <img src={Turf4} alt="Card Image 2" />
            <div className="card-content">
              <h3>Football</h3>
              {/* <p>This is some example text for Card 2.</p> */}
              <a href="#" className="btn">
                Read More
              </a>
            </div>
          </div>
        </div>

        <a href="#all-games" className="see-all">
          See All Games
        </a>
      </section>

      <section className="app-download">
        <p>Coming Soon CourtConnect app for a seamless experience!</p>
        <div className="app-links">
          {/* Add app store and play store links here */}
        </div>
      </section>
    </div>
  );
};

export default Home;
