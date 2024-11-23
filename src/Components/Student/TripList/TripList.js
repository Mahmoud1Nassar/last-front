import React, { useEffect, useState } from 'react';
import { Avatar, List, Skeleton, Typography, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import '../TripList/TripList.css';
const { Title, Text } = Typography;
const TripList = () => {
    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [selectedMenu, setSelectedMenu] = useState("Trip List");
    const [routeDetails, setRouteDetails] = useState(null);
    const [stopPoints, setStopPoints] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [profile, setProfile] = useState({});
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    useEffect(() => {
        const getUserInfoFromToken = (token) => {
            if (!token) return { email: null, studentId: null };
            try {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                return {
                    studentId: decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
                };
            } catch (error) {
                console.error('Error decoding token:', error);
                return { studentId: null };
            }
        };

        if (token) {
            const userInfo = getUserInfoFromToken(token);
            setProfile(userInfo);

            // Load favorites from local storage
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
            setFavorites(storedFavorites);

            fetchRoutes();
        }
    }, [token]);

    const fetchRoutes = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5236/api/Student/getAllRoutes', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            const routes = data.$values || [];
            setRoutes(routes);

            // Sync with local storage for initial favorite status
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
            const favoriteStatus = {};
            routes.forEach((route) => {
                favoriteStatus[route.routingId] = storedFavorites[route.routingId] || false;
            });
            setFavorites(favoriteStatus);
        } catch (error) {
            console.error('Error fetching routes:', error);
        } finally {
            setLoading(false);
        }
    };
    const toggleFavorite = async (routeId, event) => {
        event.stopPropagation();
        if (!profile.studentId) {
            message.error("User ID not found.");
            return;
        }
        try {
            const isAddingToFavorites = !favorites[routeId];
            const apiEndpoint = isAddingToFavorites
                ? "AddFavRoutForUser"
                : "RemoveFavRoutForUser";
            const response = await fetch(
                `http://localhost:5236/api/Student/${apiEndpoint}?userId=${profile.studentId}&routId=${routeId}`,
                {
                    method: isAddingToFavorites ? 'POST' : 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.ok) {
                const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
                if (isAddingToFavorites) {
                    storedFavorites[routeId] = true;
                } else {
                    delete storedFavorites[routeId];
                }
                localStorage.setItem('favorites', JSON.stringify(storedFavorites));

                // Update state
                setFavorites((prevFavorites) => ({
                    ...prevFavorites,
                    [routeId]: isAddingToFavorites,
                }));

                message.success(
                    `Route ${
                        isAddingToFavorites ? "added to" : "removed from"
                    } favorites successfully.`
                );
            } else {
                message.error("Failed to update favorites. Please try again.");
            }
        } catch (error) {
            console.error('Error updating favorite status:', error);
            message.error("An error occurred. Please try again later.");
        }
    };

    const fetchRouteDetails = async (routeId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5236/api/Admin/GetRoutingById/${routeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setRouteDetails(data);
            fetchStopPointsByRouteId(routeId);
            fetchSchedulesByRouteId(routeId);
            setSelectedMenu('Choose Trip');
        } catch (error) {
            console.error('Error fetching route details:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchStopPointsByRouteId = async (routeId) => {
        try {
            const response = await fetch(`http://localhost:5236/api/Admin/GetRoutingById/${routeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setStopPoints(data.stopPoints ? data.stopPoints.$values : []);
        } catch (error) {
            console.error('Error fetching stop points:', error);
        }
    };
    const fetchSchedulesByRouteId = async (routeId) => {
        try {
            const response = await fetch(`http://localhost:5236/api/Admin/GetSchedulesByRouteId/${routeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setSchedules(data.$values || []);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            message.error('Unable to fetch schedules. Please try again later.');
        }
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    const handleRouteClick = (route) => {
        fetchRouteDetails(route.routingId);
    };

    const goBackToList = () => {
        fetchRoutes();
    };

    const handleViewBusLocation = (driverId) => {
        navigate(`/ViewBusLocation/${driverId}`);
    };

    return (
        <div className="student-home-page">
            <div className="content-section">
                {selectedMenu === "Trip List" && !routeDetails && (
                    <div className="trip-list-section">
                        <Title level={3} className="trip-list-title">Available Trips</Title>
                        <List
                            className="trip-list"
                            loading={loading}
                            itemLayout="vertical"
                            dataSource={routes}
                            renderItem={(item) => (
                                <List.Item className="trip-list-item" onClick={() => handleRouteClick(item)}>
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://via.placeholder.com/40" alt="Route" />}
                                            title={<Text strong>{item.routeName}</Text>}
                                            description={
                                                <>
                                                    <Text type="secondary">Start Point: {item.startPoint}</Text><br />
                                                    <Text type="secondary">End Point: {item.endPoint}</Text>
                                                    <br />
                                                    <Button
                                                        onClick={(e) => toggleFavorite(item.routingId, e)}
                                                        shape="circle"
                                                        icon={
                                                            favorites[item.routingId] ? (
                                                                <HeartFilled style={{ color: 'red' }} />
                                                            ) : (
                                                                <HeartOutlined />
                                                            )
                                                        }
                                                    />
                                                </>
                                            }
                                        />
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </div>
                )}
                {routeDetails && (
                    <div className="route-details-section">
                        <Title level={3} className="rdetails">Route Details: {routeDetails.routeName}</Title>
                        <Text><strong className="SPoint">Start Point:</strong> {routeDetails.startPoint}</Text><br />
                        <Text><strong className="EPoint">End Point:</strong> {routeDetails.endPoint}</Text><br />
                        <Text><strong className="Distance">Distance:</strong> {routeDetails.totalDistance} km</Text><br />
                        <div className="stop-points-section">
                            <Title level={4} className="title-stop-points">Stop Points</Title>
                            {stopPoints.length > 0 ? (
                                <div className="stop-points-list-horizontal">
                                    {stopPoints.map((stopPoint, index) => (
                                        <div key={stopPoint.stopPointId} className="stop-point-item">
                                            <span className="value">{stopPoint?.name || 'No name available'}</span>
                                            {index < stopPoints.length - 1 && <span className="pointer">➔</span>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Text className="no-stop-points">No stop points available.</Text>
                            )}
                        </div>
                        <div className="schedules-section">
                            <Title level={4} className="titleSchedule">Schedules</Title>
                            {schedules.length > 0 ? (
                                <List
                                    className="schedules-list"
                                    itemLayout="vertical"
                                    dataSource={schedules}
                                    renderItem={(schedule) => (
                                        <List.Item key={schedule.scheduleId} className="listI2">
                                            <Text><strong className="Starttime">Start Time:</strong> {formatTime(schedule.startTime)}</Text><br />
                                            <Text><strong className="Endtime">End Time:</strong> {formatTime(schedule.endTime)}</Text><br />
                                            <Button
                                                onClick={() => handleViewBusLocation(schedule.driverId)}
                                                style={{ marginTop: '10px', backgroundColor: '#1890FF', color: 'white' }}
                                            >
                                                View Bus Location
                                            </Button>
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <Text className="noschedules">No schedules available.</Text>
                            )}
                        </div>
                        <Button
                            onClick={() => {
                                setRouteDetails(null);
                                setSelectedMenu("Trip List");
                                fetchRoutes();
                            }}
                            style={{ marginTop: '10px' }}
                            className="btu"
                        >
                            Back to Trip List
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripList;
