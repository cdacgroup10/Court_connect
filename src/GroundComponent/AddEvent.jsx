import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddEvent = () => {
  let navigate = useNavigate();

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));

  const [locations, setLocations] = useState([]);

  const [grounds, setGrounds] = useState([]);
  const [locationId, setLocationId] = useState("");

  const retrieveAllLocations = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/location/fetch/"
    );
    return response.data;
  };

  const [timeSlots, setTimeSlots] = useState([]);

  const retrieveAllSlots = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/ground/fetch/slots"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const resLocation = await retrieveAllLocations();
      if (resLocation) {
        setLocations(resLocation.locations);
      }
    };

    const getAllGroundByLocation = async () => {
      const allGrounds = await retrieveAllGroundsByLocation();
      if (allGrounds) {
        setGrounds(allGrounds.grounds);
      }
    };

    const getAllSlots = async () => {
      const allSlots = await retrieveAllSlots();
      if (allSlots) {
        setTimeSlots(allSlots);
      }
    };

    if (locationId !== "") {
      getAllGroundByLocation();
    }
    getAllLocations();
    getAllSlots();
  }, [locationId]);

  const retrieveAllGroundsByLocation = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/ground/search?locationId=" + locationId
    );

    return response.data;
  };

  const [event, setEvent] = useState({
    name: "",
    description: "",
    customerId: customer.id,
    groundId: "",
    date: "",
    timeSlot: "",
    minParticipant: "",
    maxParticipant: "",
  });

  const handleInput = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const saveEvent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/event/add", event)
      .then((response) => {
        console.log("result", response);
        const res = response.data;

        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 3000);
        } else {
          toast.error(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("Error adding event", error);
        toast.error("Error adding event. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Event</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Event Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={event.name}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Event Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={event.description}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Location</b>
                </label>

                <select
                  name="locationId"
                  onChange={(e) => setLocationId(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Location</option>

                  {locations.map((location) => {
                    return (
                      <option value={location.id}> {location.city} </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Turf</b>
                </label>

                <select
                  name="groundId"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Turf</option>

                  {grounds.map((ground) => {
                    return (
                      <option value={ground.id}>
                        {" "}
                        {ground.name + " [ Rs." + ground.price + "]"}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label for="date">Booking Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  name="date"
                  onChange={handleInput}
                  value={event.date}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label for="date">Booking Time Slot</label>
                <select
                  name="timeSlot"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Time Slot</option>

                  {timeSlots.map((slot) => {
                    return <option value={slot}> {slot} </option>;
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  <b>Event Min Participant</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="minParticipant"
                  name="minParticipant"
                  onChange={handleInput}
                  value={event.minParticipant}
                />
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  <b>Event Max Participant</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maxParticipant"
                  name="maxParticipant"
                  onChange={handleInput}
                  value={event.maxParticipant}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  onClick={saveEvent}
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
