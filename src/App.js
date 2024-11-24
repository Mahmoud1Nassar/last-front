import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import { HelmetProvider, Helmet } from "react-helmet-async";
// Import components
import Home from './Components/Layout/Home/Home';
import Navbar from './Components/Layout/Navbar/Navbar';
import Login from './Components/Registration/Login/Login';
import EditProfile from './Components/Users/Student/EditProfile/EditProfile.js';
import TripList from './Components/Users/Student/TripList/TripList.js';
import ViewBusLocation from './Components/Users/Student/ViewBusLocation/ViewBusLocation.js';
import StudentAnnouncement from './Components/Users/Student/StudentAnnouncement/StudentAnnouncement.js';
import CreateProfile from './Components/Users/Driver/CreateProfile/CreateProfile.js';
import UpdateDriverProfile from './Components/Users/Driver/UpdateDriverProfile/UpdateDriverProfile.js';
import CreateDriver from './Components/Users/Admin/CreateDriver/CreateDriver.js';
import DriverAnnouncement from './Components/Users/Driver/DriverAnnouncement/DriverAnnouncement.js';
import UpdateLocationFromDriver from './Components/Users/Driver/UpdateLocationFromDriver/UpdateLocationFromDriver.js';
import CreateAnnouncement from './Components/Users/Admin/CreateAnnouncement/CreateAnnouncement.js';
import DriverMaintenanceRequest from './Components/Users/Driver/DriverMaintenanceRequest/DriverMaintenanceRequest.js';
import HandleDrivers from './Components/Users/Admin/HandleDrivers/HandleDrivers.js';
import CreateBus from './Components/Users/Admin/Bus/CreateBus.js';
import CreateSchedule from './Components/Users/Admin/CreateSchedule/CreateSchedule.js';
import CreateRoute from './Components/Users/Admin/CreateRoute/CreateRoute.js';
import AdminDashboard from './Components/Users/Admin/AdminDashboard/AdminDashboard.js';
import VerticalMenu from './Components/Layout/VerticalMenu/VerticalMenu';
import FavList from './Components/Users/Student/FavList/FavList.js'
import SignUp from "./Components/Registration/SignUp/SignUp.js";
import AllBussesLosations from './Components/Users/Admin/AllBussesLocations/AllBussesLocations.js';
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
    </Router>
    </HelmetProvider>
  );
}
function MainContent({ isAuthenticated, setLoggedIn }) {
  const location = useLocation();
  const hideMenuRoutes = ['/', '/CreateProfile', '/Login', '/SignUp', '/AdminDashboard'];
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
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AllBussesLosations" element={<AllBussesLosations />} />
        </Routes>
      </div>
    </>
  );
}
export default App;