import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PersonSearchResult } from '@backend/db-types';
import allResults from './mockdata'; // Importing the dummy data

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Set up the mock adapter
const mock = new MockAdapter(api, { delayResponse: 500 }); // Simulated delay

// Mock the sign in endpoint
mock.onPost('/signin').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (email === 'test@test.com' && password === 'password') {
    return [200, { sessionToken: 'valid-session-token' }];
  } else {
    return [401, { error: 'Invalid email or password' }];
  }
});

// Mock the sign up endpoint
mock.onPost('/signup').reply(200, { sessionToken: 'dummy-session-token' });

// Simulated filtering based on query
mock.onGet('/search').reply((config) => {
  const { productName, repositoryName } = config.params;

  // Convert query to lowercase for case-insensitive search
  const query = (productName || repositoryName || '').toLowerCase();

  const filteredResults = allResults.filter((result) => {
    const projectNames = result.projects.map((project) => project.name.toLowerCase());
    return projectNames.some((name) => name.includes(query));
  });

  return [200, filteredResults];
});

export const signIn = (email: string, password: string) => {
  return api.post('/signin', { email, password }).then((response) => response.data);
};

export const signUp = (userData: { email: string; password: string; firstName: string; lastName: string }) => {
  return api.post('/signup', userData).then((response) => response.data);
};

export const search = (query: { productName?: string; repositoryName?: string }) => {
  return api
    .get('/search', { params: query })
    .then((response) => response.data as PersonSearchResult[]);
};