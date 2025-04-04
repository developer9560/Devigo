import axios from 'axios';

// API Configuration
// Use environment variable or fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-django-pct4.onrender.com/api/v1';

// Log the API base URL to help with debugging (will be removed in production)
console.log('API is configured with base URL:', API_BASE_URL);

const AUTH_TOKEN_KEY = 'devigo_auth_token';
const REFRESH_TOKEN_KEY = 'devigo_refresh_token';
const USER_DATA_KEY = 'devigo_user_data';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          // No refresh token, logout
          authService.logout();
          return Promise.reject(error);
        }

        // Make sure we don't use the intercepted instance for the refresh call
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        if (response.data.access) {
          // Save the new token
          localStorage.setItem(AUTH_TOKEN_KEY, response.data.access);
          
          // Update the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // If refresh failed, logout
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication Service
const authService = {
  async login(credentials) {
    try {
      console.log('API login attempt with:', credentials.username);
      const response = await api.post('/auth/admin/login/', credentials);
      
      console.log('Login API response received:', response.data);
      
      if (response.data.access && response.data.refresh) {
        // Store tokens and user data
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.access);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
        
        // Ensure user data is available and stored
        if (response.data.user) {
          console.log('Storing user data in localStorage');
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
        } else {
          console.warn('Login successful but no user data received');
        }
        
        return response.data;
      } else {
        console.error('Invalid login response, missing tokens:', response.data);
        throw new Error('Invalid response from server - missing auth tokens');
      }
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  isAuthenticated() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    console.log('Checking auth token:', token ? 'Token exists' : 'No token');
    return !!token;
  },

  getUserData() {
    try {
      const userData = localStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error('Error parsing user data from localStorage', e);
      return null;
    }
  },

  // This should only be called when absolutely necessary
  async fetchUserFromServer() {
    if (!this.isAuthenticated()) {
      return null;
    }
    
    try {
      const response = await api.get('/auth/admin/check/');
      if (response.data) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        this.logout();
      }
      throw error;
    }
  }
};

// Services API
const servicesApi = {
  getAll(params = {}) {
    return api.get('/services/', { params });
  },
  
  getById(id) {
    if (!id || id === 'new' || id === 'undefined') {
      return Promise.reject(new Error('Invalid service ID'));
    }
    return api.get(`/services/${id}/`);
  },
  
  getBySlug(slug) {
    if (!slug) {
      return Promise.reject(new Error('Invalid service slug'));
    }
    // Use a query parameter to filter by slug
    return api.get('/services/', { params: { slug } });
  },
  
  create(data) {
    return api.post('/services/', data);
  },
  
  update(id, data) {
    if (!id || id === 'new' || id === 'undefined') {
      return Promise.reject(new Error('Invalid service ID for update'));
    }
    return api.put(`/services/${id}/`, data);
  },
  
  delete(id) {
    if (!id || id === 'undefined') {
      return Promise.reject(new Error('Invalid service ID for deletion'));
    }
    return api.delete(`/services/${id}/`);
  }
};

// Projects API
const projectsApi = {
  getAll(params = {}) {
    return api.get('/projects/', { params });
  },
  
  getById(id) {
    return api.get(`/projects/${id}/`);
  },
  
  create(data) {
    return api.post('/projects/', data);
  },
  
  update(id, data) {
    return api.put(`/projects/${id}/`, data);
  },
  
  delete(id) {
    return api.delete(`/projects/${id}/`);
  }
};

// Team API
const teamApi = {
  getAll(params = {}) {
    return api.get('/team-members/', { params });
  },
  
  getById(id) {
    return api.get(`/team-members/${id}/`);
  },
  
  create(data) {
    return api.post('/team-members/', data);
  },
  
  update(id, data) {
    return api.put(`/team-members/${id}/`, data);
  },
  
  delete(id) {
    return api.delete(`/team-members/${id}/`);
  }
};

// Inquiries API
const inquiriesApi = {
  getAll(params = {}) {
    return api.get('/inquiries/', { params });
  },
  
  getById(id) {
    return api.get(`/inquiries/${id}/`);
  },
  
  getDetail(endpoint) {
    return api.get(`/inquiries/${endpoint}`);
  },
  
  create(data) {
    return api.post('/inquiries/', data);
  },
  
  update(id, data) {
    return api.put(`/inquiries/${id}/`, data);
  },
  
  delete(id) {
    return api.delete(`/inquiries/${id}/`);
  },
  
  // Custom action methods
  markAsRead(id) {
    return api.patch(`/inquiries/${id}/mark_read/`, {});
  },
  
  markInProgress(id) {
    return api.patch(`/inquiries/${id}/`, { status: 'in_progress' });
  },
  
  markAsResponded(id, responseText) {
    return api.patch(`/inquiries/${id}/`, { 
      status: 'responded',
      is_responded: true,
      response_text: responseText
    });
  },
  
  markAsClosed(id) {
    return api.patch(`/inquiries/${id}/`, { status: 'closed' });
  }
};

// Settings API
const settingsApi = {
  getAll() {
    return api.get('/site-settings/');
  },
  
  update(id, data) {
    return api.put(`/site-settings/${id}/`, data);
  }
};

export {
  api,
  authService,
  servicesApi,
  projectsApi,
  teamApi,
  inquiriesApi,
  settingsApi
};
