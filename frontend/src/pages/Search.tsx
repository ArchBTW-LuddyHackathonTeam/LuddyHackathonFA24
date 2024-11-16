import React, { useState } from 'react';
import { useApi } from '../services/api';

interface SearchResult {
  firstName: string;
  lastName: string;
  email: string;
  chatUserName: string;
  location: string;
  titleOrRole: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const api = useApi();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.get('/search', {
        params: { query },
      });

      setResults(response.data);
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search for Point of Contact</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Product name or repository name"
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {results && (
        <div>
          <h2>Result:</h2>
          <p>
            Name: {results.firstName} {results.lastName}
          </p>
          <p>Email: {results.email}</p>
          <p>Chat Username: {results.chatUserName}</p>
          <p>Location: {results.location}</p>
          <p>Title/Role: {results.titleOrRole}</p>
        </div>
      )}
    </div>
  );
};

export default Search;