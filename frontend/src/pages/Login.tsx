import React, { useEffect, useState } from 'react';
import { signIn } from '../services/api';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { sessionToken, setSessionToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Add isLoading state
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionToken) {
      navigate('/');
    }
  }, [sessionToken, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await signIn(email, password);
      if (response.sessionToken) {
        setSessionToken(response.sessionToken);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Sign In</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {isLoading ? (
          // Display the spinner when loading
          <div className="spinner"></div>
        ) : (
          <button type="submit">Sign In</button>
        )}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;