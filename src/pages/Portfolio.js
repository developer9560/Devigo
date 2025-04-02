import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Define the keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const PortfolioPage = styled.div`
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal scrollbar */
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(10, 102, 194, 0.8), rgba(0, 0, 0, 0.9)), 
              url('/images/portfolio-hero.jpg') no-repeat center center/cover;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/pattern.png');
    opacity: 0.05;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, #1E1E1E, transparent);
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* Standard property for future compatibility */
  color: transparent; /* Fallback */
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${fadeIn} 1s ease forwards;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  color: var(--gray-text);
  animation: ${fadeIn} 1s ease 0.3s forwards;
  opacity: 0;
  margin: 0 auto; /* Center the subtitle */
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

const PortfolioSection = styled.section`
  padding: 5rem 0;
  background-color: var(--primary-bg);
  position: relative;
  
  /* Add a subtle background pattern */
  background-image: 
    radial-gradient(rgba(10, 102, 194, 0.03) 1px, transparent 1px),
    radial-gradient(rgba(10, 102, 194, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(10, 102, 194, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(10, 102, 194, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const SectionHeading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-white);
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, #0A66C2, transparent);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PortfolioContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  /* Add a subtle border to clearly define the container */
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-height: 600px; /* Ensure enough space for content */
  
  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  gap: 0.8rem;
`;

const FilterButton = styled.button`
  background: transparent;
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--gray-text)'};
  border: none;
  padding: 0.8rem 1.5rem;
  margin: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-weight: ${props => props.active ? '600' : '400'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.active ? 1 : 0});
    width: 30px;
    height: 2px;
    background-color: var(--primary-blue);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--primary-blue);
    
    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
`;

const FilterCategory = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const FilterCategoryTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--gray-text);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #0A66C2, transparent);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  min-height: 300px; /* Ensure grid has height even when empty */
  margin-top: 3rem; /* Add space after the filters */
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
`;

const ProjectCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  height: 350px;
  cursor: pointer;
  opacity: 1; /* Ensure visibility by default */
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  
  /* Cancel any previous animations */
  animation: none !important;
  transform: translateY(0) !important;
  
  &:hover {
    transform: translateY(-10px) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    
    .project-image img {
      transform: scale(1.1);
    }
    
    .view-details {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  background-color: #1a1a1a; /* Fallback color */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`;

const ProjectInfo = styled.div`
  padding: 1rem 1.5rem;
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectCategory = styled.span`
  font-size: 0.8rem;
  color: var(--primary-blue);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  display: block;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
  line-height: 1.4;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.8rem;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(10, 102, 194, 0.7));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s ease;
`;

const ViewDetailsButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20px);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  
  ${props => props.visible && css`
    opacity: 1;
    visibility: visible;
  `}
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #222, #2a2a2a);
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transform: scale(0.9);
  
  ${props => props.visible && css`
    animation: ${zoomIn} 0.3s ease forwards;
  `}
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(10, 102, 194, 0.5);
    border-radius: 10px;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-blue);
    transform: rotate(90deg);
  }
`;

const ModalImageGallery = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalDetails = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-white);
`;

const ModalDescription = styled.p`
  color: var(--gray-text);
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ModalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ModalInfoItem = styled.div`
  margin-bottom: 1rem;
`;

const ModalInfoLabel = styled.h4`
  font-size: 0.9rem;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const ModalInfoValue = styled.p`
  color: var(--gray-text);
`;

const ModalTechStack = styled.div`
  margin-top: 2rem;
`;

const ModalTechTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--primary-white);
`;

const ModalTechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const ModalTechItem = styled.span`
  background: linear-gradient(135deg, #0A66C2, #064584);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ModalButton = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: ${props => props.primary ? 'linear-gradient(to right, #0A66C2, #064584)' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'var(--gray-text)'};
  border: ${props => props.primary ? 'none' : '1px solid var(--gray-text)'};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.primary ? '0 8px 20px rgba(10, 102, 194, 0.4)' : 'none'};
    color: ${props => props.primary ? 'white' : 'var(--primary-blue)'};
    border-color: ${props => props.primary ? 'none' : 'var(--primary-blue)'};
  }
`;

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [technologyFilter, setTechnologyFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    
    if (modalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible]);
  
  // Close modal with escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };
    
    if (modalVisible) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [modalVisible]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalVisible]);

  // Ensure projects are immediately visible
  useEffect(() => {
    // Make projects immediately visible
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      el.classList.add('fade-in-animation-immediate');
    });
  }, [filter, industryFilter, technologyFilter]);
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      industry: "Retail",
      client: "Fashion Retail Chain",
      completionDate: "January 2023",
      projectUrl: "#",
      description: "A modern e-commerce platform with seamless user experience, advanced filtering, secure payments integration, and comprehensive admin dashboard for inventory management.",
      features: [
        "Responsive design for all devices",
        "User authentication and profiles",
        "Product search and filtering",
        "Shopping cart and checkout",
        "Payment processing",
        "Order tracking",
        "Admin dashboard"
      ],
      results: [
        "50% increase in conversion rate",
        "35% reduction in cart abandonment",
        "123% growth in mobile sales"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1563986768494-4dee09f74f5b?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506104489822-562ca25152fe?q=80&w=1469&auto=format&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Health & Fitness App",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1470&auto=format&fit=crop",
      technologies: ["React Native", "Firebase", "Redux", "Node.js"],
      industry: "Healthcare",
      client: "Fitness First Inc.",
      completionDate: "March 2023",
      projectUrl: "#",
      description: "A comprehensive fitness application that allows users to track workouts, set goals, monitor nutrition, and connect with personal trainers for a personalized fitness journey.",
      features: [
        "Workout tracking and planning",
        "Nutrition log and calorie counter",
        "Progress visualization with charts",
        "Personal trainer messaging",
        "Community challenges and leaderboards",
        "Integration with fitness wearables",
        "Customized workout recommendations"
      ],
      results: [
        "87% user retention after 3 months",
        "42% increase in workout frequency",
        "Over 4.8 star rating on app stores"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1598136490941-30d885318abd?q=80&w=1469&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Corporate Website Redesign",
      category: "ui",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1469&auto=format&fit=crop",
      technologies: ["HTML5", "CSS3", "JavaScript", "Figma", "WordPress"],
      industry: "Professional Services",
      client: "Global Consulting Group",
      completionDate: "November 2022",
      projectUrl: "#",
      description: "A complete redesign of a corporate website for a consulting firm, focusing on modern aesthetics, improved user experience, and better content organization to highlight services and case studies.",
      features: [
        "Responsive, mobile-first design",
        "Interactive service showcase",
        "Case study portfolio",
        "Team member profiles",
        "Integrated blog platform",
        "Contact forms with validation",
        "Custom WordPress theme"
      ],
      results: [
        "62% reduction in bounce rate",
        "3.5x increase in contact form submissions",
        "40% improvement in page load speed"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1553484771-ade415825e66?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=1528&auto=format&fit=crop"
      ]
    },
    {
      id: 4,
      title: "Real Estate Management System",
      category: "web",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1473&auto=format&fit=crop",
      technologies: ["Angular", "Node.js", "MongoDB", "Express", "Socket.io"],
      industry: "Real Estate",
      client: "Prestige Properties",
      completionDate: "July 2023",
      projectUrl: "#",
      description: "A comprehensive real estate management system that allows property managers to list properties, track applications, manage leases, and communicate with tenants through a unified platform.",
      features: [
        "Property listing and management",
        "Tenant application processing",
        "Lease generation and tracking",
        "Maintenance request system",
        "Tenant portal for payments",
        "Real-time messaging",
        "Financial reporting"
      ],
      results: [
        "75% reduction in administrative time",
        "33% faster lease processing",
        "89% tenant satisfaction rating"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=1470&auto=format&fit=crop"
      ]
    },
    {
      id: 5,
      title: "Restaurant Ordering App",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1470&auto=format&fit=crop",
      technologies: ["Flutter", "Firebase", "Stripe API", "Google Maps API"],
      industry: "Food & Beverage",
      client: "Gourmet Restaurant Chain",
      completionDate: "April 2023",
      projectUrl: "#",
      description: "A feature-rich mobile application for a restaurant chain that allows customers to browse menus, place orders, make reservations, and participate in a loyalty program.",
      features: [
        "Digital menu with visual gallery",
        "Online ordering and payment",
        "Table reservations",
        "Loyalty points system",
        "Push notifications for offers",
        "Order tracking",
        "Restaurant locator"
      ],
      results: [
        "28% increase in average order value",
        "15% growth in customer retention",
        "45% of orders now coming through the app"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1632&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564495528617-c0340948e651?q=80&w=1471&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?q=80&w=1374&auto=format&fit=crop"
      ]
    },
    {
      id: 6,
      title: "Educational Platform UI/UX",
      category: "ui",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop",
      technologies: ["Figma", "Adobe XD", "Adobe Photoshop", "HTML/CSS"],
      industry: "Education",
      client: "Online Learning Academy",
      completionDate: "June 2023",
      projectUrl: "#",
      description: "A comprehensive UI/UX design project for an educational platform, focusing on creating an intuitive, engaging, and accessible learning experience for students of all ages.",
      features: [
        "User research and persona development",
        "Information architecture",
        "Wireframing and prototyping",
        "Interactive learning modules",
        "Gamification elements",
        "Accessibility compliance",
        "Cross-platform design system"
      ],
      results: [
        "53% improvement in course completion rates",
        "42% reduction in support tickets",
        "91% positive user feedback on new interface"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494809610410-160faaed4de0?q=80&w=1470&auto=format&fit=crop"
      ]
    }
  ];
  
  // Get unique industries and technologies for filters
  const industries = ['all', ...new Set(projects.map(project => project.industry.toLowerCase()))];
  const technologies = ['all', ...new Set(projects.flatMap(project => project.technologies.map(tech => tech.toLowerCase())))];
  
  // Filter projects based on multiple criteria
  const filteredProjects = projects.filter(project => {
    const categoryMatch = filter === 'all' || project.category === filter;
    const industryMatch = industryFilter === 'all' || project.industry.toLowerCase() === industryFilter;
    const techMatch = technologyFilter === 'all' || project.technologies.some(tech => tech.toLowerCase() === technologyFilter);
    
    return categoryMatch && industryMatch && techMatch;
  });
  
  const openModal = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  
  const navigateToDetail = (id) => {
    window.location.href = `/portfolio/${id}`;
  };
  
  return (
    <PortfolioPage>
      <style>
        {`
          @keyframes fadeInAnimation {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .fade-in-animation {
            animation: fadeInAnimation 0.6s ease forwards;
          }

          .fade-in-animation-immediate {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
      
      <HeroSection>
        <PageTitle>Our Portfolio</PageTitle>
        <PageSubtitle>Showcasing our best work and client success stories</PageSubtitle>
      </HeroSection>
      
      <PortfolioSection>
        <PortfolioContainer>
          <SectionHeading>Our Project Showcase</SectionHeading>
          
          <div>
            <FilterCategoryTitle>Project Type</FilterCategoryTitle>
            <FilterButtons>
              <FilterButton 
                active={filter === 'all'} 
                onClick={() => setFilter('all')}
              >
                All Projects
              </FilterButton>
              <FilterButton 
                active={filter === 'web'} 
                onClick={() => setFilter('web')}
              >
                Web Development
              </FilterButton>
              <FilterButton 
                active={filter === 'mobile'} 
                onClick={() => setFilter('mobile')}
              >
                Mobile Apps
              </FilterButton>
              <FilterButton 
                active={filter === 'ui'} 
                onClick={() => setFilter('ui')}
              >
                UI/UX Design
              </FilterButton>
            </FilterButtons>
          </div>
          
          <div>
            <FilterCategoryTitle>Industry</FilterCategoryTitle>
            <FilterButtons>
              <FilterButton 
                active={industryFilter === 'all'} 
                onClick={() => setIndustryFilter('all')}
              >
                All Industries
              </FilterButton>
              {industries.filter(i => i !== 'all').map((industry, index) => (
                <FilterButton 
                  key={index}
                  active={industryFilter === industry} 
                  onClick={() => setIndustryFilter(industry)}
                >
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </FilterButton>
              ))}
            </FilterButtons>
          </div>
          
          <div>
            <FilterCategoryTitle>Technology</FilterCategoryTitle>
            <FilterButtons>
              <FilterButton 
                active={technologyFilter === 'all'} 
                onClick={() => setTechnologyFilter('all')}
              >
                All Technologies
              </FilterButton>
              {technologies.filter(t => t !== 'all').slice(0, 8).map((tech, index) => (
                <FilterButton 
                  key={index}
                  active={technologyFilter === tech} 
                  onClick={() => setTechnologyFilter(tech)}
                >
                  {tech}
                </FilterButton>
              ))}
            </FilterButtons>
          </div>
          
          <ProjectsGrid>
            {projects.length === 0 ? (
              <div style={{ 
                gridColumn: '1/-1', 
                textAlign: 'center', 
                padding: '3rem', 
                color: 'var(--gray-text)'
              }}>
                Loading projects...
              </div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  index={index}
                  onClick={() => openModal(project)}
                >
                  <ProjectImage className="project-image">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/600x400?text=Project+Image";
                      }}
                    />
                  </ProjectImage>
                  <ProjectInfo>
                    <div>
                      <ProjectCategory>
                        {project.category === 'web' ? 'Web Development' : 
                         project.category === 'mobile' ? 'Mobile App' : 'UI/UX Design'}
                      </ProjectCategory>
                      <ProjectTitle>{project.title}</ProjectTitle>
                    </div>
                    <ProjectTech>
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <TechTag key={idx}>{tech}</TechTag>
                      ))}
                    </ProjectTech>
                  </ProjectInfo>
                  
                  <ProjectOverlay className="project-overlay">
                    <ViewDetailsButton className="view-details">View Project</ViewDetailsButton>
                  </ProjectOverlay>
                </ProjectCard>
              ))
            ) : (
              <div style={{ 
                gridColumn: '1/-1', 
                textAlign: 'center', 
                padding: '3rem', 
                color: 'var(--gray-text)'
              }}>
                No projects match your current filters. Please try different criteria.
              </div>
            )}
          </ProjectsGrid>
        </PortfolioContainer>
      </PortfolioSection>
      
      <ModalOverlay visible={modalVisible}>
        {selectedProject && (
          <ModalContent ref={modalRef} visible={modalVisible}>
            <ModalCloseButton onClick={closeModal}>
              &times;
            </ModalCloseButton>
            <ModalImageGallery>
              <ModalImage 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/900x500?text=Project+Image";
                }}
              />
            </ModalImageGallery>
            <ModalDetails>
              <ModalTitle>{selectedProject.title}</ModalTitle>
              <ModalDescription>{selectedProject.description}</ModalDescription>
              
              <ModalInfoGrid>
                <ModalInfoItem>
                  <ModalInfoLabel>Client</ModalInfoLabel>
                  <ModalInfoValue>{selectedProject.client}</ModalInfoValue>
                </ModalInfoItem>
                <ModalInfoItem>
                  <ModalInfoLabel>Industry</ModalInfoLabel>
                  <ModalInfoValue>{selectedProject.industry}</ModalInfoValue>
                </ModalInfoItem>
                <ModalInfoItem>
                  <ModalInfoLabel>Category</ModalInfoLabel>
                  <ModalInfoValue>
                    {selectedProject.category === 'web' 
                      ? 'Web Development' 
                      : selectedProject.category === 'mobile' 
                        ? 'Mobile App Development' 
                        : 'UI/UX Design'}
                  </ModalInfoValue>
                </ModalInfoItem>
                <ModalInfoItem>
                  <ModalInfoLabel>Completion Date</ModalInfoLabel>
                  <ModalInfoValue>{selectedProject.completionDate}</ModalInfoValue>
                </ModalInfoItem>
              </ModalInfoGrid>
              
              <ModalTechStack>
                <ModalTechTitle>Technologies Used</ModalTechTitle>
                <ModalTechList>
                  {selectedProject.technologies.map((tech, idx) => (
                    <ModalTechItem key={idx}>{tech}</ModalTechItem>
                  ))}
                </ModalTechList>
              </ModalTechStack>
              
              <ModalTechStack>
                <ModalTechTitle>Key Results</ModalTechTitle>
                <ul style={{ color: 'var(--gray-text)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                  {selectedProject.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </ModalTechStack>
              
              <ModalActions>
                <ModalButton onClick={() => navigateToDetail(selectedProject.id)} primary>
                  View Case Study
                </ModalButton>
                <ModalButton href={selectedProject.projectUrl} target="_blank" rel="noopener noreferrer">
                  View Live Project
                </ModalButton>
                <ModalButton href="/contact">
                  Discuss Similar Project
                </ModalButton>
              </ModalActions>
            </ModalDetails>
          </ModalContent>
        )}
      </ModalOverlay>
    </PortfolioPage>
  );
};

export default Portfolio; 