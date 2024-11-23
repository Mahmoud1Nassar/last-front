import React, { useState } from 'react';
import home from './Home.css';
import logo from '../assets/img/MASARLOGO.png';

import recommended1 from '../assets/img/recommended-1.jpg';
import recommended2 from '../assets/img/recommended-2.jpg';
import recommended3 from '../assets/img/recommended-3.jpg';
import recommended4 from '../assets/img/recommended-4.jpg';
import recommended5 from '../assets/img/recommended-5.jpg';
import recommended6 from '../assets/img/recommended-6.jpg';


import author1 from '../assets/img/author-1.jpg';
import author2 from '../assets/img/author-2.jpg';
import author3 from '../assets/img/author-3.jpg';
import author4 from '../assets/img/author-4.jpg';
import author5 from '../assets/img/author-5.jpg';
import author6 from '../assets/img/author-6.jpg';


import noor from '../assets/img/noor.jpg';
import abdullah from '../assets/img/abdullah.jpg';
import raghad from '../assets/img/raghad.jpeg';
import mahmoud from '../assets/img/mahmoud.jpeg';
import aya from '../assets/img/aya.jpg';


const Home = () => {
  const [email, setEmail] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: 'How can I track the university bus in real-time?',
      answer:
        'You can track all our university buses in real-time using our dedicated mobile app or website...',
    },
    {
      question: 'How do I find the bus stop nearest to me?',
      answer:
        'Finding the nearest bus stop is easy! You can use our interactive campus map...',
    },
    {
      question: 'Are the buses accessible for students with disabilities?',
      answer:
        'Absolutely! All of our buses are fully accessible for students with disabilities...',
    },
    {
      question: 'Can I bring my bike or large items on the bus?',
      answer:
        'Yes, bikes and large items like sports equipment are welcome on our buses...',
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
    // Handle the subscription logic (e.g., send the email to an API or store it)
    console.log('Subscribed with email:', email);
  };


  return (
    <main>
      <article>
        {/* HERO SECTION */}
        <section className="section hero" aria-label="home">
          <div className="container">
            <h1 className="h1 hero-title">
              <strong className="strong">Hey, All Aboard!</strong> Safe, Convenient Rides with Our Bus Service.
            </h1>
          </div>

          <div className="news">
            <p className="employees">1M+</p>
            <p className="details">
              We’re incredibly proud to announce that our university bus service has successfully completed over <strong>1 million</strong> student rides. This achievement wouldn't be possible without the trust and support of our students, faculty, and staff. Our team is dedicated to ensuring every ride is safe, timely, and comfortable. As we continue to expand our service, we remain committed to providing reliable transportation to students across all campuses, helping you get to and from class, activities, and events with ease. Thank you for being a part of this incredible journey!
            </p>
          </div>
          <br />
          <div className="news">
            <p className="employees">100+</p>
            <p className="details">
              Our growing fleet of over <strong>100</strong> buses is designed to meet the diverse needs of our student body. With a variety of routes covering every corner of the campus and surrounding areas, we ensure that transportation is accessible to everyone, no matter where you're located. Each bus is equipped with modern amenities for your comfort, and our drivers are highly trained to prioritize your safety. We are continually investing in our fleet to improve service reliability, and we are excited to introduce new routes and eco-friendly buses in the near future to keep up with the increasing demand.
            </p>
          </div>
          <br />
          <div className="news">
            <p className="employees">24/7</p>
            <p className="details">
              In response to the growing needs of our student community, our buses are now available <strong>24/7</strong> to provide transportation at any time of day or night. Whether you're heading to an early class, a late-night study session, or participating in a campus event, you can count on us to get you there safely. Our extended hours are part of our commitment to making your university experience more convenient, ensuring that you have access to reliable transportation whenever you need it. We are continuously optimizing our schedules to better serve you and are looking forward to offering even more flexible options in the future.
            </p>
          </div>
        </section>




        {/* FEATURED POST SECTION */}
        <section className="section featured" aria-label="featured post">
          <div className="container">
            {/* RECOMMENDED POST Section */}
            <section className="section recommended" id="services" aria-label="recommended post">
              <div className="container">
                <p className="section-subtitle">
                  <strong className="strong">Services</strong>
                </p>

                <ul className="grid-list">
                  {/* Recommended Post Item 1 */}
                  <li>
                    <div className="blog-card">
                      <figure className="card-banner img-holder" style={{ '--width': 300, '--height': 360 }}>
                        <img src={recommended1} width="300" height="360" loading="lazy" alt="Track Your Bus in Real-Time" className="img-cover" />
                        <ul className="avatar-list absolute">
                          <li className="avatar-item">
                            <a href="#" className="avatar img-holder" style={{ '--width': 100, '--height': 100 }}>
                              <img src={author1} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                            </a>
                          </li>
                        </ul>
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
                        <ul className="avatar-list absolute">
                          <li className="avatar-item">
                            <a href="#" className="avatar img-holder" style={{ '--width': 100, '--height': 100 }}>
                              <img src={author3} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                            </a>
                          </li>
                        </ul>
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
                        <ul className="avatar-list absolute">
                          <li className="avatar-item">
                            <a href="#" className="avatar img-holder" style={{ '--width': 100, '--height': 100 }}>
                              <img src={recommended4} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                            </a>
                          </li>
                        </ul>
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
                        <ul className="avatar-list absolute">
                          <li className="avatar-item">
                            <a href="#" className="avatar img-holder" style={{ '--width': 100, '--height': 100 }}>
                              <img src={author4} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                            </a>
                          </li>
                        </ul>
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
                        <ul className="avatar-list absolute">
                          <li className="avatar-item">
                            <a href="#" className="avatar img-holder" style={{ '--width': 100, '--height': 100 }}>
                              <img src={author5} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                            </a>
                          </li>
                        </ul>
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
                      <a href="#" aria-label="Raghad's Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" aria-label="Raghad's Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" aria-label="Raghad's YouTube">
                        <i className="fab fa-youtube"></i>
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
                      <a href="#" aria-label="Abdullah's Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" aria-label="Abdullah's Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" aria-label="Abdullah's YouTube">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Person 3 */}
                <div className="person">
                  <img src={aya} alt="Aya Alwahedy, Full Stack Developer" />
                  <div className="info">
                    <h3>Aya Alwahedy</h3>
                    <p>Full Stack Developer</p>
                    <div className="social-media">
                      <a href="#" aria-label="Aya's Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" aria-label="Aya's Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" aria-label="Aya's YouTube">
                        <i className="fab fa-youtube"></i>
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
                      <a href="#" aria-label="Mahmoud's Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" aria-label="Mahmoud's Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" aria-label="Mahmoud's YouTube">
                        <i className="fab fa-youtube"></i>
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
                      <a href="#" aria-label="Noor's Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" aria-label="Noor's Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" aria-label="Noor's YouTube">
                        <i className="fab fa-youtube"></i>
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
            Subscribe for <strong className="strong">new updates</strong>
          </h2>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              name="email_address"
              placeholder="Your email address"
              required
              className="email-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn" style={{ bottom: 15 }}>
              Subscribe
            </button>
          </form>
        </section>
      </article>
    </main>
  );
}
export default Home;