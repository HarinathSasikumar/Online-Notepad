import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor – attach token
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('smartnotes_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {}
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('smartnotes_token');
        localStorage.removeItem('smartnotes_user');
      } catch (e) {}
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
