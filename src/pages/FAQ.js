import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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

const FAQPage = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(10, 102, 194, 0.8), rgba(0, 0, 0, 0.9)), 
              url('/images/faq-hero.jpg') no-repeat center center/cover;
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
  background-clip: text;
  color: transparent;
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
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

const FAQSection = styled.section`
  padding: 5rem 0;
  background-color: var(--primary-bg);
  position: relative;
  overflow: hidden;
  
  background-image: 
    radial-gradient(rgba(10, 102, 194, 0.03) 1px, transparent 1px),
    radial-gradient(rgba(10, 102, 194, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
  
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

const FAQContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const CategoryButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  opacity: 1;
  animation: ${fadeIn} 0.6s ease forwards;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const CategoryButton = styled.button`
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
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.active ? 1 : 0});
    width: 40px;
    height: 3px;
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

const FAQList = styled.div`
  opacity: 1;
  min-height: 400px;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
`;

const FAQHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  border-bottom: ${props => props.active ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'};
  background-color: ${props => props.active ? 'rgba(10, 102, 194, 0.1)' : 'transparent'};
  transition: background-color 0.3s ease;
`;

const FAQQuestion = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--primary-white)'};
  transition: color 0.3s ease;
  padding-right: 2rem;
`;

const FAQToggle = styled.div`
  width: 26px;
  height: 26px;
  position: relative;
  transition: transform 0.3s ease;
  transform: ${props => props.active ? 'rotate(135deg)' : 'rotate(0)'};
  flex-shrink: 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: var(--primary-blue);
    transition: all 0.3s ease;
  }
  
  &::before {
    top: 50%;
    left: 0;
    width: 100%;
    height: 3px;
    transform: translateY(-50%);
    border-radius: 3px;
  }
  
  &::after {
    top: 0;
    left: 50%;
    height: 100%;
    width: 3px;
    transform: translateX(-50%);
    border-radius: 3px;
  }
`;

const FAQContent = styled.div`
  max-height: ${props => props.active ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.6s ease, opacity 0.3s ease;
  opacity: ${props => props.active ? '1' : '0'};
  background-color: rgba(0, 0, 0, 0.2);
`;

const FAQAnswer = styled.div`
  padding: 1.5rem;
  color: var(--gray-text);
  line-height: 1.8;
  font-size: 1rem;
`;

const CTASection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(rgba(10, 102, 194, 0.9), rgba(6, 69, 132, 0.9)), 
              url('/images/cta-bg.jpg') no-repeat center center/cover;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-top: 3rem;
  
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
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
  opacity: 1;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-white);
  font-weight: 700;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 3rem;
  background: var(--primary-white);
  color: var(--primary-blue);
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    background: #f0f0f0;
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

