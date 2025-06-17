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
import { servicesApi } from '../utility/api';
import SEO from '../components/SEO/SEO';
import ServiceSchema, { 
  generateWebDevSchema, 
  generateMobileAppSchema, 
  generateUIUXSchema 
} from '../components/SEO/ServiceSchema';
import servicesData from '../pages/services.json';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);

  // Icon mapping for any icons we need to display
  const iconMapping = {
    'laptop_code': faLaptopCode,
    'mobile_screen': faMobileScreen,
    'paint_brush': faPaintBrush
  };

  // Fetch service data from API
  useEffect(() => {
    // Scroll to top when component mounts or route changes
    window.scrollTo(0, 0);
    
    console.log('Fetching service details for ID:', serviceId);
    const matchedServices = servicesData.filter(service => service.slug === serviceId);
    if (matchedServices.length > 0) {
      setService(matchedServices[0]); // Set the actual service object, not in an array
      setLoading(false);
    } else {
      setError('Service not found');
      setLoading(false);
    }
  }, [serviceId]);

  // Generate structured data for this specific service
  const getServiceStructuredData = () => {
    if (!service) return null;
    
    const schemaData = {
      name: service.title || '',
      description: service.excerpt || service.description || '',
      image: service.image || `https://devigo.in/images/services/${service.slug || 'default'}.jpg`,
      url: `https://devigo.in/services/${service.slug || service.id || ''}`
    };
    
    if (service.slug?.includes('web') || service.title?.toLowerCase().includes('web')) {
      return generateWebDevSchema(schemaData);
    } else if (service.slug?.includes('mobile') || service.slug?.includes('app')) {
      return generateMobileAppSchema(schemaData);
    } else if (service.slug?.includes('ui') || service.slug?.includes('ux') || service.slug?.includes('design')) {
      return generateUIUXSchema(schemaData);
    }
    
    return ServiceSchema(schemaData);
  };

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
    <>
      <SEO 
        title={`${service?.title || 'Service'} | Devigo`}
        description={service?.excerpt || service?.description || 'Explore our professional digital services tailored to meet your business needs.'}
        keywords={`${service?.title || ''}, devigo, web development, app development, digital services`}
        canonicalUrl={`https://devigo.in/services/${service?.slug || service?.id || ''}`}
        ogTitle={`${service?.title || 'Service'} | Professional Digital Solutions by Devigo`}
        ogDescription={service?.excerpt || service?.description || ''}
        ogImage={service?.image || ''}
        structuredData={getServiceStructuredData()}
      />
    
      <div className="w-full bg-gray-900 text-white">
        {/* Hero Section */}
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
                {service?.title}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {service?.excerpt}
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
                  {service.features && service.features.map((feature, index) => (
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
                  {service.benefits && service.benefits.map((benefit, index) => (
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
              
              {/* About This Service Section */}
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-3">About This Service</h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: service.description }} className="text-gray-300 leading-relaxed" />
                  
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
                    {service.technologies && Object.entries(service.technologies).map(([category, techs], catIndex) => (
                      <div key={category}>
                        <h4 className="text-md font-medium text-blue-400 mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full"
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
        
        {/* Related Services */}
        <section className="py-20 px-4 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Related Services
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => (
                <motion.div 
                  key={relatedService.id}
                  className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800/50 hover:border-blue-800/50 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="w-14 h-14 rounded-full mb-6 flex items-center justify-center text-white mx-auto"
                    style={{ backgroundColor: '#0A66C2' }}
                  >
                    <FontAwesomeIcon 
                      icon={iconMapping[relatedService.icon] || faLaptopCode} 
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {relatedService.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {relatedService.excerpt}
                  </p>
                  <Link 
                    to={`/services/${relatedService.slug}`} 
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
    </>
  );
};

export default ServiceDetail;