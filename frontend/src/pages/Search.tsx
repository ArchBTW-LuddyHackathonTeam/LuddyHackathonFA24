import React, { useState, useEffect } from 'react';
import { search } from '../services/api';
import './Search.css';
import { PersonSearchResult } from '@backend/db-types';
import NavBar from '../components/Navbar';
import ResultCard from '../components/ResultCard';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchModes, setSearchModes] = useState<string[]>(['Product Name', 'Repository Name']);
  const [results, setResults] = useState<PersonSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    if (searchModes.length === 0) return; // Ensure at least one mode is selected
    setIsLoading(true);
    try {
      // Map search modes to options expected by the API
      const options: string[] = searchModes.map((mode) => {
        switch (mode) {
          case 'Product Name':
            return 'product';
          case 'Repository Name':
            return 'repository';
          case 'First Name':
            return 'firstName';
          case 'Last Name':
            return 'lastName';
          case 'Title':
            return 'title';
          default:
            return '';
        }
      }).filter(Boolean); // Remove any empty strings

      const searchResults = await search(query, options);
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

  // Function to toggle search modes
  const toggleSearchMode = (mode: string) => {
    setHasSearched(false);
    if (searchModes.includes(mode)) {
      setSearchModes(searchModes.filter((m) => m !== mode));
    } else {
      setSearchModes([...searchModes, mode]);
    }
  };

  return (
    <div className="search-page">
      <NavBar />
      <div className="search-section">
        <h1 data-aos="fade-down">Find a Point of Contact</h1>

        <div
          className="search-modes-container"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="chips-container">
            {['Product Name', 'Repository Name', 'First Name', 'Last Name', 'Title'].map((mode) => (
              <div
                key={mode}
                className={`chip ${searchModes.includes(mode) ? 'selected' : ''}`}
                onClick={() => toggleSearchMode(mode)}
              >
                {mode}
              </div>
            ))}
          </div>
        </div>

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
            placeholder="Enter your search query..."
          />
          <button onClick={handleSearch} disabled={isLoading || searchModes.length === 0}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchModes.length === 0 && (
          <p className="mode-warning">Please select at least one search mode.</p>
        )}
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