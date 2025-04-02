import React from 'react';
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
  faCog
} from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  const serviceData = [
    {
      id: 'web-dev',
      icon: faLaptopCode,
      iconBg: '#0A66C2',
      title: 'Web Development',
      description: 'Custom websites and web applications that drive business growth with responsive design and seamless functionality.',
      features: [
        'Full-stack development',
        'E-commerce websites',
        'Progressive Web Apps (PWA)',
        'Custom CMS integration'
      ]
    },
    {
      id: 'mobile-dev',
      icon: faMobileScreen,
      iconBg: '#0A66C2',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications with intuitive interfaces and powerful features.',
      features: [
        'iOS app development',
        'Android app development',
        'Cross-platform development',
        'App maintenance and support'
      ]
    },
    {
      id: 'ui-ux',
      icon: faPaintBrush,
      iconBg: '#0A66C2',
      title: 'UI/UX Design',
      description: 'User-centered design that enhances usability while maintaining visual appeal and brand identity.',
      features: [
        'User research & personas',
        'Wireframing & prototyping',
        'Visual design & branding',
        'User testing'
      ]
    },
    {
      id: 'digital-marketing',
      icon: faChartLine,
      iconBg: '#0A66C2',
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies that increase brand visibility and drive conversions.',
      features: [
        'SEO & content marketing',
        'Social media management',
        'PPC advertising',
        'Marketing analytics'
      ]
    },
    {
      id: 'cloud-solutions',
      icon: faServer,
      iconBg: '#0A66C2',
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure solutions for improved performance and reduced costs.',
      features: [
        'Cloud migration',
        'AWS & Azure solutions',
        'Serverless architecture',
        'DevOps implementation'
      ]
    },
    {
      id: 'cybersecurity',
      icon: faShieldHalved,
      iconBg: '#0A66C2',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and sensitive data.',
      features: [
        'Security audits',
        'Penetration testing',
        'Compliance management',
        'Security training'
      ]
    }
  ];

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

  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-blue-700/90 to-black/80 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-white uppercase">Our Services</h1>
        <p className="text-lg text-white/80">Innovative digital solutions tailored to your business needs</p>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service) => (
            <div 
              className="bg-gray-800/50 rounded-xl p-8 border border-white/5 shadow-lg hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col h-full" 
              key={service.id}
            >
              <div className="absolute top-[-50px] right-[-50px] w-[100px] h-[100px] bg-radial-gradient from-blue-600/10 to-transparent rounded-full z-0"></div>
              
              <div 
                className="w-[60px] h-[60px] rounded-xl flex items-center justify-center text-2xl text-white mb-6 shadow-lg shadow-blue-600/30" 
                style={{ backgroundColor: service.iconBg }}
              >
                <FontAwesomeIcon icon={service.icon} />
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-white">{service.title}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="mt-auto mb-6">
                <h3 className="text-lg text-blue-500 font-semibold mb-4">Key Features:</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-400">
                      <FontAwesomeIcon icon={faCheck} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                to={`/services/${service.id}`} 
                className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-400 transition-colors duration-300"
              >
                Learn More 
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" 
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Technology Stack Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Our Technology Stack
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-6">
              We leverage the latest and most powerful technologies to build robust, scalable, and high-performance digital solutions
            </p>
          </div>

          <div className="space-y-16">
            {techStack.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mb-8 text-blue-500 border-b border-gray-700 pb-3">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {category.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex} 
                      className="bg-gray-900/80 rounded-lg p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 border border-gray-700/30"
                    >
                      <div 
                        className="w-16 h-16 mb-4 flex items-center justify-center"
                        style={{ color: tech.color }}
                      >
                        {/* Fallback icon if image doesn't load */}
                        <FontAwesomeIcon icon={faCode} className="text-4xl" />
                      </div>
                      <h4 className="font-semibold text-white">{tech.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              Our Development Process
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-6">
              Our structured and transparent approach ensures we deliver high-quality solutions that meet your business objectives
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600/80 to-blue-900/80"></div>
            
            <div className="space-y-12 relative">
              {developmentProcess.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2 flex items-center justify-center z-10">
                    <div className="bg-gray-800/80 p-8 rounded-xl shadow-lg border border-gray-700/30 max-w-md hover:-translate-y-2 transition-transform duration-300">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mb-4" 
                        style={{ backgroundColor: step.color }}
                      >
                        <FontAwesomeIcon icon={step.icon} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        <span className="bg-gray-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 text-base">
                          {step.id}
                        </span> 
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Circle on timeline */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-900 bg-blue-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <div className="py-16 bg-gradient-to-r from-blue-700/90 to-blue-900/90 text-center mt-12 bg-cta-pattern bg-cover bg-center bg-blend-overlay">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to start your project?</h2>
          <p className="text-xl text-white/80 mb-8">Contact us today to discuss how we can help you achieve your digital goals.</p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-blue-700 font-semibold py-4 px-10 rounded-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;