import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEnvelope, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ease-in-out ${
      scrolled ? 'bg-black/95 backdrop-blur-md shadow-md h-[70px]' : 'bg-transparent'
    } animate-fadeInDown`}>
      <div className="max-w-7xl h-full mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo size="medium" />

        </Link>

        {/* Mobile Menu Button */}
        <div 
          className="lg:hidden text-white text-2xl cursor-pointer z-[200] transform transition-transform duration-300 hover:scale-110 active:scale-90"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon 
            icon={isOpen ? faTimes : faBars} 
            className={`transition-all duration-500 transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center">
          <ul className="flex items-center">
            {navigationLinks.map(({ path, label }) => (
              <li key={path} className="mx-4">
                <Link 
                  to={path} 
                  className={`text-white hover:text-blue-400 text-sm font-medium py-1 relative transition-all duration-300
                    ${location.pathname === path ? 'text-blue-400' : ''}
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 
                    after:transform after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                    hover:after:origin-left hover:after:scale-x-100
                    ${location.pathname === path ? 'after:origin-left after:scale-x-100' : ''}
                  `}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="ml-4">
              <Link
                to="/contact"
                className="flex items-center justify-center px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 transition-transform duration-300 group-hover:rotate-12" />
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Backdrop overlay for mobile */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-all duration-500 lg:hidden ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed top-0 left-0 w-[70%] max-w-xs h-screen bg-gradient-to-b from-gray-900 to-blue-900/90 pt-20 z-[150] shadow-xl shadow-black/50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          <ul className="flex flex-col w-full">
            {navigationLinks.map(({ path, label }, index) => (
              <li 
                key={path} 
                className="w-full px-6 my-2 transform transition-all duration-300 opacity-0 -translate-x-8"
                style={{ 
                  transitionDelay: isOpen ? `${index * 80}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-2rem)',
                }}
              >
                <Link 
                  to={path} 
                  className={`text-white hover:text-blue-400 text-base font-medium py-3 relative transition-all duration-300 flex items-center 
                    ${location.pathname === path ? 'text-blue-400' : ''}
                    group/nav-item hover:translate-x-1
                  `}
                >
                  {label}
                  <span className="ml-auto">
                    <FontAwesomeIcon 
                      icon={faAngleRight} 
                      className="text-gray-500 group-hover/nav-item:text-blue-400 transition-transform duration-300 group-hover/nav-item:translate-x-1" 
                    />
                  </span>
                </Link>
                {location.pathname === path && (
                  <div className="bg-blue-600/20 w-1 absolute left-0 top-0 h-full">
                    <div className="absolute inset-0 bg-blue-500/30 animate-pulse"></div>
                  </div>
                )}
              </li>
            ))}
            <li 
              className="mt-8 px-6 transform transition-all duration-500 opacity-0 -translate-y-8"
              style={{ 
                transitionDelay: isOpen ? '450ms' : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-2rem)',
              }}
            >
              <Link
                to="/contact"
                className="flex items-center justify-center px-5 py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 w-full hover:scale-105 active:scale-95 group"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 transition-transform duration-300 group-hover:rotate-12" />
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 