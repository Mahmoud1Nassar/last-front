import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AdminDashboard.css";
import CreateBus from "../Bus/CreateBus.js";
import CreateDriver from "../CreateDriver/CreateDriver.js";
import CreateRoute from "../CreateRoute/CreateRoute.js";
import CreateSchedule from "../CreateSchedule/CreateSchedule.js";
import CreateAnnouncement from "../CreateAnnouncement/CreateAnnouncement.js";

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
        const response = await fetch("https://localhost:7032/api/admin/dashboard", {
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
        url = "https://localhost:7032/api/Admin/getAllDriversByAdmin";
        break;
      case "Maintenances":
        url = "https://localhost:7032/api/Admin/GetAllMaintenanceRequestsByAdmin";
        break;
      case "Routes":
        url = "https://localhost:7032/api/Student/getAllRoutes";
        break;
      case "Announcements":
        url = "https://localhost:7032/api/Admin/ViewAllAnnouncementForAdmin";
        break;
      case "Buses":
        url = "https://localhost:7032/api/Buses/GetAllBuses";
        break;
      case "Schedule":
        url = "https://localhost:7032/api/Student/getAllSchedules";
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
  const handleApproveMaintenance = async (request) => {
    const ifApprove = true; // Assuming we always approve
    const url = `https://localhost:7032/api/Admin/ApprovedMaintenanceRequestByAdmin?ifApprove=${ifApprove}`;
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
          </tr>
        </thead>
        <tbody>
          {detailedData.map((driver, index) => (
            <tr key={driver.id}>
              <td>{index + 1}</td>
              <td>{driver.userName}</td>
              <td>{driver.email}</td>
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
          {detailedData.map((request, index) => (
            <tr key={request.busId}>
              <td>{index + 1}</td>
              <td>{request.busId}</td>
              <td>{request.driverName}</td>
              <td>{request.capacityNumber}</td>
              <td>{request.currentLocation}</td>
              <td>{request.status}</td>
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
          {detailedData.map((request, index) => (
            <tr key={request.routeName}>
              <td>{index + 1}</td>
              <td>{request.routeName}</td>
              <td>{request.startPoint}</td>
              <td>{request.endPoint}</td>
              <td>{request.totalDistance} Km</td>
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
          {detailedData.map((request, index) => (
            <tr key={request.Announcements}>
              <td>{index + 1}</td>
              <td>{request.title}</td>
              <td>{request.audience}</td>
              <td>{request.content}</td>
              <td>{new Date(request.createdTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
   else if (selectedSection === "Schedule") {
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
                <td>{new Date(schedule.estimatedTime).toLocaleString()}</td>
                <td>{schedule.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <p>No data available for this section.</p>;
  };

  return (
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
              {selectedSection !== "Maintenances" && !showCreateForm && (
               <button className="create-button" onClick={openCreateForm}>
                Create New {selectedSection}
               </button>
                   )}
              </div>


            {!showCreateForm ? (
              <>{loading ? <p>Loading...</p> : renderTable()}</>
            ) : (
              renderCreateForm()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;