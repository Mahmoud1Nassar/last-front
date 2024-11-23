import React, { useEffect, useState } from "react";
import './AllBussesLocations.css'
import { useSelector } from "react-redux";

const AllLocations = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchAllLocations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5236/api/Buses/AllBussesLosations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching locations: ${response.status}`);
      }

      const data = await response.json();
      const buses = data.$values || [];

      const formattedLocations = buses.map((bus) => ({
        currentLocation: bus.currentLocation || "Unknown",
        routeName: bus.routeName || "Unknown",
        driver: bus.driver || "Unknown",
        busId: bus.busId || "Unknown",
      }));

      setLocations(formattedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="locations-container">
      <h1 className="locations-title">All Buses Current Locations</h1>
      <div className="locations-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="location-card skeleton">
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            ))
          : locations.map((location, index) => (
              <div key={index} className="location-card">
                <h2>{location.routeName}</h2>
                <p>
                  <strong>Current Location:</strong> <br/>{location.currentLocation}
                </p>
                <p>
                  <strong>Driver:</strong> {location.driver}
                </p>
                <p>
                  <strong>Bus ID:</strong> {location.busId}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AllLocations;
