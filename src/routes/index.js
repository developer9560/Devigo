import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Loading component
const LoadingFallback = () => (
  <div className="min-h-[500px] flex items-center justify-center bg-gray-900 text-white">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Lazy load all pages for code splitting
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const Portfolio = lazy(() => import('../pages/Portfolio'));
const PortfolioDetail = lazy(() => import('../pages/PortfolioDetail'));
const Contact = lazy(() => import('../pages/Contact'));
const FAQ = lazy(() => import('../pages/FAQ'));

// Admin pages
const Login = lazy(() => import('../admin/pages/auth/Login'));
const ForgotPassword = lazy(() => import('../admin/pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../admin/pages/auth/ResetPassword'));
const Dashboard = lazy(() => import('../admin/pages/Dashboard'));
const TeamList = lazy(() => import('../admin/pages/team/TeamList'));
const InquiriesList = lazy(() => import('../admin/pages/inquiries/InquiriesList'));
const ServicesList = lazy(() => import('../admin/services/ServicesList'));
const ServiceForm = lazy(() => import('../admin/services/ServiceForm'));

// Route definitions with code splitting
const publicRoutes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    )
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
    )
  },
  {
    path: '/services',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Services />
      </Suspense>
    )
  },
  {
    path: '/services/:serviceId',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ServiceDetail />
      </Suspense>
    )
  },
  {
    path: '/portfolio',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Portfolio />
      </Suspense>
    )
  },
  {
    path: '/portfolio/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PortfolioDetail />
      </Suspense>
    )
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
    )
  },
  {
    path: '/faq',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FAQ />
      </Suspense>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

// Admin routes
const publicAdminRoutes = [
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '/admin/forgot-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForgotPassword />
      </Suspense>
    )
  },
  {
    path: '/admin/reset-password',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResetPassword />
      </Suspense>
    )
  }
];

const protectedAdminRoutes = [
  {
    path: '/admin',
    element: <Navigate to="/admin/dashboard" replace />
  },
  {
    path: '/admin/dashboard',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    )
  },
  {
    path: '/admin/team',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TeamList />
      </Suspense>
    )
  },
  {
    path: '/admin/inquiries',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InquiriesList />
      </Suspense>
    )
  },
  {
    path: '/admin/services',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ServicesList />
      </Suspense>
    )
  },
  {
    path: '/admin/services/new',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ServiceForm />
      </Suspense>
    )
  },
  {
    path: '/admin/services/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ServiceForm />
      </Suspense>
    )
  }
];

export { publicRoutes, publicAdminRoutes, protectedAdminRoutes }; 