import React, { useState } from 'react';
import './Register.css';


const Register = () => {
  const [registrationType, setRegistrationType] = useState(null);

  const handlePlayerRegistration = () => {
    setRegistrationType('player');
    // Additional logic for player registration if needed
  };

  const handleTurfRegistration = () => {
    setRegistrationType('turf');
    // Additional logic for turf registration if needed
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission based on registrationType
    console.log('Submitted as:', registrationType);
    // Example: send registrationType to server or perform actions based on it
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="register-buttons">
        <button onClick={handlePlayerRegistration}>Register as Player</button>
        <button onClick={handleTurfRegistration}>Register as Turf</button>
      </div>
      {registrationType && (
        <form onSubmit={handleSubmit}>
          {/* Add your form fields here */}
         User Name: <input type="text" placeholder="Username" /><br/>
          Password: <input type="password" placeholder="Password" />
         
          {/* Additional fields based on registration type */}
          {registrationType === 'player' && (
            <div>
            <label>
            First Name:
            <input type="text" name="firstName"  />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName"  />
          </label>
          <br />
          Email: <input type="email" id="userEmail" name="userEmail" required></input>
          <br/>
          <label>
            Date of Birth:
            <input type="date" name="dob" />
          </label>
          <br />
          <label>
            Phone Number:
            <input type="tel" name="phoneNumber"  />
          </label>
          <br />
          <label>
            Profile Picture:
            <input type="file" name="profilePicture"  />
          </label>
          
          <br />
          <label>
            Gender:
            <select name="gender" >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br/>
          
          </div>
          )}
          {registrationType === 'turf' && (
            <input type="text" placeholder="Turf-specific field" />
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Register;
