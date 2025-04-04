import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-400 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-radial-at-tl from-blue-600/15 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Footer top section */}
      <div className="py-20 px-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* About section */}
            <div className="mb-8">
              <Link to="/" className="flex items-center mb-6">
                <Logo size="medium" />
              </Link>
              <p className="mb-6 leading-relaxed">
                We are a leading web agency specializing in creating innovative digital solutions 
                that help businesses achieve their goals through modern technology and strategic design.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: faFacebookF, href: "https://facebook.com" },
                  { icon: faTwitter, href: "https://twitter.com" },
                  { icon: faInstagram, href: "https://instagram.com" },
                  { icon: faLinkedinIn, href: "https://linkedin.com" },
                  { icon: faGithub, href: "https://github.com" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:bg-blue-600 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600 after:rounded-md">Quick Links</h3>
              <ul>
                {[
                  { to: "/", label: "Home" },
                  { to: "/about", label: "About Us" },
                  { to: "/services", label: "Services" },
                  { to: "/portfolio", label: "Portfolio" },
                  { to: "/faq", label: "FAQ" },
                  { to: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <li key={index} className="mb-4">
                    <Link to={link.to} className="text-gray-400 hover:text-white flex items-center transform hover:translate-x-1 transition-transform duration-300">
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs text-blue-600 mr-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600 after:rounded-md">Our Services</h3>
              <ul>
                {[
                  { to: "/services#web-design", label: "Web Design" },
                  { to: "/services#web-development", label: "Web Development" },
                  { to: "/services#mobile-apps", label: "Mobile Apps" },
                  { to: "/services#seo", label: "SEO Optimization" },
                  { to: "/services#digital-marketing", label: "Digital Marketing" },
                  { to: "/services#brand-strategy", label: "Brand Strategy" }
                ].map((service, index) => (
                  <li key={index} className="mb-4">
                    <Link to={service.to} className="text-gray-400 hover:text-white flex items-center transform hover:translate-x-1 transition-transform duration-300">
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs text-blue-600 mr-3" />
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600 after:rounded-md">Contact Info</h3>
              <ul>
                <li className="flex mb-5">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 mt-1 mr-4 text-lg" />
                  <span>
                    Hauz Khas, New Delhi, <br />
                    Delhi 110016
                  </span>
                </li>
                <li className="flex mb-5">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-600 mt-1 mr-4 text-lg" />
                  <span>+91 9560845683</span>
                </li>
                <li className="flex mb-5">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 mt-1 mr-4 text-lg" />
                  <span>developer95608@gmail.com</span>
                </li>
              </ul>
              
              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="text-white text-lg font-medium mb-4">Subscribe to our Newsletter</h4>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <button type="submit" className="absolute right-0 top-0 h-full w-[46px] bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-300">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer bottom */}
      <div className="bg-black/20 py-6 px-8 border-t border-white/5 relative z-10">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="text-sm">
            &copy; {currentYear} DEVIGO. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 