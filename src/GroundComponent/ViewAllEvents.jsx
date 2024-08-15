import Carousel from "../page/Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "./ViewAllEvents.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ViewAllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      const allEvents = await retrieveAllEvents();
      if (allEvents) {
        setEvents(allEvents.events);
      }
    };

    getAllEvents();
  }, []);

  const retrieveAllEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/event/fetch`);

    return response.data;
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="mt-2 mb-5">
        <div className="row mt-4">
          <div className="col-sm-12">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {events.map((event) => {
                return <EventCard item={event} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllEvents;
