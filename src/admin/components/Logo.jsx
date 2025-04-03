// frontend/src/admin/components/Logo.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'medium', color = 'primary', withText = true }) => {
  const sizes = {
    small: 32,
    medium: 40,
    large: 48
  };

  const logoSize = sizes[size] || sizes.medium;

  return (
    <Link to="/admin" style={{ textDecoration: 'none' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: logoSize,
            height: logoSize,
            bgcolor: color === 'primary' ? '#0A66C2' : 'white',
            color: color === 'primary' ? 'white' : '#0A66C2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            fontWeight: 700,
            fontSize: logoSize * 0.5,
          }}
        >
          D
        </Box>
        {withText && (
          <Typography
            variant={size === 'small' ? 'h6' : 'h5'}
            component="span"
            sx={{
              ml: 1,
              fontWeight: 700,
              color: color === 'primary' ? '#0A66C2' : 'white',
            }}
          >
            DEVIGO
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default Logo;