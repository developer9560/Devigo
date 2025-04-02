import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faLinkedinIn, 
  faFacebookF, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';

// Define animations
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(10, 102, 194, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(10, 102, 194, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(10, 102, 194, 0);
  }
`;

// Styled Components
const ContactPage = styled.div`
  width: 100%;
  background-color: var(--primary-bg);
  color: var(--primary-white);
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  background: linear-gradient(to right, rgba(10, 102, 194, 0.9), rgba(6, 69, 132, 0.9)), 
              url('/images/contact-hero.jpg') no-repeat center center/cover;
  padding: 5rem 0;
  text-align: center;
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
    background: linear-gradient(to top, var(--primary-bg), transparent);
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  animation: ${fadeIn} 0.8s ease forwards;
  background: linear-gradient(to right, #fff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease 0.3s forwards;
  opacity: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem;
  }
`;

const InfoContainer = styled.div`
  animation: ${slideInLeft} 1s ease forwards;
  opacity: 0;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const InfoTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--primary-white);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-blue), transparent);
  }
`;

const InfoText = styled.p`
  color: var(--gray-text);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  font-size: 1.1rem;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  color: var(--primary-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-right: 1.5rem;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  ${ContactMethod}:hover & {
    background-color: var(--primary-blue);
    color: white;
    animation: ${pulse} 1.5s infinite;
  }
`;

const ContactDetail = styled.div`
  flex: 1;
`;

const DetailTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--primary-white);
`;

const DetailText = styled.p`
  color: var(--gray-text);
  line-height: 1.6;
`;

const ContactLink = styled.a`
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    text-decoration: underline;
    color: #4d9fff;
  }
`;

const SocialSection = styled.div`
  margin-top: 3rem;
`;

const SocialTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-white);
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  color: var(--gray-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background-color: var(--primary-blue);
    color: white;
    transform: translateY(-5px);
  }
`;

const FormContainer = styled.div`
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(5px);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: ${slideInRight} 1s ease forwards;
  opacity: 0;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--primary-white);
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--primary-blue), transparent);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 0.8rem;
  color: var(--gray-text);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
`;

const Required = styled.span`
  color: #e74c3c;
  margin-left: 0.3rem;
`;

const FormInput = styled.input`
  padding: 1rem 1.2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--primary-white);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormSelect = styled.select`
  padding: 1rem 1.2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--primary-white);
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230A66C2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.2);
  }
  
  & option {
    background-color: #1c1c1c;
    color: var(--primary-white);
    padding: 1rem;
  }

  & option:hover,
  & option:focus,
  & option:active {
    background-color: var(--primary-blue);
    color: white;
  }
`;

const FormTextarea = styled.textarea`
  padding: 1rem 1.2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--primary-white);
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #0A66C2, #064584);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(10, 102, 194, 0.4);
  }
`;

// Animation hook for scroll reveal
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

const Contact = () => {
  const containerRef = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  return (
    <ContactPage ref={containerRef}>
      <style>
        {`
          .animate-on-scroll {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>
      
      <HeroSection>
        <HeroTitle>Contact Us</HeroTitle>
        <HeroSubtitle>Get in touch with our team for inquiries and collaborations</HeroSubtitle>
      </HeroSection>

      <ContentContainer>
        <InfoContainer>
          <InfoTitle>Get in Touch</InfoTitle>
          <InfoText>
            We're here to help with your digital needs. Feel free to reach out to us through any of the methods below, and our team will get back to you as soon as possible.
          </InfoText>
          
          <ContactMethod>
            <IconBox>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </IconBox>
            <ContactDetail>
              <DetailTitle>Address</DetailTitle>
              <DetailText>123 Tech Street, Suite 456<br />San Francisco, CA 94107</DetailText>
            </ContactDetail>
          </ContactMethod>
          
          <ContactMethod>
            <IconBox>
              <FontAwesomeIcon icon={faEnvelope} />
            </IconBox>
            <ContactDetail>
              <DetailTitle>Email</DetailTitle>
              <DetailText>
                <ContactLink href="mailto:info@devigo.com">info@devigo.com</ContactLink>
              </DetailText>
            </ContactDetail>
          </ContactMethod>
          
          <ContactMethod>
            <IconBox>
              <FontAwesomeIcon icon={faPhone} />
            </IconBox>
            <ContactDetail>
              <DetailTitle>Phone</DetailTitle>
              <DetailText>
                <ContactLink href="tel:+14155552671">+1 (415) 555-2671</ContactLink>
              </DetailText>
            </ContactDetail>
          </ContactMethod>
          
          <SocialSection>
            <SocialTitle>Follow Us</SocialTitle>
            <SocialIcons>
              <SocialIcon href="#" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </SocialIcon>
            </SocialIcons>
          </SocialSection>
        </InfoContainer>
        
        <FormContainer>
          <FormTitle>Send Us a Message</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <FormLabel>
                  Name <Required>*</Required>
                </FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  Email <Required>*</Required>
                </FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number (optional)"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Company</FormLabel>
                <FormInput
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name (optional)"
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel>
                Service Interested In <Required>*</Required>
              </FormLabel>
              <FormSelect
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a service</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App Development</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="other">Other</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>
                Message <Required>*</Required>
              </FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project"
                rows="5"
                required
              ></FormTextarea>
            </FormGroup>
            
            <SubmitButton type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </SubmitButton>
          </Form>
        </FormContainer>
      </ContentContainer>
    </ContactPage>
  );
};

export default Contact; 