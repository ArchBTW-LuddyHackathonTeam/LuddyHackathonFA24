import React, { useState, useEffect } from 'react';
import { search } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { PersonSearchResult } from '@backend/db-types';
import NavBar from '../components/Navbar';
import ResultCard from '../components/ResultCard';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PersonSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const searchResults = await search({
        productName: query,
        repositoryName: query,
      });
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

  return (
    <div className="search-page">
      <NavBar />
      <div className="search-section">
        <h1 data-aos="fade-down">Find a Point of Contact</h1>
        <div
          className="search-input-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
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

      <div className="results-section">
        {isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map((result, index) => (
              <ResultCard result={result} key={index} />
            ))}
          </div>
        ) : (
          hasSearched &&
          !isLoading && (
            <p className="no-results">
              No results found for "<strong>{query}</strong>".
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Search;