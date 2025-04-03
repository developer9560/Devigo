import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

/**
 * A wrapper around routes that checks if the user is authenticated
 * If not authenticated, redirects to login page
 * If loading, shows a loading spinner
 */
const ProtectedRoute = ({ children }) => {
  const { isInitialized, isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  
  // Debug log
  useEffect(() => {
    console.log('ProtectedRoute - Current state:', { 
      isInitialized,
      hasUser: !!user,
      isAuthenticated: isAuthenticated(),
      loading,
      path: location.pathname
    });
  }, [isInitialized, user, isAuthenticated, loading, location.pathname]);
  
  // Initial loading - wait for auth to initialize
  if (!isInitialized || loading) {
    console.log('ProtectedRoute - Still loading...');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }
  
  // Check if authenticated - relies on localStorage token + user state
  if (isAuthenticated()) {
    console.log('ProtectedRoute - User is authenticated, rendering route');
    return children;
  }
  
  // Not authenticated - redirect to login
  console.log('ProtectedRoute - User is NOT authenticated, redirecting to login');
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export default ProtectedRoute; 