import React, { useEffect, useState } from 'react';
import { signUp } from '../services/api';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { sessionToken, setSessionToken } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  // Add isLoading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect to home if user is already authenticated
    if (sessionToken) {
      navigate('/');
    }
  }, [sessionToken, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await signUp(formData);
      if (response.sessionToken) {
        setSessionToken(response.sessionToken);
        navigate('/'); // Redirect to home upon successful sign-up
      } else {
        setError('Sign up failed. Please try again.'); // Set error if no session token received
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      setError('Sign up failed. Please try again.'); // Display error message
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          required
        />
        <div className="input-wrapper">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFormData({ ...formData, username: e.target.value });
            }}
            placeholder="Username"
            required
            maxLength={32}
          />
          <span className="username-characters">{username.length}/32</span>
        </div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          required
        />
        {isLoading ? (
          // Display the spinner when loading
          <div className="spinner"></div>
        ) : (
          <button type="submit">Sign Up</button>
        )}
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;