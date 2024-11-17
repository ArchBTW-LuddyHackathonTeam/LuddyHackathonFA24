import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const { setSessionToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setSessionToken(null);
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="navbar">
          <div className="navbar-content">
            <div className="logo" onClick={() => navigate('/')}>
              <span>SC</span> 1701-D
            </div>
            <ul className="nav-links">
              <li onClick={() => navigate('/')}>Home</li>
              <li onClick={() => navigate('/search')}>Search</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </nav>
        <div className="header-content">
          <h1>Connect. Collaborate. Create.</h1>
          <p>
            Discover connections within SC 1701-D to enhance teamwork and spark innovation.
          </p>
          <button className="cta-button" onClick={() => navigate('/search')}>
            Find a Point of Contact
          </button>
        </div>
      </header>
      <main className="home-main">
        <section className="about-section section">
          <h2>About the Project</h2>
          <p>
            In our dynamic organization, forging connections across teams is vital.
            Our Collaboration Finder helps you discover the right people for any project,
            fostering collaboration and innovation.
          </p>
        </section>
        <section className="features-section section">
          <h2>Key Features</h2>
          <ul>
            <li>
              <h3>Intuitive Search</h3>
              <p>Find colleagues by product or repository effortlessly.</p>
            </li>
            <li>
              <h3>Comprehensive Profiles</h3>
              <p>Access detailed contact information to connect directly.</p>
            </li>
            <li>
              <h3>Enhanced Collaboration</h3>
              <p>Break down silos and work together across the organization.</p>
            </li>
            <li>
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