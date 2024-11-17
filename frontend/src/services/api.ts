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

// Updated mock data: Adding more people with more elaborate data

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
      phoneNumber: '+1-123-456-7890', // Updated to international format
      locationId: 1,
    },
    location: {
      id: 1,
      streetAddress: '123 Main St',
      secondaryAddress: 'Apt 4B',
      city: 'Asheville',
      region: 'NC',
      zipCode: '28801',
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
      phoneNumber: '+41 76 123 4567', // Swiss mobile number format
      locationId: 2,
    },
    location: {
      id: 2,
      streetAddress: '456 Mountain Rd',
      city: 'Lucerne',
      region: 'Lucerne',
      zipCode: '6003',
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
  {
    person: {
      id: 3,
      firstName: 'Santiago',
      lastName: 'Martinez',
      email: 'santiago.martinez@example.com',
      username: 'santi123',
      title: 'Frontend Developer',
      phoneNumber: '+34 612 345 678', // Spanish mobile number
      locationId: 3,
    },
    location: {
      id: 3,
      streetAddress: '789 Calle Mayor',
      city: 'Madrid',
      region: 'Madrid',
      zipCode: '28013',
      country: 'Spain',
    },
    projects: [
      {
        id: 4,
        name: 'UI Library',
        description: 'A library of UI components',
        contactPersonId: 3,
      },
    ],
  },
  {
    person: {
      id: 4,
      firstName: 'Akira',
      lastName: 'Tanaka',
      email: 'akira.tanaka@example.jp',
      username: 'akira_t',
      title: 'Backend Engineer',
      phoneNumber: '+81 90-1234-5678', // Japanese mobile number
      locationId: 4,
    },
    location: {
      id: 4,
      streetAddress: '1-2-3 Shibuya',
      city: 'Tokyo',
      region: 'Tokyo',
      zipCode: '150-0002',
      country: 'Japan',
    },
    projects: [
      {
        id: 5,
        name: 'Database Optimization',
        description: 'Improving database performance',
        contactPersonId: 4,
      },
    ],
  },
  {
    person: {
      id: 5,
      firstName: 'Ling',
      lastName: 'Chen',
      email: 'ling.chen@example.cn',
      username: 'lingchen',
      title: 'Data Scientist',
      phoneNumber: '+86 138 1234 5678', // Chinese mobile number
      locationId: 5,
    },
    location: {
      id: 5,
      streetAddress: 'No. 88 Nanjing Road',
      city: 'Shanghai',
      region: 'Shanghai',
      zipCode: '200001',
      country: 'China',
    },
    projects: [
      {
        id: 6,
        name: 'Machine Learning Models',
        description: 'Developing ML models',
        contactPersonId: 5,
      },
    ],
  },
  {
    person: {
      id: 6,
      firstName: 'Maria',
      lastName: 'Rossi',
      email: 'maria.rossi@example.it',
      username: 'mrossi',
      title: 'DevOps Engineer',
      phoneNumber: '+39 347 1234567', // Italian mobile number
      locationId: 6,
    },
    location: {
      id: 6,
      streetAddress: 'Via Roma 10',
      city: 'Rome',
      region: 'Lazio',
      zipCode: '00100',
      country: 'Italy',
    },
    projects: [
      {
        id: 7,
        name: 'Infrastructure Automation',
        description: 'Automating infrastructure',
        contactPersonId: 6,
      },
    ],
  },
  {
    person: {
      id: 7,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      title: 'Project Manager',
      phoneNumber: '+44 7700 900123', // UK mobile number
      locationId: 7,
    },
    location: {
      id: 7,
      streetAddress: '10 Downing Street',
      city: 'London',
      region: 'Greater London',
      zipCode: 'SW1A 2AA',
      country: 'United Kingdom',
    },
    projects: [
      {
        id: 8,
        name: 'Project Alpha',
        description: 'An important project',
        contactPersonId: 7,
      },
    ],
  },
  {
    person: {
      id: 8,
      firstName: 'Olga',
      lastName: 'Ivanova',
      email: 'olga.ivanova@example.ru',
      username: 'olga_i',
      title: 'QA Engineer',
      phoneNumber: '+7 912 345-67-89', // Russian mobile number
      locationId: 8,
    },
    location: {
      id: 8,
      streetAddress: 'Prospekt Mira 12',
      city: 'Moscow',
      region: 'Moscow City',
      zipCode: '101000',
      country: 'Russia',
    },
    projects: [
      {
        id: 9,
        name: 'Testing Framework',
        description: 'Creating a testing framework',
        contactPersonId: 8,
      },
    ],
  },
];

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