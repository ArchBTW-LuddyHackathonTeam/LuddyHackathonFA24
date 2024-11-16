import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { setSessionToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setSessionToken(null);
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Protected Home Page</h1>
      <button onClick={() => navigate('/search')}>Go to Search</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;