/**
 * Generates Service structured data for rich results
 * @param {Object} service - Service details
 * @param {string} service.name - Service name
 * @param {string} service.description - Service description
 * @param {string} service.image - Service image URL
 * @param {string} service.url - Service page URL
 */
const generateServiceSchema = (service) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Devigo",
      "url": "https://devigo.in"
    },
    "serviceType": service.name,
    "image": service.image,
    "url": service.url,
    "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
    "serviceOutput": "Custom software solution tailored to client needs",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "price": "Contact for pricing"
      }
    }
  };
};

/**
 * Generates Web Development Service schema
 * @param {string} url - Service page URL
 */
export const generateWebDevSchema = (url = "https://devigo.in/services/full-stack-development") => {
  return generateServiceSchema({
    name: "Full Stack Development",
    description: "Custom web application development using modern frameworks like React, Vue, Angular, Django, and Node.js.",
    image: "https://devigo.in/images/services/web-development.jpg",
    url: url
  });
};

/**
 * Generates Mobile App Development Service schema
 * @param {string} url - Service page URL
 */
export const generateMobileAppSchema = (url = "https://devigo.in/services/mobile-app-development") => {
  return generateServiceSchema({
    name: "Mobile App Development",
    description: "Native and cross-platform mobile app development for iOS and Android using React Native, Flutter, and Swift.",
    image: "https://devigo.in/images/services/mobile-development.jpg",
    url: url
  });
};

/**
 * Generates UI/UX Design Service schema
 * @param {string} url - Service page URL
 */
export const generateUIUXSchema = (url = "https://devigo.in/services/ui-ux-design") => {
  return generateServiceSchema({
    name: "UI/UX Design",
    description: "User-centered design services including wireframing, prototyping, and user testing to create seamless digital experiences.",
    image: "https://devigo.in/images/services/ui-ux-design.jpg",
    url: url
  });
};

export default {
  generateServiceSchema,
  generateWebDevSchema,
  generateMobileAppSchema,
  generateUIUXSchema
}; 