// frontend/src/admin/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
  ListItem, ListItemIcon, ListItemText, Collapse, Avatar, Menu, MenuItem, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Dashboard as DashboardIcon,
  Web as WebIcon, People as PeopleIcon, Settings as SettingsIcon,
  ExpandLess, ExpandMore, Logout as LogoutIcon, Article as ArticleIcon,
  Work as WorkIcon, Star as StarIcon, Palette as PaletteIcon, Comment as CommentIcon,
  Notifications as NotificationsIcon, Person as PersonIcon, Search as SearchIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [navMenus, setNavMenus] = useState({});
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (menu) => {
    setNavMenus({
      ...navMenus,
      [menu]: !navMenus[menu]
    });
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Navigation items with nested structure
  const navigationItems = [
    { title: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    {
      title: 'Content',
      icon: <ArticleIcon />,
      submenu: [
        { title: 'Services', path: '/admin/services' },
        { title: 'Projects', path: '/admin/projects' },
        { title: 'Team Members', path: '/admin/team' },
        { title: 'Testimonials', path: '/admin/testimonials' },
        { title: 'Blog Posts', path: '/admin/blog' },
      ]
    },
    {
      title: 'Website',
      icon: <WebIcon />,
      submenu: [
        { title: 'Homepage', path: '/admin/homepage' },
        { title: 'About Page', path: '/admin/about' },
        { title: 'Contact Info', path: '/admin/contact' },
        { title: 'SEO Settings', path: '/admin/seo' },
        { title: 'Global Settings', path: '/admin/settings' },
      ]
    },
    {
      title: 'Users & Leads',
      icon: <PeopleIcon />,
      submenu: [
        { title: 'Admin Users', path: '/admin/users' },
        { title: 'Lead Management', path: '/admin/leads' },
        { title: 'Contact Inquiries', path: '/admin/inquiries' },
      ]
    },
  ];

  const renderNavItems = (items) => {
    return items.map((item) => {
      if (item.submenu) {
        const isMenuOpen = navMenus[item.title] || isActive(item.submenu[0].path);
        return (
          <React.Fragment key={item.title}>
            <ListItem 
              button 
              onClick={() => handleMenuClick(item.title)}
              sx={{
                borderLeft: isMenuOpen ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                pl: isMenuOpen ? 2 : 2.5,
                py: 1.2,
              }}
            >
              <ListItemIcon sx={{ color: isMenuOpen ? theme.palette.primary.main : 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{ 
                  fontWeight: isMenuOpen ? 600 : 400,
                  color: isMenuOpen ? theme.palette.primary.main : 'inherit'
                }}
              />
              {isMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.submenu.map((subItem) => {
                  const isSubActive = location.pathname === subItem.path;
                  return (
                    <ListItem 
                      button 
                      key={subItem.title} 
                      component={Link} 
                      to={subItem.path}
                      sx={{
                        pl: 7,
                        py: 0.8,
                        background: isSubActive ? 'rgba(10, 102, 194, 0.08)' : 'transparent',
                        borderLeft: isSubActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                        pl: isSubActive ? 6.7 : 7,
                      }}
                    >
                      <ListItemText 
                        primary={subItem.title} 
                        primaryTypographyProps={{ 
                          fontSize: '0.9rem',
                          fontWeight: isSubActive ? 500 : 400,
                          color: isSubActive ? theme.palette.primary.main : 'inherit'
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        );
      } else {
        const isItemActive = location.pathname === item.path;
        return (
          <ListItem 
            button 
            key={item.title} 
            component={Link} 
            to={item.path}
            sx={{
              borderLeft: isItemActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
              pl: isItemActive ? 2 : 2.5,
              py: 1.2,
            }}
          >
            <ListItemIcon sx={{ color: isItemActive ? theme.palette.primary.main : 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.title}
              primaryTypographyProps={{ 
                fontWeight: isItemActive ? 600 : 400,
                color: isItemActive ? theme.palette.primary.main : 'inherit'
              }}
            />
          </ListItem>
        );
      }
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          color: theme.palette.text.primary,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Devigo Admin
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton 
              edge="end" 
              color="inherit"
              onClick={handleProfileClick}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  backgroundColor: theme.palette.primary.main,
                  fontSize: '0.9rem'
                }}
                alt={user?.username}
                src={user?.avatar}
              >
                {user?.username?.charAt(0) || 'A'}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1, minWidth: 180 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {user?.username || 'Admin User'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email || 'admin@example.com'}
                </Typography>
              </Box>
              <Divider />
              <MenuItem component={Link} to="/admin/profile" onClick={handleProfileClose} dense>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout} dense>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            bgcolor: theme.palette.mode === 'dark' ? '#1a2035' : '#fff',
            borderRight: `1px solid ${theme.palette.divider}`
          },
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          py: 2
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#0A66C2' }}>
            DEVIGO
          </Typography>
        </Toolbar>
        <Divider />
        <Box sx={{ overflow: 'auto', py: 2 }}>
          <List component="nav">
            {renderNavItems(navigationItems)}
          </List>
        </Box>
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f5f7fb',
          minHeight: '100vh',
          pt: { xs: 8, sm: 9 }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;