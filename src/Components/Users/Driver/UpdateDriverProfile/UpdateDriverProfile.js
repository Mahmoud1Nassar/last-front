import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { UserOutlined } from '@ant-design/icons';
import { MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import PasswordChangeModal from './PasswordChangeModal.js';
import { useNavigate } from 'react-router-dom';

export default function UpdateDriverProfile() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  // Extracting driverId and userEmail from the token
  const decodedToken = token ? jwtDecode(token) : {};
  const driverId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || '';
  const userEmail = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || '';

  const [profileData, setProfileData] = useState({
    driverId: driverId,
    licenseNumber: '',
    busId: '',
    status: 'Active',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:5236/api/Driver/UpdateDriverProfile?email=${userEmail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            driverId: profileData.driverId,
            licenseNumber: Number(profileData.licenseNumber),
            busId: profileData.busId,
            status: profileData.status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (oldPassword, newPassword) => {
    try {
      const response = await fetch(
        `http://localhost:5236/api/Users/ChangePassword?newPassword=${newPassword}&oldPassword=${oldPassword}&userId=${driverId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      alert('Password changed successfully!');
      toggleModal();
    } catch (error) {
      alert(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <>
      <div
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '15px',
          paddingTop: '10px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          width: '700px',
          backgroundColor: '#ffffff',
          marginTop: '0px',
          marginLeft: '300px',
          height: '720px',
        }}
      >
        <MDBCard
          style={{
            marginBottom: '20px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <MDBCardBody>
            <Avatar size={150} icon={<UserOutlined />} />
            <p style={{ color: '#555', marginTop: '10px' }}>{driverName}</p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard
          style={{
            paddingLeft: '220px',
            width: '100%',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
          }}
        >
          <MDBCardBody
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333',
              }}
            >
              Edit Profile
            </h3>
            {errorMessage && (
              <div style={{ color: 'red', marginBottom: '15px' }}>
                {errorMessage}
              </div>
            )}
            <div style={{ width: '100%' }}>
              <label
                htmlFor="licenseNumber"
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#555',
                }}
              >
                License Number
              </label>
              <MDBInput
                style={{
                  marginBottom: '15px',
                  border: '1px solid #d0d3d4',
                  borderRadius: '5px',
                  width: '250px',
                  padding: '10px',
                }}
                type="number"
                id="licenseNumber"
                name="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    licenseNumber: e.target.value,
                  })
                }
              />
            </div>
            <div style={{ width: '100%' }}>
              <label
                htmlFor="busId"
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#555',
                }}
              >
                Bus ID
              </label>
              <MDBInput
                style={{ marginBottom: '15px' }}
                type="text"
                id="busId"
                name="busId"
                value={profileData.busId}
                onChange={(e) =>
                  setProfileData({ ...profileData, busId: e.target.value })
                }
              />
            </div>
            <MDBBtn
              style={{
                display: 'block',
                margin: '20px auto',
                backgroundColor: '#3498DB',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
              }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Profile'}
            </MDBBtn>
            <span
              style={{
                color: '#007bff',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'block',
              }}
              onClick={toggleModal}
            >
              Change Password
            </span>
          </MDBCardBody>
        </MDBCard>
      </div>
      <PasswordChangeModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handlePasswordChange={handlePasswordChange}
      />
    </>
  );
}
