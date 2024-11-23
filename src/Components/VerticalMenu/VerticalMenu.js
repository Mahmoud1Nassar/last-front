import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
  NotificationOutlined,
  UnorderedListOutlined,
  EnvironmentOutlined,
  DashboardOutlined,
  HeartOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './VerticalMenu.css';
const VerticalMenu = ({ selectedMenu = 'Announcement', onSelect }) => {
  const [currentMenu, setCurrentMenu] = useState(selectedMenu);
  const navigate = useNavigate();
  // Get user authentication status and role from Redux
  const role = useSelector((state) => state.auth.role);
  // Add a useEffect for role updates
  useEffect(() => {
    // Set the initial menu based on the role or selectedMenu
    if (role !== undefined) {
      setCurrentMenu(selectedMenu);
    }
  }, [selectedMenu, role]); // Runs when role or selectedMenu changes
  // Debugging: Check role value
  console.log('Current role from Redux:', role);
  // If role is undefined, render loading state
  if (role === undefined) {
    return <div>Loading...</div>;
  }
  // Define the menus based on the role (these hooks are called unconditionally)
  const StudentMenu = [
    { title: 'Announcement', icon: <NotificationOutlined />, path: '/StudentAnnouncement' },
    { title: 'Trip List', icon: <UnorderedListOutlined />, path: '/TripList'},
    { title: 'Favorite List', icon: <HeartOutlined />,path:'/FavList' },
    { title: 'Edit Profile', icon: <EditOutlined />, path: '/EditProfile' },
  ];
  const DriverMenu = [
    { title: 'Announcement', icon: <NotificationOutlined />, path: '/DriverAnnouncement' },
    { title: 'Ask For Maintenance', icon: <UnorderedListOutlined />, path: '/DriverMaintenanceRequest' },
    { title: 'Update Location', icon: <EnvironmentOutlined />, path: '/UpdateLocationFromDriver' },
    { title: 'Update Driver', icon: <EditOutlined />, path: '/UpdateDriverProfile' },
  ];
  const AdminMenu = [
    { title: 'Dashboard', icon: <NotificationOutlined />, path: '/AdminDashboard' },
    { title: 'Create Announcement', icon: <NotificationOutlined />, path: '/CreateAnnouncement' },
    { title: 'Create Driver', icon: <UnorderedListOutlined />, path: '/CreateDriver' },
    { title: 'Create Schedule', icon: <EnvironmentOutlined />, path: '/CreateSchedule' },
    { title: 'Create Route', icon: <EnvironmentOutlined />, path: '/CreateRoute' },
    { title: 'Create Bus', icon: <EditOutlined />, path: '/CreateBus' },
    { title: 'Drivers', icon: <EditOutlined />, path: '/HandleDrivers' },
    { title: 'AllBussesLosations', icon: <EnvironmentOutlined />, path: '/AllBussesLosations' },
    { title: 'Maintenance', icon: <EnvironmentOutlined />, path: '/HandleMaintenanceRequests' },
    { title: 'Profile', icon: <EditOutlined />, path: '/EditProfile' },
  ];
  const handleClick = (e) => {
    setCurrentMenu(e.key);
    let selectedItem;
    // Determine which menu to use based on the role
    if (role === 'Student') {
      selectedItem = StudentMenu.find((item) => item.title === e.key);
    } else if (role === 'Driver') {
      selectedItem = DriverMenu.find((item) => item.title === e.key);
    } else if (role === 'Admin') {
      selectedItem = AdminMenu.find((item) => item.title === e.key);
    }
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
    if (onSelect) {
      onSelect(e.key);
    }
  };
  // Set the appropriate menuItems based on role
  const menuItems = role === 'Student' ? StudentMenu : role === 'Driver' ? DriverMenu : AdminMenu;
  return (
    <Menu
      mode="vertical"
      selectedKeys={[currentMenu]}
      onClick={handleClick}
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.title}>
          {item.icon} {item.title}
        </Menu.Item>
      ))}
    </Menu>
  );
};
export default VerticalMenu;