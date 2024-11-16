import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const api = axios.create({
  baseURL: 'http://localhost:5000', // This will be your backend URL
});

// Set up the mock adapter
const mock = new MockAdapter(api, { delayResponse: 500 }); // Simulated delay

// Mock the sign in endpoint
mock.onPost('/signin').reply((config) => {
    const { email, password } = JSON.parse(config.data);
  
    // Check if the email and password match the valid credentials
    if (email === 'test@test.com' && password === 'password') {
      return [200, { sessionToken: 'valid-session-token' }];
    } else {
      return [401, { error: 'Invalid email or password' }];
    }
  });

// Mock the sign up endpoint
mock.onPost('/signup').reply(200, { sessionToken: 'dummy-session-token' });

// Mock the search endpoint
mock.onGet('/search').reply(200, [
  {
    firstName: 'Veena',
    lastName: 'Kumar',
    email: 'veena.kumar@example.com',
    chatUserName: 'veena123',
    location: 'Ashville, SC',
    title: 'Software Engineer',
  },
  {
    firstName: 'Lars',
    lastName: 'Müller',
    email: 'lars.muller@example.com',
    chatUserName: 'larsm',
    location: 'Lucerne, CH',
    title: 'Security API Developer',
  },
]);

// Export the API functions using Axios
export const signIn = (email: string, password: string) => {
  return api.post('/signin', { email, password }).then((response) => response.data);
};

export const signUp = (userData: { email: string; password: string; firstName: string; lastName: string }) => {
  return api.post('/signup', userData).then((response) => response.data);
};

export const search = (query: { productName?: string; repositoryName?: string }) => {
  return api.get('/search', { params: query }).then((response) => response.data);
};

// Export the User interface if it's not already
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  chatUserName: string;
  location: string;
  title: string;
}