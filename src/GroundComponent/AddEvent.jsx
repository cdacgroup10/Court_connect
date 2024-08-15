import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const AddEvent = () => {
  let navigate = useNavigate();

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));

  const [locations, setLocations] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

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

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    date: "",
    minParticipant: "",
    maxParticipant: "",
  });

  useEffect(() => {
    const getAllLocations = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/location/fetch/`);
      setLocations(response.data.locations);
    };

    const getAllGroundByLocation = async () => {
      if (locationId) {
        const response = await axios.get(`${API_BASE_URL}/api/ground/search?locationId=${locationId}`);
        setGrounds(response.data.grounds);
      }
    };

    const getAllSlots = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/book/ground/fetch/slots`);
      setTimeSlots(response.data);
    };

    getAllLocations();
    getAllSlots();
    getAllGroundByLocation();
  }, [locationId]);

  const handleInput = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const validateEvent = () => {
    let isValid = true;
    const newErrors = {};

    // Event Name Validation
    if (!/^[a-zA-Z0-9_. ]{1,50}$/.test(event.name)) {
      newErrors.name = "Event Name can only contain letters, digits, underscores, and dots. spaces allowed. Length must be less than 50 characters.";
      isValid = false;
    }

    // Event Description Validation
    if (!/^[a-zA-Z0-9 ]{1,500}$/.test(event.description)) {
      newErrors.description = "Event Description can only contain letters, digits, and spaces. Length must be less than 500 characters.";
      isValid = false;
    }

    // Date Validation
    const selectedDate = new Date(event.date);
    const today = new Date();
    today.setDate(today.getDate() + 1);

    if (selectedDate < today) {
      newErrors.date = "Event date must be at least 1 day in the future.";
      isValid = false;
    }

    // Min Participants Validation
    if (event.minParticipant < 1 || isNaN(event.minParticipant)) {
      newErrors.minParticipant = "Minimum participants must be at least 1.";
      isValid = false;
    }

    // Max Participants Validation
    if (event.maxParticipant < 1 || isNaN(event.maxParticipant)) {
      newErrors.maxParticipant = "Maximum participants must be at least 1.";
      isValid = false;
    } else if (event.maxParticipant > event.minParticipant) {
      newErrors.maxParticipant = "Maximum participants must be greater than or equal to minimum participants.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const saveEvent = (e) => {
    e.preventDefault();
    if (validateEvent()) {
      axios
        .post(`${API_BASE_URL}/api/event/add`, event)
        .then((response) => {
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
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="card form-card border-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Event</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label"><b>Event Name</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={event.name}
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label"><b>Event Description</b></label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={event.description}
                />
                {errors.description && <div className="text-danger">{errors.description}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Location</b></label>
                <select
                  name="locationId"
                  onChange={(e) => setLocationId(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>{location.city}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Turf</b></label>
                <select
                  name="groundId"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Turf</option>
                  {grounds.map((ground) => (
                    <option key={ground.id} value={ground.id}>
                      {ground.name} [ Rs.{ground.price} ]
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="date">Booking Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  onChange={handleInput}
                  value={event.date}
                  required
                />
                {errors.date && <div className="text-danger">{errors.date}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="timeSlot">Booking Time Slot</label>
                <select
                  name="timeSlot"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="minParticipant" className="form-label"><b>Event Min Participant</b></label>
                <input
                  type="number"
                  className="form-control"
                  id="minParticipant"
                  name="minParticipant"
                  onChange={handleInput}
                  value={event.minParticipant}
                />
                {errors.minParticipant && <div className="text-danger">{errors.minParticipant}</div>}
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="maxParticipant" className="form-label"><b>Event Max Participant</b></label>
                <input
                  type="number"
                  className="form-control"
                  id="maxParticipant"
                  name="maxParticipant"
                  onChange={handleInput}
                  value={event.maxParticipant}
                />
                {errors.maxParticipant && <div className="text-danger">{errors.maxParticipant}</div>}
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
