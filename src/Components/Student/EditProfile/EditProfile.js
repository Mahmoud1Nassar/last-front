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
    name: ''
  });
  const token = useSelector((state) => state.auth.token);
  const getUserIdFromToken = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
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
      userEmail: user.userEmail
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
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
          <MDBCard style={{ marginBottom: '20px', textAlign: 'center' }}>
            <MDBCardBody>
              <Avatar size={150} icon={<UserOutlined />} />
              <p style={{ color: '#6c757d', marginTop: '10px' }}>{user.name}</p>
            </MDBCardBody>
          </MDBCard>
        </div>
        <MDBCard style={{ padding: '20px', background: '#f9f9f9' }}>
          <MDBCardBody>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Profile</h3>
            <hr />
            <MDBInput
              type="email"
              id="email"
              name="userEmail"
              value={user.userEmail}
              onChange={handleChange}
              readOnly
              style={{ marginBottom: '10px' }}
            />
            <MDBInput
              type="password"
              id="old-password"
              name="oldPassword"
              placeholder="Enter old password"
              value={user.oldPassword}
              onChange={handleChange}
              style={{ marginBottom: '10px' }}
            />
            <MDBInput
              type="password"
              id="new-password"
              name="newPassword"
              placeholder="Enter new password"
              value={user.newPassword}
              onChange={handleChange}
              style={{ marginBottom: '10px' }}
            />
            <MDBInput
              type="tel"
              id="phone"
              name="userPhone"
              value={user.userPhone}
              pattern="[1-9]{1}[0-9]{9}"
              required
              onChange={handleChange}
              style={{ marginBottom: '10px' }}
            />
            <hr />
            <div style={{ textAlign: 'center' }}>
              <MDBBtn onClick={handleSubmit} style={{ background: '#007bff', border: 'none' }}>
                Update Profile
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
}
