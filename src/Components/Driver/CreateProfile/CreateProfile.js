import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    licenseNumber: '',
    busId: '',
    status: '',
    driverId: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getUserInfoFromToken = (token) => {
      if (!token) return { email: null, driverId: null };
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        return {
          email: decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          driverId: decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        };
      } catch (error) {
        console.error('Error decoding token:', error);
        return { email: null, driverId: null };
      }
    };

    const { email: emailFromToken, driverId: driverIdFromToken } = getUserInfoFromToken(token);
    if (emailFromToken) setEmail(emailFromToken);
    else setError('Could not retrieve email from token');
    if (driverIdFromToken) {
      setProfileData((prevData) => ({
        ...prevData,
        driverId: driverIdFromToken,
      }));
    } else {
      setError('Could not retrieve Driver ID from token');
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email || !profileData.driverId) {
      setError('Email or Driver ID is not available. Please try logging in again.');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(`https://localhost:7032/api/Driver/CreateDriverInfo?email=${email}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile created successfully');
      navigate('/DriverAnnouncement');
    } catch (err) {
      setError('Error creating profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Driver Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="licenseNumber">License Number</label>
          <input
            type="number"
            id="licenseNumber"
            name="licenseNumber"
            value={profileData.licenseNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="busId">Bus ID</label>
          <input
            type="text"
            id="busId"
            name="busId"
            value={profileData.busId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={profileData.status}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
