import React, { useState } from 'react';
import { search, User } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import Person from '@backend/db-interface';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // New state variable
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const users = await search({ productName: query, repositoryName: query });
      setResults(users);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    }
    setIsLoading(false);
    setHasSearched(true); // Set hasSearched to true after search
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="search-container">
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

      <div className="search-bar">
        <h1>Find a Point of Contact</h1>
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHasSearched(false); // Reset hasSearched when query changes
            }}
            onKeyDown={handleKeyPress}
            placeholder="Enter product or repository name..."
          />
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="results">
        {results.length > 0 ? (
          results.map((user, index) => (
            <div className="result-card" key={index}>
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <p>
                <strong>Title:</strong> {user.title}
              </p>
              <p>
                <strong>Location:</strong> {user.location}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              <p>
                <strong>Username:</strong> {user.chatUserName}
              </p>
            </div>
          ))
        ) : (
          hasSearched &&
          !isLoading && (
            <p className="no-results">No results found for "{query}".</p>
          )
        )}
      </div>
    </div>
  );
};

export default Search;