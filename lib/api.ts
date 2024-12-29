import axios from 'axios';

const API_BASE_URL = 'https://api.citepro.in/citepro';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await api.post('/signup', { email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

export const generateReferences = async (query: string, format: string, count: number) => {
  const response = await api.post(`/generate/${format}`, { query, count });
  // After generation, fetch updated profile to get new credits
  const profileResponse = await getProfile();
  return {
    ...response.data,
    credits: profileResponse.credits
  };
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};