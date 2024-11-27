import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Include any styles
import logo from '../../Assets/img/MASARLOGO.png'; // Import the logo
import { IonIcon } from '@ionic/react'; // If using React Ionicons
import { searchOutline } from 'ionicons/icons'; // Import specific icon
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; // Redux hooks
import { logout } from '../../Registration/Login/authSlice.js'; // Import the logout action
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Access token and role from Redux store
  const { token } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.role);
  // State hooks for navbar, search, and dropdown menu
  const [navbarActive, setNavbarActive] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [Name, SetName] = useState("");
  useEffect(() => {
    // Decode token and set the name
    const name = getUserInfoFromToken(token);
    SetName(name);
  }, [token]); // Runs when the token changes
  const getUserInfoFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  // Toggle the navbar visibility
  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };
  // Close the navbar when a link is clicked
  const closeNavbar = () => {
    setNavbarActive(false);
  };
  // Toggle the search bar visibility
  const toggleSearchBar = () => {
    setSearchBarActive(!searchBarActive);
    setOverlayActive(!overlayActive);
    document.body.classList.toggle('active'); // For body background change
  };
  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to Redux
    navigate('/'); // Redirect to the homepage
  };
  const handleDashboard = () => {
    if (role === 'Admin') {
      navigate('/AdminDashboard'); // Redirect to the Admin dashboard
    } else if (role === 'Driver') {
      navigate('/DriverAnnouncement'); // Redirect to Driver dashboard
    } else if (role === 'Student') {
      navigate('/StudentAnnouncement'); // Redirect to Student dashboard
    }
  };
  // Navigate to Profile
  const handleProfile = () => {
    if (role === 'Admin' || role == 'Student') {
      navigate('/EditProfile'); // Redirect to the Admin dashboard
    } else if (role === 'Driver') {
      navigate('/UpdateDriverProfile'); // Redirect to Driver dashboard
    }
  };
  // Toggle dropdown menu
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  return (
    <header className="header section" data-header>
      <div className="container" style={{ marginBottom: '0px' }}>
        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src={logo}
            width="129"
            height="40"
            alt="MasarTeam logo"
          />
        </Link>
        {/* Navigation */}
        <nav className={`navbar ${navbarActive ? 'active' : ''}`} data-navbar>
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link hover:underline" data-nav-link onClick={closeNavbar}>
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <a href="#services" className="navbar-link hover:underline" data-nav-link onClick={closeNavbar}>
                Services
              </a>
            </li>
            <li className="navbar-item">
              <a href="#aboutUs" className="navbar-link hover:underline" data-nav-link onClick={closeNavbar}>
                About Us
              </a>
            </li>
          </ul>
        </nav>
        {/* Buttons Section */}
        <div className="wrapper">
          <button
            className="search-btn"
            aria-label="search"
            data-search-toggler
          >
            <IonIcon icon={searchOutline} aria-hidden="true" />
            <span className="span">Search</span>
          </button>
        </div>
        {token ? (
          <div className="account">
            <div
              className="profile"
              onClick={toggleMenu}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              {Name ? Name.charAt(0).toUpperCase() : 'U'} {/* Show the first letter or a default 'U' */}
            </div>
            <div className="menu">
              {menuActive && ( // Conditionally render the dropdown menu
                <div className="dropdown-menu" style={{ width: '225px', backgroundColor: 'white' }}>
                  <h4 style={{ paddingLeft: '15px' }}>Welcome {Name || "User"}</h4> {/* Fallback to "User" if Name is empty */}
                  <ul>
                    <li>
                      <button onClick={handleDashboard}>Dashboard</button>
                    </li>
                    <li>
                      <button onClick={handleProfile}>Profile</button>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/Login" className="btn" style={{ marginLeft: '10px' }}>
            Login
          </Link>
        )}
      </div>
      {/* Search bar and overlay */}
      {searchBarActive && (
        <div className={`search-bar ${searchBarActive ? 'active' : ''}`} data-search-bar>
          <input type="text" placeholder="Search..." />
        </div>
      )}
      {overlayActive && <div className="overlay" data-overlay onClick={toggleSearchBar}></div>}
    </header>
  );
};
export default Navbar;