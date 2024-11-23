import React, { useEffect, useState } from 'react';
import { Typography, Skeleton, message, Button, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import './ViewBusLocation.css';

const { Title, Text } = Typography;

const ViewBusLocation = () => {
  const { driverId } = useParams();
  const [loading, setLoading] = useState(true);
  const [stopPoints, setStopPoints] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [routeName, setRouteName] = useState("");
  const [isTripFinished, setIsTripFinished] = useState(false);

  useEffect(() => {
    if (driverId) {
      fetchDriverData(driverId);
    }
  }, [driverId]);

  const fetchDriverData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7032/api/Buses/CurrentLocationByDriverId?driverId=${id}`
      );
  
      console.log("API Response Data:", response.data);
  
      const { currentLocation, stopPoints, routeName } = response.data;
  
      if (stopPoints?.$values && Array.isArray(stopPoints.$values)) {
        const mappedStopPoints = stopPoints.$values.map((point) => ({
          id: point.stopPointId,
          name: point.name,
          estimatedTime: point.estimatedTime,
        }));
  
        setStopPoints(mappedStopPoints);
  
        const lastStopPoint = mappedStopPoints[mappedStopPoints.length - 1]?.name;
        const firstStopPoint = mappedStopPoints[0]?.name;
  
        if (currentLocation === lastStopPoint) {
          setIsTripFinished(true);
          setCurrentLocation(firstStopPoint); // Ensure it stays at the last point.
        } else if (currentLocation === firstStopPoint) {
          setIsTripFinished(false);
          setCurrentLocation(firstStopPoint); // Reset to the first point.
          message.success("The trip has restarted from the first stop point.");
        } else {
          setIsTripFinished(false); // Trip is ongoing.
          setCurrentLocation(currentLocation);
        }
      } else {
        console.error("stopPoints is not in the expected format:", stopPoints);
        message.error("Invalid stop points data.");
      }
  
      setRouteName(routeName);
    } catch (error) {
      console.error("API Fetch Error:", error);
      message.error("Failed to fetch driver data.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="view-bus-location">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3}>{routeName} Bus Location</Title>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={() => fetchDriverData(driverId)} 
          loading={loading}
          type="primary"
        >
          Refresh
        </Button>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <div>
          {isTripFinished && (
            <Alert
              message="Trip Completed"
              description="The trip has reached its final stop. Stay safe!"
              type="success"
              showIcon
              style={{ marginBottom: '20px' }}
            />
          )}
          <Text>
            <strong>Current Location:</strong> {currentLocation || "Unknown"}
          </Text>
          <Title level={4} style={{ marginTop: '20px' }}>Stop Points</Title>
          <div className="stop-points-container">
            {stopPoints.length > 0 ? (
              stopPoints.map((stopPoint, index) => (
                <React.Fragment key={stopPoint.id}>
                  <div
                    className={`stop-point-box ${stopPoint.name === currentLocation ? 'current-location' : ''}`}
                  >
                    <Text>
                      <strong>{stopPoint.name}</strong>
                    </Text>
                    <br />
                    <Text>
                      <strong>Estimated Time:</strong> {stopPoint.estimatedTime}
                    </Text>
                  </div>
                  {index < stopPoints.length - 1 && (
                    <ArrowRightOutlined className="arrow-icon" />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Text>No stop points available.</Text>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBusLocation;
