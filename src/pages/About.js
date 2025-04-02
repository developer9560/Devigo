import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

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

const AboutPage = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(10, 102, 194, 0.7), rgba(0, 0, 0, 0.8)), url('/images/about-hero.jpg') no-repeat center center/cover;
  height: 50vh;
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
    background: linear-gradient(to top, var(--primary-bg), transparent);
  }
`;

const PageTitle = styled.h1`
  font-size: 3.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
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
`;

const MissionSection = styled.section`
  padding: 5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 30%;
    left: 5%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(10, 102, 194, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: 5%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(10, 102, 194, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const MissionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Mission = styled.div`
  margin-top: 2rem;
  padding: 3rem;
  background: linear-gradient(145deg, rgba(42, 42, 42, 0.8), rgba(30, 30, 30, 0.8));
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;
  
  &.animate {
    transform: translateY(0);
    opacity: 1;
  }
  
  p {
    font-size: 1.8rem;
    font-style: italic;
    color: var(--primary-white);
    line-height: 1.8;
    position: relative;
    
    &::before, &::after {
      content: '';
      display: block;
      width: 80px;
      height: 3px;
      background: linear-gradient(to right, #0A66C2, transparent);
      margin: 2rem auto;
    }
  }
`;

const TeamSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(to bottom, var(--primary-bg), var(--secondary-bg));
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/pattern.png');
    opacity: 0.03;
  }
`;

const TeamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
`;

const TeamContent = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
`;

const TeamMember = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background: linear-gradient(145deg, rgba(42, 42, 42, 0.5), rgba(30, 30, 30, 0.5));
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s ease;
  
  &.animate {
    transform: translateY(0);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TeamImage = styled.div`
  flex: 0 0 300px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #0A66C2, #0855a1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  span {
    font-size: 6rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    margin-bottom: 1.5rem;
  }
`;

const TeamInfo = styled.div`
  flex: 1;
`;

const TeamName = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-white);
`;

const TeamRole = styled.p`
  font-size: 1.2rem;
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary-blue);
  }
`;

const TeamBio = styled.p`
  color: var(--gray-text);
  line-height: 1.8;
  margin-bottom: 1.5rem;
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

const WhyChooseSection = styled.section`
  padding: 6rem 0;
  background-color: var(--primary-bg);
  position: relative;
  overflow: hidden;
  
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

const WhyChooseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
`;

const WhyChooseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const WhyChooseItem = styled.div`
  background: linear-gradient(145deg, #222, #2a2a2a);
  border-radius: 12px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.5s ease;
  
  &.animate {
    transform: translateY(0);
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.3);
    
    .icon {
      animation: ${pulse} 1s ease;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #0A66C2, #0855a1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  .icon {
    font-size: 3.5rem;
    color: var(--primary-blue);
    margin-bottom: 1.5rem;
    display: inline-block;
  }
`;

const WhyChooseTitle = styled.h3`
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--primary-blue);
  }
`;

const WhyChooseDescription = styled.p`
  color: var(--gray-text);
  line-height: 1.7;
