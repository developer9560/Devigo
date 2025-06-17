import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faPaperPlane,
  faCheckCircle,
  faExclamationTriangle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faLinkedinIn, 
  faFacebookF, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { api, inquiriesApi, servicesApi } from '../utility/api';
import { set } from 'date-fns';

// Get the base API URL from environment variable or use a default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

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

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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

const MessageBox = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.5s ease forwards;
  background-color: ${props => props.type === 'success' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)'};
  color: ${props => props.type === 'success' ? '#2e7d32' : '#d32f2f'};
  border: 1px solid ${props => props.type === 'success' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)'};
`;

const MessageIcon = styled.div`
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const SpinnerIcon = styled(FontAwesomeIcon)`
  animation: ${spin} 1s linear infinite;
  margin-right: 0.5rem;
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
  window.scrollTo(0, 0); // Scroll to top on component mount
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
    message: '',
    subject: '' // Default subject
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const response = await servicesApi.getAll();
        if (response.data) {
          // Handle the case where response.data might be an object with a nested data property
          // This ensures services is always an array
          const servicesArray = Array.isArray(response.data) ? response.data : 
                               (response.data.data ? response.data.data : []);
          setServices(servicesArray);
          console.log('Services loaded:', servicesArray);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to direct axios call if the servicesApi fails
        try {
          const response = await axios.get(`${API_BASE_URL}/services/`);
          if (response.data) {
            // Same array handling for the direct axios call
            const servicesArray = Array.isArray(response.data) ? response.data : 
                                 (response.data.data ? response.data.data : []);
            setServices(servicesArray);
            console.log('Services loaded via fallback:', servicesArray);
          }
        } catch (axiosError) {
          console.error('Error fetching services with direct axios:', axiosError);
          // Set services to an empty array to prevent further errors
          setServices([]);
        }
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // Debug useEffect to log the structure of services data
  useEffect(() => {
    if (services) {
      console.log('Services state updated:', {
        isArray: Array.isArray(services),
        length: Array.isArray(services) ? services.length : 'not an array',
        firstItem: Array.isArray(services) && services.length > 0 ? services[0] : 'no items' 
      });
    }
  }, [services]);

  const getServiceNameById = (serviceId) => {
    if (!serviceId || !Array.isArray(services)) return '';
    
    console.log('Looking for service ID:', serviceId, 'in services:', services);
    
    // Try to find service by ID
    const service = services.find(s => 
      s && s.id && s.id.toString() === serviceId.toString()
    );
    
    // If found, return the name
    if (service && service.name) {
      console.log('Found service:', service);
      return service.name;
    }
    
    // If not found by ID, check if any service name matches directly
    // This is a fallback for when we're using the static options
    for (const option of document.querySelectorAll('#service option')) {
      if (option.value === serviceId) {
        console.log('Found service by option value:', option.textContent);
        return option.textContent;
      }
    }
    
    // Final fallback to the dropdown text itself
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
      if (selectedOption) {
        console.log('Using selected option text:', selectedOption.textContent);
        return selectedOption.textContent;
      }
    }
    
    return '';
  };

  const handleServiceChange = (e) => {
    const selectedServiceId = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;
    
    console.log('Service selected:', {
      id: selectedServiceId,
      optionText: selectedText
    });
    
    // First update the service field
    setFormData(prev => ({
      ...prev,
      service: selectedServiceId
    }));
    
    // Then update the subject based on the selected service
    // First try to get name from services array
    const serviceName = getServiceNameById(selectedServiceId);
    
    if (serviceName) {
      console.log('Setting subject using service name:', serviceName);
      setFormData(prev => ({
        ...prev,
        service: selectedServiceId,
        subject: `${serviceName}`
      }));
    } else if (selectedText && selectedText !== 'Select a service') {
      // If service name lookup failed, use the option text directly
      console.log('Setting subject using option text:', selectedText);
      setFormData(prev => ({
        ...prev,
        service: selectedServiceId,
        subject: `${selectedText}`
      }));
    } else {
      // Absolute fallback
      console.log('Using fallback subject text');
      setFormData(prev => ({
        ...prev,
        service: selectedServiceId,
        subject: `Service Inquiry from Website`
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Skip service field as it's handled by handleServiceChange
    if (name === 'service') return;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Reset status
  setSubmitStatus({
    loading: true,
    success: false,
    error: null
  });

  try {
    const subject = formData.subject || `Inquiry about ${getServiceNameById(formData.service)}` || 'Website Inquiry';
    const serviceName = getServiceNameById(formData.service) || "Service Inquiry";

    // Build form data in FormSubmit compatible format
    const formDataToSend = new URLSearchParams();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone || '');
    formDataToSend.append('company', formData.company || '');
    formDataToSend.append('subject', subject);
    formDataToSend.append('service', serviceName);
    formDataToSend.append('message', formData.message);

    // Optional hidden fields (you can remove these lines if not needed)
    formDataToSend.append('_captcha', 'false'); // Disable captcha
    formDataToSend.append('_next', 'http://localhost:3000/thank-you'); // Redirect after submit

    // Send request to FormSubmit
    await fetch('https://formsubmit.co/ae8839d31314d97a37e00eed99194c5d', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formDataToSend
    });

    // Success
    setSubmitStatus({
      loading: false,
      success: true,
      error: null
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
      subject: ''
    });

    // Scroll to top of form
    window.scrollTo({
      top: document.getElementById('contact-form').offsetTop - 100,
      behavior: 'smooth'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    setSubmitStatus({
      loading: false,
      success: false,
      error: 'Failed to send message. Please try again.'
    });
  }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // Reset status
  //   setSubmitStatus({
  //     loading: true,
  //     success: false,
  //     error: null
  //   });
    
  //   try {
  //     // Ensure subject is not empty
  //     const subject = formData.subject || `Inquiry about ${getServiceNameById(formData.service)}` || 'Website Inquiry';
      
  //     // Map form data to match the backend API expectations
  //     const payload = {
  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.phone || '',
  //       company: formData.company || '',
  //       subject: subject,
  //       message: formData.message
  //     };

  //     const serviceName = getServiceNameById(formData.service)|| "service inquiry from website";
      
  //     // prepare data for google sheet
  //     const formSheetData={
  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.phone || '',
  //       company: formData.company || '',
  //       subject: subject,
  //       message: formData.message,
  //       service: serviceName
  //     };

      
      
      
  //     // Try the inquiriesApi first
  //     try {
  //       // Make API call to backend using the inquiriesApi
  //       const response = await inquiriesApi.create(payload);
  //       console.log('Inquiry submitted successfully', response);
  //     } catch (apiError) {
  //       console.error('Error using inquiriesApi, trying direct axios call:', apiError);
        
  //       // Fallback to direct axios call with the full URL
  //       await axios.post(`${API_BASE_URL}/inquiries/`, payload);
  //     }
      
  //     // Handle success
  //     setSubmitStatus({
  //       loading: false,
  //       success: true,
  //       error: null
  //     });
      
  //     // Reset form
  //     setFormData({
  //       name: '',
  //       email: '',
  //       phone: '',
  //       company: '',
  //       service: '',
  //       message: '',
  //       subject: ''
  //     });
      
  //     // Scroll to top of form
  //     window.scrollTo({
  //       top: document.getElementById('contact-form').offsetTop - 100,
  //       behavior: 'smooth'
  //     });
      
  //   } catch (error) {
  //     console.error('Contact form submission error:', error);
      
  //     // Handle error
  //     setSubmitStatus({
  //       loading: false,
  //       success: false,
  //       error: error.response?.data?.message || 'Something went wrong. Please try again.'
  //     });
  //   }
  // };

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
              <DetailText>Hauz Khas, New Delhi,<br/>Delhi 110016</DetailText>
            </ContactDetail>
          </ContactMethod>
          
          <ContactMethod>
            <IconBox>
              <FontAwesomeIcon icon={faEnvelope} />
            </IconBox>
            <ContactDetail>
              <DetailTitle>Email</DetailTitle>
              <DetailText>
                <ContactLink href="mailto:contact@devigo.in">contact@devigo.in</ContactLink>
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
                <ContactLink href="tel:+91 9560845683">+91 9560845683</ContactLink>
              </DetailText>
            </ContactDetail>
          </ContactMethod>
          
          <SocialSection>
            <SocialTitle>Follow Us</SocialTitle>
            <SocialIcons>
              <SocialIcon href="#" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/devigoagency/" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/devigo.in/" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </SocialIcon>
            </SocialIcons>
          </SocialSection>
        </InfoContainer>
        
        <FormContainer id="contact-form">
          <FormTitle>Send Us a Message</FormTitle>
          
          {submitStatus.success && (
            <MessageBox type="success">
              <MessageIcon>
                <FontAwesomeIcon icon={faCheckCircle} />
              </MessageIcon>
              <MessageText>
                Thank you for your message! We'll get back to you shortly.
              </MessageText>
            </MessageBox>
          )}
          
          {submitStatus.error && (
            <MessageBox type="error">
              <MessageIcon>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </MessageIcon>
              <MessageText>
                {submitStatus.error}
              </MessageText>
            </MessageBox>
          )}
          
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
                  disabled={submitStatus.loading}
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
                  disabled={submitStatus.loading}
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
                  disabled={submitStatus.loading}
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
                  disabled={submitStatus.loading}
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
                onChange={handleServiceChange}
                required
                disabled={submitStatus.loading || loadingServices}
              >
                <option value="" disabled>Select a service</option>
                {services.length > 0 ? (
                  services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Web Design & Development">Web Design & Development</option>
                    <option value="Full-Stack Development">Full-Stack Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="E-commerce Development">E-commerce Development</option>
                    <option value="WordPress Development">WordPress Development</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Website Maintenance & Optimization">Website Maintenance & Optimization</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="other">Other</option>
                  </>
                )}
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
                disabled={submitStatus.loading}
              ></FormTextarea>
            </FormGroup>
            
            <SubmitButton type="submit" disabled={submitStatus.loading}>
              {submitStatus.loading ? (
                <>
                  <SpinnerIcon icon={faSpinner} />
                  Sending...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Send Message
                </>
              )}
            </SubmitButton>
          </Form>
        </FormContainer>
      </ContentContainer>
    </ContactPage>
  );
};

export default Contact;