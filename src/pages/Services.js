import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faMobileScreen, 
  faPaintBrush, 
  faChartLine, 
  faServer, 
  faShieldHalved,
  faCheck,
  faArrowRight,
  faLightbulb,
  faListCheck,
  faCode,
  faVial,
  faRocket,
  faCog,
  faSpinner,
  faDesktop,
  faShoppingCart,
  faSearch,
  faGlobe,
  faDatabase,
  faTools,
  faBezierCurve,
  faStore,
  faCreditCard,
  faMobile,
  faTabletAlt
} from '@fortawesome/free-solid-svg-icons';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { api, servicesApi } from '../utility/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for service icons - expanded with all Material icon equivalents
  const iconMapping = {
    // Web Development
    'code': faCode,
    'web': faLaptopCode,
    'integration_instructions': faCode,
    'developer_mode': faCode,
    'html': faCode,
    'laptop_code': faLaptopCode,
    
    // Design
    'design_services': faPaintBrush,
    'palette': faPaintBrush,
    'brush': faPaintBrush,
    'format_paint': faPaintBrush,
    'style': faPaintBrush,
    'paint_brush': faPaintBrush,
    'bezier_curve': faBezierCurve,
    
    // Mobile
    'smartphone': faMobileScreen,
    'android': faMobileScreen,
    'ios_share': faMobileScreen,
    'phonelink': faMobileScreen,
    'app_shortcut': faMobileScreen,
    'mobile_screen': faMobileScreen,
    'mobile': faMobile,
    'tablet_alt': faTabletAlt,
    
    // Marketing
    'trending_up': faChartLine,
    'campaign': faChartLine,
    'search': faSearch,
    'public': faGlobe,
    'ads_click': faChartLine,
    'chart_line': faChartLine,
    
    // Infrastructure 
    'cloud': faServer,
    'storage': faServer,
    'dns': faServer,
    'security': faShieldHalved,
    'memory': faServer,
    'shield_halved': faShieldHalved,
    'server': faServer,
    'database': faDatabase,
    'tools': faTools,
    
    // Business
    'shopping_cart': faShoppingCart,
    'store': faStore,
    'payments': faCreditCard,
    'business': faDesktop,
    'analytics': faChartLine
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await servicesApi.getAll({ status: 'active' });
        
        if (response.data && (response.data.results || Array.isArray(response.data))) {
          // Handle paginated response or array response
          const servicesData = response.data.results || response.data;
          setServices(servicesData);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Technology stack data
  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "React", logo: "/images/tech/react.svg", color: "#61DAFB" },
        { name: "Vue.js", logo: "/images/tech/vue.svg", color: "#4FC08D" },
        { name: "Next.js", logo: "/images/tech/nextjs.svg", color: "#000000" },
        { name: "Angular", logo: "/images/tech/angular.svg", color: "#DD0031" },
        { name: "Tailwind CSS", logo: "/images/tech/tailwind.svg", color: "#38B2AC" },
      ]
    },
    {
      category: "Backend",
      technologies: [
        { name: "Node.js", logo: "/images/tech/nodejs.svg", color: "#339933" },
        { name: "Django", logo: "/images/tech/django.svg", color: "#092E20" },
        { name: "Laravel", logo: "/images/tech/laravel.svg", color: "#FF2D20" },
        { name: "Express.js", logo: "/images/tech/express.svg", color: "#000000" },
        { name: "Ruby on Rails", logo: "/images/tech/rails.svg", color: "#CC0000" },
      ]
    },
    {
      category: "Database",
      technologies: [
        { name: "MySQL", logo: "/images/tech/mysql.svg", color: "#4479A1" },
        { name: "MongoDB", logo: "/images/tech/mongodb.svg", color: "#47A248" },
        { name: "PostgreSQL", logo: "/images/tech/postgresql.svg", color: "#336791" },
        { name: "Firebase", logo: "/images/tech/firebase.svg", color: "#FFCA28" },
        { name: "Redis", logo: "/images/tech/redis.svg", color: "#DC382D" },
      ]
    },
    {
      category: "DevOps & Cloud",
      technologies: [
        { name: "AWS", logo: "/images/tech/aws.svg", color: "#FF9900" },
        { name: "Docker", logo: "/images/tech/docker.svg", color: "#2496ED" },
        { name: "Kubernetes", logo: "/images/tech/kubernetes.svg", color: "#326CE5" },
        { name: "GitHub Actions", logo: "/images/tech/github.svg", color: "#181717" },
        { name: "Azure", logo: "/images/tech/azure.svg", color: "#0078D4" },
      ]
    }
  ];

  // Development process steps
  const developmentProcess = [
    {
      id: 1,
      icon: faLightbulb,
      title: "Discovery & Planning",
      description: "We analyze your business needs, goals, and target audience to develop a comprehensive project plan and strategy.",
      color: "#3B82F6" // blue-500
    },
    {
      id: 2,
      icon: faListCheck,
      title: "Requirements Analysis",
      description: "We document detailed technical specifications and requirements to ensure clarity and alignment before development begins.",
      color: "#8B5CF6" // purple-500
    },
    {
      id: 3,
      icon: faPaintBrush,
      title: "Design",
      description: "Our designers create user-friendly interfaces and engaging visuals that reflect your brand and enhance user experience.",
      color: "#EC4899" // pink-500
    },
    {
      id: 4,
      icon: faCode,
      title: "Development",
      description: "Our expert developers build your solution using the most appropriate technologies and best coding practices.",
      color: "#10B981" // emerald-500
    },
    {
      id: 5,
      icon: faVial,
      title: "Testing & QA",
      description: "Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices and platforms.",
      color: "#F59E0B" // amber-500
    },
    {
      id: 6,
      icon: faRocket,
      title: "Deployment",
      description: "We handle the seamless launch of your product, ensuring everything runs smoothly in the production environment.",
      color: "#EF4444" // red-500
    },
    {
      id: 7,
      icon: faCog,
      title: "Maintenance & Support",
      description: "Our relationship continues with ongoing support, updates, and enhancements to keep your digital solution performing at its best.",
      color: "#6366F1" // indigo-500
    }
  ];

  // Timeline fill animation ref
  const processRef = useRef(null);
  const processIsInView = useInView(processRef, { once: false, amount: 0.1 });
  const timelineRef = useRef(null);
  
  // Refs for each step
  const stepRefs = useRef([]);
  
  useEffect(() => {
    // Initialize refs array
    stepRefs.current = stepRefs.current.slice(0, developmentProcess.length);
    
    // Timeline animation
    const timeline = timelineRef.current;
    if (timeline && processIsInView) {
      timeline.style.height = '100%';
    }
    
    // Setup intersection observer for each step
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add active class to the step
            entry.target.classList.add('process-step-active');
            
            // Get the step index
            const stepIndex = parseInt(entry.target.dataset.index);
            
            // Update timeline fill based on visible steps
            if (timeline) {
              const fillPercentage = ((stepIndex + 1) / developmentProcess.length) * 100;
              timeline.style.height = `${Math.min(fillPercentage, 100)}%`;
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Observe each step
    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });
    
    return () => {
      stepRefs.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, [processIsInView]);

  // If loading, show a loading indicator
  if (loading) {
    return (
      <div className="w-full bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-5xl mb-4" />
          <p className="text-xl">Loading services...</p>
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="w-full bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800 rounded-lg">
          <p className="text-xl text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 text-white">
      <style jsx>{`
        .process-step-active .timeline-circle {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .process-step-active .icon-container {
          animation: pulse 2s infinite;
        }
      `}</style>
      
      <div className="bg-gradient-to-r from-blue-700/90 to-black/80 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-white uppercase">Our Services</h1>
        <p className="text-lg text-white/80">Innovative digital solutions tailored to your business needs</p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              className="bg-gray-800/50 rounded-xl overflow-hidden flex flex-col h-full shadow-lg hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300" 
              key={service.id}
            >
              {/* Service Header with Background Image */}
              <div className="relative h-40 overflow-hidden">
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url(${service.image_url || ''})`,
                  }}
                ></div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-gray-900/90"></div>
                
                {/* Icon positioned in top-left corner of background */}
                <div className="absolute top-6 left-6">
                  <div 
                    className="w-[70px] h-[70px] rounded-xl flex items-center justify-center text-3xl text-white shadow-lg shadow-blue-600/30" 
                    style={{ backgroundColor: '#0A66C2' }}
                  >
                    <FontAwesomeIcon icon={iconMapping[service.icon] || faCode} />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">{service.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.excerpt && service.excerpt.length > 100 
                    ? `${service.excerpt.substring(0, 100)}...` 
                    : service.excerpt}
                </p>
                
                {/* Key Features with reduced margin */}
                <div className="mt-auto mb-3">
                  <h3 className="text-lg text-blue-500 font-semibold mb-2">Key Features:</h3>
                  <ul className="space-y-2">
                    {service.features && service.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-400">
                        <FontAwesomeIcon icon={faCheck} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  to={`/services/${service.slug}`} 
                  className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-400 transition-colors duration-300"
                >
                  Learn More 
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Technology Stack Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Our Technology Stack
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-6">
              We leverage the latest and most powerful technologies to build robust, scalable, and high-performance digital solutions
            </p>
          </motion.div>

          <div className="space-y-16">
            {techStack.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-8 text-blue-500 border-b border-gray-700 pb-3">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div 
                      key={techIndex} 
                      className="bg-gray-900/80 rounded-lg p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 border border-gray-700/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: techIndex * 0.05 + index * 0.1 }}
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      <div 
                        className="w-16 h-16 mb-4 flex items-center justify-center"
                        style={{ color: tech.color }}
                      >
                        {/* Fallback icon if image doesn't load */}
                        <FontAwesomeIcon icon={faCode} className="text-4xl" />
                      </div>
                      <h4 className="font-semibold text-white">{tech.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section ref={processRef} className="py-20 px-4 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Our Development Process
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-6">
              Our structured and transparent approach ensures we deliver high-quality solutions that meet your business objectives
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line container */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700/50">
              {/* Animated fill line */}
              <div 
                ref={timelineRef}
                className="w-full bg-gradient-to-b from-blue-600 to-blue-900 h-0 transition-all duration-1000 ease-out"
              ></div>
            </div>
            
            <div className="space-y-12 relative">
              {developmentProcess.map((step, index) => (
                <motion.div 
                  ref={el => stepRefs.current[index] = el}
                  data-index={index}
                  key={step.id} 
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} process-step`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <div className="md:w-1/2 flex items-center justify-center z-10">
                    <motion.div 
                      className="bg-gray-800/80 p-8 rounded-xl shadow-lg border border-gray-700/30 max-w-md transition-all duration-500"
                      whileInView={{ 
                        boxShadow: `0 10px 25px -5px ${step.color}20`,
                        y: 0
                      }}
                      initial={{ y: 20 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      <motion.div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mb-4 transition-all duration-500 icon-container" 
                        style={{ backgroundColor: `${step.color}40` }}
                        whileInView={{ 
                          backgroundColor: step.color,
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        <FontAwesomeIcon icon={step.icon} />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        <span className="bg-gray-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 text-base">
                          {step.id}
                        </span> 
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Circle on timeline */}
                  <motion.div 
                    className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-900 bg-gray-700 transition-all duration-500 timeline-circle"
                    whileInView={{ 
                      backgroundColor: step.color,
                      scale: [1, 1.5, 1.2],
                    }}
                    transition={{ duration: 0.5, delay: 0.25 + index * 0.15 }}
                    viewport={{ once: false, amount: 0.5 }}
                  ></motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <motion.div 
        className="py-16 bg-gradient-to-r from-blue-700/90 to-blue-900/90 text-center mt-12 bg-cta-pattern bg-cover bg-center bg-blend-overlay"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to start your project?</h2>
          <p className="text-xl text-white/80 mb-8">Contact us today to discuss how we can help you achieve your digital goals.</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/contact" 
              className="inline-block bg-white text-blue-700 font-semibold py-4 px-10 rounded-md hover:shadow-lg transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;