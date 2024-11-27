import React, { useState } from 'react';

import './Home.css';
import '../Header/Header.css';
import logo from '../../Assets/img/MASARLOGO.png';
import Footer from '../../Layout/Footer/Footer.js';
import { IonIcon } from '@ionic/react';  // If using React Ionicons
import { logoFacebook, logoTwitter, logoLinkedin, closeOutline } from 'ionicons/icons';

import author1 from '../../Assets/img/raghad.jpeg';
import author2 from '../../Assets/img/mahmoud.jpeg';
import author4 from '../../Assets/img/noor.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

import recommended1 from '../../Assets/img/recommended-1.webp';
import recommended2 from '../../Assets/img/recommended-2.webp';
import recommended3 from '../../Assets/img/recommended-3.webp';
import recommended4 from '../../Assets/img/recommended-4.webp';
import recommended5 from '../../Assets/img/recommended-5.webp';

import noor from '../../Assets/img/noor.jpg';
import abdullah from '../../Assets/img/abdullah.jpg';
import raghad from '../../Assets/img/raghad.jpeg';
import mahmoud from '../../Assets/img/mahmoud.jpeg';
import aya from '../../Assets/img/aya.jpg';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [email, setEmail] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const handleSignUpClick = () => {
    navigate('/SignUp'); // Navigate to the Register component
  };
  const [searchBarActive, setSearchBarActive] = useState(false);

  // Toggle the search bar visibility
  const toggleSearchBar = () => {
    setSearchBarActive(!searchBarActive);
    document.body.classList.toggle('active');
  };

  const faqData = [
    {
      question: 'How can I track the university bus in real-time?',
      answer:
        'You can track all our university buses in real-time using our dedicated website...',
    },
    {
      question: 'How do I find the bus stop nearest to me?',
      answer:
        'Finding the nearest bus stop is easy! You can use our interactive campus dashboard or contact the driver that he assigned to you region...',
    },
    {
      question: 'Are the buses accessible for students with disabilities?',
      answer:
        'Absolutely! All of our buses are fully accessible for students with disabilities...',
    },
    {
      question: 'Can I suggest a new bus route or stop?',
      answer:
        'We welcome suggestions for new routes or stops! You can directly suggest that to the admin!',
    },
    {
      question: 'How often are the buses cleaned and sanitized?',
      answer:
        'Our buses are cleaned and sanitized daily to ensure the safety and comfort of our passengers.',
    },
    {
      question: 'Are pets allowed on the bus?',
      answer:
        'Yes, we allow pets on our buses, but they must be kept in carriers or on a leash...',
    },
  ];
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the registeration logic (e.g., send the email to an API or store it)
    console.log('Registered with email:', email);
  };
  return (
    <div>
      <header id="home" >
        {/* Overlay */}
        <div className={`overlay ${searchBarActive ? 'active' : ''}`} onClick={toggleSearchBar}></div>
        <div className="wrapper1">
          <div className="right-col">
            <div className="card card1">
              <div className="card-details1">
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
                        <img src={author4} alt="Author" className="img-cover" width="100" height="100" />
                      </a>
                    </li>
                  </ul>
                </figure>
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
      <article>
        {/* HERO SECTION */}
        <section className="section hero" aria-label="home">
          <div className="container">
            <h1 style={{ fontSize: '60px', fontWeight: 'normal' }}>
            <strong className="strong">Hey</strong>, All Aboard! <br />Safe, Convenient <strong className="strong">Rides</strong> with Our Bus Service.
            </h1>
          </div>
          <br />
          <div className="news">
            <p className="employees" style={{ marginTop: '30px' }}>100+</p>
            <p className="details" style={{ fontSize: '18px' }}>
              Our growing fleet of over <strong>100</strong> buses is designed to meet the diverse needs of our student body. With a variety of routes covering every corner of the campus and surrounding areas, we ensure that transportation is accessible to everyone, no matter where you're located. Each bus is equipped with modern amenities for your comfort, and our drivers are highly trained to prioritize your safety. We are continually investing in our fleet to improve service reliability, and we are excited to introduce new routes and eco-friendly buses in the near future to keep up with the increasing demand.
            </p>
          </div>
          <br />

        </section>
        {/* FEATURED POST SECTION */}
        <section className="section featured" aria-label="featured post">
          <div className="container">
            {/* RECOMMENDED POST Section */}
            <section className="section recommended" id="services" aria-label="recommended post">
              <div className="container" style={{ paddingLeft: '70px' }}>
                <p className="section-subtitle">
                  <strong className="strong">Services</strong>
                </p>

                <ul className="grid-list">
                  {/* Recommended Post Item 1 */}
                  <li>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ '--width': 300, '--height': 360 }}>
                        <img src={recommended1} width="300" height="360" loading="lazy" alt="Track Your Bus in Real-Time" className="img-cover" />
                      </figure>

                      <div className="card-content">
                        <h3 className="h5">
                          <a href="#" className="card-title hover:underline">
                            Track Your Bus in Real-Time for Better Planning
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>

                  {/* Recommended Post Item 2 */}
                  <li>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ '--width': 300, '--height': 360 }}>
                        <img src={recommended2} width="300" height="360" loading="lazy" alt="Weekend and Holiday Bus Schedules" className="img-cover" />

                      </figure>

                      <div className="card-content">
                        <h3 className="h5">
                          <a href="#" className="card-title hover:underline">
                            Learn About Our Weekend and Holiday Bus Schedules
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>

                  {/* Recommended Post Item 3 */}
                  <li>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ '--width': 300, '--height': 360 }}>
                        <img src={recommended3} width="300" height="360" loading="lazy" alt="Find the Nearest Bus Stop on Campus" className="img-cover" />

                      </figure>

                      <div className="card-content">
                        <h3 className="h5">
                          <a href="#" className="card-title hover:underline">
                            How to Find the Nearest Bus Stop and Plan Your Journey
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>

                  {/* Recommended Post Item 4 */}
                  <li>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ '--width': 300, '--height': 360 }}>
                        <img src={recommended4} width="300" height="360" loading="lazy" alt="Accessible Bus Services for Students with Disabilities" className="img-cover" />

                      </figure>

                      <div className="card-content">
                        <h3 className="h5">
                          <a href="#" className="card-title hover:underline">
                            Accessible Bus Services for Students with Disabilities
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>

                  {/* Recommended Post Item 5 */}
                  <li>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ '--width': 300, '--height': 360 }}>
                        <img src={recommended5} width="300" height="360" loading="lazy" alt="Bringing Your Bike on the Bus Made Easy" className="img-cover" />

                      </figure>

                      <div className="card-content">
                        <h3 className="h5">
                          <a href="#" className="card-title hover:underline">
                            Bringing Your Bike on the Bus Made Easy
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>


                </ul>
              </div>
            </section>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="container">
          <section className="section recommended" aria-label="recommended post">
            <ul className="faq">
              {faqData.map((item, index) => (
                <li
                  key={index}
                  className={openIndex === index ? 'active' : ''} // Add 'active' class based on state
                >
                  <h3
                    className="question"
                    onClick={() => toggleFAQ(index)}
                  >
                    {item.question}
                    <div
                      className={`plus-minus-toggle ${openIndex === index ? 'expanded' : 'collapsed'
                        }`}
                    ></div>
                  </h3>
                  <div
                    className={`answer ${openIndex === index ? 'visible' : 'hidden'}`}
                  >
                    {item.answer}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>


        <div className="container">
          <section className="section recommended" aria-label="Recommended posts">
            <p className="section-subtitle" id="aboutUs">
              <strong className="strong">Our Team</strong>
            </p>
            <div className="container">
              <div className="person-container">

                {/* Person 1 */}
                <div className="person">
                  <img src={raghad} alt="Raghad Abdullah, Full Stack Developer" />
                  <div className="info">
                    <h3>Raghad Abdullah</h3>
                    <p>Full Stack Developer</p>
                    <div className="social-media">
                      <a href="https://www.linkedin.com/in/raghadalyakhri/" aria-label="Raghad linkedin">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="mailto:raghad@gmail.com" aria-label="Send Email">
                        <i className="fas fa-envelope"></i>
                      </a>
                      <a href="https://github.com/raghad0177" aria-label="Raghad github">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Person 2 */}
                <div className="person">
                  <img src={abdullah} alt="Abdullah Halimeh, Full Stack Developer" />
                  <div className="info">
                    <h3>Abdullah Halimeh</h3>
                    <p>Full Stack Developer</p>
                    <div className="social-media">
                      <a href="https://www.linkedin.com/in/abdullah-abu-halimeh-494086282/" aria-label="Abdullah's linkedin">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="mailto:abdallahabuhalima.1.jo@gmail.com" aria-label="Send Email">
                        <i className="fas fa-envelope"></i>
                      </a>
                      <a href="https://github.com/AbdullahAOT" aria-label="Abdullah's github">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Person 3 */}
                <div className="person">
                  <img src={aya} alt="Aya Al-Wahidi, Full Stack Developer" />
                  <div className="info">
                    <h3 style={{color:'black'}}> Aya Al-Wahidi</h3>
                    <p style={{color:'black'}}>Full Stack Developer</p>
                    <div className="social-media">
                      <a href="https://www.linkedin.com/in/aya-alwahidi/" aria-label="Aya Linkedin">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="mailto:ayanalwahidi@gmail.com" aria-label="Send Email">
                        <i className="fas fa-envelope"></i>
                      </a>
                      <a href="https://github.com/AyaAl-wahidi" aria-label="Aya GitHub">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Person 4 */}
                <div className="person">
                  <img src={mahmoud} alt="Mahmoud Nassar, Full Stack Developer" />
                  <div className="info">
                    <h3>Mahmoud Nassar</h3>
                    <p>Full Stack Developer</p>
                    <div className="social-media">
                      <a href="https://www.linkedin.com/in/mahmoud-al-anbtawi/" aria-label="Mahmoud linkedin">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="mailto:mahmoud.nassar2001@outlook.com" aria-label="Send Email">
                        <i className="fas fa-envelope"></i>
                      </a>
                      <a href="https://github.com/Mahmoud1Nassar" aria-label="Mahmoud github">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Person 5 */}
                <div className="person">
                  <img src={noor} alt="Noor Albonne, Full Stack Developer" />
                  <div className="info">
                    <h3>Noor Albonne</h3>
                    <p>Full Stack Developer</p>
                    <div className="social-media">
                      <a href="https://www.linkedin.com/in/nooralbonne/" aria-label="Noor linkedin">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="mailto:Nooralbonne@hotmail.com" aria-label="Send Email">
                        <i className="fas fa-envelope"></i>
                      </a>
                      <a href="https://github.com/nooralbonne" aria-label="Noor github">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>

        <section className="section newsletter">
          <h2 className="h2 section-title">
          Register for <strong className="strong">new updates</strong>
          </h2>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              name="email_address"
              required
              className="email-field"
              onChange={(e) => setEmail(e.target.value)}
              disabled/>
            <button type="submit" className="btn" style={{ bottom: 15 }} onClick={handleSignUpClick}>
              SignUp
            </button>
          </form>
        </section>
      </article>
      <Footer />
    </div>
  );
}
export default Home;