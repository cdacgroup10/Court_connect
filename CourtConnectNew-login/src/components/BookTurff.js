import React from 'react';
import { Link } from "react-router-dom";
import './BookTurff.css';
import ban2 from "./Images/ban2.jpg";
import ban3 from "./Images/ban3.jpg";
import gameAccessories2 from "./Images/gameAccessories2.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';


function BookTurff() {
  return (
    <div className="container">
      
        <h1>Swarget</h1>
        <p>3.3 (3 ratings) Rate Venue</p>
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
      </div>


      
      <section className="venue-info">
        <h2>Timing</h2>
        <p>6 AM - 12 AM</p>
        <h2>Location</h2>
        <p>GSA Seven Love Chowak, near Pournima Tower, Behind BP Petrol Pump, Swarget, Pune - 411042</p>
       
      </section>
      <section className="sports-available">
        <h2>Sports Available</h2>
        <ul>
          <li>Badminton</li>
          <li>Football</li>
          <li>Box Cricket</li>
        </ul>
        <Link to="/booknow" className="btn">
        <button >Book Now</button>
              </Link>
        
      </section>
      <section className="amenities">
        <h2>Amenities</h2>
        <ul>
          <li>Parking</li>
          <li>Drinking Water</li>
          <li>First Aid</li>
          <li>Change Room</li>
          <li>Shower</li>
        </ul>
      </section>
      
    </div>
  );
}

export default BookTurff;