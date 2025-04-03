import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton,
  Alert,
  Avatar,
  Divider,
  CircularProgress,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  AdminPanelSettings,
  LockOutlined
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login, error: authError, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/admin';
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user types
    setError('');
  };
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('Login form submitted', formData);
    
    // Validate form
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      console.log('Attempting login with credentials...');
      // Call login with credentials
      const result = await login(formData);
      
      console.log('Login successful, result:', result);
      
      // If login successful, redirect
      if (result && result.user) {
        console.log('Navigating to:', from);
        // Use navigate with replace to prevent back navigation to login
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error details:', err);
      // Error handling is done by the AuthContext, but we can set a local error too
      if (!authError) {
        setError('Login failed. Please check your credentials and try again.');
      }
      console.error('Login error:', err);
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <AdminPanelSettings sx={{ fontSize: 32 }} />
          </Avatar>
          
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Admin Login
          </Typography>
          
          {(error || authError) && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error || authError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username or Email"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockOutlined />}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Forgot your password?{' '}
                <Link href="/admin/forgot-password" underline="hover">
                  Reset it here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} DEVIGO Admin Panel
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
