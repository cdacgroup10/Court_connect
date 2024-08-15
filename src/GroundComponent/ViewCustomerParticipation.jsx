import Carousel from "../page/Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import EventCard from "./EventCard";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ViewCustomerParticipation = () => {
  const [participants, setParticipants] = useState([
    {
      name: "",
      description: "",
      ground: {
        image: "",
        name: "",
        location: {
          city: "",
        },
      },
    },
  ]);

  let customer = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllEvents = async () => {
      const allEvents = await retrieveAllEvents();
      if (allEvents) {
        setParticipants(allEvents.participants);
      }
    };

    getAllEvents();
  }, []);

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const retrieveAllEvents = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/event/fetch/event-participants?participantId=` +
        customer.id
    );

    return response.data;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>My Participations</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Event Time</th>
                  <th scope="col">Location</th>
                  <th scope="col">Participation Time</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            `${API_BASE_URL}/api/ground/` +
                            participant.ground.image
                          }
                          class="card-img-top rounded mx-auto d-block m-2"
                          alt="img"
                          style={{
                            width: "200px",
                            height: "auto",
                          }}
                        />
                      </td>
                      <td>
                        <b>{participant.name}</b>
                      </td>

                      <td>
                        <b>{participant.description}</b>
                      </td>
                      <td>
                        <b>{participant.date + " " + participant.timeSlot}</b>
                      </td>
                      <td>
                        <b>{participant.ground.location.city}</b>
                      </td>
                      <td>
                        <b>
                          {formatDateFromEpoch(participant.participationTime)}
                        </b>
                      </td>

                      <td>
                        <b>{participant.status}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerParticipation;
