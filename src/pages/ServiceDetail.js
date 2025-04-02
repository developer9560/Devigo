import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faCheck, 
  faStar,
  faArrowLeft,
  faSpinner,
  faExclamationTriangle,
  faTools,
  faLaptopCode,
  faMobileScreen,
  faPaintBrush
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder data for the service - In a real app, you would fetch this from your API
  // using the serviceId from the URL params
  useEffect(() => {
    // Simulating API fetch with setTimeout
    const fetchService = async () => {
      try {
        setLoading(true);
        // In a real app, replace with actual API call: 
        // const response = await fetch(`/api/services/${serviceId}`);
        // const data = await response.json();
        
        // For demo, we're using static data that matches the model structure
        setTimeout(() => {
          // This is placeholder data that mimics what your backend might return
          // based on the service.py model
          const mockService = {
            id: serviceId,
            title: serviceId === 'web-dev' ? 'Web Development' : 
                   serviceId === 'mobile-dev' ? 'Mobile App Development' : 
                   serviceId === 'ui-ux' ? 'UI/UX Design' : 
                   'Cloud Solutions', // Default fallback
            slug: serviceId,
            description: `Our ${serviceId === 'web-dev' ? 'web development' : 
                           serviceId === 'mobile-dev' ? 'mobile app development' : 
                           serviceId === 'ui-ux' ? 'UI/UX design' : 
                           'cloud solution'} services provide cutting-edge solutions tailored to your specific business needs. We leverage the latest technologies and best practices to deliver high-quality, scalable, and maintainable solutions that drive business growth and enhance user experience.`,
            excerpt: `Professional ${serviceId === 'web-dev' ? 'web development' : 
                      serviceId === 'mobile-dev' ? 'mobile app development' : 
                      serviceId === 'ui-ux' ? 'UI/UX design' : 
                      'cloud solution'} services for businesses of all sizes.`,
            icon: serviceId === 'web-dev' ? 'laptop_code' : 
                  serviceId === 'mobile-dev' ? 'smartphone' : 
                  serviceId === 'ui-ux' ? 'palette' : 
                  'cloud',
            image: `/images/services/${serviceId}.jpg`, // In a real app, this would be a Cloudinary URL
            status: 'active',
            featured: serviceId === 'web-dev' || serviceId === 'mobile-dev',
            order: serviceId === 'web-dev' ? 1 : 
                   serviceId === 'mobile-dev' ? 2 :
                   serviceId === 'ui-ux' ? 3 : 4,
            features: [
              serviceId === 'web-dev' ? 'Custom website development' : 'Native app development',
              serviceId === 'web-dev' ? 'E-commerce solutions' : 'Cross-platform development',
              serviceId === 'web-dev' ? 'Web application development' : 'App testing and deployment',
              serviceId === 'web-dev' ? 'CMS integration' : 'App store submission assistance',
              serviceId === 'web-dev' ? 'Website maintenance and support' : 'App maintenance and updates',
              serviceId === 'web-dev' ? 'Performance optimization' : 'API integration',
              serviceId === 'web-dev' ? 'Responsive design' : 'Push notification setup',
            ],
            benefits: [
              'Increased business efficiency',
              'Enhanced user experience',
              'Improved conversion rates',
              'Scalable solutions for growth',
              'Competitive advantage in the market',
              'Reduced operational costs',
              'Improved brand perception',
            ],
            technologies: {
              'Frontend': [
                'React', 'Angular', 'Vue.js', 'Next.js', 'Tailwind CSS'
              ],
              'Backend': [
                'Node.js', 'Django', 'Laravel', 'Express.js', 'Ruby on Rails'
              ],
              'Database': [
                'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis'
              ],
              'DevOps': [
                'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Azure'
              ]
            }
          };
          
          setService(mockService);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError('Failed to load service details. Please try again later.');
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-5xl mb-4" />
          <p className="text-xl">Loading service details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800 rounded-lg border border-red-500/30">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-5xl mb-4" />
          <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link 
            to="/services" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // If service is null (which shouldn't happen if the loading and error states are handled)
  if (!service) {
    return (
      <div className="w-full bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800 rounded-lg">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-5xl mb-4" />
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <p className="text-gray-400 mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/services" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Hero Section - Simplified */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-700/90 to-black/80">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <Link 
                to="/services" 
                className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Services
              </Link>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {service.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {service.excerpt}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-medium transition-colors duration-300"
              >
                Get Started
                <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            {/* Features Section */}
            <motion.section 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-3">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-800/50 rounded-lg p-5 flex items-start border border-gray-700/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-blue-600/20 p-2 rounded-md mr-4 text-blue-400">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            {/* Benefits Section */}
            <motion.section 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-3">Benefits</h2>
              <div className="grid grid-cols-1 gap-4">
                {service.benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="mr-4 text-yellow-400">
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            {/* About This Service Section - Bottom section (yellow area in screenshot) */}
            <motion.section 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-3">About This Service</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="my-8 p-6 bg-gradient-to-r from-blue-900/40 to-blue-800/20 rounded-lg border border-blue-800/30">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Why Choose Us?</h3>
                  <p className="text-gray-300">
                    Our team of experienced professionals is dedicated to delivering exceptional 
                    {service.title.toLowerCase()} services tailored to your specific needs. 
                    We pride ourselves on our commitment to quality, timely delivery, and customer satisfaction.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
          
          {/* Sidebar - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Service Info Card */}
              <motion.div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 mb-8 border border-gray-700/50 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">Service Information</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Service Type</span>
                    <span className="text-white font-medium">{service.title}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`${service.status === 'active' ? 'text-green-500' : 'text-yellow-500'} font-medium`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Featured</span>
                    <span className={`${service.featured ? 'text-blue-500' : 'text-gray-500'} font-medium`}>
                      {service.featured ? 'Yes' : 'No'}
                    </span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <Link 
                    to="/contact" 
                    className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition-colors duration-300"
                  >
                    Request Quote
                  </Link>
                </div>
              </motion.div>
              
              {/* Technologies Used */}
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                  <FontAwesomeIcon icon={faTools} className="mr-2 text-blue-500" />
                  Technologies
                </h3>
                <div className="space-y-5">
                  {Object.entries(service.technologies).map(([category, techs], catIndex) => (
                    <div key={category}>
                      <h4 className="text-md font-medium text-blue-400 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="inline-block px-3 py-1 bg-gray-700/70 text-gray-300 text-sm rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Get Started with Our {service.title}?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Contact our team today to discuss your project requirements and how we can help you achieve your business goals.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-50 hover:shadow-lg"
            >
              Contact Us
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </Link>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium transition-all duration-300 hover:bg-white/10"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Related Services */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Show 3 related services, excluding the current one */}
            {['web-dev', 'mobile-dev', 'ui-ux'].filter(id => id !== serviceId).slice(0, 3).map((id, index) => (
              <motion.div 
                key={id}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700/50 hover:border-blue-700/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-900/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="w-14 h-14 rounded-full mb-6 flex items-center justify-center text-white"
                  style={{ backgroundColor: '#0A66C2' }}
                >
                  <FontAwesomeIcon 
                    icon={
                      id === 'web-dev' ? faLaptopCode : 
                      id === 'mobile-dev' ? faMobileScreen : 
                      faPaintBrush
                    } 
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {id === 'web-dev' ? 'Web Development' : 
                   id === 'mobile-dev' ? 'Mobile App Development' : 
                   'UI/UX Design'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {id === 'web-dev' ? 'Custom websites and web applications with responsive design and seamless functionality.' : 
                   id === 'mobile-dev' ? 'Native and cross-platform mobile apps with intuitive interfaces and powerful features.' : 
                   'User-centered design that enhances usability while maintaining visual appeal and brand identity.'}
                </p>
                <Link 
                  to={`/services/${id}`} 
                  className="text-blue-500 font-medium hover:text-blue-400 inline-flex items-center"
                >
                  Learn More
                  <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail; 