import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

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
          <div className="logo" onClick={() => navigate('/')}>
            SC 1701-D Collaboration Finder
          </div>
          <ul className="nav-links">
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/search')}>Search</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
        <div className="header-content">
          <h1>Welcome to the Collaboration Finder</h1>
          <p>
            Connecting you to the right people within SC 1701-D to enhance collaboration and productivity.
          </p>
          <button onClick={() => navigate('/search')}>Find a Point of Contact</button>
        </div>
      </header>
      <main className="home-main">
        <section className="about-section">
          <h2>About the Project</h2>
          <p>
            In a rapidly growing organization like SC 1701-D, connecting with team members across different locations can be challenging. Our Collaboration Finder API aims to bridge this gap by helping you find the right point-of-contact for any product or repository within the company.
          </p>
        </section>
        <section className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Search by Product Name or Repository Name</li>
            <li>Get detailed contact information</li>
            <li>Enhance cross-team collaboration</li>
            <li>Improve productivity and reduce risks</li>
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