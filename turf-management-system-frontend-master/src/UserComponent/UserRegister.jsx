import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserRegister.css';
const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  const [genders, setGenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user/gender");
        setGenders(response.data.genders);
      } catch (error) {
        console.error("Failed to fetch genders", error);
      }
    };

    fetchGenders();
  }, []);

  useEffect(() => {
    if (document.URL.indexOf("admin") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "admin" }));
    } else if (document.URL.indexOf("customer") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "customer" }));
    }
  }, []);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const saveUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.responseMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
        });

        setTimeout(() => navigate("/user/login"), 2000);
      } else {
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
        });

        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="user-register-container">
      <div className="card form-card border-color text-color custom-bg mx-auto mt-4 p-4">
        <div className="card-header bg-color custom-bg-text text-center">
          <h5 className="card-title">Register {user.role}</h5>
        </div>
        <div className="card-body">
          <form className="row g-3" onSubmit={saveUser}>
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label"><b>First Name</b></label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={handleUserInput}
                value={user.firstName}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label"><b>Last Name</b></label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={handleUserInput}
                value={user.lastName}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="emailId" className="form-label"><b>Email Id</b></label>
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                onChange={handleUserInput}
                value={user.emailId}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label"><b>Password</b></label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleUserInput}
                value={user.password}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="sex" className="form-label"><b>User Gender</b></label>
              <select
                onChange={handleUserInput}
                className="form-control"
                name="sex"
                value={user.sex}
              >
                <option value="">Select Sex</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="contact" className="form-label"><b>Contact No</b></label>
              <input
                type="tel"
                className="form-control"
                id="contact"
                name="contact"
                onChange={handleUserInput}
                value={user.contact}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="age" className="form-label"><b>Age</b></label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                onChange={handleUserInput}
                value={user.age}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="street" className="form-label"><b>Street</b></label>
              <textarea
                className="form-control"
                id="street"
                name="street"
                rows="3"
                onChange={handleUserInput}
                value={user.street}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label"><b>City</b></label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                onChange={handleUserInput}
                value={user.city}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="pincode" className="form-label"><b>Pincode</b></label>
              <input
                type="number"
                className="form-control"
                id="pincode"
                name="pincode"
                onChange={handleUserInput}
                value={user.pincode}
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                type="submit"
                className="btn btn-primary bg-color custom-bg-text"
                value="Register User"
              />
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
