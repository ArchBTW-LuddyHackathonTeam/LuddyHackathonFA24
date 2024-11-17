import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
import NavBar from '../components/Navbar'; // Adjust the import path based on your project structure

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="home-container">
      <NavBar />
      <header className="home-header">
        
        <div className="header-content" data-aos="fade-in">
          <h1 data-aos="fade-up">Connect. Collaborate. Create.</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Discover connections within SC 1701-D to enhance teamwork and spark innovation.
          </p>
          <button
            className="cta-button"
            onClick={() => navigate('/search')}
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            Find a Point of Contact
          </button>
        </div>
      </header>
      <main className="home-main">
        <section className="about-section section" data-aos="fade-up">
          <h2>About the Project</h2>
          <p>
            In our dynamic organization, forging connections across teams is vital.
            Our Collaboration Finder helps you discover the right people for any project,
            fostering collaboration and innovation.
          </p>
        </section>
        <section className="features-section section" data-aos="fade-up">
          <h2>Key Features</h2>
          <ul>
            <li data-aos="fade-up" data-aos-delay="100">
              <h3>Intuitive Search</h3>
              <p>Find colleagues by product or repository effortlessly.</p>
            </li>
            <li data-aos="fade-up" data-aos-delay="200">
              <h3>Comprehensive Profiles</h3>
              <p>Access detailed contact information to connect directly.</p>
            </li>
            <li data-aos="fade-up" data-aos-delay="300">
              <h3>Enhanced Collaboration</h3>
              <p>Break down silos and work together across the organization.</p>
            </li>
            <li data-aos="fade-up" data-aos-delay="400">
              <h3>Productivity Boost</h3>
              <p>Reduce delays and streamline your projects.</p>
            </li>
          </ul>
        </section>
      </main>
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} SC 1701-D. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;