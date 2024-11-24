import React, { useEffect, useState } from 'react';
import { Typography, Skeleton, message, Button, Alert, Modal } from 'antd';
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
  const [driverDetails, setDriverDetails] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

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

      const { currentLocation, stopPoints, routeName, driverName, phoneNumber, busId } = response.data;

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

      // Save driver details
      setDriverDetails({ driverName, phoneNumber, busId });
    } catch (error) {
      console.error("API Fetch Error:", error);
      message.error("Failed to fetch driver data.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="view-bus-location">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3}>{routeName} Bus Location</Title>
        <div>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchDriverData(driverId)}
            loading={loading}
            type="primary"
            style={{ marginRight: '10px' }}
          >
            Refresh
          </Button>
          <Button
            onClick={showModal}
            type="default"
          >
            Details
          </Button>
        </div>
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

      <Modal
        title={
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            <span style={{ display: "inline-block", position: "relative" }}>
              Driver Details
              <div
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  left: 0,
                  height: "3px",
                  width: "100%",
                  background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
                }}
              />
            </span>
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk} // Ensures "X" button closes the modal
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>
        ]}
      >
        <p><strong>Driver Name:</strong> {driverDetails.driverName || "Unknown"}</p>
        <p><strong>Phone Number:</strong> {driverDetails.phoneNumber || "Unknown"}</p>
        <p><strong>Bus ID:</strong> {driverDetails.busId || "Unknown"}</p>
      </Modal>
    </div>
  );
};

export default ViewBusLocation;
