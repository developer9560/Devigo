import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

// Public Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Admin Context & Components
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';

// Admin Auth Pages
import Login from './admin/pages/auth/Login';
import ForgotPassword from './admin/pages/auth/ForgotPassword';
import ResetPassword from './admin/pages/auth/ResetPassword';

// Admin Pages - Import only existing ones
import Dashboard from './admin/pages/Dashboard';
import TeamList from './admin/pages/team/TeamList';
import InquiriesList from './admin/pages/inquiries/InquiriesList';

// Admin Services Pages
import ServicesList from './admin/services/ServicesList';
import ServiceForm from './admin/services/ServiceForm';

// Admin Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const adminTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A66C2',
    },
    secondary: {
      main: '#5E35B1',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#f8fafc',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('light-theme');
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ThemeProvider theme={adminTheme}>
              <CssBaseline />
              <Routes>
                {/* Public admin routes */}
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                
                {/* Protected admin routes */}
                <Route path="*" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  
                  {/* Team routes - partial implementation */}
                  <Route path="team" element={<TeamList />} />
                  
                  {/* Inquiries management */}
                  <Route path="inquiries" element={<InquiriesList />} />
                  
                  {/* Services management */}
                  <Route path="services" element={<ServicesList />} />
                  <Route path="services/new" element={<ServiceForm />} />
                  <Route path="services/:id" element={<ServiceForm />} />
                </Route>
              </Routes>
            </ThemeProvider>
          } />

          {/* Public Website Routes */}
          <Route path="*" element={
            <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
              <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:serviceId" element={<ServiceDetail />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  
                  {/* Redirect unknown routes to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
