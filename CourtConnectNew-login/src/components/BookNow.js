import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookNow.css'; // Import your CSS file

const BookNow = () => {
  const [selectedSport, setSelectedSport] = useState('Football');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('04:30 PM');
  const [selectedCourt, setSelectedCourt] = useState('--Select Court--');
  const [cart, setCart] = useState([]);
  const [duration, setDuration] = useState('1 Hr');

  const sportsOptions = [
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Tennis', label: 'Tennis' },
    // Add more sports options as needed
  ];

  const courtOptions = [
    { value: '7 a Side Turf 1', label: '7 a Side Turf 1', basePrice: 1000 },
    { value: '7 a Side Turf 2', label: '7 a Side Turf 2', basePrice: 1000 },
    { value: '7 a Side Turf 3', label: '7 a Side Turf 3', basePrice: 1000 },
    // Add more court options as needed
  ];

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleCourtChange = (event) => {
    setSelectedCourt(event.target.value);
  };

  const handleAddToCart = () => {
    const selectedCourtOption = courtOptions.find((option) => option.value === selectedCourt);
    if (selectedCourtOption) {
      const hours = parseInt(duration.replace(' Hr', ''));
      const price = selectedCourtOption.basePrice * hours;
      setCart([...cart, { court: selectedCourtOption.label, price: price }]);
    }
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  return (
    <div className="container">
      <div className="booking-form">
        <h2>Nawu Sports Club</h2>
        <p>Gahunje</p>
        <p>Earn 3 karma points on every booking!</p>

        <div className="form-group">
          <label htmlFor="sport">Sports:</label>
          <select id="sport" value={selectedSport} onChange={handleSportChange}>
            {sportsOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Start Time:</label>
          <input
            type="time"
            id="time"
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <select id="duration" value={duration} onChange={handleDurationChange}>
            <option value="1 Hr">1 Hr</option>
            <option value="2 Hr">2 Hr</option>
            <option value="3 Hr">3 Hr</option>
            {/* Add more duration options as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="court">Court:</label>
          <select id="court" value={selectedCourt} onChange={handleCourtChange}>
            {courtOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} (Base Price: INR {option.basePrice})
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={handleAddToCart}>Add To Cart</button>

        <h3>Cart:</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.court} - INR {item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookNow;