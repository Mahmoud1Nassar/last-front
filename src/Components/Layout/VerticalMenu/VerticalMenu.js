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

  // Update menu selection when role or selectedMenu changes
  useEffect(() => {
    if (role !== undefined) {
      setCurrentMenu(selectedMenu);
    }
  }, [selectedMenu, role]);

  // Debugging: Check role value
  console.log('Current role from Redux:', role);

  // If role is undefined, render loading state
  if (role === undefined) {
    return <div>Loading...</div>;
  }

  // Define menus for each role
  const StudentMenu = [
    { title: 'Announcement', icon: <NotificationOutlined className="menu-icon" />, path: '/StudentAnnouncement' },
    { title: 'Trip List', icon: <UnorderedListOutlined className="menu-icon" />, path: '/TripList' },
    { title: 'Favorite List', icon: <HeartOutlined className="menu-icon" />, path: '/FavList' },
    { title: 'Edit Profile', icon: <EditOutlined className="menu-icon" />, path: '/EditProfile' },
  ];

  const DriverMenu = [
    { title: 'Announcement', icon: <NotificationOutlined className="menu-icon" />, path: '/DriverAnnouncement' },
    { title: 'Ask For Maintenance', icon: <UnorderedListOutlined className="menu-icon" />, path: '/DriverMaintenanceRequest' },
    { title: 'Update Location', icon: <EnvironmentOutlined className="menu-icon" />, path: '/UpdateLocationFromDriver' },
    { title: 'Update Driver', icon: <EditOutlined className="menu-icon" />, path: '/UpdateDriverProfile' },
  ];

  const AdminMenu = [
    { title: 'Dashboard', icon: <DashboardOutlined className="menu-icon" />, path: '/AdminDashboard' },
    { title: 'Create Announcement', icon: <NotificationOutlined className="menu-icon" />, path: '/CreateAnnouncement' },
    { title: 'Create Driver', icon: <UnorderedListOutlined className="menu-icon" />, path: '/CreateDriver' },
    { title: 'Create Schedule', icon: <EnvironmentOutlined className="menu-icon" />, path: '/CreateSchedule' },
    { title: 'Create Route', icon: <EnvironmentOutlined className="menu-icon" />, path: '/CreateRoute' },
    { title: 'Create Bus', icon: <EditOutlined className="menu-icon" />, path: '/CreateBus' },
    { title: 'Drivers', icon: <EditOutlined className="menu-icon" />, path: '/HandleDrivers' },
    { title: 'All Busses Locations', icon: <EnvironmentOutlined className="menu-icon" />, path: '/AllBussesLosations' },
    { title: 'Maintenance', icon: <EnvironmentOutlined className="menu-icon" />, path: '/HandleMaintenanceRequests' },
    { title: 'Profile', icon: <EditOutlined className="menu-icon" />, path: '/EditProfile' },
  ];

  const handleClick = (e) => {
    setCurrentMenu(e.key);
    let selectedItem;

    // Determine which menu to use based on role
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
    <div  >
    <Menu
      selectedKeys={[currentMenu]}
      onClick={handleClick}
      className="vertical-menu"
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.title} style={{color:'black'}} className="menu-item" >
          {item.icon} {item.title}
        </Menu.Item>
      ))}
    </Menu>
    </div>
  );
};

export default VerticalMenu;
