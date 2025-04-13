import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  faTrophy,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import axios from 'axios';

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
const DetailPageContainer = styled.div`
  width: 100%;
  background-color: #121212;
  color: #fff;
  overflow-x: hidden; /* Prevent horizontal scrollbar */
  padding-top: 50px; /* Reduce padding to remove extra space */
  height: 100%;
`;

const HeroSection = styled.section`
  position: relative;
  height: 100%; /* Reduce height to remove empty space */
  background-color: #0A66C2;
  min-height: 400px; /* Decrease minimum height */
  overflow: hidden;
  margin-top: 0; /* Remove top margin */
  
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
    min-height: 350px; /* Reduce minimum height on mobile */
    margin-top: 0;
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
  padding: 1rem 2rem 2rem; /* Reduce padding */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    padding-top: 60px; /* Reduce top padding on mobile */
    padding-bottom: 2rem;
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

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.8s ease forwards;
  opacity: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-top: 0;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #0A66C2 0%, #0e4f8b 100%);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(10, 102, 194, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.style?.backgroundImage});
  background-size: cover;
  background-position: center;
  opacity: ${props => props.style?.opacity || 0.2};
  z-index: -1;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 700px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease 0.4s forwards;
  opacity: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const MetadataContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem; /* Reduce top margin */
  animation: ${fadeIn} 0.8s ease forwards;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MetadataItem = styled.div`
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

const MetadataLabel = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const MetadataValue = styled.span`
  font-size: 1.2rem;
`;

const DetailContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const MainImageContainer = styled.div`
  margin-bottom: 3rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  object-fit: cover;
`;

const SectionWithPadding = styled.div`
  padding: 3rem 0;
  background-color: ${props => props.bgColor || '#121212'};
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.8s ease 0.4s forwards;
  opacity: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

const TechnologySection = styled.div`
  margin-bottom: 3rem;
`;

const SectionSubtitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-white);
`;

const TechList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TechItem = styled.li`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

const ChallengesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ChallengeItem = styled.li`
  margin-bottom: 1rem;
`;

const ChallengeTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-white);
`;

const ChallengeDescription = styled.p`
  font-size: 1.2rem;
  color: var(--gray-text);
  line-height: 1.6;
`;

const ApproachContainer = styled.div`
  margin-top: 2rem;
`;

const ApproachItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ApproachNumber = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ApproachTitle = styled.h5`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--primary-white);
`;

const ApproachDescription = styled.p`
  font-size: 1.2rem;
  color: var(--gray-text);
  line-height: 1.6;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ResultIcon = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--primary-white);
`;

const ResultTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-white);
`;

const ResultDescription = styled.p`
  font-size: 1.2rem;
  color: var(--gray-text);
  line-height: 1.6;
`;

const TestimonialContainer = styled.div`
  position: relative;
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.8s ease forwards;
`;

const TestimonialQuoteMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 3rem;
  color: rgba(10, 102, 194, 0.3);
`;

const TestimonialText = styled.p`
  font-size: 1.5rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const RelatedProjects = styled.div`
  margin-top: 2rem;
`;

const BreadcrumbsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  animation: ${fadeInLeft} 0.8s ease forwards;
`;

const BreadcrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0A66C2;
  }
`;

const BreadcrumbCurrent = styled.span`
  color: white;
  font-size: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'completed': return 'rgba(46, 204, 113, 0.2)';
      case 'in_progress': return 'rgba(52, 152, 219, 0.2)';
      case 'planning': return 'rgba(241, 196, 15, 0.2)';
      case 'archived': return 'rgba(189, 195, 199, 0.2)';
      default: return 'rgba(46, 204, 113, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed': return '#2ecc71';
      case 'in_progress': return '#3498db';
      case 'planning': return '#f1c40f';
      case 'archived': return '#bdc3c7';
      default: return '#2ecc71';
    }
  }};
`;

const TeamSection = styled.div`
  margin-top: 2rem;
`;

const TestimonialInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TestimonialImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #0A66C2;
`;

const TestimonialAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestimonialAuthorName = styled.h4`
  font-size: 1.2rem;
  margin: 0;
  color: var(--primary-white);
`;

const TestimonialAuthorRole = styled.p`
  font-size: 1rem;
  color: #0A66C2;
  margin: 0;
`;

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - same as in projectService.js
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        console.log(`Fetching project with ID: ${id}`);
        const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
        console.log('Project data from API:', response.data);

        // Handle different response formats
        let projectData;
        if (response.data && typeof response.data === 'object') {
          projectData = response.data.project || response.data;
        } else {
          throw new Error('Invalid project data format received');
        }

        setProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError('Failed to load project details. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetails();
    }
  }, [id, API_BASE_URL]);

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
    <DetailPageContainer>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <p>Loading project details...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'red' }}>
          <p>{error}</p>
        </div>
      ) : project ? (
        <>
          <HeroSection>
            <HeroBackground
              style={{
                backgroundImage: `url(${project.image_url || project.image})`,
                opacity: 0.2
              }}
            />
            <HeroContent>
              {/* <BreadcrumbsContainer>
                <BreadcrumbLink to="/">Home</BreadcrumbLink>
                <span> / </span>
                <BreadcrumbLink to="/portfolio">Portfolio</BreadcrumbLink>
                <span> / </span>
                <BreadcrumbCurrent>{project.title}</BreadcrumbCurrent>
              </BreadcrumbsContainer> */}

              <HeroTitle>{project.title}</HeroTitle>
              <HeroSubtitle>{project.short_description || project.description?.substring(0, 120)}</HeroSubtitle>

              <MetadataContainer>
                <MetadataItem>
                  <MetadataLabel>Client</MetadataLabel>
                  <MetadataValue>{project.client || "Confidential Client"}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Industry</MetadataLabel>
                  <MetadataValue>{project.industry || "Technology"}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Category</MetadataLabel>
                  <MetadataValue>{project.category || "Web Development"}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Completed</MetadataLabel>
                  <MetadataValue>{project.completion_date || new Date().getFullYear()}</MetadataValue>
                </MetadataItem>
              </MetadataContainer>
            </HeroContent>
          </HeroSection>

          <DetailContent>
            <MainImageContainer>
              <MainImage
                src={project.image_url || project.image}
                alt={project.title}
              />
            </MainImageContainer>

            <SectionWithPadding>
              <SectionTitle>Overview</SectionTitle>
              <Description>{project.description}</Description>

              <MetadataContainer style={{ marginTop: '2rem' }}>
                <MetadataItem>
                  <MetadataLabel>Status</MetadataLabel>
                  <MetadataValue>
                    <StatusBadge status={project.status || 'completed'}>
                      {project.status === 'in_progress' ? 'In Progress' :
                        project.status === 'planning' ? 'Planning' :
                          project.status === 'archived' ? 'Archived' : 'Completed'}
                    </StatusBadge>
                  </MetadataValue>
                </MetadataItem>

                {project.start_date && (
                  <MetadataItem>
                    <MetadataLabel>Started</MetadataLabel>
                    <MetadataValue>{new Date(project.start_date).toLocaleDateString()}</MetadataValue>
                  </MetadataItem>
                )}

                {project.completion_date && (
                  <MetadataItem>
                    <MetadataLabel>Completed</MetadataLabel>
                    <MetadataValue>{new Date(project.completion_date).toLocaleDateString()}</MetadataValue>
                  </MetadataItem>
                )}

                {project.team_size && (
                  <MetadataItem>
                    <MetadataLabel>Team Size</MetadataLabel>
                    <MetadataValue>{project.team_size}</MetadataValue>
                  </MetadataItem>
                )}
              </MetadataContainer>

              {project.website_url && (
                <div style={{ marginTop: '1.5rem' }}>
                  <CTAButton href={project.website_url} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLink} /> View Live Demo
                  </CTAButton>
                </div>
              )}

              <TechnologySection>
                <SectionSubtitle>Technologies & Tools Used</SectionSubtitle>
                <TechList>
                  {project.technologies && typeof project.technologies === 'object' && !Array.isArray(project.technologies) ?
                    Object.keys(project.technologies).map((tech, index) => (
                      <TechItem key={index}>{tech}</TechItem>
                    ))
                    :
                    Array.isArray(project.technologies) && project.technologies.map((tech, index) => (
                      <TechItem key={index}>{typeof tech === 'object' ? tech.name : tech}</TechItem>
                    ))}
                </TechList>

                {project.services && project.services.length > 0 && (
                  <>
                    <SectionSubtitle style={{ marginTop: '1.5rem' }}>Services Provided</SectionSubtitle>
                    <TechList>
                      {project.services.map((service, index) => (
                        <TechItem key={`service-${index}`} style={{ backgroundColor: 'rgba(10, 102, 194, 0.1)' }}>
                          {service.title || service.name || (typeof service === 'string' ? service : '')}
                        </TechItem>
                      ))}
                    </TechList>
                  </>
                )}
              </TechnologySection>
            </SectionWithPadding>

            {/* Challenge and Solution Section */}
            {(project.challenge_description || (project.challenges && project.challenges.length > 0)) && (
              <SectionWithPadding style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <SectionTitle>Challenge</SectionTitle>
                <Description>
                  {project.challenge_description ||
                    (typeof project.challenges === 'string' ? project.challenges :
                      project.challenges && project.challenges.length > 0 ?
                        typeof project.challenges[0] === 'object' ?
                          project.challenges[0].description : project.challenges[0]
                        : 'No challenge description available')}
                </Description>
              </SectionWithPadding>
            )}

            {project.solution_description && (
              <SectionWithPadding>
                <SectionTitle>Our Approach & Solution</SectionTitle>
                <Description>{project.solution_description}</Description>
              </SectionWithPadding>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <SectionWithPadding bgColor="#f7f9fc">
                <SectionTitle>Challenges</SectionTitle>
                {typeof project.challenges === 'string' ? (
                  <Description>{project.challenges}</Description>
                ) : Array.isArray(project.challenges) ? (
                  <ChallengesList>
                    {project.challenges.map((challenge, index) => (
                      <ChallengeItem key={index}>
                        <div>
                          <ChallengeTitle>
                            {typeof challenge === 'object' ? challenge.title : `Challenge ${index + 1}`}
                          </ChallengeTitle>
                          <ChallengeDescription>
                            {typeof challenge === 'object' ? challenge.description : challenge}
                          </ChallengeDescription>
                        </div>
                      </ChallengeItem>
                    ))}
                  </ChallengesList>
                ) : (
                  <Description>No challenges specified for this project</Description>
                )}
              </SectionWithPadding>
            )}

            {project.approach && (
              <SectionWithPadding>
                <SectionTitle>Our Approach</SectionTitle>
                {typeof project.approach === 'string' ? (
                  <Description>{project.approach}</Description>
                ) : project.approach.length > 0 ? (
                  <ApproachContainer>
                    {project.approach.map((item, index) => (
                      <ApproachItem key={index}>
                        <ApproachNumber>{index + 1}</ApproachNumber>
                        <div>
                          <ApproachTitle>
                            {typeof item === 'object' ? item.title : `Phase ${index + 1}`}
                          </ApproachTitle>
                          <ApproachDescription>
                            {typeof item === 'object' ? item.description : item}
                          </ApproachDescription>
                        </div>
                      </ApproachItem>
                    ))}
                  </ApproachContainer>
                ) : null}
              </SectionWithPadding>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <SectionWithPadding bgColor="#f7f9fc">
                <SectionTitle>Gallery</SectionTitle>
                <GalleryGrid>
                  {project.gallery.map((galleryItem, index) => {
                    const imgSrc = typeof galleryItem === 'object' ?
                      (galleryItem.image_url || galleryItem.url || galleryItem.src) :
                      galleryItem;

                    return (
                      <GalleryItem key={index}>
                        <GalleryImage
                          src={imgSrc}
                          alt={`Project gallery ${index + 1}`}
                        />
                      </GalleryItem>
                    );
                  })}
                </GalleryGrid>
              </SectionWithPadding>
            )}

            {project.results && (project.results.length > 0 || typeof project.results === 'string') && (
              <SectionWithPadding>
                <SectionTitle>Results & Impact</SectionTitle>
                {typeof project.results === 'string' ? (
                  <Description>{project.results}</Description>
                ) : (
                  <ResultsContainer>
                    {project.results.map((result, index) => (
                      <ResultItem key={index}>
                        <ResultIcon>
                          <FontAwesomeIcon icon={
                            index === 0 ? faTrophy :
                              index === 1 ? faChartLine :
                                index === 2 ? faUsers : faLightbulb
                          } />
                        </ResultIcon>
                        <div>
                          <ResultTitle>
                            {typeof result === 'object' ? result.title : `Result ${index + 1}`}
                          </ResultTitle>
                          <ResultDescription>
                            {typeof result === 'object' ? result.description : result}
                          </ResultDescription>
                        </div>
                      </ResultItem>
                    ))}
                  </ResultsContainer>
                )}
              </SectionWithPadding>
            )}

            {/* Testimonial Section */}
            {project.testimonial_quote && (
              <SectionWithPadding style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <SectionTitle>Client Testimonial</SectionTitle>
                <TestimonialContainer>
                  <TestimonialQuoteMark>
                    <FontAwesomeIcon icon={faQuoteLeft} />
                  </TestimonialQuoteMark>
                  <TestimonialText>"{project.testimonial_quote}"</TestimonialText>

                  <TestimonialInfo>
                    {project.testimonial_image_url && (
                      <TestimonialImage
                        src={project.testimonial_image_url}
                        alt={project.testimonial_author || 'Client'}
                      />
                    )}
                    <TestimonialAuthorInfo>
                      <TestimonialAuthorName>
                        {project.testimonial_author || 'Client'}
                      </TestimonialAuthorName>
                      {project.testimonial_role && (
                        <TestimonialAuthorRole>
                          {project.testimonial_role}
                        </TestimonialAuthorRole>
                      )}
                    </TestimonialAuthorInfo>
                  </TestimonialInfo>
                </TestimonialContainer>
              </SectionWithPadding>
            )}

            <CTASection>
              <CTAContent>
                <CTATitle>Interested in a similar solution?</CTATitle>
                <CTADescription>
                  Let's discuss how we can help you achieve your business goals with a custom technology solution.
                </CTADescription>
                <CTAButtons>
                  <CTAButton primary to="/contact">Contact Us</CTAButton>
                  {project.project_url && (
                    <CTAButton href={project.project_url} target="_blank" rel="noopener noreferrer">
                      Visit Live Project
                    </CTAButton>
                  )}
                </CTAButtons>
              </CTAContent>
            </CTASection>

            <SectionWithPadding>
              <SectionTitle>More Projects</SectionTitle>
              <RelatedProjects />
            </SectionWithPadding>
          </DetailContent>

          {/* CTA Section */}
          <SectionWithPadding style={{ textAlign: 'center', backgroundColor: 'rgba(10, 102, 194, 0.1)' }}>
            <SectionTitle>Interested in a similar solution?</SectionTitle>
            <CTAContent>
              <CTADescription>
                Let's discuss how we can help you achieve your business goals with a custom
                technology solution.
              </CTADescription>
              <CTAButton as={Link} to="/contact">
                <FontAwesomeIcon icon={faEnvelope} /> Contact Us
              </CTAButton>
            </CTAContent>
          </SectionWithPadding>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <p>Project not found or has been removed.</p>
          <Link to="/portfolio" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--primary-color)' }}>
            Back to Portfolio
          </Link>
        </div>
      )}
    </DetailPageContainer>
  );
};

export default PortfolioDetail; 