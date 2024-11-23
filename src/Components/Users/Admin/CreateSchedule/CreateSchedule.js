import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import "../uniForm.css";

const CreateSchedule = ({ onClose }) => {
  const [scheduleData, setScheduleData] = useState({
    driverId: "",
    routingId: "",
    startTime: "",
    endTime: "",
    status: "Pending",
  });

  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [driversResponse, routesResponse] = await Promise.all([
          axios.get("http://localhost:5236/api/Admin/getAllDriversByAdmin", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5236/api/Student/getAllRoutes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDrivers(driversResponse.data.$values || []);
        setRoutes(routesResponse.data.$values || []);
      } catch (err) {
        setError("Error fetching dropdown data");
      }
    };

    fetchDropdownData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const defaultDate = "2024-01-01";
    const payload = {
      ...scheduleData,
      startTime: `${defaultDate}T${scheduleData.startTime}:00`,
      endTime: `${defaultDate}T${scheduleData.endTime}:00`,
    };

    console.log("Sending Schedule Data:", payload);

    try {
      await axios.post(
        "http://localhost:5236/api/Admin/CreateSchedule",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success", "Schedule Created Successfully!", "success");
      onClose(); // Close modal
    } catch (err) {
      
    
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container4">
      <div className="form-card">
        <h2 className="form-title">Create Schedule</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="driverId">Driver</label>
            <select
              id="driverId"
              name="driverId"
              value={scheduleData.driverId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.userName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="routingId">Route</label>
            <select
              id="routingId"
              name="routingId"
              value={scheduleData.routingId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route.routingId} value={route.routingId}>
                  {route.routeName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={scheduleData.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={scheduleData.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={scheduleData.status}
              onChange={handleInputChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedule;
