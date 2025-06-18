import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import projectService from '../pages/Project.json';
import { set } from 'date-fns';

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  
  // API base URL - same as in projectService.js
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-django-pct4.onrender.com/api/v1' || 'http://localhost:8000/api/v1' || 'http://127.0.0.1:8000/api/v1';
  
  // Fetch projects from API
  useEffect(() => {
        window.scrollTo(0, 0);
  //   const fetchProjects = async () => {
  //     try {
  //       setLoading(true);
  //       console.log('Fetching projects from:', `${API_BASE_URL}/projects/`);
  //       const response = await axios.get(`${API_BASE_URL}/projects/`);
  //       console.log('Projects API response:', response);
  //       console.log('Projects from API:', response.data);
        
  //       // Handle different response formats
  //       let projectsData;
  //       if (Array.isArray(response.data)) {
  //         console.log('Response is an array with', response.data.length, 'projects');
  //         projectsData = response.data;
  //       } else if (response.data && typeof response.data === 'object') {
  //         if (response.data.results) {
  //           console.log('Found results array with', response.data.results.length, 'projects');
  //           projectsData = response.data.results;
  //         } else if (response.data.projects) {
  //           console.log('Found projects array with', response.data.projects.length, 'projects');
  //           projectsData = response.data.projects;
  //         } else if (response.data.data) {
  //           console.log('Found data array with', response.data.data.length, 'projects');
  //           projectsData = response.data.data;
  //         } else if (Array.isArray(Object.values(response.data)[0])) {
  //           // Sometimes the API returns the array in the first property
  //           const firstArrayProp = Object.keys(response.data).find(key => Array.isArray(response.data[key]));
  //           if (firstArrayProp) {
  //             console.log(`Found array in property '${firstArrayProp}' with`, response.data[firstArrayProp].length, 'projects');
  //             projectsData = response.data[firstArrayProp];
  //           } else {
  //             projectsData = [];
  //           }
  //         } else {
  //           // Check if the response object itself contains projects (with id properties)
  //           const possibleProjects = Object.values(response.data).filter(item => 
  //             item && typeof item === 'object' && (item.id || item._id)
  //           );
            
  //           if (possibleProjects.length > 0) {
  //             console.log('Found', possibleProjects.length, 'projects in object format');
  //             projectsData = possibleProjects;
  //           } else {
  //             projectsData = [];
  //           }
  //         }
  //       } else {
  //         projectsData = [];
  //       }
        
  //       console.log('Processed projects data:', projectsData, 'Count:', projectsData.length);
  //       setProjects(projectsData);
  //     } catch (err) {
  //       console.error('Error fetching projects:', err);
  //       const errorMessage = err.response?.data?.message || err.message || 'Failed to load projects. Please try again later.';
  //       setError(`Error loading projects: ${errorMessage}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchProjects();
  setProjects(projectService);
  setLoading(false);
  }, [API_BASE_URL]);
  
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
  
  // Extract unique industries and technologies from actual project data
  const industries = useMemo(() => {
    if (!projects.length) return ['all'];
    const uniqueIndustries = [...new Set(projects.map(project => 
      (project.industry || '').toLowerCase())
    )].filter(i => i);
    return ['all', ...uniqueIndustries];
  }, [projects]);
  
  const technologies = useMemo(() => {
    if (!projects.length) return ['all'];
    const techArray = projects.flatMap(project => {
      // Handle both technologies array and service_ids
      let techs = [];
      
      // Handle technologies that come as an object
      if (project.technologies && typeof project.technologies === 'object' && !Array.isArray(project.technologies)) {
        techs = Object.keys(project.technologies);
      } 
      // Handle technologies that come as an array
      else if (Array.isArray(project.technologies)) {
        techs = project.technologies.map(tech => typeof tech === 'object' ? tech.name : tech);
      }
      
      const services = project.services || [];
      return [...techs, ...services.map(s => s.title || s.name || '')];
    });
    
    const uniqueTechs = [...new Set(techArray.map(tech => 
      (typeof tech === 'string' ? tech.toLowerCase() : '')
    ))].filter(t => t);
    
    return ['all', ...uniqueTechs];
  }, [projects]);
  
  // Filter projects based on multiple criteria
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const categoryMatch = filter === 'all' || 
                          (project.category || '').toLowerCase() === filter;
      
      const industryMatch = industryFilter === 'all' || 
                          (project.industry || '').toLowerCase() === industryFilter;
      
      let techMatch = technologyFilter === 'all';
      
      if (!techMatch) {
        // Check technologies in object format
        if (project.technologies && typeof project.technologies === 'object' && !Array.isArray(project.technologies)) {
          techMatch = Object.keys(project.technologies).some(tech => 
            tech.toLowerCase() === technologyFilter
          );
        }
        // Check technologies in array format
        else if (Array.isArray(project.technologies)) {
          techMatch = project.technologies.some(tech => 
            (typeof tech === 'string' && tech.toLowerCase() === technologyFilter) ||
            (typeof tech === 'object' && tech.name && tech.name.toLowerCase() === technologyFilter)
          );
        }
      }
      
      // If still no match, check services
      if (!techMatch && project.services) {
        techMatch = project.services.some(service => 
          ((service.title || service.name || '').toLowerCase() === technologyFilter)
        );
      }
    
    return categoryMatch && industryMatch && techMatch;
  });
  }, [projects, filter, industryFilter, technologyFilter]);
  
  const openModal = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  
  const navigateToDetail = (id) => {
    if (!id) {
      console.error('Cannot navigate to detail - no project ID provided');
      return;
    }
    console.log('Navigating to project detail:', id);
    window.location.href = `/portfolio/${id}`;
  };

  // Helper function to determine category label
  const getCategoryLabel = (category) => {
    if (!category) return 'Web Development';
    
    switch(category.toLowerCase()) {
      case 'web':
        return 'Web Development';
      case 'mobile':
        return 'Mobile App';
      case 'ui':
      case 'ux':
      case 'design':
        return 'UI/UX Design';
      default:
        return 'Web Development';
    }
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
        <PageSubtitle>
          Explore our latest projects and see how we've helped our clients achieve their goals
        </PageSubtitle>
      </HeroSection>
      
      <PortfolioSection>
        <PortfolioContainer>
          <SectionHeading>Explore Our Work</SectionHeading>
          
          <FilterCategory>
            <FilterCategoryTitle>Category</FilterCategoryTitle>
            <FilterButtons>
              <FilterButton 
                active={filter === 'all'} 
                onClick={() => setFilter('all')}
              >
                All
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
                active={filter === 'design'} 
                onClick={() => setFilter('design')}
              >
                UI/UX Design
              </FilterButton>
              <FilterButton 
                active={filter === 'ecommerce'} 
                onClick={() => setFilter('ecommerce')}
              >
                E-Commerce
              </FilterButton>
            </FilterButtons>
          </FilterCategory>
          
          {industries.length > 1 && (
            <FilterCategory>
            <FilterCategoryTitle>Industry</FilterCategoryTitle>
            <FilterButtons>
                {industries.map(industry => (
              <FilterButton 
                    key={industry}
                  active={industryFilter === industry} 
                  onClick={() => setIndustryFilter(industry)}
                >
                    {industry === 'all' ? 'All Industries' : industry.charAt(0).toUpperCase() + industry.slice(1)}
                </FilterButton>
              ))}
            </FilterButtons>
            </FilterCategory>
          )}
          
          {technologies.length > 1 && (
            <FilterCategory>
            <FilterCategoryTitle>Technology</FilterCategoryTitle>
            <FilterButtons>
                {technologies.map(tech => (
              <FilterButton 
                    key={tech}
                  active={technologyFilter === tech} 
                  onClick={() => setTechnologyFilter(tech)}
                >
                    {tech === 'all' ? 'All Technologies' : tech.charAt(0).toUpperCase() + tech.slice(1)}
                </FilterButton>
              ))}
            </FilterButtons>
            </FilterCategory>
          )}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p>Loading projects...</p>
              </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'red' }}>
              <p>{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p>No projects match your selected filters. Try different criteria or <button 
                onClick={() => {
                  setFilter('all');
                  setIndustryFilter('all');
                  setTechnologyFilter('all');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0A66C2',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >reset all filters</button></p>
            </div>
          ) : (
            <ProjectsGrid>
              {console.log('Rendering', filteredProjects.length, 'projects in grid')}
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project._id || project.id || Math.random().toString(36).substring(7)} 
                  className="animate-on-scroll"
                  onClick={() => project._id ? navigateToDetail(project._id) : navigateToDetail(project.id)}
                >
                  <ProjectImage className="project-image">
                    <img 
                      src={project.image_url || project.image} 
                      alt={project.title} 
                      onError={(e) => {
                        console.log('Image failed to load:', project.title);
                        e.target.src = "https://via.placeholder.com/400x250?text=Project+Image";
                      }}
                    />
                  </ProjectImage>
                  <ProjectInfo>
                    <div>
                      <ProjectCategory>
                        {getCategoryLabel(project.category)}
                      </ProjectCategory>
                      <ProjectTitle>{project.title}</ProjectTitle>
                    </div>
                    <ProjectTech>
                      {project.technologies && typeof project.technologies === 'object' && !Array.isArray(project.technologies) ? 
                        Object.keys(project.technologies).slice(0, 3).map((tech, index) => (
                          <TechTag key={`tech-${index}`}>{tech}</TechTag>
                        ))
                        : 
                        Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, index) => (
                          <TechTag key={`tech-${index}`}>{typeof tech === 'object' ? tech.name : tech}</TechTag>
                        ))}
                      {project.services && project.services.slice(0, 3).map((service, index) => (
                        <TechTag key={`service-${index}`}>
                          {service.title || service.name || (typeof service === 'string' ? service : '')}
                        </TechTag>
                      ))}
                    </ProjectTech>
                  </ProjectInfo>
                  <ViewDetailsButton className="view-details">
                    View Details
                  </ViewDetailsButton>
                </ProjectCard>
              ))}
          </ProjectsGrid>
          )}
        </PortfolioContainer>
      </PortfolioSection>
      
        {selectedProject && (
        <ModalOverlay visible={modalVisible} onClick={closeModal}>
          <ModalContent visible={modalVisible} ref={modalRef} onClick={e => e.stopPropagation()}>
            <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
            <ModalImageGallery>
              <ModalImage 
                src={selectedProject.image_url || selectedProject.image} 
                alt={selectedProject.title} 
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/900x400?text=Project+Image";
                }}
              />
            </ModalImageGallery>
            <ModalDetails>
              <ModalTitle>{selectedProject.title}</ModalTitle>
              <ModalDescription>
                {selectedProject.description || "A comprehensive solution designed for exceptional results."}
              </ModalDescription>
              
              <ModalInfoGrid>
                <ModalInfoItem>
                  <ModalInfoLabel>Client</ModalInfoLabel>
                  <ModalInfoValue>{selectedProject.client || "Enterprise Client"}</ModalInfoValue>
                </ModalInfoItem>
                <ModalInfoItem>
                  <ModalInfoLabel>Industry</ModalInfoLabel>
                  <ModalInfoValue>
                    {selectedProject.industry || "Technology"}
                  </ModalInfoValue>
                </ModalInfoItem>
                <ModalInfoItem>
                  <ModalInfoLabel>Completed</ModalInfoLabel>
                  <ModalInfoValue>
                    {selectedProject.completion_date || "2023"}
                  </ModalInfoValue>
                </ModalInfoItem>
              </ModalInfoGrid>
              
              <ModalTechStack>
                <ModalTechTitle>Technologies & Services</ModalTechTitle>
                <ModalTechList>
                  {selectedProject.technologies && typeof selectedProject.technologies === 'object' && !Array.isArray(selectedProject.technologies) ? 
                    Object.keys(selectedProject.technologies).map((tech, index) => (
                      <ModalTechItem key={`tech-${index}`}>{tech}</ModalTechItem>
                    ))
                    : 
                    Array.isArray(selectedProject.technologies) && selectedProject.technologies.map((tech, index) => (
                      <ModalTechItem key={`tech-${index}`}>{typeof tech === 'object' ? tech.name : tech}</ModalTechItem>
                    ))}
                  {selectedProject.services && selectedProject.services.map((service, index) => (
                    <ModalTechItem key={`service-${index}`}>
                      {service.title || service.name || (typeof service === 'string' ? service : '')}
                    </ModalTechItem>
                  ))}
                </ModalTechList>
              </ModalTechStack>
              
              <ModalActions>
                <ModalButton 
                  primary
                  href={`/portfolio/${selectedProject._id || selectedProject.id}`}
                >
                  View Case Study
                </ModalButton>
                {selectedProject.project_url && (
                  <ModalButton href={selectedProject.project_url} target="_blank" rel="noopener noreferrer">
                    Visit Project
                </ModalButton>
                )}
              </ModalActions>
            </ModalDetails>
          </ModalContent>
      </ModalOverlay>
      )}
    </PortfolioPage>
  );
};

export default Portfolio; 