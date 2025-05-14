import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    console.log('Setting Authorization header:', `Basic ${auth}`); // Debug
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
});

export default api;