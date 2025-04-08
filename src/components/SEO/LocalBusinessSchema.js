/**
 * Generates Local Business structured data for rich results
 */
const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Devigo",
    "image": "https://devigo.in/logo.png",
    "url": "https://devigo.in",
    "telephone": "+91-XXXXXXXXXX", // Replace with your actual phone number
    "email": "contact@devigo.in",
    "description": "Full-stack web and mobile app development agency providing digital solutions that transform businesses.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address", // Replace with your actual address
      "addressLocality": "Your City", // Replace with your actual city
      "addressRegion": "Your State/Region", // Replace with your actual state
      "postalCode": "Your Postal Code", // Replace with your actual postal code
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 0, // Replace with your actual latitude
      "longitude": 0 // Replace with your actual longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/devigo", // Replace with your actual social profiles
      "https://twitter.com/devigo",
      "https://www.linkedin.com/company/devigo",
      "https://www.instagram.com/devigo"
    ],
    "priceRange": "₹₹₹",
    "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
    "serviceType": [
      "Web Development", 
      "Mobile App Development", 
      "UI/UX Design", 
      "Digital Marketing", 
      "SEO Optimization"
    ]
  };
};

export default generateLocalBusinessSchema; 