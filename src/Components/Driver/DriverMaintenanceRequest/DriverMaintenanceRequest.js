import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DriverMaintenanceRequest = () => {
  const [busId, setBusId] = useState('');
  const [maintenanceReason, setMaintenanceReason] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const [ExpectedMaintenanceDays, setExpectedMaintenanceDays] = useState('');
  const navigate = useNavigate();

  const maintenanceReasons = [
    "Engine Issue",
    "Brake Failure",
    "Tire Replacement",
    "Transmission Problem",
    "Electrical Issue",
    "Other",
  ];

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!busId || !maintenanceReason || !ExpectedMaintenanceDays) {
      Swal.fire('Error', 'Please fill in all fields.', 'error');
      return;
    }
    if (maintenanceReason === 'Other' && !otherDescription) {
      Swal.fire('Error', 'Please provide a custom description for the maintenance reason.', 'error');
      return;
    }
    if (!token) {
      Swal.fire('Error', 'User is not authenticated. Please log in again.', 'error');
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const driverId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      const userEmail = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

      if (!driverId || !userEmail) {
        Swal.fire('Error', 'Driver ID or Email not found in token. Please log in again.', 'error');
        return;
      }

      const requestData = {
        driverId,
        busId,
        requestDate: new Date().toISOString(),
        description: maintenanceReason === 'Other' ? otherDescription : maintenanceReason,
        status: "Pending",
        ExpectedMaintenanceDays,
      };

      await axios.post(
        `https://localhost:7032/api/Driver/MaintenanceRequest?email=${userEmail}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire('Success', 'Maintenance request created successfully! <br> The Admin Will Contact You Soon!', 'success');
      setBusId('');
      setMaintenanceReason('');
      setOtherDescription('');
      setExpectedMaintenanceDays('');
      navigate('/DriverAnnouncement');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to create maintenance request', 'error');
      console.error('Error creating maintenance request:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create Maintenance Request</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="busId" style={styles.label}>Bus ID:</label>
          <input
            type="text"
            id="busId"
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            placeholder="Enter Bus ID"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="ExpectedMaintenanceDays" style={styles.label}>Expected Maintenance Days:</label>
          <div style={styles.inputContainer}>
            <input
              type="text"
              id="ExpectedMaintenanceDays"
              value={ExpectedMaintenanceDays}
              onChange={(e) => setExpectedMaintenanceDays(e.target.value)}
              placeholder="Enter Expected Days"
              style={styles.input}
              required
            />
            <span style={styles.staticLabel}>Days</span>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="maintenanceReason" style={styles.label}>Maintenance Reason:</label>
          <select
            id="maintenanceReason"
            value={maintenanceReason}
            onChange={(e) => setMaintenanceReason(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select a reason</option>
            {maintenanceReasons.map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>
        {maintenanceReason === 'Other' && (
          <div style={styles.formGroup}>
            <label htmlFor="otherDescription" style={styles.label}>Other Description:</label>
            <input
              type="text"
              id="otherDescription"
              value={otherDescription}
              onChange={(e) => setOtherDescription(e.target.value)}
              placeholder="Enter a custom reason"
              style={styles.input}
              required
            />
          </div>
        )}
        <button type="submit" style={styles.button}>Submit Request</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    transition: 'transform 0.3s ease-in-out',
  },
  header: {
    fontSize: '30px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#F9F9F9',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease-in-out',
  },
  inputContainer: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
  },
  staticLabel: {
    position: 'absolute',
    right: '10px',
    color: 'gray',
    fontSize: '0.9em',
    pointerEvents: 'none',
  },
  button: {
    padding: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
};

export default DriverMaintenanceRequest;
