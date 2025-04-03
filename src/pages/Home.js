import React, { useEffect, useRef, useState } from 'react';
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
import { servicesApi } from '../utility/api'; // Import the services API

// Fallback images for projects
const projectImages = {
  fallback: '/images/fallback-project.jpg',
  e_commerce: '/images/e-commerce.jpg',
  healthcare: '/images/healthcare.jpg',
  real_estate: '/images/real-estate.jpg'
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

const Home = () => {
  const heroTitleRef = useRef(null);
  const [services, setServices] = useState([]); // State to hold services data
  const [loadingServices, setLoadingServices] = useState(true); // State for loading services status
  const [serviceError, setServiceError] = useState(null); // Error state for services
  
  // Projects data
  const projects = [
    {
      id: 1,
      title: "Nexus Marketplace",
      type: "E-commerce",
      description: "A comprehensive e-commerce platform with advanced filtering and payment gateways.",
      image: projectImages.e_commerce || projectImages.fallback,
      result: "+200% Sales",
      link: "/portfolio/nexus-marketplace"
    },
    {
      id: 2,
      title: "MediConnect",
      type: "Healthcare",
      description: "A telemedicine platform connecting patients with healthcare providers remotely.",
      image: projectImages.healthcare || projectImages.fallback,
      result: "5000+ Users",
      link: "/portfolio/mediconnect"
    },
    {
      id: 3,
      title: "Urban Planner",
      type: "Real Estate",
      description: "Interactive property listing and urban planning visualization tools for developers.",
      image: projectImages.real_estate || projectImages.fallback,
      result: "$2M Funding",
      link: "/portfolio/urban-planner"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "DEVIGO transformed our online presence completely. Their team delivered a website that exceeded our expectations and has significantly increased our conversions.",
      author: "Sarah Johnson",
      position: "CEO, Nexus Inc.",
      avatar: "/images/testimonial1.jpg",
      stars: 5
    },
    {
      id: 2,
      text: "Working with DEVIGO was a game-changer for our business. Their attention to detail and technical expertise helped us launch our platform months ahead of schedule.",
      author: "Michael Rodriguez",
      position: "Founder, MediConnect",
      avatar: "/images/testimonial2.jpg",
      stars: 5
    },
    {
      id: 3,
      text: "The team at DEVIGO doesn't just build websites, they build solutions. Their strategic approach to our project delivered exactly what we needed to succeed in our market.",
      author: "Emily Chen",
      position: "Marketing Director, Urban Housing",
      avatar: "/images/testimonial3.jpg",
      stars: 5
    }
  ];

  // Stats data
  const stats = [
    { value: 450, label: "Projects Completed" },
    { value: 98, label: "Client Satisfaction" },
    { value: 8, label: "Years of Experience" },
    { value: 24, label: "Support Available" }
  ];

  useEffect(() => {
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
  }, []);

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

  // Function to generate service skeleton loaders while loading
  const renderServiceSkeletons = () => {
    return Array(6).fill().map((_, index) => (
      <div key={`skeleton-${index}`} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50">
        <div className="w-16 h-16 bg-gray-700 rounded-lg mb-6 animate-pulse"></div>
        <div className="h-7 bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6 mb-6 animate-pulse"></div>
        <div className="h-5 bg-gray-700 rounded w-1/3 animate-pulse"></div>
      </div>
    ));
  };

  // Render services content with appropriate loading/error states
  const renderServicesContent = () => {
    if (loadingServices) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderServiceSkeletons()}
        </div>
      );
    }

    if (serviceError) {
      return (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl text-red-500 mb-3" />
          <h3 className="text-xl font-bold mb-2 text-white">Service Error</h3>
          <p className="text-gray-400 mb-6">{serviceError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-700/30 hover:bg-red-700/50 text-white rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (services.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-400">No services available at the moment.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-blue-600/30">
              <FontAwesomeIcon icon={service.icon || faCode} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{service.excerpt}</p>
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
          </div>
        ))}
      </div>
    );
  };

  // Remove top-level loading check so page content is always visible
  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between min-h-screen p-8 bg-gradient-to-br from-black/90 to-blue-900/80 relative overflow-hidden">
        <div className="absolute top-[-300px] right-[-300px] w-[600px] h-[600px] bg-radial-at-center from-blue-600/30 to-transparent rounded-full z-0"></div>
        
        <div className="max-w-2xl z-10">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent leading-tight"
          >
            We Build Digital Experiences That Transform Businesses
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            DEVIGO is a premier web agency specializing in crafting innovative digital solutions 
            that drive growth and deliver exceptional user experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-md shadow-lg shadow-blue-600/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300">
              Get Started
            </Link>
            <Link to="/services" className="px-8 py-4 bg-transparent text-white font-semibold rounded-md border border-white/30 hover:bg-white/10 hover:border-white transition-all duration-300">
              Explore Services
            </Link>
          </div>
        </div>
        
        <div className="mt-12 lg:mt-0 z-10">
          {/* Hero image placeholder */}
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fast Delivery Card */}
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 duration-300 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4 text-blue-500">Fast Delivery</h3>
              <p className="text-gray-400">
                Get your project done in record time without compromising quality.
              </p>
            </div>

            {/* Custom Solutions Card */}
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 duration-300 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4 text-blue-500">Custom Solutions</h3>
              <p className="text-gray-400">
                Fully personalized websites and apps that meet your specific requirements.
              </p>
            </div>

            {/* Affordable Pricing Card */}
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 duration-300 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4 text-blue-500">Affordable Pricing</h3>
              <p className="text-gray-400">
                Enjoy top-notch services within your budget.
              </p>
            </div>

            {/* 24/7 Support Card */}
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 duration-300 border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4 text-blue-500">24/7 Support</h3>
              <p className="text-gray-400">
                Our team is always here to assist you at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-800/90">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-around">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 w-full sm:w-1/2 md:w-1/4">
              <h2 
                className="stat-number text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent"
                data-value={stat.value}
              >
                {stat.value === 98 ? '98%' : stat.value === 24 ? '24/7' : stat.value}
              </h2>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Our Services
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-4">
              Comprehensive digital solutions to help your business thrive in the digital landscape
            </p>
          </div>
          
          {renderServicesContent()}
          
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="px-8 py-3 border border-blue-600 text-blue-500 font-semibold rounded-md hover:bg-blue-600/10 transition-all duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Featured Projects
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-4">
              Explore some of our recent work and the results we've achieved for our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
              >
                <div 
                  className="h-64 bg-cover bg-center relative" 
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#1f2937' // Fallback color
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-end p-6">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-semibold">
                      {project.result}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <span className="inline-block bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full text-xs mb-2">
                    {project.type}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
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
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/portfolio" 
              className="px-8 py-3 border border-blue-600 text-blue-500 font-semibold rounded-md hover:bg-blue-600/10 transition-all duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Client Testimonials
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-4">
              Hear what our clients have to say about their experience working with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 relative"
              >
                <FontAwesomeIcon 
                  icon={faQuoteRight} 
                  className="absolute top-8 left-8 text-2xl text-blue-600 opacity-20" 
                />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
                  ))}
                </div>
                
                <p className="text-gray-400 italic mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-full bg-cover bg-center mr-4 bg-gray-700" 
                    style={{ backgroundImage: `url(${testimonial.avatar})` }}
                  ></div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 bg-gray-900" id="process-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Development Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our streamlined approach ensures quality results on time and within budget</p>
          </div>
          
          <div className="relative mx-auto max-w-5xl px-5">
            {/* Timeline line */}
            <div className="absolute top-[60px] left-0 right-0 h-1 bg-gray-700/50">
              {/* Animated fill line */}
              <div id="process-line-fill" className="h-full bg-blue-600 w-0 transition-all duration-2000 ease-out"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {/* Discovery */}
              <div className="process-step opacity-0 translate-y-8 transition-all duration-700 flex flex-col items-center">
                <div className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10 transition-all duration-500">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Discovery</h3>
                <p className="text-gray-400 text-center text-sm">Understand your needs and gather requirements</p>
              </div>
              
              {/* Design */}
              <div className="process-step opacity-0 translate-y-8 transition-all duration-700 flex flex-col items-center">
                <div className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10 transition-all duration-500">
                  <FontAwesomeIcon icon={faPenRuler} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Design</h3>
                <p className="text-gray-400 text-center text-sm">Create wireframes and visual layouts</p>
              </div>
              
              {/* Development */}
              <div className="process-step opacity-0 translate-y-8 transition-all duration-700 flex flex-col items-center">
                <div className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10 transition-all duration-500">
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Development</h3>
                <p className="text-gray-400 text-center text-sm">Build with clean, efficient code</p>
              </div>
              
              {/* Testing */}
              <div className="process-step opacity-0 translate-y-8 transition-all duration-700 flex flex-col items-center">
                <div className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10 transition-all duration-500">
                  <FontAwesomeIcon icon={faVial} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Testing</h3>
                <p className="text-gray-400 text-center text-sm">Rigorous QA to ensure perfection</p>
              </div>
              
              {/* Launch */}
              <div className="process-step opacity-0 translate-y-8 transition-all duration-700 flex flex-col items-center">
                <div className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10 transition-all duration-500">
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Launch</h3>
                <p className="text-gray-400 text-center text-sm">Deploy and go live with confidence</p>
              </div>
              
              {/* Support */}
              <div className="process-step opacity-0 translate-y-8 transition-all duration-700 flex flex-col items-center">
                <div className="process-icon w-16 h-16 rounded-full bg-blue-600/20 text-blue-600/60 flex items-center justify-center text-2xl mb-5 z-10 transition-all duration-500">
                  <FontAwesomeIcon icon={faHeadset} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">Support</h3>
                <p className="text-gray-400 text-center text-sm">Ongoing maintenance and updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-blue-900/90 to-blue-700/90 relative">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Let's discuss how we can help you achieve your business goals with our tailored digital solutions.
          </p>
          <Link 
            to="/contact" 
            className="px-10 py-4 bg-white text-blue-700 font-semibold rounded-md shadow-lg shadow-blue-900/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/40 transition-all duration-300"
          >
            Contact Us Today
          </Link>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Trusted By
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-4">
              Join our growing list of satisfied clients from various industries
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[1, 2, 3, 4, 5].map((index) => (
              <div 
                key={index} 
                className="h-[70px] flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
              >
                <img src={`/images/client${index}.png`} alt={`Client Logo ${index}`} className="max-h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 