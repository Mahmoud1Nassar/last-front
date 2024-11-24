import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function CreateProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    licenseNumber: '',
    licenseNumberRaw: '', // Added for unformatted license number
    busId: '',
    status: 'Active', // Default value for status
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
          driverId: decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
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
    if (name === 'licenseNumber') {
      // Remove any non-digit characters to ensure only numbers are stored
      const rawValue = value.replace(/[^0-9]/g, '');
      // Format the license number as 'XX-XXXXX'
      const formattedValue = rawValue.slice(0, 2) + (rawValue.length > 2 ? '-' : '') + rawValue.slice(2, 7);
      setProfileData({
        ...profileData,
        licenseNumber: formattedValue, // Save the formatted version for display
        licenseNumberRaw: rawValue,   // Save the unformatted version for submission
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
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
      const payload = {
        ...profileData,
        licenseNumber: profileData.licenseNumberRaw, // Send the raw license number
      };
      await axios.post(
        `http://localhost:5236/api/Driver/CreateDriverInfo?email=${email}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Swal.fire('Success', 'Profile Created Successfully!', 'success');
      navigate('/DriverAnnouncement');
    } catch (err) {
      setError('Error creating profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  const styles = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#F7F7F7',
      paddingTop: '50px',
    },
    card: {
      width: '600px',
      padding: '40px',
      marginTop: '0px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      marginLeft: '600px',
    },
    title: {
      textAlign: 'center',
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      fontSize: '18px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '18px',
    },
    error: {
      color: 'red',
      marginBottom: '15px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#3498DB',
      border: 'none',
      color: 'white',
      fontSize: '18px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#2980B9',
    },
    buttonDisabled: {
      backgroundColor: '#BDC3C7',
      cursor: 'not-allowed',
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Driver Profile</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="licenseNumber" style={styles.label}>
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={profileData.licenseNumber}
              onChange={handleInputChange}
              placeholder="Enter License Number (XX-XXXXX)"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="busId" style={styles.label}>
              Bus ID
            </label>
            <input
              type="text"
              id="busId"
              name="busId"
              value={profileData.busId}
              onChange={handleInputChange}
              placeholder="Enter Bus ID"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="status" style={styles.label}>
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={profileData.status}
              onChange={handleInputChange}
              placeholder="Enter Status"
              style={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isSubmitting ? styles.buttonDisabled : {}),
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateProfile;