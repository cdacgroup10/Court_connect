import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styles
import { Link } from "react-router-dom";

const Login = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unameLengthError, setUnameLengthError] = useState(false);
  const [usernameRegexError, setUsernameExprError] = useState("");
  const [emailError, setEmailError] = useState("");

  //helping functions for email validation
  const validateEmail = (email) => {
    // This regex covers most of the valid email address formats
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  //helping function for username validation
  const validateUsername = (username) => {
    const usernameRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;
    return usernameRegex.test(username);
  };

  //custom vvalidation on change event whatever the validation
  // we will write inside it
  //validation related to username
  const handleUnameChange = (e) => {
    let uname = e.target.value;
    if (uname.length < 8) {
      setUnameLengthError(true);
    } else {
      setUnameLengthError(false);
    }
    setUname(e.target.value);

    if (!validateUsername(uname)) {
      setUsernameExprError(
        "Must contain at least one uppercase letter, one number, and one special symbol."
      );
    } else {
      setUsernameExprError("");
    }
  };

  //validaion related to email
  const handleEmailChange = (e) => {
    let uemail = e.target.value;
    setEmail(uemail);
    if (!validateEmail(uemail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  
  //validation related to password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle login submission (e.g., API call, authentication)
    console.log("Login submitted:", { uname, email, password });
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="uname">UserName:</label>
        <input
          type="text"
          id="uname"
          value={uname}
          onChange={handleUnameChange}
          placeholder="Enter Your UserName"
          required
        />
        <div className="errorbox">
          {unameLengthError ? (
            <span style={{ color: "red" }}>
              Name length must be more then 8 charecters
            </span>
          ) : (
            ""
          )}
          <br/>
          {usernameRegexError && (
            <span style={{ color: "red" }}>{usernameRegexError}</span>
          )}
        </div>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />

        <div className="errorbox">
          {emailError && (
            <span style={{ color: "red" }}>{emailError}</span>
          )}
        </div>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>

        <Link to="/registeru">Register here</Link>
        <Link to="/registeru">Forgot Password</Link>
      </form>
    </div>
  );
};

export default Login;