`;

const StatsSection = styled.section`
  padding: 4rem 0;
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
    background: url('/images/pattern.png');
    opacity: 0.1;
    pointer-events: none;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const StatItem = styled.div`
  padding: 1.5rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
  
  &.animate {
    transform: translateY(0);
    opacity: 1;
  }
  
  .number {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  
  .label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
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

const About = () => {
  const containerRef = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  
  return (
    <AboutPage ref={containerRef}>
      <HeroSection>
        <PageTitle>About Us</PageTitle>
        <PageSubtitle>Learn more about who we are and what drives us</PageSubtitle>
      </HeroSection>
      
      <MissionSection>
        <MissionContent>
          <SectionHeader>
            <SectionTitle className="animate-on-scroll">Our Mission</SectionTitle>
            <SectionDescription className="animate-on-scroll">
              At DEVIGO, we are passionate about helping businesses succeed in the digital world through innovative solutions and cutting-edge technology
            </SectionDescription>
          </SectionHeader>
          
          <Mission className="animate-on-scroll">
            <p>"Empowering businesses with cutting-edge digital solutions"</p>
          </Mission>
        </MissionContent>
      </MissionSection>
      
      <StatsSection>
        <StatsContainer>
          <StatItem className="animate-on-scroll">
            <div className="number">150+</div>
            <div className="label">Clients Worldwide</div>
          </StatItem>
          <StatItem className="animate-on-scroll">
            <div className="number">10+</div>
            <div className="label">Years Experience</div>
          </StatItem>
          <StatItem className="animate-on-scroll">
            <div className="number">200+</div>
            <div className="label">Projects Completed</div>
          </StatItem>
          <StatItem className="animate-on-scroll">
            <div className="number">15</div>
            <div className="label">Industry Awards</div>
          </StatItem>
        </StatsContainer>
      </StatsSection>
      
      <TeamSection>
        <TeamContainer>
          <SectionHeader>
            <SectionTitle className="animate-on-scroll">Meet the Team</SectionTitle>
            <SectionDescription className="animate-on-scroll">
              Our talented professionals are dedicated to bringing your ideas to life through creativity, expertise, and innovation
            </SectionDescription>
          </SectionHeader>
          
          <TeamContent>
            <TeamMember className="animate-on-scroll">
              <TeamImage>
                <span>JD</span>
              </TeamImage>
              <TeamInfo>
                <TeamName>John Doe</TeamName>
                <TeamRole>Founder & CEO</TeamRole>
                <TeamBio>
                  John is a visionary tech entrepreneur with over 15 years of experience in web development and digital marketing. He founded DEVIGO with a mission to help businesses leverage technology for growth. With a background in Computer Science and Business Administration, John leads the company's strategic direction and ensures that every project meets the highest standards of quality and innovation.
                </TeamBio>
                <TeamBio>
                  His expertise spans across various technologies including React, Node.js, Django, and mobile app development. John is passionate about creating digital solutions that not only look great but also drive business results.
                </TeamBio>
                <SocialLinks>
                  <SocialLink href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </SocialLink>
                  <SocialLink href="#" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </SocialLink>
                  <SocialLink href="#" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </SocialLink>
                </SocialLinks>
              </TeamInfo>
            </TeamMember>
          </TeamContent>
        </TeamContainer>
      </TeamSection>
      
      <WhyChooseSection>
        <WhyChooseContainer>
          <SectionHeader>
            <SectionTitle className="animate-on-scroll">Why Choose DEVIGO</SectionTitle>
            <SectionDescription className="animate-on-scroll">
              We provide unparalleled expertise and service to help your business thrive in the digital landscape
            </SectionDescription>
          </SectionHeader>
          
          <WhyChooseGrid>
            <WhyChooseItem className="animate-on-scroll">
              <div className="icon">💻</div>
              <WhyChooseTitle>Full Stack Excellence</WhyChooseTitle>
              <WhyChooseDescription>
                Our team excels in both frontend and backend development, ensuring seamless, end-to-end solutions for your business needs. We use cutting-edge technologies to build robust, scalable applications.
              </WhyChooseDescription>
            </WhyChooseItem>
            
            <WhyChooseItem className="animate-on-scroll">
              <div className="icon">🎨</div>
              <WhyChooseTitle>UI/UX Expertise</WhyChooseTitle>
              <WhyChooseDescription>
                We create intuitive, user-friendly interfaces that not only look stunning but also enhance user experience and engagement. Our designs are tailored to your brand identity and target audience.
              </WhyChooseDescription>
            </WhyChooseItem>
            
            <WhyChooseItem className="animate-on-scroll">
              <div className="icon">📈</div>
              <WhyChooseTitle>Digital Marketing</WhyChooseTitle>
              <WhyChooseDescription>
                Beyond development, we help promote your digital presence with effective SEO strategies, content marketing, and social media campaigns to drive traffic and increase conversions.
              </WhyChooseDescription>
            </WhyChooseItem>
            
            <WhyChooseItem className="animate-on-scroll">
              <div className="icon">🤝</div>
              <WhyChooseTitle>Client Partnership</WhyChooseTitle>
              <WhyChooseDescription>
                We view each project as a partnership. We work closely with you to understand your goals, challenges, and vision, ensuring the final product aligns perfectly with your business objectives.
              </WhyChooseDescription>
            </WhyChooseItem>
            
            <WhyChooseItem className="animate-on-scroll">
              <div className="icon">🚀</div>
              <WhyChooseTitle>Timely Delivery</WhyChooseTitle>
              <WhyChooseDescription>
                We understand the importance of deadlines. Our efficient project management ensures on-time delivery without compromising on quality or attention to detail.
              </WhyChooseDescription>
            </WhyChooseItem>
            
            <WhyChooseItem className="animate-on-scroll">
              <div className="icon">🔧</div>
              <WhyChooseTitle>Ongoing Support</WhyChooseTitle>
              <WhyChooseDescription>
                Our relationship doesn't end with project delivery. We provide continued support and maintenance to ensure your digital solution remains up-to-date and performs optimally.
              </WhyChooseDescription>
            </WhyChooseItem>
          </WhyChooseGrid>
        </WhyChooseContainer>
      </WhyChooseSection>
    </AboutPage>
  );
};

export default About; 