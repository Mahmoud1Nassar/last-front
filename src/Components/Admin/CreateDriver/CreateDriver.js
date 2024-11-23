import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../uniForm.css';

const CreateDriver = ({ onClose }) => {
  const [driverData, setDriverData] = useState({
    userName: '',
    userEmail: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        'https://localhost:7032/api/Admin/CreateDriverByAdmin',
        { ...driverData, roles: ['driver'], userType: 'driver' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire('Success', 'Driver Created Successfully!', 'success');
      onClose(); // Close modal
    } catch (err) {
     
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container4">
      <div className="form-card">
        <h2 className="form-title">Create Driver</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Driver Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={driverData.userName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userEmail">Driver Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={driverData.userEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={driverData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={driverData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Driver'}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default CreateDriver;
