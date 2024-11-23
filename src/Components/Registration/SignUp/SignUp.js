import React, { useState } from "react";
import "../SignUp/SignUp.css";
import person from '../../Assets/img/Person.png';
import mperson from '../../Assets/img/mPerson.png';
import bPerson from '../../Assets/img/bPerson.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    gender: '',
    email: '',
    password: '',
    phone: '+962 ',
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "phoneNumber") {
      // Remove any non-numeric characters except the `+` sign
      const formattedValue = value.replace(/[^\d]/g, "");

      // Check if the value starts with '962' (excluding '+')
      if (formattedValue.startsWith("962") || formattedValue === "") {
        const newPhone = formattedValue.length <= 12 ? formattedValue : formattedValue.slice(0, 12);
        setFormData((prevState) => ({
          ...prevState,
          phoneNumber: newPhone.slice(3), // Only store the part after "962"
          phone: `+962 ${newPhone.slice(3)}`, // Always prefix with "+962 " and space
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, phoneNumber, email, password, phone, gender } = formData;

    if (!phoneNumber || !userName || !email || !password || !phone || !gender) {
      setError("All fields are required.");
      return;
    }

    const signUpData = {
      userType: "Student",
      userName: userName,
      userEmail: email,
      phone: phone.replace(/\s/g, ''), // Remove spaces for backend submission
      password,
      roles: ["Student"],
    };

    try {
      await axios.post('http://localhost:5236/api/Student/StudentRigester', signUpData);
      // Successfully registered, navigate to login page
      navigate('/Login');
    } catch (error) {
      setError("Sign up error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-forms-container">
        <div className="signform-container">
          <div className="board">
            <div className="board-back">
              <div className="board-details">
                <h1>Create a new<br />account.</h1>
                <p>Start your journey to a more convenient and efficient campus experience with our reliable bus services. Sign up today and enjoy hassle-free transportation to your university!</p>
                <div className="review-card-position active">
                  <div className="review-card">
                    <div className="review-card-details">
                      <p>Joining the bus service made my university commute hassle-free.</p>
                      <div className="person-image">
                        <img src={person} alt="Person" />
                        <div>
                          <p>James Anderson</p>
                          <h5>Student Commuter</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="review-card-position">
                  <div className="review-card">
                    <div className="review-card-details">
                      <p>I absolutely love this website! The workout programs are challenging yet rewarding.</p>
                      <div className="person-image">
                        <img src={mperson} alt="Person" />
                        <div>
                          <p>Emily Johnson</p>
                          <h5>Fitness Trainer</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="review-card-position">
                  <div className="review-card">
                    <div className="review-card-details">
                      <p>I've tried many wellness websites, but this one stands out.</p>
                      <div className="person-image">
                        <img src={bPerson} alt="Person" />
                        <div>
                          <p>Olivia Davis</p>
                          <h5>Sports Coach</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="centersignform">
          <form id="signupForm" onSubmit={handleSubmit}>
            <h2>Get started</h2>
            <p className="alamlink">
              Already a member?
              <a href="#" id="showLoginFormLink" onClick={(e) => {
                e.preventDefault();
                navigate('/Login');
              }}>
                Log in
              </a>
            </p>

            {error && <div className="error-message">{error}</div>}
            <div className="signflhorizontal">
              <div>
                <label htmlFor="userName" id="lablemargin">User Name</label>
                <input
                  type="text"
                  id="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" id="lablemargin">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={formData.phone} // Always display full phone number with space
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" id="lablemargin">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" id="lablemargin">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
