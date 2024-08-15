import { Link } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EventCard = (event) => {
  return (
    <div className="col">
      <div class="card border-color rounded-card card-hover product-card custom-bg h-100">
        <img
          src={`${API_BASE_URL}/api/ground/` + event.item.ground.image}
          class="card-img-top rounded mx-auto d-block m-2"
          alt="img"
          style={{
            maxHeight: "270px",
            maxWidth: "100%",
            width: "auto",
          }}
        />

        <div class="card-body text-color">
          <h5 class="card-title d-flex justify-content-between">
            <div>
              <b>{event.item.name}</b>
            </div>
          </h5>
          <p className="card-text">
            <b>{event.item.description}</b>
          </p>
          <b>Location:</b> {event.item.ground.location.city}
          <br />
          <b>Event Date:</b> {event.item.date}
          <br />
          <b>Time Slot:</b> {event.item.timeSlot}
          <br />
          <b>Advance Amount Paid:</b> {event.item.advanceAmountPaid}
        </div>
        <div class="card-footer">
          <div className="d-flex justify-content-center">
            <Link
              to={`/event/detail/${event.item.id}`}
              className="btn bg-color custom-bg-text"
            >
              Participate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
