import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

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
  font-size: 3.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${fadeIn} 1s ease forwards;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  color: var(--gray-text);
  animation: ${fadeIn} 1s ease 0.3s forwards;
  opacity: 0;
`;

const PortfolioSection = styled.section`
  padding: 5rem 0;
  background-color: var(--primary-bg);
  position: relative;
  
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

const PortfolioContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  opacity: 0;
  transform: translateY(30px);
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    
    .project-overlay {
      opacity: 1;
    }
    
    .project-image img {
      transform: scale(1.1);
    }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
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

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
`;

const ProjectCategory = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
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

// Custom hook for animation on scroll
const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, options);
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [options]);
  
  return containerRef;
};

const Portfolio = () => {
  const containerRef = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  const [filter, setFilter] = useState('all');
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
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      image: "/images/portfolio/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
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
      gallery: [
        "/images/portfolio/project1-detail1.jpg",
        "/images/portfolio/project1-detail2.jpg",
        "/images/portfolio/project1-detail3.jpg"
      ]
    },
    {
      id: 2,
      title: "Health & Fitness App",
      category: "mobile",
      image: "/images/portfolio/project2.jpg",
      technologies: ["React Native", "Firebase", "Redux", "Node.js"],
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
      gallery: [
        "/images/portfolio/project2-detail1.jpg",
        "/images/portfolio/project2-detail2.jpg",
        "/images/portfolio/project2-detail3.jpg"
      ]
    },
    {
      id: 3,
      title: "Corporate Website Redesign",
      category: "ui",
      image: "/images/portfolio/project3.jpg",
      technologies: ["HTML5", "CSS3", "JavaScript", "Figma", "WordPress"],
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
      gallery: [
        "/images/portfolio/project3-detail1.jpg",
        "/images/portfolio/project3-detail2.jpg",
        "/images/portfolio/project3-detail3.jpg"
      ]
    },
    {
      id: 4,
      title: "Real Estate Management System",
      category: "web",
      image: "/images/portfolio/project4.jpg",
      technologies: ["Angular", "Node.js", "MongoDB", "Express", "Socket.io"],
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
      gallery: [
        "/images/portfolio/project4-detail1.jpg",
        "/images/portfolio/project4-detail2.jpg",
        "/images/portfolio/project4-detail3.jpg"
      ]
    },
    {
      id: 5,
      title: "Restaurant Ordering App",
      category: "mobile",
      image: "/images/portfolio/project5.jpg",
      technologies: ["Flutter", "Firebase", "Stripe API", "Google Maps API"],
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
      gallery: [
        "/images/portfolio/project5-detail1.jpg",
        "/images/portfolio/project5-detail2.jpg",
        "/images/portfolio/project5-detail3.jpg"
      ]
    },
    {
      id: 6,
      title: "Educational Platform UI/UX",
      category: "ui",
      image: "/images/portfolio/project6.jpg",
      technologies: ["Figma", "Adobe XD", "Adobe Photoshop", "HTML/CSS"],
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
      gallery: [
        "/images/portfolio/project6-detail1.jpg",
        "/images/portfolio/project6-detail2.jpg",
        "/images/portfolio/project6-detail3.jpg"
      ]
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const openModal = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  
  return (
    <PortfolioPage ref={containerRef}>
      <HeroSection>
        <PageTitle>Our Portfolio</PageTitle>
        <PageSubtitle>Showcasing our best work and client success stories</PageSubtitle>
      </HeroSection>
      
      <PortfolioSection>
        <PortfolioContainer>
          <FilterButtons className="animate-on-scroll">
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
          
          <ProjectsGrid>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                index={index}
                onClick={() => openModal(project)}
              >
                <ProjectImage className="project-image">
                  <img src={project.image} alt={project.title} />
                </ProjectImage>
                <ProjectOverlay className="project-overlay">
                  <ProjectCategory>{project.category === 'web' ? 'Web Development' : project.category === 'mobile' ? 'Mobile App' : 'UI/UX Design'}</ProjectCategory>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectTech>
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <TechTag key={idx}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                </ProjectOverlay>
              </ProjectCard>
            ))}
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
              <ModalImage src={selectedProject.image} alt={selectedProject.title} />
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
              
              <ModalActions>
                <ModalButton href={selectedProject.projectUrl} target="_blank" rel="noopener noreferrer" primary>
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