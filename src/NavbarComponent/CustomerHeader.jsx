import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerHeader = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");

    navigate("/home");
    window.location.reload(true);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="/customer/event/add"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Event</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/customer/hosted/event/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">My Events</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/customer/event/participant"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">My Participation</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/customer/wallet"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">My Wallet</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="user/ground/bookings"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Booked Turfs</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="#" className="nav-link active" aria-current="page">
          <b className="text-color"  style={{ color: 'white', padding: '10px', fontSize:'15px' }}>{user.firstName}</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default CustomerHeader;
