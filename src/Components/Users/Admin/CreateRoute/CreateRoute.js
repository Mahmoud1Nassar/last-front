import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../uniForm.css';

const CreateRoute = ({ onClose }) => {
  const [routeData, setRouteData] = useState({
    routeName: '',
    startPoint: '',
    endPoint: '',
    totalDistance: '',
    estimatedHours: '', // Hours field
    estimatedMinutes: '', // Minutes field
    stopPoints: [],
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRouteData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddStopPoint = () => {
    setRouteData((prevState) => ({
      ...prevState,
      stopPoints: [...prevState.stopPoints, { name: '', time: '' }],
    }));
  };

  const handleStopPointChange = (index, field, value) => {
    const updatedStopPoints = [...routeData.stopPoints];
    updatedStopPoints[index][field] = value;
    setRouteData((prevState) => ({
      ...prevState,
      stopPoints: updatedStopPoints,
    }));
  };

  const handleRemoveStopPoint = (index) => {
    setRouteData((prevState) => ({
      ...prevState,
      stopPoints: prevState.stopPoints.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine hours and minutes to form a valid time format
      const hours = routeData.estimatedHours.padStart(2, '0'); // Ensure two digits
      const minutes = routeData.estimatedMinutes.padStart(2, '0'); // Ensure two digits
      const estimatedTime = `${hours}:${minutes}:00`;

      const formattedData = {
        ...routeData,
        estimatedTime, // Use the formatted time string
      };

      await axios.post(
        'http://localhost:5236/api/Admin/CreateRouting',
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire('Success', 'Route Created Successfully!', 'success');
      onClose(); // Close modal
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating route');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container4">
      <div className="form-card">
        <h2 className="form-title">Create Route</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="routeName">Route Name</label>
            <input
              type="text"
              id="routeName"
              name="routeName"
              value={routeData.routeName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startPoint">Start Point</label>
            <input
              type="text"
              id="startPoint"
              name="startPoint"
              value={routeData.startPoint}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endPoint">End Point</label>
            <input
              type="text"
              id="endPoint"
              name="endPoint"
              value={routeData.endPoint}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalDistance">Total Distance (km)</label>
            <input
              type="number"
              id="totalDistance"
              name="totalDistance"
              value={routeData.totalDistance}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Estimated Time</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="number"
                id="estimatedHours"
                name="estimatedHours"
                value={routeData.estimatedHours}
                onChange={handleInputChange}
                placeholder="Hours"
                min="0"
                max="23"
                style={{
                  marginRight: '5px',
                }}
                required
              />
              <span style={{ fontSize: '18px', margin: '0 5px' }}>:</span>
              <input
                type="number"
                id="estimatedMinutes"
                name="estimatedMinutes"
                value={routeData.estimatedMinutes}
                onChange={handleInputChange}
                placeholder="Minutes"
                min="0"
                max="59"
                style={{
                  marginLeft: '5px',
                }}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Stop Points</label>
            {routeData.stopPoints.map((stop, index) => (
              <div key={index} className="stop-point-row">
                <input
                  type="text"
                  placeholder="Stop Name"
                  value={stop.name}
                  onChange={(e) =>
                    handleStopPointChange(index, 'name', e.target.value)
                  }
                  required
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={stop.time}
                  onChange={(e) =>
                    handleStopPointChange(index, 'time', e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStopPoint(index)}
                  style={{fontSize: '30px', padding:'0px', color:'red', backgroundColor:'white'}}>
                  X
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddStopPoint} style={{width: '100%'}}>
              Add Stop Point
            </button>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Route'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoute;
