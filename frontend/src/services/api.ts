import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PersonSearchResult } from '@backend/db-types';

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

// Mock the search endpoint
mock.onGet('/search').reply((config) => {
  const { productName, repositoryName } = config.params;

  // Dummy data matching PersonSearchResult interface
  const allResults: PersonSearchResult[] = [
    {
      person: {
        id: 1,
        firstName: 'Veena',
        lastName: 'Kumar',
        email: 'veena.kumar@example.com',
        username: 'veena123',
        title: 'Software Engineer',
        phoneNumber: '123-456-7890',
        locationId: 1,
      },
      location: {
        id: 1,
        streetAddress: '123 Main St',
        city: 'Ashville',
        region: 'SC',
        country: 'USA',
      },
      projects: [
        {
          id: 1,
          name: 'Security Scanner',
          description: 'A project to scan for vulnerabilities',
          contactPersonId: 1,
        },
        {
          id: 2,
          name: 'Repo1',
          description: 'Repository for code',
          contactPersonId: 1,
        },
      ],
    },
    {
      person: {
        id: 2,
        firstName: 'Lars',
        lastName: 'Müller',
        email: 'lars.muller@example.com',
        username: 'larsm',
        title: 'Security API Developer',
        phoneNumber: '234-567-8901',
        locationId: 2,
      },
      location: {
        id: 2,
        streetAddress: '456 Mountain Rd',
        city: 'Lucerne',
        region: 'CH',
        country: 'Switzerland',
      },
      projects: [
        {
          id: 3,
          name: 'API Development',
          description: 'Developing APIs',
          contactPersonId: 2,
        },
      ],
    },
  ];

  // Simulated filtering based on query
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