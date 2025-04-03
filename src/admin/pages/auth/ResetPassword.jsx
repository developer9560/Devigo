import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  Avatar,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  LockReset as LockResetIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { api } from '../../../utility/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const uid = searchParams.get('uid');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !uid) {
        setValidToken(false);
        setTokenChecked(true);
        return;
      }
      
      try {
        // Check if token is valid
        await api.post('/users/verify-reset-token/', { token, uid });
        setValidToken(true);
      } catch (err) {
        setValidToken(false);
        setError('Invalid or expired reset token. Please request a new password reset.');
      } finally {
        setTokenChecked(true);
      }
    };
    
    verifyToken();
  }, [token, uid]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      // Make request to backend to reset password
      await api.post('/users/reset-password/', {
        token,
        uid,
        password: formData.password
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!tokenChecked) {
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
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Verifying reset token...
          </Typography>
        </Box>
      </Container>
    );
  }
  
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
            {validToken ? 'Set New Password' : 'Reset Failed'}
          </Typography>
          
          {!validToken ? (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                {error || 'Invalid or expired password reset link.'}
              </Alert>
              
              <Button
                fullWidth
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/admin/forgot-password')}
              >
                Request New Reset Link
              </Button>
            </Box>
          ) : success ? (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Your password has been successfully reset.
              </Alert>
              
              <Button
                fullWidth
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/admin/login')}
              >
                Back to Login
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Please enter your new password below.
              </Typography>
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
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
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
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
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
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

export default ResetPassword; 