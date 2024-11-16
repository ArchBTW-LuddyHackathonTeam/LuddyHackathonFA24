import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';

const API_BASE_URL = 'localhost:5000';

export const useApi = () => {
  const { sessionToken } = useAuth();

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: sessionToken ? `Bearer ${sessionToken}` : '',
    },
  });

  return api;
};