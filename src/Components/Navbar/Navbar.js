import React, { useState } from 'react';
import './Navbar.css'; // Make sure to include any styles
import logo from '../assets/img/MASARLOGO.png';  // Import the logo
import { IonIcon } from '@ionic/react';  // If using React Ionicons
import { searchOutline } from 'ionicons/icons';  // Import specific icon
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";


const Navbar = () => {
  // State hooks for toggling
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
    document.body.classList.toggle('active');  // This is for body background change
  };

  return (
    <header className="header section" data-header>
      <div className="container">
        {/* Logo */}
       
        <Link to="/" className="logo">
          <img
            src={logo}  // Use the imported logo here
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
              <a  href="#services"  className="navbar-link hover:underline" data-nav-link onClick={closeNavbar}>
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
            onClick={toggleSearchBar}
          >
            {/* Using IonIcon component for the search icon */}
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

          <Link to="/Login" className="btn">
            Join
          </Link>
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
