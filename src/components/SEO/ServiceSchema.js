/**
 * Base service schema generator
 * @param {Object} service - Service details
 * @param {string} service.name - Service name
 * @param {string} service.description - Service description
 * @param {string} service.image - Service image URL
 * @param {string} service.url - Service page URL
 * @param {string} [service.serviceType='ProfessionalService'] - Type of service
 */
const ServiceSchema = ({
  name,
  description,
  image,
  url,
  serviceType = 'ProfessionalService'
}) => ({
  '@context': 'https://schema.org',
  '@type': serviceType,
  name,
  description,
  image,
  url
});

/**
 * Web development schema generator
 * @param {Object} data - Service details
 */
export const generateWebDevSchema = (data) => ({
  ...ServiceSchema(data),
  '@type': 'WebSite',
  applicationCategory: 'WebDevelopment'
});

/**
 * Mobile app schema generator
 * @param {Object} data - Service details
 */
export const generateMobileAppSchema = (data) => ({
  ...ServiceSchema(data),
  '@type': 'MobileApplication',
  applicationCategory: 'MobileAppDevelopment'
});

/**
 * UI/UX design schema generator
 * @param {Object} data - Service details
 */
export const generateUIUXSchema = (data) => ({
  ...ServiceSchema(data),
  '@type': 'DesignService',
  serviceType: 'UI/UX Design'
});

export default ServiceSchema;