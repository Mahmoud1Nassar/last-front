import React, { useEffect, useState, useCallback } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import PasswordChangeModal from './PasswordChangeModal.js';
import { useNavigate } from 'react-router-dom';

export default function UpdateDriverProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    driverId: '',
    licenseNumber: '',
    busId: '',
    status: '',
  });
  const token = useSelector((state) => state.auth.token);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [driverName, setDriverName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = async () => {
    // Submit logic here
  };

  const handlePasswordChange = async (oldPassword, newPassword) => {
    // Password change logic here
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <MDBCard style={{ marginBottom: '20px', padding: '30px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <MDBCardBody>
            <Avatar size={150} icon={<UserOutlined />} />
            <p style={{ color: '#555', marginTop: '10px' }}>{driverName}</p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard style={{ padding: '20px', width: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
          <MDBCardBody>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Edit Profile</h3>
            {errorMessage && <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>}
            <MDBInput
              style={{ marginBottom: '15px' }}
              type="number"
              id="licenseNumber"
              name="licenseNumber"
              label="License Number"
              value={profileData.licenseNumber}
              onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
            />
            <MDBInput
              style={{ marginBottom: '15px' }}
              type="text"
              id="busId"
              name="busId"
              label="Bus ID"
              value={profileData.busId}
              onChange={(e) => setProfileData({ ...profileData, busId: e.target.value })}
            />
            <MDBInput
              style={{ marginBottom: '15px' }}
              type="text"
              id="status"
              name="status"
              label="Status"
              value={profileData.status}
              onChange={(e) => setProfileData({ ...profileData, status: e.target.value })}
            />
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
              style={{ color: '#007bff', cursor: 'pointer', textAlign: 'center', display: 'block' }}
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
    </div>
  );
}
