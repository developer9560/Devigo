import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';

const Navbar = ({ toggleTheme, isDarkTheme }) => {
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

  return (
    <nav className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ease-in-out ${
      scrolled ? 'bg-black/95 backdrop-blur-md shadow-md h-[70px]' : 'bg-transparent'
    } animate-fadeInDown`}>
      <div className="max-w-7xl h-full mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo size="medium" />
        </Link>

        <div 
          className="lg:hidden text-white text-2xl cursor-pointer"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>

        <ul className={`lg:flex lg:items-center ${
          isOpen 
            ? 'fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] flex flex-col bg-black/98 backdrop-blur-md pt-8 transition-all duration-400 ease-in-out'
            : 'fixed top-[70px] -left-full w-full h-[calc(100vh-70px)] flex flex-col bg-black/98 backdrop-blur-md pt-8 transition-all duration-400 ease-in-out lg:static lg:h-auto lg:w-auto lg:bg-transparent lg:flex-row lg:pt-0'
        }`}>
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/services', label: 'Services' },
            { path: '/portfolio', label: 'Portfolio' },
            { path: '/faq', label: 'FAQ' },
            { path: '/contact', label: 'Contact' }
          ].map(({ path, label }) => (
            <li key={path} className="lg:mx-4 my-6 lg:my-0">
              <Link 
                to={path} 
                className={`text-white hover:text-blue-600 text-base lg:text-sm font-medium py-1 relative transition-colors duration-300 
                  ${location.pathname === path ? 'text-blue-600' : ''}
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
          <li className="lg:ml-4 mt-8 lg:mt-0">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 hover:text-blue-600 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 