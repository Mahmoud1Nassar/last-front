import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, List, message, Spin, Card } from "antd";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { jwtDecode } from 'jwt-decode';
import { ArrowRightOutlined } from '@ant-design/icons';

const UpdateLocationFromDriver = () => {
    const [stopPoints, setStopPoints] = useState([]);
    const [currentLocation, setCurrentLocation] = useState("");
    const [loading, setLoading] = useState(true);
    const [routeName, setRouteName] = useState("");
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        if (!token) {
            Swal.fire("Error", "User is not authenticated. Please log in again.", "error");
            return;
        }

        let driverId;
        try {
            const decodedToken = jwtDecode(token);
            driverId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            console.log("Driver ID:", driverId); // Log the driver ID
            if (!driverId) {
                throw new Error("Driver ID not found");
            }
        } catch (error) {
            Swal.fire("Error", "Invalid token. Please log in again.", "error");
            return;
        }

        const fetchDriverData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5236/api/Buses/CurrentLocationByDriverId?driverId=${driverId}`
                );

                console.log("API Response Data:", response.data);

                const { currentLocation, stopPoints, routeName } = response.data;
                if (stopPoints && Array.isArray(stopPoints.$values)) {
                    const mappedStopPoints = stopPoints.$values.map((point) => ({
                        id: point.stopPointId,
                        name: point.name,
                        estimatedTime: point.estimatedTime,
                        isActive: true,
                    }));

                    setStopPoints(mappedStopPoints);
                } else {
                    console.error("stopPoints is not in the expected format:", stopPoints);
                    message.error("Invalid stop points data.");
                }

                setCurrentLocation(currentLocation);
                setRouteName(routeName);
                setLoading(false);
            } catch (error) {
                console.error("API Fetch Error:", error);
                message.error("Failed to fetch driver data.");
                setLoading(false);
            }
        };

        fetchDriverData();
    }, [token]);

    // Update location for driver with confirmation
    const updateCurrentLocation = async (location) => {
        const isLastStop = stopPoints[stopPoints.length - 1].name === location;

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to set "${location}" as your current location?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, set it!",
            cancelButtonText: "No, cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const decodedToken = jwtDecode(token);
                    const driverId =
                        decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                    const response = await axios.put(
                        `http://localhost:5236/api/Buses/UpdateCurrentLocation?driverId=${driverId}&currentLocation=${location}`,
                        {},
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    console.log("API Response:", response);
                    if (response.status === 200) {
                        message.success("Current location updated successfully!");

                        if (isLastStop) {
                            Swal.fire(
                                "Trip Completed!",
                                "We have finished our trip. Stay safe!",
                                "success"
                            );
                            setCurrentLocation(stopPoints[0].name); // Reset to the first stop point
                        } else {
                            setCurrentLocation(location);
                        }

                        // Update stop points without restricting previous ones
                        setStopPoints((prevStopPoints) =>
                            prevStopPoints.map((stopPoint) => ({
                                ...stopPoint,
                                isActive: true, // Enable all stop points
                            }))
                        );
                    }
                } catch (error) {
                    console.error("Update Location Error:", error.response || error);

                    if (error.response) {
                        console.error("API Response Error:", error.response.data);
                    }

                    message.error("Failed to update current location.");
                }
            } else {
                message.info("Action canceled.");
            }
        });
    };


    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <div style={{ padding: "20px", textAlign: "center",height:'600px' }}>
            <h1 style={{ color: "Blue" }}>{routeName}</h1>
            <h2>Update Current Location</h2>
            <p>
                Current Location: <strong>{currentLocation || "Not Set Yet!"}</strong>
            </p>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
                marginTop:'20px'
            }}>
                {stopPoints.map((stopPoint, index) => (
                    <React.Fragment key={stopPoint.id}>
                        <Card
                            key={stopPoint.id}
                            style={{
                                width: "250px",
                                padding: "15px",
                                textAlign: "center",
                                borderRadius: "50px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                backgroundColor: stopPoint.name === currentLocation ? "#e6f7ff" : "#f9f9f9",
                                border: stopPoint.name === currentLocation ? "2px solid #1890ff" : "none",
                            }}
                        >
                            <h3 style={{ color: stopPoint.name === currentLocation ? "#1890ff" : "black" }}>
                                {stopPoint.name}
                            </h3>
                            <Button
                                type="primary"
                                onClick={() => updateCurrentLocation(stopPoint.name)}
                                disabled={currentLocation === stopPoint.name} // Only disable the current location button
                                style={{
                                    width: "100%",
                                    backgroundColor: stopPoint.name === currentLocation ? "#1890ff" : "#0050b3",
                                    borderColor: stopPoint.name === currentLocation ? "#1890ff" : "#0050b3",
                                }}
                            >
                                {currentLocation === stopPoint.name ? "Current Location" : "Set as Current"}
                            </Button>

                            <p style={{ color: "#888", fontSize: "13px", paddingTop: "5px" }}>
                                Estimated Time<br />{stopPoint.estimatedTime}
                            </p>
                        </Card>

                        {index < stopPoints.length - 1 && (
                            <ArrowRightOutlined
                                style={{ fontSize: "30px", color: "#1890ff", alignSelf: "center", margin: "10px 0" }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default UpdateLocationFromDriver;
