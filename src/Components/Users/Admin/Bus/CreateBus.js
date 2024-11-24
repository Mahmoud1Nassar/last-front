import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../uniForm.css';
const CreateBus = ({ onClose }) => {
  const [busData, setBusData] = useState({
    busId: '',
    plateNumber: '',
    licenseExpiry: '',
    capacityNumber: '',
    status: 'Active',
    currentLocation: 'LTUC',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'plateNumber') {
      const rawValue = value.replace(/[^a-zA-Z0-9]/g, ''); 
      const formattedValue = rawValue
        .slice(0, 2)
        .toUpperCase() +
        (rawValue.length > 2 ? '-' : '') +
        rawValue.slice(2, 7);
      setBusData((prevData) => ({
        ...prevData,
        plateNumber: formattedValue,
      }));
    } else {
      setBusData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const formattedData = {
        ...busData,
        licenseExpiry: `${busData.licenseExpiry}T00:00:00`, // Format date for API
        plateNumber: busData.plateNumber.replace('-', ''), // Remove the hyphen before sending
      };
      await axios.post(
        'http://localhost:5236/api/Buses/CreateBusByAdmin',
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Swal.fire('Success', 'Bus Created Successfully!', 'success');
      onClose();
    } catch (err) {    
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="form-container4">
      <div className="form-card">
        <h2 className="form-title">Create Bus</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="busId">Bus ID</label>
            <input
              type="text"
              id="busId"
              name="busId"
              value={busData.busId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="plateNumber">Plate Number</label>
            <input
              type="text"
              id="plateNumber"
              name="plateNumber"
              value={busData.plateNumber}
              placeholder="Enter Plate Number (XX-XXXXX)"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="licenseExpiry">License Expiry</label>
            <input
              type="date"
              id="licenseExpiry"
              name="licenseExpiry"
              value={busData.licenseExpiry}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacityNumber">Capacity</label>
            <input
              type="number"
              id="capacityNumber"
              name="capacityNumber"
              value={busData.capacityNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Bus'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateBus;