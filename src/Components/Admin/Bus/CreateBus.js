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
    currentLocation: '',
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...busData,
        licenseExpiry: `${busData.licenseExpiry}T00:00:00`,
      };

      await axios.post(
        'https://localhost:7032/api/Buses/CreateBusByAdmin',
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire('Success', 'Bus Created Successfully!', 'success');
      onClose(); // Close modal
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
              type="number"
              id="plateNumber"
              name="plateNumber"
              value={busData.plateNumber}
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
          <div className="form-group">
            <label htmlFor="currentLocation">Current Location</label>
            <input
              type="text"
              id="currentLocation"
              name="currentLocation"
              value={busData.currentLocation}
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
