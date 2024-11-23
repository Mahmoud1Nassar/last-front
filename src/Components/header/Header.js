import React, { useState } from 'react';
import './Header.css'; // Ensure the styles are available for the component
import { IonIcon } from '@ionic/react'; // Import Ionicons if needed
import { closeOutline } from 'ionicons/icons'; // Import the close icon
import author1 from '../assets/img/author-1.jpg';
import author2 from '../assets/img/author-2.jpg';
import author3 from '../assets/img/author-3.jpg';
import author4 from '../assets/img/author-4.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Header = () => {
  // State to toggle search bar visibility
  const [searchBarActive, setSearchBarActive] = useState(false);

  // Toggle the search bar visibility
  const toggleSearchBar = () => {
    setSearchBarActive(!searchBarActive);
    document.body.classList.toggle('active'); // Optional: for body background change
  };

  return (
    <header id = "home">
      {/* Overlay */}
      <div className={`overlay ${searchBarActive ? 'active' : ''}`} onClick={toggleSearchBar}></div>

      <div className="wrapper1">
        <main>
          <div className="right-col">
            <div className="card card1">
              <div className="card-details1">
                <p className="newsletter-text1">
                  Have questions or need assistance with our University Bus Service? Reach out by email <br></br>— we’re here to help and support you always!
                </p>

                <figure className="img-holder1">
                  <ul className="avatar-list absolute">
                    <li className="avatar-item">
                      <a href="#" className="avatar img-holder" style={{ '--width': '100px', '--height': '100px' }}>
                        <img src={author1} alt="Author" className="img-cover" width="100" height="100" />
                      </a>
                    </li>
                    <li className="avatar-item">
                      <a href="#" className="avatar img-holder" style={{ '--width': '100px', '--height': '100px' }}>
                        <img src={author2} alt="Author" className="img-cover" width="100" height="100" />
                      </a>
                    </li>
                    <li className="avatar-item">
                      <a href="#" className="avatar img-holder" style={{ '--width': '100px', '--height': '100px' }}>
                        <img src={author3} alt="Author" className="img-cover" width="100" height="100" />
                      </a>
                    </li>
                    <li className="avatar-item">
                      <a href="#" className="avatar img-holder" style={{ '--width': '100px', '--height': '100px' }}>
                        <img src={author4} alt="Author" className="img-cover" width="100" height="100" />
                      </a>
                    </li>
                  </ul>
                </figure>

                <div className="wrapper2">
                  <form className="newsletter-form">
                    <input type="email" name="email_address" placeholder="Your email address" className="email-field" />
                    <button type="submit" className="btn">Subscribe</button>
                  </form>
                </div>
              </div>

              <div className="card-details">
                <div>
                  <a href="#" className="product-title">Reliable Bus Service</a>
                  <p>Serving over 100 students daily</p>
                </div>
                <p className="product-price">100+</p>
              </div>
            </div>

            <div className="card card2">
              <div className="rating-box">
                <div className="stars">
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                </div>
              </div>
              <div className="card-details">
                <div>
                  <a href="#" className="product-title">Timely Routes</a>
                  <p>Arriving on time, every time</p>
                </div>
              </div>
            </div>

            <div className="card card3">
              <div className="rating-box">
                <div className="stars">
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                </div>
              </div>
              <div className="card-details">
                <div>
                  <a href="#" className="product-title">Safe and Comfortable</a>
                  <p>Travel in comfort with our buses</p>
                </div>
              </div>
            </div>

            <div className="card card4">
              <div className="rating-box">
                <div className="stars">
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                  <i className="fa-solid fa-star active"></i>
                </div>
              </div>
              <div className="card-details">
                <div>
                  <a href="#" className="product-title">Easy Booking</a>
                  <p>Book your ride with just a click</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Search bar */}
      {searchBarActive && (
        <div className="search-bar" data-search-bar>
          <div className="input-wrapper">
            <input type="search" name="search" placeholder="Search" className="input-field" />
            <button className="search-close-btn" aria-label="close search bar" onClick={toggleSearchBar}>
              <IonIcon icon={closeOutline} aria-hidden="true" />
            </button>
          </div>
          <p className="search-bar-text">Please enter at least 3 characters</p>
        </div>
      )}
    </header>
  );
};

export default Header;
