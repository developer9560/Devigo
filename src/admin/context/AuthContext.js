import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../../utility/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Track authentication state
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize on mount only - check localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        // Check if token exists
        const isLoggedIn = authService.isAuthenticated();
        
        if (isLoggedIn) {
          // Get user data from localStorage
          const userData = authService.getUserData();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };

    initAuth();
  }, []); // Empty dependency array - only run once

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(credentials);
      setUser(result.user);
      return result;
    } catch (err) {
      const errorMessage = 
        err.response?.data?.error || 
        err.response?.data?.detail || 
        'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Only call this when absolutely necessary
  const refreshUserData = async () => {
    if (!authService.isAuthenticated()) {
      return;
    }
    
    setLoading(true);
    try {
      const userData = await authService.fetchUserFromServer();
      setUser(userData);
    } catch (err) {
      console.error('Failed to refresh user data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Return auth context value
  const contextValue = {
    isInitialized,
    user,
    loading,
    error,
    login,
    logout,
    refreshUserData,
    isAuthenticated: () => authService.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 