import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../uniForm.css'
const HandleDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    // Fetch the drivers data from the API
    useEffect(() => {
        const fetchDrivers = async () => {
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }
            try {
                const response = await fetch('http://localhost:7032/api/Admin/getAllDriversByAdmin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Check if the response is ok (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched Data:', data); // Log the raw data for debugging
                // Access the $values array inside the response
                const driversArray = data.$values;
                // Check if driversArray is valid and has data
                if (driversArray && driversArray.length > 0) {
                    setDrivers(driversArray);
                } else {
                    setError('No drivers found.');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                setError('Failed to fetch drivers.');
                setLoading(false);
            }
        };
        fetchDrivers();
    }, [token]);
    // Delete driver by email
    const handleDelete = async (email) => {
        try {
            const response = await fetch(`http://localhost:7032/api/Admin/DeleteDriverByAdmin?email=${email}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setDrivers(drivers.filter(driver => driver.email !== email));
        } catch (error) {
            console.error('Error deleting driver:', error);
            setError('Failed to delete driver.');
        }
    };
    // Show loading or error message
    if (loading) {
        return <div>Loading drivers...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="table-container">
            <table className="drivers-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Driver Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver, index) => (
                        <tr key={driver.id}>
                            <td>{index + 1}</td>
                            <td>{driver.userName}</td>
                            <td>{driver.email}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(driver.email)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default HandleDrivers;