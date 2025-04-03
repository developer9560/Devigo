import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Avatar,
  CircularProgress
} from '@mui/material';
import { 
  LockReset as LockResetIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { api } from '../../../utility/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    
    try {
      // Make request to backend for password reset
      await api.post('/users/reset-password-request/', { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
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
            <LockResetIcon sx={{ fontSize: 32 }} />
          </Avatar>
          
          <Typography component="h1" variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            Reset Password
          </Typography>
          
          <Typography color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Enter your email address and we'll send you instructions to reset your password.
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success ? (
            <Box sx={{ width: '100%' }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                We've sent password reset instructions to your email address. Please check your inbox.
              </Alert>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/admin/login')}
              >
                Back to Login
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
                disabled={loading}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockResetIcon />}
              >
                {loading ? 'Sending...' : 'Reset Password'}
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link to="/admin/login" style={{ textDecoration: 'none', color: 'primary.main' }}>
                  <Typography variant="body2" color="primary">
                    Back to Login
                  </Typography>
                </Link>
              </Box>
            </Box>
          )}
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

export default ForgotPassword; 