import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AdminDashboard.css";
import CreateBus from "../Bus/CreateBus.js";
import CreateDriver from "../CreateDriver/CreateDriver.js";
import CreateRoute from "../CreateRoute/CreateRoute.js";
import CreateSchedule from "../CreateSchedule/CreateSchedule.js";
import CreateAnnouncement from "../CreateAnnouncement/CreateAnnouncement.js";
import AllBusesLocations from "../AllBusesLocations/AllBusesLocations.js"

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    Drivers: 0,
    Maintenances: 0,
    Buses: 0,
    Routes: 0,
    Announcements: 0,
    Schedule: 0,
  });

  const [selectedSection, setSelectedSection] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError("No token found");
        return;
      }
      try {
        const response = await fetch("http://localhost:5236/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`},
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setDashboardData({
          Drivers: data.drivers,
          Maintenances: data.maintenances,
          Buses: data.buses,
          Routes: data.routes,
          Announcements: data.announcement,
          Schedule: data.schedule || 0, // Safeguard for missing schedule count
        });
      } catch (error) {
        setError("Failed to fetch dashboard data.");
        console.error("Dashboard Error:", error);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Fetch data based on the selected card
  const fetchData = async (section) => {
    setLoading(true);
    setError(null);

    let url = "";
    switch (section) {
      case "Drivers":
        url = "http://localhost:5236/api/Admin/getAllDriversByAdmin";
        break;
      case "Maintenances":
        url = "http://localhost:5236/api/Admin/GetAllMaintenanceRequestsByAdmin";
        break;
      case "Routes":
        url = "http://localhost:5236/api/Student/getAllRoutes";
        break;
      case "Announcements":
        url = "http://localhost:5236/api/Admin/ViewAllAnnouncementForAdmin";
        break;
      case "Buses":
        url = "http://localhost:5236/api/Buses/GetAllBuses";
        break;
      case "Schedule":
        url = "http://localhost:5236/api/Student/getAllSchedules";
        break;
      default:
        setError("Fetching data for this section is not implemented yet.");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const detailedItems = data.$values || data; // Normalize data
      setDetailedData(detailedItems);

      // Update dashboard count for the section dynamically
      setDashboardData((prev) => ({
        ...prev,
        [section]: detailedItems.length, // Calculate count dynamically
      }));
    } catch (error) {
      setError(`Failed to fetch data for ${section}.`);
      console.error(`${section} Error:, error`);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (section) => {
    setSelectedSection(section);
    fetchData(section);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowCreateForm(false);
    setSelectedSection(null);
    setDetailedData([]);
    setError(null);
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
  };

  // Render the creation form dynamically based on the selected section
  const renderCreateForm = () => {
    switch (selectedSection) {
      case "Drivers":
        return <CreateDriver />;
      case "Buses":
        return <CreateBus />;
      case "Routes":
        return <CreateRoute />;
      case "Announcements":
        return <CreateAnnouncement />;
      case "Schedule":
        return <CreateSchedule />;
      default:
        return <p>No form available for this section.</p>;
    }
  };

  const handleDeleteDriver = (email) => {
    const url = `http://localhost:5236/api/Admin/DeleteDriverByAdmin?email=${email}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Driver deleted successfully");
          return;
        }
        return response.text().then((errorText) => {
          try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || "Failed to delete driver");
          } catch {
            throw new Error(errorText || "Failed to delete driver");
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleApproveMaintenance = async (request) => {
    const ifApprove = true; // Assuming we always approve
    const url = `http://localhost:5236/api/Admin/ApprovedMaintenanceRequestByAdmin?ifApprove=${ifApprove}`;
    const body = {
      driverId: request.driverId,
      busId: request.busId,
      requestDate: request.requestDate,
      description: request.description,
      status: "Approved",
      expectedMaintenanceDays: request.expectedMaintenanceDays,
    };
  
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      // Update the status in the UI
      setDetailedData((prev) =>
        prev.map((item) =>
          item.maintenanceId === request.maintenanceId
            ? { ...item, status: "Approved" }
            : item
        )
      );
      alert("Maintenance request approved successfully!");
    } catch (error) {
      console.error("Approve Maintenance Error:", error);
      alert("Failed to approve maintenance request.");
    } finally {
      setLoading(false);
    }
  };

  // Render the table for selected section details
// Render the table for selected section details
const renderTable = () => {
  if (selectedSection === "Drivers") {
    return (
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
            {detailedData.map((driver, index) => (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.userName}</td>
                <td>{driver.email}</td>
                <td>
                  <button
                    onClick={() => handleDeleteDriver(driver.email)}
                    className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    );
  } else if (selectedSection === "Maintenances") {
    return (
      <table className="requests-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Bus ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Expected Days</th>
            <th>Request Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {detailedData.map((request, index) => (
            <tr key={request.maintenanceId}>
              <td>{index + 1}</td>
              <td>{request.busId}</td>
              <td>{request.description}</td>
              <td>{request.status}</td>
              <td>{request.expectedMaintenanceDays}</td>
              <td>{new Date(request.requestDate).toLocaleString()}</td>
              <td>
                <button
                  className="approve-button"
                  onClick={() => handleApproveMaintenance(request)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (selectedSection === "Buses") {
    return (
      <table className="requests-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Bus ID</th>
            <th>Driver Name</th>
            <th>Capacity Number</th>
            <th>Current Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {detailedData.map((bus, index) => (
            <tr key={bus.busId}>
              <td>{index + 1}</td>
              <td>{bus.busId}</td>
              <td>{bus.driverName}</td>
              <td>{bus.capacityNumber}</td>
              <td>{bus.currentLocation}</td>
              <td>{bus.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (selectedSection === "Routes") {
    return (
      <table className="requests-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Route Name</th>
            <th>Start Point</th>
            <th>End Point</th>
            <th>Total Distance</th>
          </tr>
        </thead>
        <tbody>
          {detailedData.map((route, index) => (
            <tr key={route.routeName}>
              <td>{index + 1}</td>
              <td>{route.routeName}</td>
              <td>{route.startPoint}</td>
              <td>{route.endPoint}</td>
              <td>{route.totalDistance} Km</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (selectedSection === "Announcements") {
    return (
      <table className="requests-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Audience</th>
            <th>Content</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          {detailedData.map((announcement, index) => (
            <tr key={announcement.id}>
              <td>{index + 1}</td>
              <td>{announcement.title}</td>
              <td>{announcement.audience}</td>
              <td>{announcement.content}</td>
              <td>{new Date(announcement.createdTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (selectedSection === "Schedule") {
    return (
      <table className="requests-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Driver ID</th>
            <th>Routing ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Estimated Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {detailedData.map((schedule, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{schedule.driverId}</td>
              <td>{schedule.routingId}</td>
              <td>{new Date(schedule.startTime).toLocaleString()}</td>
              <td>{new Date(schedule.endTime).toLocaleString()}</td>
              <td>{schedule.estimatedTime}</td>
              <td>{schedule.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (selectedSection === "AllBusesLocations") {
    return <AllBusesLocations />;
  }
  return <p>No data available for this section.</p>;
};


return (
  <div>
  <div className="dashboard-container">
    <h1 className="dashboard-title">Admin Dashboard</h1>
    {error && <p className="error-message">{error}</p>}
    <div className="dashboard-cards">
      {Object.keys(dashboardData).map((key) => (
        <div key={key} className="dashboard-card" onClick={() => handleCardClick(key)}>
          <h2>Total {key}</h2>
          <p>{dashboardData[key]}</p>
        </div>
      ))}
    </div>

    {showModal && (
      <div
        className="modal-overlay"
        onClick={(e) => {
          if (e.target.className === "modal-overlay") closeModal();
        }}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>
            &times;
          </button>
          <div className="modal-header">
            <h2 className="modal-title">{selectedSection} Details</h2>
            {selectedSection === "Buses" && !showCreateForm && (
              <>
                {/* Button to open the Create Bus form */}
                <button className="create-button" onClick={openCreateForm}>
                  Create New Bus
                </button>
              </>
            )}
            {selectedSection !== "Maintenances" &&
              selectedSection !== "Buses" &&
              selectedSection !== "AllBusesLocations" &&
              !showCreateForm && (
                <button className="create-button" onClick={openCreateForm}>
                  Create New {selectedSection}
                </button>
              )}
          </div>

          <div className="modal-body">
            {/* Scrollable container for table */}
            {!showCreateForm ? (
              <div className="scrollable-table-container">
                {loading ? <p>Loading...</p> : renderTable()}
              </div>
            ) : (
              renderCreateForm()
            )}
          </div>
        </div>
      </div>
    )}
  </div><br/>
  <AllBusesLocations/>
  </div>
);
};
export default AdminDashboard;