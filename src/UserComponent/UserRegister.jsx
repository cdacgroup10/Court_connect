import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserCss/UserRegister.css";
import './UserRegister.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  if (document.URL.indexOf("admin") !== -1) {
    user.role = "admin";
  } else if (document.URL.indexOf("customer") !== -1) {
    user.role = "customer";
  }

  console.log("ROLE FETCHED: " + user.role);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/user/gender`);
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    // First Name validation
    if (!user.firstName.trim()) {
      formErrors.firstName = "First Name is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(user.firstName)) {
      formErrors.firstName = "First Name can only contain letters and spaces";
      valid = false;
    }

    // Last Name validation
    if (!user.lastName.trim()) {
      formErrors.lastName = "Last Name is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(user.lastName)) {
      formErrors.lastName = "Last Name can only contain letters and spaces";
      valid = false;
    }

    // Email validation
    if (!user.emailId.trim()) {
      formErrors.emailId = "Email is required";
      valid = false;
    }else if (!/^[a-zA-Z0-9._]+@gmail\.com$/.test(user.emailId)) {
      formErrors.emailId = "Enter Valid email id only @gmail.com domain is allowed";
      valid = false;
    }

    // Password validation
    if (!user.password.trim()) {
      formErrors.password = "Password is required";
      valid = false;
    }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$&_]{8,15}$/.test(user.password)) {
      formErrors.password = "Password must be at least 8-15 characters long, include at least one uppercase letter, one lowercase letter, one digit, and only contain @, $, or _ (no spaces)";
      valid = false;
    }

    // Contact validation
    if (!user.contact.trim()) {
      formErrors.contact = "Contact Number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(user.contact)) {
      formErrors.contact = "Contact Number must be 10 digits";
      valid = false;
    }else if (/^[0-5]/.test(user.contact)) {
      formErrors.contact = "Enter Valid Mobile No.";
      valid = false;
    }

    // Age validation
    if (!user.age.trim()) {
      formErrors.age = "Age is required";
      valid = false;
    } else if (!/^\d+$/.test(user.age) || user.age <= 14 || user.age > 60) {
      formErrors.age = "Age must be a number between 14 and 60";
      valid = false;
    }

    // Gender validation
    if (!user.sex || user.sex === "0") {
      formErrors.sex = "Gender is required";
      valid = false;
    }

    // Street validation
    if (!user.street.trim()) {
      formErrors.street = "Street is required";
      valid = false;
    }

    // City validation
    if (!user.city.trim()) {
      formErrors.city = "City is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(user.city)) {
      formErrors.city = "City can only contain letters and spaces";
      valid = false;
    }

    // Pincode validation
    if (!user.pincode.trim()) {
      formErrors.pincode = "Pincode is required";
      valid = false;
    } else if (!/^\d{6}$/.test(user.pincode)) {
      formErrors.pincode = "Pincode must be 6 digits";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const saveUser = (event) => {
    event.preventDefault();

    if (validateForm()) {
      fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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
              navigate("/user/login");
            }, 1000);
          } else {
            console.log("Didn't get success response");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }
        });
      });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  required
                  onChange={handleUserInput}
                  value={user.firstName}
                />
                {errors.firstName && (
                  <p style={{ color: "red" }}>{errors.firstName}</p>
                )}
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  required
                  onChange={handleUserInput}
                  value={user.lastName}
                />
                {errors.lastName && (
                  <p style={{ color: "red" }}>{errors.lastName}</p>
                )}
              </div>

              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  required
                  onChange={handleUserInput}
                  value={user.emailId}
                />
                {errors.emailId && (
                  <p style={{ color: "red" }}>{errors.emailId}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b> Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  required
                  onChange={handleUserInput}
                  value={user.password}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="sex" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="sex"
                >
                  <option value="0">Select Gender</option>

                  {genders.map((gender) => {
                    return <option value={gender}> {gender} </option>;
                  })}
                </select>
                {errors.sex && <p style={{ color: "red" }}>{errors.sex}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contact"
                  name="contact"
                  required
                  onChange={handleUserInput}
                  value={user.contact}
                />
                {errors.contact && (
                  <p style={{ color: "red" }}>{errors.contact}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  required
                  onChange={handleUserInput}
                  value={user.age}
                />
                {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b> Street</b>
                </label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  required
                  onChange={handleUserInput}
                  value={user.street}
                />
                {errors.street && (
                  <p style={{ color: "red" }}>{errors.street}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  required
                  onChange={handleUserInput}
                  value={user.city}
                />
              
                {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
                
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="pincode" className="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  required
                  onChange={handleUserInput}
                  value={user.pincode}
                />
                {errors.pincode && (
                  <p style={{ color: "red" }}>{errors.pincode}</p>
                )}
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Register User"
                />
              </div>

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
