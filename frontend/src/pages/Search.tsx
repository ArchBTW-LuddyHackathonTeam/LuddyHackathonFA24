import React, { useState } from 'react';
import { search, User } from '../services/api';

const Search: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [results, setResults] = useState<User[]>([]);

  const handleSearch = async () => {
    try {
      const users = await search({ productName, repositoryName });
      setResults(users);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div>
      {/* Search fields for productName and repositoryName */}
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
      />
      <input
        type="text"
        value={repositoryName}
        onChange={(e) => setRepositoryName(e.target.value)}
        placeholder="Repository Name"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display search results */}
      <ul>
        {results.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName} - {user.title} ({user.location})
            <br />
            Email: {user.email}
            <br />
            Chat: {user.chatUserName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;