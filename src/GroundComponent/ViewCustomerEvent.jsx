import Carousel from "../page/Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { Button, Modal } from "react-bootstrap";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ViewCustomerEvent = () => {
  const [events, setEvents] = useState([]);

  const [participants, setParticipants] = useState([
    {
      user: {
        firstName: "",
        lastName: "",
        emailId: "",
        contact: "",
        street: "",
        city: "",
        pincode: "",
      },
    },
  ]);

  let customer = JSON.parse(sessionStorage.getItem("active-customer"));

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const viewParticipants = (participants, e) => {
    setParticipants(participants);
    handleShow();
  };

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
    const response = await axios.get(
      `${API_BASE_URL}/api/event/fetch/customer-wise?customerId=` +
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
          <h2>My Events</h2>
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
                  <th scope="col">Min Participants</th>
                  <th scope="col">Max Participants</th>
                  <th scope="col">Advance Paid</th>
                  <th scope="col">Total Participants</th>
                  <th scope="col">View Participants</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            `${API_BASE_URL}/api/ground/` +
                            event.ground.image
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
                        <b>{event.name}</b>
                      </td>

                      <td>
                        <b>{event.description}</b>
                      </td>
                      <td>
                        <b>{event.date + " " + event.timeSlot}</b>
                      </td>
                      <td>
                        <b>{event.ground.location.city}</b>
                      </td>
                      <td>
                        <b>{event.minParticipant}</b>
                      </td>
                      <td>
                        <b>{event.maxParticipant}</b>
                      </td>
                      <td>
                        <b>{event.advanceAmountPaid}</b>
                      </td>
                      <td>
                        <b>
                          {" "}
                          {event.participants ? event.participants.length : 0}
                        </b>
                      </td>
                      <td>
                        <button
                          onClick={() => viewParticipants(event.participants)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          View Participants
                        </button>
                      </td>
                      <td>
                        <b>{event.status}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Event Participants
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Phone No</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((customer) => {
                    return (
                      <tr>
                        <td>
                          <b>{customer.user.firstName}</b>
                        </td>

                        <td>
                          <b>{customer.user.lastName}</b>
                        </td>
                        <td>
                          <b>{customer.user.emailId}</b>
                        </td>
                        <td>
                          <b>{customer.user.contact}</b>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewCustomerEvent;
