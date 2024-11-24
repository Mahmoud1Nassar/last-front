import React from 'react';
import logo from '../../Assets/img/MASARLOGO.png';
import { IonIcon } from '@ionic/react'; // If using React Ionicons
import { logoFacebook, mailOutline, logoLinkedin } from 'ionicons/icons';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        margin: '0',
        padding: '0', // Ensure no additional padding
        height: '160px', // Set explicit smaller height
        overflow: 'hidden', // Prevent content overflow
        paddingTop:'20px'
      }}
    >
      <div className="container" style={{ margin: '0', padding: '0' }}>
        {/* Footer Top Section */}
        <div className="footer-top section" style={{ margin: '0', padding: '0' }}>
          {/* Brand Section */}
          <div className="footer-brand" style={{ margin: '0', padding: '0',paddingLeft:'90px' }}>
            <a href="#home" className="logo">
              <img src={logo} width="129" height="20" alt="University Bus Services logo" />
            </a>
            <p className="footer-text" style={{ margin: '0', padding: '0' }}>
              Your trusted transportation partner for campus commuting.
            </p>
          </div>

          {/* Social Links */}
          <ul className="footer-list" style={{ margin: '0', padding: '0' }}>
            <li>
              <p className="h5" style={{ margin: '0' }}>Follow Us</p>
            </li>
            <li className="footer-list-item">
              <IonIcon icon={logoFacebook} aria-hidden="true" />
              <a href="#" className="footer-link hover:underline">Facebook</a>
            </li>
            <li className="footer-list-item">
              <IonIcon icon={logoLinkedin} aria-hidden="true" />
              <a href="#" className="footer-link hover:underline">LinkedIn</a>
            </li>
          </ul>

          {/* About Section */}
          <ul className="footer-list" style={{ margin: '0', padding: '0' }}>
            <li>
              <p className="h5" style={{ margin: '0' }}>About Us</p>
            </li>
            <li>
              <a href="#" className="footer-link hover:underline">Our Story</a>
            </li>
            <li>
              <a href="#" className="footer-link hover:underline">Campus Routes</a>
            </li>
          </ul>

          {/* Services Section */}
          <ul className="footer-list" style={{ margin: '0', padding: '0' }}>
            <li>
              <p className="h5" style={{ margin: '0' }}>Services</p>
            </li>
            <li>
              <a href="#" className="footer-link hover:underline">Bus Timetable</a>
            </li>
            <li>
              <a href="#" className="footer-link hover:underline">Route Maps</a>
            </li>
          </ul>

          {/* Contact Section */}
          <ul className="footer-list" style={{ margin: '0', padding: '0' }}>
            <li>
              <p className="h5" style={{ margin: '0' }}>Contact</p>
            </li>
            <li>
              <a href="#" className="footer-link hover:underline">Support</a>
            </li>
            <li>
              <a href="#" className="footer-link hover:underline">Lost & Found</a>
            </li>
          </ul>
        </div>

        {/* Footer Bottom Section */}
        <div
          style={{
            margin: '0',
            padding: '0',
            textAlign: 'center',
            overflow: 'hidden', // Prevents overflow if the height is reduced
          }}
        >
          &copy; LTUC 2024. Powered by{' '}
          <a href="#" className="copyright-link hover:underline">
            MasarTeam
          </a>
          .
        </div>
      </div>
    </footer>
  );
};

export default Footer;
