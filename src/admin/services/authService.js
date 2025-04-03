// frontend/src/admin/services/authService.js
import axios from 'axios';

const API_URL = '/api/admin';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// Add interceptor for handling auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login if auth fails
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password, remember) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
      remember
    });
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/profile`);
  return response.data;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};