import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import { HelmetProvider, Helmet } from "react-helmet-async";

// Import components
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import EditProfile from './Components/Student/EditProfile/EditProfile';
import TripList from './Components/Student/TripList/TripList.js';
import ViewBusLocation from './Components/Student/ViewBusLocation/ViewBusLocation.js';
import StudentAnnouncement from './Components/Student/StudentAnnouncement/StudentAnnouncement';
import CreateProfile from './Components/Driver/CreateProfile/CreateProfile';
import UpdateDriverProfile from './Components/Driver/UpdateDriverProfile/UpdateDriverProfile.js';
import CreateDriver from './Components/Admin/CreateDriver/CreateDriver';
import DriverAnnouncement from './Components/Driver/DriverAnnouncement/DriverAnnouncement';
import UpdateLocationFromDriver from './Components/Driver/UpdateLocationFromDriver/UpdateLocationFromDriver';
import CreateAnnouncement from './Components/Admin/CreateAnnouncement/CreateAnnouncement';
import DriverMaintenanceRequest from './Components/Driver/DriverMaintenanceRequest/DriverMaintenanceRequest';
import HandleDrivers from './Components/Admin/HandleDrivers/HandleDrivers';
import CreateBus from './Components/Admin/Bus/CreateBus';
import CreateSchedule from './Components/Admin/CreateSchedule/CreateSchedule';
import CreateRoute from './Components/Admin/CreateRoute/CreateRoute';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import VerticalMenu from './Components/VerticalMenu/VerticalMenu';
import FavList from './Components/Student/FavList/FavList.js'
import Register from "./Components/register/Register";
import Header from './Components/header/Header';
import AllBussesLosations from './Components/Admin/AllBussesLocations/AllBussesLocations.js'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token;
  return (
    <HelmetProvider>
    {/* Metadata using Helmet */}
    <Helmet>
    <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Masar - Hey, we’re Masar.</title>
        <meta name="title" content="Masar - Hey, we’re Masar." />
        <meta name="description" content="This is a blog html template made by codewithsadee" />
        <link rel="shortcut icon" href="../public/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Helmet>
    <Router>
      <Navbar />
      <div style={{ display: 'flex'}}>
        <MainContent isAuthenticated={isAuthenticated} setLoggedIn={setLoggedIn} />
      </div>
        <Footer />
    </Router>
    </HelmetProvider>
  );
}
function MainContent({ isAuthenticated, setLoggedIn }) {
  const location = useLocation();
  const hideMenuRoutes = ['/', '/CreateProfile', '/Login', '/Register'];
  const shouldHideMenu = hideMenuRoutes.includes(location.pathname);
  // Determine if the current page is Home
  const isHomePage = location.pathname === '/' &&  location.pathname === '/Login' ;
  return (
    <>
      {/* Show VerticalMenu only if authenticated and not on hideMenuRoutes */}
      {isAuthenticated && !shouldHideMenu ? <VerticalMenu /> : null}
      {/* Main content area */}
      <div style={isHomePage ? null : { flex: 1, padding: '20px' }}>
        <Routes>
        <Route path="/" element={<><Header /><Home /></>} />

          <Route path="/" element={<Home />} />
          <Route path="/CreateSchedule" element={<CreateSchedule />} />
          <Route path="/CreateProfile" element={<CreateProfile />} />
          <Route path="/CreateDriver" element={<CreateDriver />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/UpdateDriverProfile" element={<UpdateDriverProfile />} />
          <Route path="/TripList" element={<TripList />} />
          <Route path="/CreateBus" element={<CreateBus />} />
          <Route path="/HandleDrivers" element={<HandleDrivers />} />
          <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/DriverAnnouncement" element={<DriverAnnouncement />} />
          <Route path="/CreateAnnouncement" element={<CreateAnnouncement />} />
          <Route path="/DriverMaintenanceRequest" element={<DriverMaintenanceRequest />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/CreateRoute" element={<CreateRoute />} />
          <Route path="/UpdateLocationFromDriver" element={<UpdateLocationFromDriver />} />
          <Route path="/StudentAnnouncement" element={<StudentAnnouncement />} />
          <Route path="/ViewBusLocation/:driverId" element={<ViewBusLocation />} />
          <Route path="/FavList" element={<FavList />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AllBussesLosations" element={<AllBussesLosations />} />

        </Routes>
      </div>
    </>
  );
}
export default App;