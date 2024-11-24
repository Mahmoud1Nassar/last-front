import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";
import '../uniForm.css'

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const decodedToken = jwtDecode(token);
  const adminId =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  const email =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];
  const role =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  if (role !== "Admin") {
    return <div>Access denied: Only Admins can create announcements.</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString();
    const requestBody = {
      adminId: adminId,
      title: title,
      content: content,
      createdTime: currentTime,
      audience: audience,
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://localhost:5236/api/Admin/CreateAnnouncementByAdmin?email=${email}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: `Announcement created for ${audience}!`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/AdminDashboard");
        });
      } else {
        setError("Failed to create the announcement.");
      }
    } catch (err) {
      setError("An error occurred while creating the announcement.");
      Swal.fire({
        title: "Error!",
        text: "An error occurred while creating the announcement.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="form-container4">
      <div className="announcement-card">
        <h2 className="announcement-title">Create Announcement</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Enter the content"
              rows="2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="audience">Audience</label>
            <select
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              required
            >
              <option value="Student">Student</option>
              <option value="Driver">Driver</option>
              <option value="All">All</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateAnnouncement;