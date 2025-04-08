import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faDesktop, 
  faMobileAlt, 
  faRocket, 
  faSearch, 
  faChartLine, 
  faLongArrowAltRight, 
  faStar, 
  faQuoteRight,
  faLightbulb,
  faPaintBrush,
  faVial,
  faCog,
  faPenRuler,
  faHeadset,
  faExclamationTriangle,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import { motion, useInView, useScroll, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { servicesApi } from '../utility/api'; // Import the services API
import Lottie from 'lottie-react';
import axios from 'axios';
import SEO from '../components/SEO/SEO';
import generateLocalBusinessSchema from '../components/SEO/LocalBusinessSchema';
import { generateWebDevSchema, generateMobileAppSchema, generateUIUXSchema } from '../components/SEO/ServiceSchema';

// Animation variants for different elements
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.175, 0.885, 0.32, 1.275] 
    }
  }
};

// Fallback images for projects
const projectImages = {
  fallback: '/images/fallback-project.jpg',
  e_commerce: '/images/nious.jpg',
  healthcare: '/images/health.jpg',
  real_estate: '/images/real-state.jpg'
};

// Service icons mapping
const serviceIconMap = {
  'Web Development': faCode,
  'Mobile App Development': faMobileAlt,
  'UI/UX Design': faPaintBrush,
  'Digital Marketing': faChartLine,
  'SEO Optimization': faSearch,
  'Cloud Solutions': faDatabase,
  'default': faCode // Default icon if no match
};

// Lazy load the animation data
const animationPath = '/animations/Animation-1743907876911.json';

const Home = () => {
  const heroTitleRef = useRef(null);
  const [services, setServices] = useState([]); // State to hold services data
  const [loadingServices, setLoadingServices] = useState(true); // State for loading services status
  const [serviceError, setServiceError] = useState(null); // Error state for services
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const headings = [
    "Transform Your Ideas into Powerful Digital Products",
    "Building Tomorrow's Digital Solutions Today",
    "Innovative Web Solutions for Modern Businesses",
    "Turn Your Vision into Digital Reality",
    "Custom Software That Drives Business Growth"
  ];
  
  // Create controls for animations
  const controls = useAnimation();
  
  // Projects data
  const projects = [
    {
      id: 1,
      title: "Nexus Marketplace",
      type: "E-commerce",
      description: "A comprehensive e-commerce platform with advanced filtering and payment gateways.",
      image: projectImages.e_commerce || projectImages.fallback,
      result: "+200% Sales",
      link: "/images/e-commerce.jpg"
    },
    {
      id: 2,
      title: "MediConnect",
      type: "Healthcare",
      description: "A telemedicine platform connecting patients with healthcare providers remotely.",
      image: projectImages.healthcare || projectImages.fallback,
      result: "5000+ Users",
      link: "/images/health.jpg"
    },
    {
      id: 3,
      title: "Urban Planner",
      type: "Real Estate",
      description: "Interactive property listing and urban planning visualization tools for developers.",
      image: projectImages.real_estate || projectImages.fallback,
      result: "10+ Lakhs",
      link: "/images/real-state.jpg"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "DEVIGO transformed our online presence completely. Their team delivered a website that exceeded our expectations and has significantly increased our conversions.",
      author: "Rajesh Kumar",
      position: "CEO, Tech Solutions",
      avatar: "/images/imag1.jpg",
      stars: 5
    },
    {
      id: 2,
      text: "Working with DEVIGO was a game-changer for our business. Their attention to detail and technical expertise helped us launch our platform months ahead of schedule.",
      author: "Amit Singh",
      position: "Founder, Business Solutions",
      avatar: "/images/img2.jpg",
      stars: 5
    },
    {
      id: 3,
      text: "The team at DEVIGO doesn't just build websites, they build solutions. Their strategic approach to our project delivered exactly what we needed to succeed in our market.",
      author: "Priyanka Patel",
      position: "Marketing Director, Smart Tech Solutions",
      avatar: "/images/img3.jpg",
      stars: 5
    }
  ];

  // Stats data
  const stats = [
    { value: 90, label: "Projects Completed" },
    { value: 98, label: "Client Satisfaction" },
    { value: 2, label: "Years of Experience" },
    { value: 24, label: "Support Available" }
  ];

  useEffect(() => {
    // Start animations when component mounts
    controls.start("visible");
    
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setServiceError(null); // Reset error state
        const response = await servicesApi.getAll({ featured: true }); // Fetch only featured services
        if (response.data && response.data.results) {
          // Limit to 6 services
          const limitedServices = response.data.results.slice(0, 6).map(service => ({
            ...service,
            icon: serviceIconMap[service.title] || serviceIconMap.default, // Map title to icon or use default
            excerpt: service.excerpt ? (service.excerpt.length > 100 ? `${service.excerpt.substring(0, 100)}...` : service.excerpt) : 'No description available', // Handle possible null excerpts
            link: service.slug ? `/services/${service.slug}` : `/services/${service.id}` // Ensure link exists
          }));
          setServices(limitedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServiceError('Error fetching services. Please try again later.');
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [controls]);

  useEffect(() => {
    // Initialize process section as soon as component mounts
    const initProcessSection = () => {
      const processSection = document.getElementById('process-section');
      if (!processSection) return;
      
      // Initialize the process line
            const lineFill = document.getElementById('process-line-fill');
            if (lineFill) {
              setTimeout(() => {
                lineFill.style.width = '100%';
        }, 500);
            }

      // Initialize the steps
            const steps = document.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('opacity-100');
                step.classList.remove('opacity-0');
                step.classList.add('translate-y-0');
                step.classList.remove('translate-y-8');
                
                // Animate the icon
                const icon = step.querySelector('.process-icon');
                if (icon) {
                  setTimeout(() => {
                    icon.classList.add('bg-blue-600');
                    icon.classList.remove('bg-blue-600/20');
                    icon.classList.add('text-white');
                    icon.classList.remove('text-blue-600/60');
                    icon.classList.add('shadow-lg', 'shadow-blue-600/30');
                  }, 300);
                }
        }, 200 * index);
      });
    };
    
    // Call initialization with a slight delay to ensure DOM is ready
    setTimeout(initProcessSection, 500);
    
    // Set up intersection observer for animations
    const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value === 98 ? '98%' : value === 24 ? '24/7' : value;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };
    
    // Set up observer for stat animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If stat number, animate it
          if (entry.target.classList.contains('stat-number')) {
            const value = parseInt(entry.target.getAttribute('data-value'));
            animateValue(entry.target, 0, value, 2000);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Observe all elements with stat-number class
    document.querySelectorAll('.stat-number').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [headings.length]);

  // Function to generate service skeleton loaders while loading
  const renderServiceSkeletons = () => {
    return Array(6).fill().map((_, index) => (
      <motion.div 
        key={`skeleton-${index}`} 
        className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: index * 0.1 }}
      >
        <div className="w-16 h-16 bg-gray-700 rounded-lg mb-6 animate-pulse"></div>
        <div className="h-7 bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6 mb-6 animate-pulse"></div>
        <div className="h-5 bg-gray-700 rounded w-1/3 animate-pulse"></div>
      </motion.div>
    ));
  };

  // Render services content with appropriate loading/error states
  const renderServicesContent = () => {
  if (loadingServices) {
      return (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {renderServiceSkeletons()}
        </motion.div>
      );
    }

    if (serviceError) {
  return (
        <motion.div 
          className="bg-red-900/20 border border-red-700/50 rounded-lg p-8 text-center max-w-3xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl text-red-500 mb-3" />
          <h3 className="text-xl font-bold mb-2 text-white">Service Error</h3>
          <p className="text-gray-400 mb-6">{serviceError}</p>
          <motion.button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-700/30 hover:bg-red-700/50 text-white rounded-md transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </motion.button>
        </motion.div>
      );
    }

    if (services.length === 0) {
      return (
        <motion.div 
          className="text-center py-10"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <p className="text-gray-400">No services available at the moment.</p>
        </motion.div>
      );
    }

    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((service, index) => (
          <motion.div 
            key={service.id} 
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-500"
            variants={scaleIn}
            custom={index}
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
          >
            <motion.div 
              className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-600/30"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FontAwesomeIcon icon={service.icon || faCode} />
            </motion.div>
            <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{service.excerpt}</p>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link 
                to={service.link || `/services/${service.id}`} 
                className="text-blue-500 font-semibold flex items-center group hover:text-blue-400 transition-colors duration-300"
              >
                Learn More 
                <FontAwesomeIcon 
                  icon={faLongArrowAltRight} 
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                />
            </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Hero Animation Component with error handling
  const HeroAnimation = () => {
    const [animationData, setAnimationData] = useState(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
      // Try to load the animation data
      fetch(animationPath)
        .then(response => {
          if (!response.ok) {
            throw new Error('Animation not found');
          }
          return response.json();
        })
        .then(data => {
          setAnimationData(data);
          setLoadError(false);
        })
        .catch(error => {
          console.error('Error loading animation:', error);
          setLoadError(true);
        });
    }, []);

    if (loadError) {
      // Fallback to a placeholder or icon if animation can't be loaded
      return (
        <div className="w-full h-full flex items-center justify-center text-blue-500">
          <FontAwesomeIcon 
            icon={faCode} 
            className="text-9xl animate-pulse" 
            style={{ filter: "drop-shadow(0 0 30px rgba(10, 102, 194, 0.5))" }}
          />
          </div>
      );
    }

    if (!animationData) {
      // Loading state
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    // Render the animation when data is available
    return (
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 30px rgba(10, 102, 194, 0.5))" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice"
        }}
      />
    );
  };

  // Create structured data for organization with service offerings
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Devigo",
    "url": "https://devigo.in",
    "logo": "https://devigo.in/logo.png",
    "description": "Full-stack web and mobile app development agency providing digital solutions that transform businesses.",
    "email": "contact@devigo.in",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/devigo",
      "https://twitter.com/devigo",
      "https://www.linkedin.com/company/devigo",
      "https://www.instagram.com/devigo"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "url": "https://devigo.in/services/web-development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "url": "https://devigo.in/services/mobile-app-development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design",
            "url": "https://devigo.in/services/ui-ux-design"
          }
        }
      ]
    }
  };

  // Remove top-level loading check so page content is always visible
  return (
    <>
      <SEO 
        title="Devigo | Web & Mobile App Development Agency" 
        description="Transform your ideas into powerful digital products. We build custom web and mobile applications that bring your vision to life with modern technology and stunning design."
        keywords="web development, app development, React, Node.js, mobile apps, UI/UX design, digital transformation, custom software"
        canonicalUrl="https://devigo.in/"
        ogImage="https://devigo.in/og-image.jpg"
        structuredData={organizationSchema}
      />
    
      <div className="w-full bg-gray-900 text-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[90vh] flex items-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(10, 102, 194, 0.8))",
          }}
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <motion.div
              className="absolute top-[-300px] right-[-300px] w-[600px] h-[600px] bg-radial-at-center from-blue-600/30 to-transparent rounded-full z-0"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            ></motion.div>
            <div
              className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(10,102,194,0.8) 0%, rgba(6,69,132,0.3) 70%, rgba(6,69,132,0) 100%)",
                filter: "blur(60px)",
              }}
            ></div>
            <div
              className="absolute bottom-[-30%] right-[-15%] w-[60%] h-[60%] rounded-full opacity-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(10,102,194,0.8) 0%, rgba(6,69,132,0.3) 70%, rgba(6,69,132,0) 100%)",
                filter: "blur(80px)",
              }}
            ></div>
        </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center">
            {/* Text Content */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={currentHeadingIndex}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent leading-tight whitespace-pre-wrap"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  {headings[currentHeadingIndex].split(' ').map((word, index) => (
                    <motion.span
                      key={`${currentHeadingIndex}-word-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.1 * index,
                        ease: "easeOut"
                      }}
                      style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.3em' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
              </AnimatePresence>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We build custom web and mobile applications that bring your vision to life with modern technology and stunning design.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <a href="/contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-md shadow-lg shadow-blue-600/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300">
                  Let's Build Your Project
                </a>
                <a href="/services" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border border-white/30 hover:bg-white/10 hover:border-white transition-all duration-300">
                  View Our Services
                </a>
              </motion.div>
            </motion.div>

            {/* Animation */}
            <motion.div 
              className="lg:w-1/2 flex justify-center items-center relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Glow effect behind animation */}
              <div className="absolute w-full h-full max-w-md max-h-md rounded-full" style={{
                background: "radial-gradient(circle, rgba(10,102,194,0.3) 0%, rgba(6,69,132,0.1) 50%, rgba(0,0,0,0) 70%)",
                filter: "blur(40px)",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
                zIndex: -1
              }}></div>
              
              <HeroAnimation />
            </motion.div>
          </div>
        </motion.section>

      {/* Feature Cards Section */}
        <motion.section 
          className="py-16 px-8 bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
        <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
            {/* Fast Delivery Card */}
              <motion.div 
                className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform duration-300 border border-gray-700/50"
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faRocket} className="text-blue-500 text-2xl" />
                  </div>
                </motion.div>
              <h3 className="text-xl font-bold mb-4 text-blue-500">Fast Delivery</h3>
              <p className="text-gray-400">
                Get your project done in record time without compromising quality.
              </p>
              </motion.div>

            {/* Custom Solutions Card */}
              <motion.div 
                className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform duration-300 border border-gray-700/50"
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faLightbulb} className="text-blue-500 text-2xl" />
                  </div>
                </motion.div>
              <h3 className="text-xl font-bold mb-4 text-blue-500">Custom Solutions</h3>
              <p className="text-gray-400">
                Fully personalized websites and apps that meet your specific requirements.
              </p>
              </motion.div>

            {/* Affordable Pricing Card */}
              <motion.div 
                className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform duration-300 border border-gray-700/50"
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-2xl" />
                  </div>
                </motion.div>
              <h3 className="text-xl font-bold mb-4 text-blue-500">Affordable Pricing</h3>
              <p className="text-gray-400">
                Enjoy top-notch services within your budget.
              </p>
              </motion.div>

            {/* 24/7 Support Card */}
              <motion.div 
                className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform duration-300 border border-gray-700/50"
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex justify-center mb-4"
                >
                  <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeadset} className="text-blue-500 text-2xl" />
                  </div>
                </motion.div>
              <h3 className="text-xl font-bold mb-4 text-blue-500">24/7 Support</h3>
              <p className="text-gray-400">
                Our team is always here to assist you at every step.
              </p>
              </motion.div>
            </motion.div>
            </div>
        </motion.section>

      {/* Stats Section */}
        <motion.section 
          className="py-12 bg-gray-800/90 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          {/* Background Decoration */}
          <motion.div 
            className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          
          <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-around relative z-10">
          {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center p-6 w-full sm:w-1/2 md:w-1/4"
                variants={scaleIn}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <motion.h2 
                className="stat-number text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent"
                data-value={stat.value}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    delay: 0.1 * index,
                    duration: 1 
                  }}
              >
                {stat.value === 98 ? '98%' : stat.value === 24 ? '24/7' : stat.value}
                </motion.h2>
                <motion.p 
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (0.1 * index) }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
          ))}
        </div>
        </motion.section>

      {/* Services Section */}
        <motion.section 
          className="py-20 px-8 bg-gray-900 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          {/* Background Decoration */}
          <motion.div 
            className="absolute top-40 left-0 w-32 h-32 rounded-full bg-blue-500/10"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-40 right-0 w-64 h-64 rounded-full bg-blue-500/5"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
            >
              <motion.h2 
                className="text-4xl font-bold mb-4 inline-block relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.8 }}
              >
              Our Services
                <motion.span 
                  className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  viewport={{ once: true }}
                ></motion.span>
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-3xl mx-auto mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
              >
              Comprehensive digital solutions to help your business thrive in the digital landscape
              </motion.p>
            </motion.div>
            
            {renderServicesContent()}
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
            <Link 
              to="/services" 
              className="px-8 py-3 border border-blue-600 text-blue-500 font-semibold rounded-md hover:bg-blue-600/10 transition-all duration-300"
            >
              View All Services
            </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

      {/* Projects Section */}
        <motion.section 
          className="py-20 px-8 bg-gray-800 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
        <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
            >
              <motion.h2 
                className="text-4xl font-bold mb-4 inline-block relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.8 }}
              >
              Featured Projects
                <motion.span 
                  className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  viewport={{ once: true }}
                ></motion.span>
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-3xl mx-auto mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
              >
              Explore some of our recent work and the results we've achieved for our clients
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {projects.map((project, index) => (
                <motion.div 
                key={project.id} 
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <motion.div 
                    className="h-64 bg-cover bg-center relative overflow-hidden" 
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#1f2937' // Fallback color
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end p-6">
                      <motion.span 
                        className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                      {project.result}
                      </motion.span>
                  </div>
                  </motion.div>
                
                <div className="p-6">
                    <motion.span 
                      className="inline-block bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full text-xs mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                    {project.type}
                    </motion.span>
                    <motion.h3 
                      className="text-xl font-bold mb-2 text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-400 mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                  <Link 
                    to={project.link} 
                    className="text-blue-500 font-semibold flex items-center group hover:text-blue-400 transition-colors duration-300"
                  >
                    View Case Study 
                    <FontAwesomeIcon 
                      icon={faLongArrowAltRight} 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                    />
                  </Link>
                    </motion.div>
                </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
            <Link 
              to="/portfolio" 
              className="px-8 py-3 border border-blue-600 text-blue-500 font-semibold rounded-md hover:bg-blue-600/10 transition-all duration-300"
            >
              View All Projects
            </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

      {/* Testimonials Section */}
        <motion.section 
          className="py-20 px-8 bg-gray-900 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          {/* Background Elements */}
          <motion.div
            className="absolute top-20 right-20 text-9xl opacity-5 text-blue-500"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.05, 0.08, 0.05]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <FontAwesomeIcon icon={faQuoteRight} />
          </motion.div>
          
        <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={fadeIn}
            >
              <motion.h2 
                className="text-4xl font-bold mb-4 inline-block relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
              Client Testimonials
                <motion.span 
                  className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  viewport={{ once: true }}
                ></motion.span>
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-3xl mx-auto mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
              >
              Hear what our clients have to say about their experience working with us
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div 
                key={testimonial.id} 
                  className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 transition-all duration-300 relative"
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <motion.div
                  className="absolute top-8 left-8 text-2xl text-blue-600 opacity-20" 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.5,
                      type: "spring" 
                    }}
                    animate={{ 
                      rotate: [0, 12, 0, -12, 0], 
                      transition: { 
                        rotate: { 
                          repeat: Infinity, 
                          repeatType: "loop", 
                          duration: 5,
                          ease: "easeInOut",
                          times: [0, 0.25, 0.5, 0.75, 1],
                          type: "tween" 
                        }
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    <FontAwesomeIcon icon={faQuoteRight} />
                  </motion.div>
                  
                  <motion.div 
                    className="flex gap-1 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
                  ))}
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-400 italic mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                  "{testimonial.text}"
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-cover bg-center mr-4 bg-gray-700" 
                    style={{ backgroundImage: `url(${testimonial.avatar})` }}
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      viewport={{ once: true }}
                    ></motion.div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                  </motion.div>
                </motion.div>
            ))}
            </motion.div>
          </div>
        </motion.section>

      {/* Development Process Section */}
        <motion.section 
          className="py-20 bg-gray-900" 
          id="process-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
        <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-14"
              variants={fadeIn}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Our Development Process
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
              >
                Our streamlined approach ensures quality results on time and within budget
              </motion.p>
            </motion.div>
          
          <div className="relative mx-auto max-w-5xl px-5">
            {/* Timeline line */}
              <motion.div 
                className="absolute top-[60px] left-0 right-0 h-1 bg-gray-700/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
              {/* Animated fill line */}
                <motion.div 
                  id="process-line-fill" 
                  className="h-full bg-blue-600 w-0"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  viewport={{ once: true }}
                ></motion.div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                variants={staggerContainer}
              >
              {/* Discovery */}
                <motion.div 
                  className="process-step flex flex-col items-center"
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "#0A66C2", color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                  <FontAwesomeIcon icon={faSearch} />
                  </motion.div>
                <h3 className="font-semibold text-white text-lg mb-2">Discovery</h3>
                <p className="text-gray-400 text-center text-sm">Understand your needs and gather requirements</p>
                </motion.div>
              
              {/* Design */}
                <motion.div 
                  className="process-step flex flex-col items-center"
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "#0A66C2", color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                  <FontAwesomeIcon icon={faPenRuler} />
                  </motion.div>
                <h3 className="font-semibold text-white text-lg mb-2">Design</h3>
                <p className="text-gray-400 text-center text-sm">Create wireframes and visual layouts</p>
                </motion.div>
              
              {/* Development */}
                <motion.div 
                  className="process-step flex flex-col items-center"
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "#0A66C2", color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                  <FontAwesomeIcon icon={faCode} />
                  </motion.div>
                <h3 className="font-semibold text-white text-lg mb-2">Development</h3>
                <p className="text-gray-400 text-center text-sm">Build with clean, efficient code</p>
                </motion.div>
              
              {/* Testing */}
                <motion.div 
                  className="process-step flex flex-col items-center"
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "#0A66C2", color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                  <FontAwesomeIcon icon={faVial} />
                  </motion.div>
                <h3 className="font-semibold text-white text-lg mb-2">Testing</h3>
                <p className="text-gray-400 text-center text-sm">Rigorous QA to ensure perfection</p>
                </motion.div>
              
              {/* Launch */}
                <motion.div 
                  className="process-step flex flex-col items-center"
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "#0A66C2", color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                  <FontAwesomeIcon icon={faRocket} />
                  </motion.div>
                <h3 className="font-semibold text-white text-lg mb-2">Launch</h3>
                <p className="text-gray-400 text-center text-sm">Deploy and go live with confidence</p>
                </motion.div>
              
              {/* Support */}
                <motion.div 
                  className="process-step flex flex-col items-center"
                  variants={fadeIn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "#0A66C2", color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                  <FontAwesomeIcon icon={faHeadset} />
                  </motion.div>
                <h3 className="font-semibold text-white text-lg mb-2">Support</h3>
                <p className="text-gray-400 text-center text-sm">Ongoing maintenance and updates</p>
                </motion.div>
              </motion.div>
              </div>
            </div>
        </motion.section>

      {/* CTA Section */}
        <motion.section 
          className="py-20 px-8 bg-gradient-to-r from-blue-900/90 to-blue-700/90 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          {/* Animated Background */}
          <motion.div 
            className="absolute inset-0 bg-pattern opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          
          {/* Light Beams */}
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Project?
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              viewport={{ once: true }}
            >
            Let's discuss how we can help you achieve your business goals with our tailored digital solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
          <Link 
            to="/contact" 
                  className="px-10 py-4 bg-white text-blue-700 font-semibold rounded-md shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 transition-all duration-300"
          >
            Contact Us Today
          </Link>
              </motion.div>
            </motion.div>
        </div>
        </motion.section>

      {/* Clients Section */}
        <motion.section 
          className="py-16 px-8 bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
        <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              variants={fadeIn}
            >
              <motion.h2 
                className="text-4xl font-bold mb-4 inline-block relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
              Trusted By
                <motion.span 
                  className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  viewport={{ once: true }}
                ></motion.span>
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-3xl mx-auto mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
              >
              Join our growing list of satisfied clients from various industries
              </motion.p>
            </motion.div>
          
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-12"
              variants={staggerContainer}
            >
            {[1, 2, 3, 4, 5].map((index) => (
                <motion.div 
                key={index} 
                  className="h-[70px] flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.1,
                    opacity: 1
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <img src={`/images/client${index}.png`} alt={`Client Logo ${index}`} className="max-h-full" />
                </motion.div>
            ))}
            </motion.div>
          </div>
        </motion.section>
        </div>
    </>
  );
};

export default Home; 