const FAQ = () => {
  const containerRef = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqData = {
    general: [
      {
        question: "What services does DEVIGO offer?",
        answer: "DEVIGO offers a comprehensive range of digital services including web development, mobile app development, UI/UX design, digital marketing, cloud solutions, and cybersecurity services. We work with businesses of all sizes to create custom digital solutions that meet their specific needs and objectives."
      },
      {
        question: "How long has DEVIGO been in business?",
        answer: "DEVIGO has been in business for over 10 years. During this time, we've successfully completed hundreds of projects for clients across various industries, establishing ourselves as a trusted partner for digital solutions."
      },
      {
        question: "Do you work with clients internationally?",
        answer: "Yes, we work with clients from around the world. Our team is set up to collaborate remotely with clients in different time zones, ensuring smooth communication and project delivery regardless of geographic location."
      },
      {
        question: "What industries do you specialize in?",
        answer: "While we work with clients across various sectors, we have particular expertise in e-commerce, healthcare, finance, education, and hospitality. Our diverse team brings industry-specific knowledge to each project, ensuring solutions that address the unique challenges of your sector."
      }
    ],
    process: [
      {
        question: "What is your development process like?",
        answer: "Our development process typically follows these steps: Discovery (understanding your requirements), Planning (creating project roadmap), Design & Development (building the solution), Testing (ensuring quality), Deployment (launching the solution), and Support (ongoing maintenance). We follow agile methodologies, which allows for flexibility and client involvement throughout the project."
      },
      {
        question: "How long does it typically take to complete a project?",
        answer: "Project timelines vary depending on the scope and complexity. A simple website might take 4-6 weeks, while a complex web application or mobile app could take 3-6 months. During our initial consultation, we'll provide you with a more accurate timeline based on your specific requirements."
      },
      {
        question: "Do you provide maintenance and support after project completion?",
        answer: "Yes, we offer various maintenance and support packages to ensure your digital solution continues to perform optimally after launch. These can include technical support, security updates, performance optimization, content updates, and feature enhancements."
      },
      {
        question: "How do you handle project communication?",
        answer: "We maintain transparent communication through regular updates and meetings. Depending on your preference, we can use tools like Slack, Microsoft Teams, or email for day-to-day communication, and platforms like Jira or Trello for project management. We provide weekly progress reports and schedule check-in meetings to ensure you're always informed about your project's status."
      }
    ],
    pricing: [
      {
        question: "How do you structure your pricing?",
        answer: "We offer flexible pricing models including fixed-price contracts for well-defined projects, time and materials billing for projects with evolving requirements, and retainer arrangements for ongoing services. The pricing structure depends on the nature and scope of your project."
      },
      {
        question: "Do you require a deposit before starting work?",
        answer: "Yes, we typically require a 30-50% deposit before beginning work, with the remainder billed either at project milestones or upon completion, depending on the project scope and duration. For larger projects, we can establish a more detailed payment schedule."
      },
      {
        question: "Do you offer any discounts for startups or non-profits?",
        answer: "We offer special pricing considerations for startups and non-profit organizations. We believe in supporting organizations that are making a positive impact, and we're happy to discuss how we can work within your budget constraints while delivering value."
      },
      {
        question: "What's included in your project quote?",
        answer: "Our project quotes include a detailed breakdown of all deliverables, timelines, and costs. This typically covers design, development, testing, project management, and initial support. We ensure there are no hidden costs, and any potential additional expenses are clearly communicated upfront."
      }
    ],
    technical: [
      {
        question: "What technologies do you work with?",
        answer: "We work with a wide range of technologies and platforms. For web development, we use modern frameworks like React, Angular, Vue.js, Node.js, Django, and Laravel. For mobile development, we specialize in native (iOS/Android) and cross-platform solutions (React Native, Flutter). We're also experienced with various CMS platforms like WordPress, Shopify, and custom solutions."
      },
      {
        question: "Do you follow industry best practices for security?",
        answer: "Absolutely. Security is a top priority in all our projects. We follow OWASP guidelines, implement secure authentication and data protection measures, conduct security testing, and stay updated with the latest security standards. For projects with specific compliance requirements (GDPR, HIPAA, etc.), we ensure all necessary measures are implemented."
      },
      {
        question: "Are your solutions mobile-friendly?",
        answer: "Yes, all our web solutions are built with a mobile-first approach, ensuring they look and function perfectly on devices of all sizes. We conduct thorough testing on various devices and browsers to guarantee a consistent user experience across platforms."
      },
      {
        question: "Can you integrate with third-party systems and APIs?",
        answer: "Yes, we have extensive experience integrating with a wide range of third-party systems and APIs. Whether it's payment gateways, CRM systems, marketing tools, or custom business systems, we can ensure seamless integration to enhance the functionality of your digital solution."
      }
    ]
  };
  
  const filteredFAQs = faqData[activeCategory] || [];
  
  useEffect(() => {
    if (activeIndex === null && filteredFAQs.length > 0) {
      setActiveIndex(0);
    }
  }, [activeCategory, filteredFAQs.length, activeIndex]);
  
  return (
    <FAQPage ref={containerRef}>
      <style>
        {`
          .animate-on-scroll {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>

      <HeroSection>
        <PageTitle>Frequently Asked Questions</PageTitle>
        <PageSubtitle>Find answers to common questions about our services</PageSubtitle>
      </HeroSection>
      
      <FAQSection>
        <FAQContainer>
          <CategoryButtons>
            <CategoryButton 
              active={activeCategory === 'general'} 
              onClick={() => setActiveCategory('general')}
            >
              General
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'process'} 
              onClick={() => setActiveCategory('process')}
            >
              Process
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'pricing'} 
              onClick={() => setActiveCategory('pricing')}
            >
              Pricing
            </CategoryButton>
            <CategoryButton 
              active={activeCategory === 'technical'} 
              onClick={() => setActiveCategory('technical')}
            >
              Technical
            </CategoryButton>
          </CategoryButtons>
          
          <FAQList>
            {filteredFAQs.map((faq, index) => (
              <FAQItem key={index} className="animate-on-scroll">
                <FAQHeader 
                  active={activeIndex === index} 
                  onClick={() => toggleFAQ(index)}
                >
                  <FAQQuestion active={activeIndex === index}>
                    {faq.question}
                  </FAQQuestion>
                  <FAQToggle active={activeIndex === index} />
                </FAQHeader>
                <FAQContent active={activeIndex === index}>
                  <FAQAnswer>
                    {faq.answer}
                  </FAQAnswer>
                </FAQContent>
              </FAQItem>
            ))}
          </FAQList>
        </FAQContainer>
      </FAQSection>
      
      <CTASection>
        <CTAContainer className="animate-on-scroll">
          <CTATitle>Still Have Questions?</CTATitle>
          <CTAText>
            We're here to help. Contact our team for personalized assistance with your specific queries.
          </CTAText>
          <CTAButton to="/contact">Contact Us</CTAButton>
        </CTAContainer>
      </CTASection>
    </FAQPage>
  );
};

export default FAQ; 