import React, { useState } from "react";
import "./BookTurf.css"; // Import the CSS file for styles

const BookTurf = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const gameOptions = [
    "Football",
    "Soccer",
    "Basketball",
    "Tennis",
    "Cricket",
    "Volleyball",
    "Badminton",
    "Rugby",
    "Baseball",
    "Hockey",
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleGameChange = (e) => {
    setSelectedGame(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform booking logic here (e.g., API call, state update)
    console.log("Booking submitted:", {
      selectedDate,
      selectedTime,
      selectedGame,
    });
    // Reset form fields
    setSelectedDate("");
    setSelectedTime("");
    setSelectedGame("");
  };

  return (
    <div className="book-turf">
      <h2>Book Turf</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
        />

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={selectedTime}
          onChange={handleTimeChange}
          required
        />

        <label htmlFor="game">Select Game:</label>
        <select
          id="game"
          value={selectedGame}
          onChange={handleGameChange}
          required
        >
          <option value="">Select a game</option>
          {gameOptions.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>

        <br></br>

        <button type="submit">Available Turfs</button>
      </form>
    </div>
  );
};

export default BookTurf;
