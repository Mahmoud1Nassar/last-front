import React from 'react';
import logo from '../assets/img/MASARLOGO.png';
import { IonIcon } from '@ionic/react';  // If using React Ionicons
import { logoFacebook, logoTwitter, logoLinkedin } from 'ionicons/icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Top Section */}
        <div className="footer-top section">
          
          {/* Brand Section */}
          <div className="footer-brand">
            <a href="#home" className="logo">
              <img src={logo} width="129" height="40" alt="University Bus Services logo" />
            </a>
            <p className="footer-text">
              Your trusted transportation partner for campus commuting.
            </p>
          </div>

          {/* Social Links */}
          <ul className="footer-list">
            <li><p className="h5">Follow Us</p></li>
            <li className="footer-list-item">
              <IonIcon icon={logoFacebook} aria-hidden="true" />
              <a href="#" className="footer-link hover:underline">Facebook</a>
            </li>
            <li className="footer-list-item">
              <IonIcon icon={logoTwitter} aria-hidden="true" />
              <a href="#" className="footer-link hover:underline">Twitter</a>
            </li>
            <li className="footer-list-item">
            <IonIcon icon={logoLinkedin} aria-hidden="true" />
            <a href="#" className="footer-link hover:underline">LinkedIn</a>
            </li>
          </ul>

          {/* About Section */}
          <ul className="footer-list">
            <li><p className="h5">About Us</p></li>
            <li><a href="#" className="footer-link hover:underline">Our Story</a></li>
            <li><a href="#" className="footer-link hover:underline">Campus Routes</a></li>
            <li><a href="#" className="footer-link hover:underline">Safety Guidelines</a></li>
            <li><a href="#" className="footer-link hover:underline">FAQs</a></li>
          </ul>

          {/* Services Section */}
          <ul className="footer-list">
            <li><p className="h5">Services</p></li>
            <li><a href="#" className="footer-link hover:underline">Bus Timetable</a></li>
            <li><a href="#" className="footer-link hover:underline">Route Maps</a></li>
            <li><a href="#" className="footer-link hover:underline">Emergency Contact</a></li>
            <li><a href="#" className="footer-link hover:underline">Bus Tracking</a></li>
          </ul>

          {/* Contact Section */}
          <ul className="footer-list">
            <li><p className="h5">Contact</p></li>
            <li><a href="#" className="footer-link hover:underline">Support</a></li>
            <li><a href="#" className="footer-link hover:underline">Lost & Found</a></li>
            <li><a href="#" className="footer-link hover:underline">Report Issue</a></li>
            <li><a href="#" className="footer-link hover:underline">Feedback</a></li>
          </ul>
          
        </div>

        {/* Footer Bottom Section */}
        <div className="section footer-bottom">
          <p className="copyright">
            &copy; LTUC 2024. Powered by <a href="#" className="copyright-link hover:underline">MasarTeam</a>.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
