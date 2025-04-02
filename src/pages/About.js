import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedinIn, 
  faTwitter, 
  faGithub, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faLaptop, 
  faPaintBrush, 
  faChartLine, 
  faHandshake, 
  faRocket, 
  faWrench,
  faQuoteLeft,
  faBuilding,
  faUsers,
  faCertificate,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';

// Animations
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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const shine = keyframes`
  0% {
    background-position: -100px;
  }
  100% {
    background-position: 200px;
  }
`;

// Add a new timeline fill animation
const lineGrow = keyframes`
  from {
    height: 0%;
  }
  to {
    height: 100%;
  }
`;

// Add a slide animation for timeline items
const slideRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const AboutPage = styled.div`
  width: 100%;
  color: #fff;
  background-color: #121212;
  position: relative;
  display: block;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(10, 102, 194, 0.8), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80') no-repeat center center/cover;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, #121212, transparent);
  }
`;

const PageTitle = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #fff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 1;
  display: block;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 700px;
  color: rgba(255, 255, 255, 0.9);
  opacity: 1;
  display: block;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  color: #fff;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, #0A66C2, #0855a1);
    margin: 1rem auto;
    border-radius: 3px;
  }
`;

const SectionDescription = styled.p`
  color: var(--gray-text);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.1rem;
`;

// Company Story Section
const StorySection = styled.section`
  padding: 6rem 0;
  position: relative;
  background-color: #121212;
  display: block;
  opacity: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 5%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(10, 102, 194, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const StoryImage = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  height: 500px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  }
  
  @media (max-width: 992px) {
    height: 350px;
  }
`;

const StoryContent = styled.div`
  padding: 2rem;
  
  h3 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: #fff;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(to right, #0A66C2, transparent);
    }
  }
  
  p {
    color: var(--gray-text);
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.1rem;
  }
