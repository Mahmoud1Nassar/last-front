import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

export default function ProfilePage() {
  const [user, setUser] = useState({
    userEmail: '',
    oldPassword: '',
    newPassword: '',
    userPhone: '',
    name: '',
  });

  const token = useSelector((state) => state.auth.token);

  const getUserIdFromToken = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  };

  const userId = getUserIdFromToken(token);

  useEffect(() => {
    if (userId && token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5236/api/Student/GetStudentById?Id=${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser({
              userEmail: data.email,
              userPhone: data.phoneNumber,
              name: data.userName,
              oldPassword: '',
              newPassword: '',
            });
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const sentData = {
      userPhone: user.userPhone,
      newPassword: user.newPassword,
      oldPassword: user.oldPassword,
      userEmail: user.userEmail,
    };
    try {
      const response = await fetch(
        `http://localhost:5236/api/Student/EditStudentProfile?email=${user.userEmail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sentData),
        }
      );
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '15px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        width: '700px',
        backgroundColor: '#ffffff',
        marginTop: '10px',
        marginLeft: '300px',
        height: '720px',
      }}
    >
      <MDBCard style={{marginTop:'70px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <MDBCardBody>
          <Avatar size={150} style={{marginTop:'0px'}} icon={<UserOutlined />} />
          <p style={{ color: '#555', marginTop: '10px',marginLeft:'40px',height:'8px' }}>{user.name}</p>
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
          <h3 style={{ textAlign: 'center', color: '#333' }}>Edit Profile</h3>
          <div style={{ width: '100%' }}>
            <label htmlFor="userEmail" style={labelStyle}>
              Email
            </label>
            <MDBInput
              style={inputStyle}
              type="email"
              id="userEmail"
              name="userEmail"
              value={user.userEmail}
              readOnly
            />
          </div>
          <div style={{ width: '100%' }}>
            <label htmlFor="oldPassword" style={labelStyle}>
              Old Password
            </label>
            <MDBInput
              style={inputStyle}
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter old password"
              value={user.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label htmlFor="newPassword" style={labelStyle}>
              New Password
            </label>
            <MDBInput
              style={inputStyle}
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={user.newPassword}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '100%' }}>
            <label htmlFor="userPhone" style={labelStyle}>
              Phone Number
            </label>
            <MDBInput
              style={inputStyle}
              type="tel"
              id="userPhone"
              name="userPhone"
              value={user.userPhone}
              onChange={handleChange}
            />
          </div>
          <MDBBtn
            style={{
              display: 'block',
              backgroundColor: '#3498DB',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              marginBottom:'50px'
            }}
            onClick={handleSubmit}
          >
            Update Profile
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '14px',
  color: '#555',
};

const inputStyle = {
  marginBottom: '15px',
  border: '1px solid #d0d3d4',
  borderRadius: '5px',
  width: '250px',
  padding: '10px',
};
