import React, { useState,useEffect  } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './RegisterUser.css';

const RegisterForm = () => {
  // to make buton disabled till confirm password both contains same value 
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [UserFullName, setUserFullName] = useState("");
  const [UserDateOfBirth, setUserDateOfBirth] = useState("");
  const [UserMobileNo, setUserMobileNo] = useState("");
  const [UserProfilePic, setUserProfilePic] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  
  
  
  //validation useState
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [conformPasswordError, setConformPasswordError] = useState('');










  //helping functions 
  const validateUsername = (username) => {
    // Regex for validating the username
    const usernameRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@_])[A-Za-z\d@_]{8,15}$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    // This regex covers most of the valid email address formats
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name) => {
    // Regex to match alphabetic characters and spaces
    const nameRegex = /^[a-zA-Z\s]{3,30}$/;
    return nameRegex.test(name);
  };

  const validateMobileNumber = (number) => {
    // Regex to match exactly 10 digits
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(number);
  };

  // Regex to validate the password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_@])[A-Za-z\d@_]{8,15}$/;
    return passwordRegex.test(password);
  };


//fields validation 
  const handleUnameChange = (e) => {
    const value = e.target.value;
    setUserName(value);

    if (!validateUsername(value)) {
      setUsernameError('Username must contain at least one uppercase letter, one lowercase letter, one number, and only @ or _ as special characters. Length must be 8-15 characters.');
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setUserFullName(value);

    if (!validateFullName(value)) {
      setFullNameError('Full name must be 3-30 characters long and contain only alphabetic characters and spaces.');
    } else {
      setFullNameError('');
    }
  };

  const handleMobileNoChange = (e) => {
    const value = e.target.value;
    setUserMobileNo(value);

    if (!validateMobileNumber(value)) {
      setMobileNumberError('Mobile number must be exactly 10 digits long and contain only numbers.');
    } else {
      setMobileNumberError('');
    }
  };


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError('Password must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and only _ or @ as special characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleRePasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!validatePassword(value)) {
      setConformPasswordError('Password must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and only _ or @ as special characters.');
    } else {
      setConformPasswordError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };


  // Effect to check if the button should be enabled
  useEffect(() => {
    // Check if both fields are valid and match
    if (validatePassword(Password) && Password === ConfirmPassword && !passwordError && !conformPasswordError) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [Password, ConfirmPassword, passwordError, conformPasswordError]);




  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation or submission logic here
    console.log('Form submitted with:', formData);
  };

  return (
    <Container className="mt-5 formcontainer">
      <Form onSubmit={handleSubmit}>
        <h3>Register Form</h3>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={UserName}
            onChange={handleUnameChange}
            required
          />
        </Form.Group>
        <div className='errormsg'>
        {usernameError && <span style={{ color: 'red' }}>{usernameError}</span>}
        </div>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={Email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <div className='errormsg'>
        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
        </div>

        <Form.Group controlId="formUserFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            name="fullname"
            value={UserFullName}
            onChange={handleFullNameChange}
            required
          />
        </Form.Group>

        <div className='errormsg'>
        {fullNameError && <span style={{ color: 'red' }}>{fullNameError}</span>}
        </div>


        <Form.Group controlId="formUserDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={UserDateOfBirth}
            // onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserMobileNo">
          <Form.Label>Mobile No </Form.Label>
          <Form.Control
            type="tel"
            name="mobileNo"
            value={UserMobileNo}
            onChange={handleMobileNoChange}
            required
          />
        </Form.Group>
        <div className='errormsg'>
        {mobileNumberError && <span style={{ color: 'red' }}>{mobileNumberError}</span>}
        </div>

        <Form.Group controlId="formUserProfilePic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="profilePic"
            value={UserProfilePic}
            // onChange={handleChange}
            required
          />
        </Form.Group>

        <div class="form-group">
        <label for="gender">Gender:</label><br/>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="male" name="gender" value="male"/>
          <label class="form-check-label" for="male">Male</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="female" name="gender" value="female"/>
          <label class="form-check-label" for="female">Female</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="transgender" name="gender" value="transgender"/>
          <label class="form-check-label" for="transgender">Transgender</label>
        </div>
        </div>
        <div class="form-group">
        <label for="gender">Select:</label><br/>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="male" name="gender" value="male"/>
          <label class="form-check-label" for="male">Player</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="female" name="gender" value="female"/>
          <label class="form-check-label" for="female">Turf Owner</label>
        </div>
        <div class="form-check form-check-inline">
        </div>
        </div>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={Password}
            onChange={handlePasswordChange}
            minLength={8}
            required
          />
        </Form.Group>
        <div className='errormsg'>
        {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
        </div>
      

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={ConfirmPassword}
            onChange={handleRePasswordChange}
            minLength={8}
            required
          />

<div className='errormsg'>
        {conformPasswordError && <span style={{ color: 'red' }}>{conformPasswordError}</span>}
        </div>
      

        </Form.Group>
        <div class="d-grid mt-4">
        <Button className="btn btn-primary" disabled={!isButtonEnabled} variant="primary" type="submit">
          Register
        </Button>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterForm;
