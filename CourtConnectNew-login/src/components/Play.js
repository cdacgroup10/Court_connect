/*generate events*/
import React from 'react';
import './Play.css'; // Import the CSS file for styles

const eventsData = [
  { id: 1, title: 'Event 1', date: '2024-07-10' },
  { id: 2, title: 'Event 2', date: '2024-07-15' },
  { id: 3, title: 'Event 3', date: '2024-07-20' },
];

const Play = () => {
  return (
    <div className="generate-events">
      <h2>Upcoming Events</h2>
      <ul className="events-list">
        {eventsData.map(event => (
          <li key={event.id} className="event-item">
            <div className="event-title">{event.title}</div>
            <div className="event-date">{event.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Play;