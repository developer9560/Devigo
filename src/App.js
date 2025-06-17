import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO/SEO';

// Public Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

// Admin Context & Components
import { AuthProvider } from './admin/context/AuthContext';
import { ServicesProvider } from './admin/context/ServicesContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/layouts/AdminLayout';

// Admin Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Admin Auth Pages with lazy loading
const Login = lazy(() => import('./admin/pages/auth/Login'));
const ForgotPassword = lazy(() => import('./admin/pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./admin/pages/auth/ResetPassword'));

// Admin Pages with lazy loading
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const TeamList = lazy(() => import('./admin/pages/team/TeamList'));
const TeamMembersList = lazy(() => import('./admin/pages/team/TeamMembersList'));
const TeamMemberForm = lazy(() => import('./admin/pages/team/TeamMemberForm'));
const InquiriesList = lazy(() => import('./admin/pages/inquiries/InquiriesList'));
const ProjectList = lazy(()=>import('./admin/pages/projects/ProjectsList'))

// Admin Services Pages with lazy loading
const ServicesList = lazy(() => import('./admin/services/ServicesList'));
const ServiceForm = lazy(() => import('./admin/services/ServiceForm'));

// Admin Projects Pages with lazy loading
const ProjectsList = lazy(() => import('./admin/pages/projects/ProjectsList'));
const ProjectForm = lazy(() => import('./admin/pages/projects/ProjectForm'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-[500px] flex items-center justify-center bg-gray-900 text-white">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
    <HelmetProvider>
      <Router>
        <SEO /> {/* Default SEO that applies site-wide */}
        <AuthProvider>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ThemeProvider theme={adminTheme}>
                <CssBaseline />
                <Routes>
                  {/* Public admin routes */}
                  <Route path="login" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Login />
                    </Suspense>
                  } />
                  <Route path="forgot-password" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ForgotPassword />
                    </Suspense>
                  } />
                  <Route path="reset-password" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ResetPassword />
                    </Suspense>
                  } />
                  
                  {/* Protected admin routes */}
                  <Route path="*" element={
                    // <ProtectedRoute>
                      <AdminLayout />
                    // </ProtectedRoute>
                  }>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Dashboard />
                      </Suspense>
                    } />
                    
                    {/* Team routes */}
                    <Route path="team" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <TeamMembersList />
                      </Suspense>
                    } />
                    <Route path="team/new" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <TeamMemberForm />
                      </Suspense>
                    } />
                    <Route path="team/:id" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <TeamMemberForm />
                      </Suspense>
                    } />
                    
                    {/* Inquiries management */}
                    <Route path="inquiries" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <InquiriesList />
                      </Suspense>
                    } />
                    
                    {/* Services management */}
                    <Route path="services" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ServicesList />
                      </Suspense>
                    } />
                    <Route path="services/new" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ServiceForm />
                      </Suspense>
                    } />
                    <Route path="services/:id" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ServiceForm />
                      </Suspense>
                    } />

                    {/* Projects management */}
                    <Route path="projects" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ProjectsList />
                      </Suspense>
                    } />
                    <Route path="projects/create" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ServicesProvider>
                          <ProjectForm />
                        </ServicesProvider>
                      </Suspense>
                    } />
                    <Route path="projects/edit/:id" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ServicesProvider>
                          <ProjectForm />
                        </ServicesProvider>
                      </Suspense>
                    } />
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
                    <Route path="/" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Home />
                      </Suspense>
                    } />
                    <Route path="/about" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <About />
                      </Suspense>
                    } />
                    <Route path="/services" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Services />
                      </Suspense>
                    } />
                    <Route path="/services/:serviceId" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ServiceDetail />
                      </Suspense>
                    } />
                    <Route path="/portfolio" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Portfolio />
                      </Suspense>
                    } />
                    <Route path="/portfolio/:id" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <PortfolioDetail />
                      </Suspense>
                    } />
                    <Route path="/contact" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Contact />
                      </Suspense>
                    } />
                    <Route path="/faq" element={
                      <Suspense fallback={<LoadingFallback />}>
                        <FAQ />
                      </Suspense>
                    } />
                    
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
    </HelmetProvider>
  );
};

export default App;
