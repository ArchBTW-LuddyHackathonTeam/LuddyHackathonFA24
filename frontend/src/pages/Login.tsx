import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setSessionToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('localhost:login', {
        email,
        password,
      });

      // Assuming the response contains a session token
      setSessionToken(response.data.sessionToken);
      navigate('/');
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error(error);
    }
  };

  // Add this function for handling dev login
  const handleDevLogin = () => {
    // Set a dev session token
    const devToken = 'DEV_SESSION_TOKEN';
    setSessionToken(devToken);
    navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* Existing login form */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Add a dev login button */}
      <button onClick={handleDevLogin}>Dev Login</button>
    </div>
  );
};

export default Login;