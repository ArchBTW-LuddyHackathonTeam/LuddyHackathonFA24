import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPointOfContact = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/contact`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};