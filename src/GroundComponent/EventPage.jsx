import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const EventPage = () => {
  const { eventId } = useParams();

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  let admin = JSON.parse(sessionStorage.getItem("active-admin"));

  let navigate = useNavigate();

  const [event, setEvent] = useState({
    id: "",
    name: "",
    description: "",
    customer: {
      firstName: "",
      lastName: "",
    },
    ground: {
      image: "",
      location: {
        city: "",
      },
    },
  });

  const [booking, setBooking] = useState({
    customerId: user ? user.id : 0,
    id: eventId,
  });

  const retrieveEvent = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/event/id?eventId=` + eventId
    );

    return response.data;
  };

  useEffect(() => {
    const getEvent = async () => {
      const retrievedEvent = await retrieveEvent();

      setEvent(retrievedEvent.events[0]);
    };

    getEvent();
  }, [eventId]);

  const participateEvent = (e) => {
    e.preventDefault();

    if (user) {
      fetch(`${API_BASE_URL}/api/event/customer/participate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }).then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            console.log("Got the success response");

            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate("/home");
            }, 1000); // Redirect after 3 seconds
          } else {
            console.log("Didn't got success response");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          }
        });
      });
    } else {
      alert("Please log in as customer to participate in event!!!");
    }
  };

  return (
    <div className="container-fluid mb-5">
      <div class="row">
        <div class="col-sm-3 mt-2">
          <div class="card form-card border-color custom-bg">
            <img
              src={`${API_BASE_URL}/api/ground/` + event.ground.image}
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
                width: "auto",
              }}
              class="card-img-top rounded mx-auto d-block m-2"
              alt="img"
            />
          </div>
        </div>
        <div class="col-sm-6 mt-2">
          <div class="card form-card border-color custom-bg">
            <div class="card-header bg-color">
              <div className="d-flex justify-content-between">
                <h1 className="custom-bg-text">{event.name}</h1>
              </div>
            </div>

            <div class="card-body text-left text-color">
              <div class="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <h4 class="card-text">{event.description}</h4>

              <div class="text-left mt-3 h4">
                <b>Location : {event.ground.location.city} </b>
              </div>

              <div class="text-left mt-3 h4">
                <b>
                  Event Host Name :{" "}
                  {event.customer.firstName + " " + event.customer.lastName}{" "}
                </b>
              </div>

              <div class="text-left mt-3 h5">
                <b>Event Time : {event.date + " " + event.timeSlot} </b>
              </div>

              <div class="text-left mt-3 h5">
                <b>Min Partipant : {event.minParticipant}</b>
                <b className="ms-5">Max Partipant : {event.maxParticipant}</b>
              </div>
              <div class="text-left mt-3">
                <h4 className="text-danger">
                  Total Participants:{" "}
                  {event.participants
                    ? event.participants.length > 0
                      ? event.participants.length + 1
                      : 1
                    : 1}
                </h4>
              </div>

              <div class="text-left mt-3 h4">
                <h4>Total Ground Price : &#8377;{event.ground.price}</h4>
              </div>

              <div class="text-left mt-3"></div>
            </div>

            <div class="card-footer custom-bg">
              <div className="d-flex justify-content-center ">
                <div>
                  <input
                    type="submit"
                    class="btn btn-lg bg-color custom-bg-text mt-3 mb-3"
                    value="Participate"
                    onClick={(e) => participateEvent(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
