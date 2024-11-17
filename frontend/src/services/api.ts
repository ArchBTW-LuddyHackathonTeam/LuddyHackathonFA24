import axios from 'axios';
import { PersonSearchResult } from '@backend/db-types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Include cookies in requests
});

/**
 * Sign In - Authenticate the user and establish a session.
 * @param email - User's email.
 * @param password - User's password.
 * @returns Response data from the server.
 */
export const signIn = async (email: string, password: string) => {
  try {
    const response = await api.post('/sessions', { email, password }, { withCredentials: true });
    return response.data; // Should be { success: true }
  } catch (error: any) {
    if (error.response && error.response.data) {
      // Handle specific errors from the server
      throw new Error(error.response.data.error || 'Sign in failed.');
    }
    throw error;
  }
};

/**
 * Sign Up - Register a new user.
 * @param userData - Object containing user details.
 * @returns Response data from the server.
 */
export const signUp = async (userData: {username: string, email: string; password: string; firstName: string; lastName: string }) => {
  try {
    const response = await api.post('/person', userData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Sign up failed.');
    }
    throw error;
  }
};

/**
 * Search - Perform a search query.
 * @param searchQuery - The search string.
 * @param options - Optional array of search options.
 * @returns Array of search results.
 */
export const search = async (searchQuery: string, options?: string[]) => {
  try {
    const response = await api.post('/search', { searchQuery, options });
    return response.data as PersonSearchResult[];
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Search failed.');
    }
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const response = await api.get('/person/me', { withCredentials: true });
    return { isValid: true, user: response.data };    
  } catch (error: any) {
    return { isValid: false };
  }
};

// src/services/api.ts
export const logout = async () => {
  try {
    await api.delete('/sessions', { withCredentials: true });
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};