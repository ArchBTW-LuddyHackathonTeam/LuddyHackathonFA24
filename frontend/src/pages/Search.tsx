import React, { useState } from 'react';
import { search } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { PersonSearchResult } from '@backend/db-types';
import { useAuth } from '../providers/AuthProvider';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PersonSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const { setSessionToken } = useAuth();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const searchResults = await search({ productName: query, repositoryName: query });
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    }
    setIsLoading(false);
    setHasSearched(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    // Clear the session token and redirect to the login page
    setSessionToken(null);
    navigate('/Login');
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
              setHasSearched(false);
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
          results.map((result, index) => (
            <div className="result-card" key={index}>
              <h2>
                {result.person.firstName} {result.person.lastName}
              </h2>
              <p>
                <strong>Title:</strong> {result.person.title}
              </p>
              <p>
                <strong>Location:</strong> {result.location.city}, {result.location.region}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${result.person.email}`}>{result.person.email}</a>
              </p>
              <p>
                <strong>Username:</strong> {result.person.username}
              </p>
              {result.projects && result.projects.length > 0 && (
                <div className="projects">
                  <strong>Projects:</strong>
                  <ul>
                    {result.projects.map((project) => (
                      <li key={project.id}>
                        {project.name} - {project.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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