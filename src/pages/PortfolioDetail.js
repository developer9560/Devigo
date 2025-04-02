import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faLink, 
  faCalendarAlt, 
  faBuilding, 
  faUsers, 
  faCode,
  faChevronLeft,
  faChevronRight,
  faQuoteLeft,
  faCheck,
  faChartLine,
  faLightbulb,
  faPuzzlePiece,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

// Animation keyframes
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

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
const DetailPage = styled.div`
  width: 100%;
  background-color: #121212;
  color: #fff;
  overflow-x: hidden; /* Prevent horizontal scrollbar */
`;

const HeroSection = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, #121212, transparent);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 400px;
  }
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(10, 102, 194, 0.4), rgba(0, 0, 0, 0.8));
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5rem;
  
  @media (max-width: 768px) {
    padding-top: 100px;
    padding-bottom: 3rem;
    justify-content: center;
  }
`;

const BackButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  animation: ${fadeInLeft} 0.8s ease forwards;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  svg {
    font-size: 0.9rem;
  }
`;

const ProjectCategory = styled.div`
  background-color: #0A66C2;
  color: white;
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const ProjectTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.8s ease 0.2s forwards;
  opacity: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ProjectSummary = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease 0.4s forwards;
  opacity: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  animation: ${fadeIn} 0.8s ease 0.6s forwards;
  opacity: 0;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  svg {
    color: #0A66C2;
  }
  
  span {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
  color: var(--primary-white);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #0A66C2, transparent);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ChallengeSection = styled.div`
  grid-column: span 5;
  animation: ${fadeInLeft} 0.8s ease forwards;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
    color: var(--primary-white);
  }
  
  p {
    color: var(--gray-text);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 992px) {
    grid-column: 1/-1;
  }
`;

const ChallengeImage = styled.div`
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const ApproachSection = styled.div`
  grid-column: 6 / -1;
  animation: ${fadeInRight} 0.8s ease forwards;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
    color: var(--primary-white);
  }
  
  p {
    color: var(--gray-text);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 992px) {
    grid-column: 1/-1;
  }
`;

const ProcessSteps = styled.div`
  margin-top: 2rem;
`;

const ProcessStep = styled.div`
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #0A66C2;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    
    svg {
      color: #0A66C2;
    }
  }
  
  p {
    color: var(--gray-text);
    line-height: 1.6;
    margin-bottom: 0;
  }
`;

const SolutionSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(to right, #0A66C2, #064584);
  margin: 5rem 0;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SolutionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SolutionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.8s ease forwards;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: white;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    max-width: 700px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.7;
    font-size: 1.1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  animation: ${scaleIn} 0.5s ease forwards;
  opacity: 0;
  animation-delay: ${props => props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  svg {
    font-size: 2rem;
    color: white;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
  }
`;

const GallerySection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  
  p {
    color: var(--gray-text);
    line-height: 1.7;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  border-radius: 12px;
  overflow: hidden;
  height: 300px;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ResultsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ResultsContent = styled.div`
  animation: ${fadeInLeft} 0.8s ease forwards;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResultsItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  svg {
    color: #0A66C2;
    margin-top: 0.2rem;
  }
  
  div {
    flex: 1;
    
    h4 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }
  }
`;

const ResultsChart = styled.div`
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  border-radius: 12px;
  padding: 2rem;
  height: 100%;
  animation: ${fadeInRight} 0.8s ease forwards;
`;

const TestimonialSection = styled.section`
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  padding: 5rem 0;
  margin: 5rem 0;
`;

const TestimonialContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Testimonial = styled.div`
  max-width: 800px;
  text-align: center;
  position: relative;
  padding: 3rem 2rem;
  animation: ${fadeIn} 0.8s ease forwards;
  
  .quote-icon {
    font-size: 3rem;
    color: rgba(10, 102, 194, 0.3);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  p {
    font-size: 1.5rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .author-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 3px solid #0A66C2;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    color: #0A66C2;
    margin-bottom: 0;
  }
`;

const CTASection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  text-align: center;
  animation: ${fadeIn} 0.8s ease forwards;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: ${props => props.primary ? 'linear-gradient(to right, #0A66C2, #064584)' : 'transparent'};
  color: white;
  border: ${props => props.primary ? 'none' : '2px solid #0A66C2'};
  border-radius: 50px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.primary ? '0 10px 20px rgba(10, 102, 194, 0.4)' : 'none'};
    background: ${props => props.primary ? 'linear-gradient(to right, #0A66C2, #064584)' : 'rgba(10, 102, 194, 0.1)'};
  }
`;

// Mock projects data - in a real app, this would come from an API or context
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "web",
    categoryLabel: "Web Development",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    client: "Fashion Retail Chain",
    industry: "Retail",
    teamSize: "5 Developers, 2 Designers",
    completionDate: "January 2023",
    projectUrl: "#",
    challengeDescription: "The client's existing e-commerce platform was outdated, with poor mobile responsiveness and slow loading times. They experienced high cart abandonment rates and struggled with inventory management across multiple store locations.",
    challengeImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1470&auto=format&fit=crop",
    approachSteps: [
      {
        title: "Discovery & Planning",
        description: "We conducted comprehensive user research, competitor analysis, and stakeholder interviews to identify pain points and opportunities.",
        icon: faLightbulb
      },
      {
        title: "UX Design & Prototyping",
        description: "Created wireframes and interactive prototypes, tested with real users to ensure intuitive navigation and checkout process.",
        icon: faPuzzlePiece
      },
      {
        title: "Agile Development",
        description: "Built the platform in sprints, with regular client feedback and continuous integration/deployment practices.",
        icon: faCode
      },
      {
        title: "Testing & Optimization",
        description: "Performed extensive testing across devices, optimized performance, and trained the client team on the new platform.",
        icon: faChartLine
      }
    ],
    solutionDescription: "We developed a modern, responsive e-commerce platform with a focus on user experience, fast loading times, and seamless integration with the client's inventory and fulfillment systems.",
    features: [
      {
        title: "Advanced Filtering",
        description: "Intelligent product search and filtering options to help customers find products quickly."
      },
      {
        title: "Seamless Checkout",
        description: "Streamlined checkout process with multiple payment options and abandoned cart recovery."
      },
      {
        title: "Inventory Management",
        description: "Real-time inventory tracking across all store locations and warehouses."
      },
      {
        title: "Customer Profiles",
        description: "Personalized user accounts with order history, wishlist, and product recommendations."
      },
      {
        title: "Analytics Dashboard",
        description: "Comprehensive data visualization of sales, customer behavior, and inventory performance."
      },
      {
        title: "Mobile-First Design",
        description: "Fully responsive experience optimized for all devices, with native-like mobile functionality."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563986768494-4dee09f74f5b?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506104489822-562ca25152fe?q=80&w=1469&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1470&auto=format&fit=crop"
    ],
    results: [
      {
        title: "50% Increase in Conversion Rate",
        description: "Optimized user experience and streamlined checkout process led to significant improvement in conversions."
      },
      {
        title: "35% Reduction in Cart Abandonment",
        description: "Simplified checkout and saved customer information reduced friction in the purchase process."
      },
      {
        title: "123% Growth in Mobile Sales",
        description: "Mobile-first approach resulted in dramatic improvement in mobile conversion rates and revenue."
      },
      {
        title: "28% Higher Average Order Value",
        description: "Personalized product recommendations and bundling features increased per-order revenue."
      }
    ],
    chartData: {
      before: [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 4200 },
        { name: 'Mar', value: 3800 },
        { name: 'Apr', value: 4100 },
        { name: 'May', value: 3900 },
        { name: 'Jun', value: 4300 }
      ],
      after: [
        { name: 'Jan', value: 6000 },
        { name: 'Feb', value: 6500 },
        { name: 'Mar', value: 6300 },
        { name: 'Apr', value: 7100 },
        { name: 'May', value: 7500 },
        { name: 'Jun', value: 8200 }
      ]
    },
    testimonial: {
      quote: "The new e-commerce platform has transformed our business. Not only has it improved our online sales dramatically, but the inventory management system has streamlined our operations across all store locations. The DEVIGO team truly understood our challenges and delivered a solution that exceeded our expectations.",
      author: "Sarah Johnson",
      role: "E-Commerce Director, Fashion Retail Chain",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop"
    }
  },
  // More projects would be added here
];

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // In a real application, you would fetch the project data from an API
  useEffect(() => {
    // Simulating API call with setTimeout
    const timer = setTimeout(() => {
      const foundProject = projects.find(p => p.id === parseInt(id));
      if (foundProject) {
        setProject(foundProject);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleGoBack = () => {
    navigate('/portfolio');
  };
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#121212', color: 'white' }}>Loading...</div>;
  }
  
  if (!project) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#121212', color: 'white' }}>Project not found</div>;
  }
  
  return (
    <DetailPage>
      <HeroSection>
        <HeroImage>
          <img 
            src={project.image} 
            alt={project.title} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/1200x600?text=Project+Hero+Image";
            }}
          />
        </HeroImage>
        <HeroContent>
          <BackButton onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Portfolio
          </BackButton>
          <ProjectCategory>{project.categoryLabel}</ProjectCategory>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectSummary>
            A comprehensive solution designed to address the client's specific needs and deliver measurable business results.
          </ProjectSummary>
          <ProjectMeta>
            <MetaItem>
              <FontAwesomeIcon icon={faBuilding} />
              <span>Client: {project.client}</span>
            </MetaItem>
            <MetaItem>
              <FontAwesomeIcon icon={faUsers} />
              <span>Team: {project.teamSize}</span>
            </MetaItem>
            <MetaItem>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Completed: {project.completionDate}</span>
            </MetaItem>
            <MetaItem>
              <FontAwesomeIcon icon={faLink} />
              <span>Industry: {project.industry}</span>
            </MetaItem>
          </ProjectMeta>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <SectionTitle>Challenge & Approach</SectionTitle>
        <Grid>
          <ChallengeSection>
            <h3>The Challenge</h3>
            <p>{project.challengeDescription}</p>
            <ChallengeImage>
              <img 
                src={project.challengeImage} 
                alt="Challenge visualization" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/600x400?text=Challenge+Image";
                }}
              />
            </ChallengeImage>
          </ChallengeSection>
          
          <ApproachSection>
            <h3>Our Approach</h3>
            <p>We implemented a structured methodology to address the client's challenges and create a solution that would not only solve immediate problems but also provide long-term value.</p>
            
            <ProcessSteps>
              {project.approachSteps.map((step, index) => (
                <ProcessStep key={index}>
                  <h3>
                    <FontAwesomeIcon icon={step.icon} />
                    {step.title}
                  </h3>
                  <p>{step.description}</p>
                </ProcessStep>
              ))}
            </ProcessSteps>
          </ApproachSection>
        </Grid>
      </ContentSection>
      
      <SolutionSection>
        <SolutionContent>
          <SolutionHeader>
            <h2>Our Solution</h2>
            <p>{project.solutionDescription}</p>
          </SolutionHeader>
          
          <FeaturesGrid>
            {project.features.map((feature, index) => (
              <FeatureCard key={index} index={index}>
                <FontAwesomeIcon icon={faTrophy} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </SolutionContent>
      </SolutionSection>
      
      <GallerySection>
        <SectionTitle>Project Gallery</SectionTitle>
        <p>Explore the visual elements of our solution and see how it addresses the client's needs.</p>
        
        <GalleryGrid>
          {project.gallery.map((image, index) => (
            <GalleryItem key={index} index={index}>
              <img 
                src={image} 
                alt={`Project screenshot ${index + 1}`} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/600x400?text=Gallery+Image";
                }}
              />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GallerySection>
      
      <ResultsSection>
        <SectionTitle>Results & Impact</SectionTitle>
        <p>The implementation of our solution delivered significant measurable results for the client.</p>
        
        <ResultsGrid>
          <ResultsContent>
            <ResultsList>
              {project.results.map((result, index) => (
                <ResultsItem key={index}>
                  <FontAwesomeIcon icon={faCheck} />
                  <div>
                    <h4>{result.title}</h4>
                    <p>{result.description}</p>
                  </div>
                </ResultsItem>
              ))}
            </ResultsList>
          </ResultsContent>
          
          <ResultsChart>
            <h3>Performance Comparison</h3>
            <p>Monthly sales before and after implementation (in thousands)</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  stroke="rgba(255,255,255,0.2)" 
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.7)' }} 
                  stroke="rgba(255,255,255,0.2)" 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2a2a2a', 
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Line 
                  name="Before" 
                  data={project.chartData.before} 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  name="After" 
                  data={project.chartData.after} 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0A66C2" 
                  strokeWidth={2}
                  dot={{ fill: '#0A66C2', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ResultsChart>
        </ResultsGrid>
      </ResultsSection>
      
      <TestimonialSection>
        <TestimonialContent>
          <Testimonial>
            <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
            <p>{project.testimonial.quote}</p>
            <TestimonialAuthor>
              <div className="author-image">
                <img 
                  src={project.testimonial.image} 
                  alt={project.testimonial.author}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150x150?text=Client";
                  }}
                />
              </div>
              <h4>{project.testimonial.author}</h4>
              <p>{project.testimonial.role}</p>
            </TestimonialAuthor>
          </Testimonial>
        </TestimonialContent>
      </TestimonialSection>
      
      <CTASection>
        <CTATitle>Ready for Similar Results?</CTATitle>
        <CTAText>
          Let's discuss how we can help your business achieve similar success with our tailored solutions and expertise.
        </CTAText>
        <CTAButtons>
          <CTAButton href="/contact" primary>
            Start Your Project
          </CTAButton>
          <CTAButton href="/portfolio">
            View More Work
          </CTAButton>
        </CTAButtons>
      </CTASection>
    </DetailPage>
  );
};

export default PortfolioDetail; 