`;

const TimelineSection = styled.div`
  margin-top: 4rem;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: block;
  opacity: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 6px;
    background: rgba(8, 85, 161, 0.1);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    border-radius: 10px;
    z-index: 0;
    
    @media (max-width: 768px) {
      left: 31px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background: linear-gradient(to bottom, #0A66C2, rgba(8, 85, 161, 0.8));
    top: 0;
    left: 50%;
    margin-left: -3px;
    border-radius: 10px;
    z-index: 1;
    height: 0%;
    transition: height 1.5s ease-in-out;
    
    @media (max-width: 768px) {
      left: 31px;
    }
  }
  
  &.animate-line::after {
    height: 100%;
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => props.position === 'right' ? '50%' : '0'};
  display: block;
  opacity: 0;
  transform: translateX(${props => props.position === 'right' ? '50px' : '-50px'});
  transition: all 0.8s ease-out;
  
  &.animate {
    opacity: 1;
    transform: translateX(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    left: 0;
    transform: translateX(-30px);
    
    &.animate {
      transform: translateX(0);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: ${props => props.position === 'left' ? '-12.5px' : 'auto'};
    left: ${props => props.position === 'right' ? '-12.5px' : 'auto'};
    background-color: rgba(10, 102, 194, 0.2);
    border: 4px solid rgba(10, 102, 194, 0.3);
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    box-shadow: 0 0 0 5px rgba(10, 102, 194, 0.1);
    transition: all 0.4s ease;
    
    @media (max-width: 768px) {
      left: 18px;
      right: auto;
    }
  }
  
  &.animate::after {
    background-color: #0A66C2;
    box-shadow: 0 0 0 8px rgba(10, 102, 194, 0.2);
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background: linear-gradient(145deg, rgba(42, 42, 42, 0.7), rgba(30, 30, 30, 0.7));
  backdrop-filter: blur(10px);
  position: relative;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: block;
  opacity: 1;
  transform: scale(0.95);
  transition: all 0.5s ease;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #fff;
  }
  
  p {
    color: var(--gray-text);
    line-height: 1.6;
  }
  
  .year {
    position: absolute;
    top: -30px;
    font-size: 0.9rem;
    background: linear-gradient(to right, #0A66C2, #0855a1);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: bold;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease 0.2s;
  }
  
  ${TimelineItem}.animate & {
    transform: scale(1);
    
    .year {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Team Section
const TeamSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #121212, #111);
  position: relative;
  display: block;
  opacity: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
    opacity: 0.05;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background: linear-gradient(145deg, rgba(42, 42, 42, 0.6), rgba(30, 30, 30, 0.6));
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: block;
  opacity: 1;
  
  &:hover .team-image img {
    transform: scale(1.05);
  }
`;

const TeamImage = styled.div`
  height: 320px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }
`;

const TeamInfo = styled.div`
  padding: 1.5rem;
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const TeamRole = styled.p`
  font-size: 1rem;
  color: var(--primary-blue);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--primary-blue);
  }
`;

const TeamBio = styled.p`
  color: var(--gray-text);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const TeamTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const TeamTag = styled.span`
  background: rgba(10, 102, 194, 0.2);
  color: var(--primary-blue);
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  display: inline-block;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--gray-text);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-blue);
    color: var(--primary-white);
    transform: translateY(-3px);
  }
`;

// Values Section
const ValuesSection = styled.section`
  padding: 6rem 0;
  background-color: #111;
  position: relative;
  overflow: hidden;
  display: block;
  opacity: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(10, 102, 194, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ValueCard = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #222);
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  display: block;
  opacity: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #0A66C2, transparent);
  }
  
  .icon {
    font-size: 2.5rem;
    color: var(--primary-blue);
    margin-bottom: 1.5rem;
    animation: ${float} 5s ease-in-out infinite;
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const ValueDescription = styled.p`
  color: var(--gray-text);
  line-height: 1.7;
  flex-grow: 1;
`;

const ValueExample = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  
  h4 {
    font-size: 1rem;
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-text);
    font-size: 0.9rem;
    line-height: 1.6;
    font-style: italic;
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(to bottom, #111, #121212);
  position: relative;
  display: block;
  opacity: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://www.transparenttextures.com/patterns/cubes.png');
    opacity: 0.05;
  }
`;

const TestimonialsSlider = styled.div`
  margin-top: 3rem;
  padding: 2rem 0;
  position: relative;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const Testimonial = styled.div`
  padding: 2.5rem;
  background: linear-gradient(145deg, rgba(42, 42, 42, 0.5), rgba(30, 30, 30, 0.5));
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin: 0 1rem;
  position: relative;
  display: block;
  opacity: 1;
  
  .quote-icon {
    font-size: 2rem;
    color: rgba(10, 102, 194, 0.2);
    position: absolute;
    top: 20px;
    left: 20px;
  }
  
  p {
    color: var(--gray-text);
    line-height: 1.8;
    font-size: 1.1rem;
    position: relative;
    z-index: 2;
    margin-bottom: 1.5rem;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .author-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .author-info {
    h4 {
      font-size: 1.1rem;
      color: #fff;
      margin-bottom: 0.2rem;
    }
    
    p {
      font-size: 0.9rem;
      color: var(--primary-blue);
      margin-bottom: 0;
    }
  }
`;

// Office Section
const OfficeSection = styled.section`
  padding: 6rem 0;
  background-color: #121212;
  position: relative;
  display: block;
  opacity: 1;
`;

const OfficeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  height: 600px;
  
  @media (max-width: 992px) {
    height: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const OfficeImageBox = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  grid-column: ${props => props.col || 'auto'};
  grid-row: ${props => props.row || 'auto'};
  display: block;
  opacity: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  @media (max-width: 992px) {
    grid-column: auto;
    grid-row: auto;
    height: 300px;
  }
`;

const OfficeContent = styled.div`
  grid-column: 7 / 13;
  grid-row: 1 / 2;
  padding: 2rem;
  background: linear-gradient(145deg, rgba(42, 42, 42, 0.7), rgba(30, 30, 30, 0.7));
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 1;
  
  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #fff;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(to right, #0A66C2, transparent);
    }
  }
  
  p {
    color: var(--gray-text);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 992px) {
    grid-column: 1 / -1;
    grid-row: auto;
  }
`;

// CTASection
const CTASection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #0A66C2, #064584);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://www.transparenttextures.com/patterns/gplay.png');
    opacity: 0.1;
  }
  
  .container {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h2 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .cta-button {
    display: inline-block;
    background: #fff;
    color: #0A66C2;
    padding: 1rem 2.5rem;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    }
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
    
    // Make sure elements are visible by default
    elements.forEach(el => {
      // Set initial styles to ensure visibility even without animation
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      
      // Then observe for animation enhancement
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [options]);
  
  return containerRef;
};

// For counter animation
const useCounterAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const countElement = entry.target;
          const target = parseInt(countElement.getAttribute('data-target'));
          const duration = 2000; // 2s animation
          const stepTime = Math.abs(Math.floor(duration / target));
          let current = 0;
          
          const timer = setInterval(() => {
            current += 1;
            countElement.textContent = current;
            
            if (current >= target) {
              clearInterval(timer);
              countElement.textContent = target + '+';
            }
          }, stepTime);
        }
      });
    }, { threshold: 0.5 });
    
    const countElements = document.querySelectorAll('.count-number');
    countElements.forEach(el => observer.observe(el));
    
    return () => {
      countElements.forEach(el => observer.unobserve(el));
    };
  }, []);
};

const About = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Set initial CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-bg', '#121212');
    document.documentElement.style.setProperty('--gray-text', 'rgba(255, 255, 255, 0.7)');
    document.documentElement.style.setProperty('--primary-blue', '#0A66C2');
    document.documentElement.style.setProperty('--primary-white', '#ffffff');
    
    // Force all section headers and text to be visible
    const forceVisibility = () => {
      document.querySelectorAll('.animate-on-scroll, h1, h2, h3, p').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    };
    
    forceVisibility();
    
    // Setup animation for timeline elements
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timeline && timelineItems.length > 0) {
      // Create an intersection observer for the timeline
      const timelineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Animate the line
              setTimeout(() => {
                timeline.classList.add('animate-line');
              }, 500);
              timelineObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      timelineObserver.observe(timeline);
      
      // Create an intersection observer for timeline items
      const itemObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Animate the item with a delay based on its index
              const item = entry.target;
              const index = Array.from(timelineItems).indexOf(item);
              setTimeout(() => {
                item.classList.add('animate');
              }, 300 + (index * 200));
              
              itemObserver.unobserve(item);
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
      );
      
      timelineItems.forEach(item => {
        itemObserver.observe(item);
      });
    }
    
    // Simple counter animation
    const countElements = document.querySelectorAll('.count-number');
    countElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      el.textContent = target + '+';
    });
    
  }, []);
  
  useCounterAnimation();
  
  const teamData = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
      bio: "John is a visionary tech entrepreneur with over 15 years of experience in web development and digital marketing.",
      skills: ["Web Development", "Business Strategy", "UX Design"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
      bio: "Jane leads our technical team with her extensive experience in software architecture and cloud infrastructure.",
      skills: ["Software Architecture", "Cloud Computing", "DevOps"],
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Mike Johnson",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=500&q=80",
      bio: "Mike brings over a decade of design experience and ensures all our projects exceed visual expectations.",
      skills: ["UI/UX Design", "Brand Identity", "Motion Graphics"],
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    }
  ];
  
  const timelineData = [
    {
      year: "2015",
      title: "Founded",
      description: "DEVIGO was founded with the mission to provide innovative digital solutions for businesses of all sizes.",
      position: "left"
    },
    {
      year: "2017",
      title: "First Major Client",
      description: "Successfully completed our first enterprise-level project for a Fortune 500 company.",
      position: "right"
    },
    {
      year: "2019",
      title: "Office Expansion",
      description: "Expanded our operations with new offices and doubled our team size to meet growing client demands.",
      position: "left"
    },
    {
      year: "2021",
      title: "International Growth",
      description: "Established presence in multiple countries and formed strategic partnerships across various industries.",
      position: "right"
    },
    {
      year: "2023",
      title: "Innovation Focus",
      description: "Launched our Research & Development division to focus on emerging technologies and innovative solutions.",
      position: "left"
    }
  ];
  
  const valuesData = [
    {
      icon: faLaptop,
      title: "Excellence",
      description: "We strive for excellence in every project we undertake, ensuring the highest quality work and attention to detail.",
      example: "Our team spent an extra week refining the UI for a client's app, resulting in a 40% increase in user engagement after launch."
    },
    {
      icon: faUsers,
      title: "Collaboration",
      description: "We believe in transparent communication and close collaboration with our clients throughout the development process.",
      example: "We implemented weekly sprint reviews with a healthcare client, allowing them to provide feedback that dramatically improved the final product."
    },
    {
      icon: faLightbulb,
      title: "Innovation",
      description: "We continuously explore emerging technologies and innovative approaches to solve complex business challenges.",
      example: "For an e-commerce client, we developed a custom AI recommendation engine that increased their average order value by 35%."
    },
    {
      icon: faHandshake,
      title: "Integrity",
      description: "We operate with honesty, transparency, and strong ethical principles in all our business dealings.",
      example: "When we identified a more cost-effective solution for a client midway through a project, we proactively recommended the change, saving them $20K."
    }
  ];
  
  const testimonials = [
    {
      quote: "DEVIGO transformed our outdated website into a powerful sales tool. Their expertise and attention to detail exceeded our expectations at every turn.",
      author: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      image: "https://images.unsplash.com/photo-1581992652564-44c42f5ad3ad?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Working with DEVIGO was a game-changer for our startup. They not only delivered a beautiful website but also helped us optimize our entire digital strategy.",
      author: "Michael Chen",
      role: "Founder, InnovateTech",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
  ];
  
  return (
    <AboutPage ref={containerRef}>
      <HeroSection>
        <PageTitle style={{opacity: 1, display: 'block'}}>About DEVIGO</PageTitle>
        <PageSubtitle style={{opacity: 1, display: 'block'}}>Discover our story, our team, and the values that drive us to create exceptional digital experiences</PageSubtitle>
      </HeroSection>
      
      {/* Company Story Section */}
      <StorySection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle style={{opacity: 1, display: 'block', visibility: 'visible'}}>Our Story</SectionTitle>
            <SectionDescription style={{opacity: 1, display: 'block', visibility: 'visible'}}>
              From a small startup to an industry leader, discover how DEVIGO became the innovative digital agency it is today
            </SectionDescription>
          </SectionHeader>
          
          <StoryGrid>
            <StoryImage className="animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" alt="DEVIGO Team" />
            </StoryImage>
            
            <StoryContent className="animate-on-scroll">
              <h3>How It All Started</h3>
              <p>
                DEVIGO was founded in 2015 by a team of passionate developers and designers who saw a gap in the market for truly integrated digital solutions. Our founders believed that successful digital products require both technical excellence and stunning design working in harmony.
              </p>
              <p>
                What began as a small team working out of a co-working space has grown into a global agency with offices in multiple countries, serving clients from startups to Fortune 500 companies. Throughout our growth, we've maintained our commitment to quality, innovation, and client satisfaction.
              </p>
              <p>
                Today, DEVIGO stands at the forefront of digital innovation, helping businesses transform their digital presence and achieve measurable results through technology. Our vision is to continue pushing boundaries and setting new standards in digital excellence.
              </p>
            </StoryContent>
          </StoryGrid>
          
          <TimelineSection>
            <SectionHeader>
              <SectionTitle style={{opacity: 1, display: 'block', visibility: 'visible'}}>Our Journey</SectionTitle>
              <SectionDescription style={{opacity: 1, display: 'block', visibility: 'visible'}}>
                Key milestones that have shaped our path and defined our success
              </SectionDescription>
            </SectionHeader>
            
            <Timeline className="timeline" ref={timelineRef}>
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  position={item.position}
                  className="timeline-item"
                >
                  <TimelineContent>
                    <span className="year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </TimelineSection>
        </SectionContainer>
      </StorySection>
      
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-white mb-2 count-number" data-target="150">0</div>
              <div className="text-blue-200 uppercase tracking-wider text-sm">Projects Completed</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-white mb-2 count-number" data-target="50">0</div>
              <div className="text-blue-200 uppercase tracking-wider text-sm">Happy Clients</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-white mb-2 count-number" data-target="10">0</div>
              <div className="text-blue-200 uppercase tracking-wider text-sm">Years Experience</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-white mb-2 count-number" data-target="25">0</div>
              <div className="text-blue-200 uppercase tracking-wider text-sm">Team Members</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <TeamSection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle style={{opacity: 1, display: 'block', visibility: 'visible'}}>Meet Our Team</SectionTitle>
            <SectionDescription style={{opacity: 1, display: 'block', visibility: 'visible'}}>
              Our talented professionals are dedicated to bringing your ideas to life through creativity, expertise, and innovation
            </SectionDescription>
          </SectionHeader>
          
          <TeamGrid>
            {teamData.map((member, index) => (
              <TeamMember key={index} className="animate-on-scroll">
                <TeamImage className="team-image">
                  <img src={member.image} alt={member.name} />
                </TeamImage>
                <TeamInfo>
                  <TeamName>{member.name}</TeamName>
                  <TeamRole>{member.role}</TeamRole>
                  <TeamBio>{member.bio}</TeamBio>
                  
                  <TeamTags>
                    {member.skills.map((skill, skillIdx) => (
                      <TeamTag key={skillIdx}>{skill}</TeamTag>
                    ))}
                  </TeamTags>
                  
                  <SocialLinks>
                    {member.social.linkedin && (
                      <SocialLink href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                      </SocialLink>
                    )}
                    {member.social.twitter && (
                      <SocialLink href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                      </SocialLink>
                    )}
                    {member.social.github && (
                      <SocialLink href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                      </SocialLink>
                    )}
                    {member.social.instagram && (
                      <SocialLink href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                      </SocialLink>
                    )}
                  </SocialLinks>
                </TeamInfo>
              </TeamMember>
            ))}
          </TeamGrid>
        </SectionContainer>
      </TeamSection>
      
      {/* Values Section */}
      <ValuesSection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle style={{opacity: 1, display: 'block', visibility: 'visible'}}>Our Values</SectionTitle>
            <SectionDescription style={{opacity: 1, display: 'block', visibility: 'visible'}}>
              The core principles that guide our work and define our approach to every project
            </SectionDescription>
          </SectionHeader>
          
          <ValuesGrid>
            {valuesData.map((value, index) => (
              <ValueCard key={index} className="animate-on-scroll">
                <div className="icon">
                  <FontAwesomeIcon icon={value.icon} />
                </div>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
                <ValueExample>
                  <h4>How We Live This Value:</h4>
                  <p>{value.example}</p>
                </ValueExample>
              </ValueCard>
            ))}
          </ValuesGrid>
        </SectionContainer>
      </ValuesSection>
      
      {/* Testimonials Section */}
      <TestimonialsSection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle style={{opacity: 1, display: 'block', visibility: 'visible'}}>Client Testimonials</SectionTitle>
            <SectionDescription style={{opacity: 1, display: 'block', visibility: 'visible'}}>
              Hear what our clients have to say about their experience working with us
            </SectionDescription>
          </SectionHeader>
          
          <TestimonialsSlider>
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} className="animate-on-scroll">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                <p>{testimonial.quote}</p>
                <TestimonialAuthor>
                  <div className="author-image">
                    <img src={testimonial.image} alt={testimonial.author} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </TestimonialAuthor>
              </Testimonial>
            ))}
          </TestimonialsSlider>
        </SectionContainer>
      </TestimonialsSection>
      
      {/* Office Section */}
      <OfficeSection>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle style={{opacity: 1, display: 'block', visibility: 'visible'}}>Our Workspace</SectionTitle>
            <SectionDescription style={{opacity: 1, display: 'block', visibility: 'visible'}}>
              Take a look at where innovation happens and our team collaborates to create amazing digital experiences
            </SectionDescription>
          </SectionHeader>
          
          <OfficeGrid>
            <OfficeImageBox col="1 / 7" row="1 / 3" className="animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" alt="Office Space" />
            </OfficeImageBox>
            
            <OfficeContent className="animate-on-scroll">
              <h3>Where Creativity Meets Technology</h3>
              <p>
                Our open and collaborative workspace is designed to foster creativity, innovation, and teamwork. We believe that a well-designed environment leads to better work and happier team members.
              </p>
              <p>
                From comfortable meeting spaces to quiet focus areas, our office accommodates different work styles and project needs. We've created a space where ideas flow freely and where our team feels inspired to do their best work.
              </p>
            </OfficeContent>
            
            <OfficeImageBox col="7 / 10" row="2 / 3" className="animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80" alt="Team Collaboration" />
            </OfficeImageBox>
            
            <OfficeImageBox col="10 / 13" row="2 / 3" className="animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&q=80" alt="Team Meeting" />
            </OfficeImageBox>
          </OfficeGrid>
        </SectionContainer>
      </OfficeSection>
      
      {/* CTA Section */}
      <CTASection>
        <div className="container">
          <h2 style={{opacity: 1, display: 'block', visibility: 'visible'}}>Ready to Work With Us?</h2>
          <p style={{opacity: 1, display: 'block', visibility: 'visible'}}>Let's turn your digital vision into reality. Contact us today to discuss your project and how we can help you achieve your goals.</p>
          <a href="/contact" className="cta-button">Get In Touch</a>
        </div>
      </CTASection>
    </AboutPage>
  );
};

export default About;