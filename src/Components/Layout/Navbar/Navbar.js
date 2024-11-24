import React, { useState } from 'react';
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
  const { token, role, isProfileCreated } = useSelector((state) => state.auth);

  // State hooks for navbar and search
  const [navbarActive, setNavbarActive] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

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

  return (
    <header className="header section" data-header >
      <div className="container" style={{marginBottom:'0px'}}>
        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src={logo} // Use the imported logo here
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

          <button
            className="nav-toggle-btn"
            aria-label="toggle menu"
            data-nav-toggler
            onClick={toggleNavbar}
          >
            <span className="span one"></span>
            <span className="span two"></span>
            <span className="span three"></span>
          </button>

          {token ? (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/Login" className="btn">
              Login
            </Link>
          )}
        </div>
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
