import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #121212;
  padding: 4rem 0 2rem;
  color: var(--primary-white);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1rem;
  span {
    color: var(--primary-blue);
  }
`;

const FooterDescription = styled.p`
  color: var(--gray-text);
  margin-bottom: 1.5rem;
`;

const Social = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: var(--gray-text);
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-blue);
  }
`;

const ColumnTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 30px;
    height: 2px;
    background-color: var(--primary-blue);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: var(--gray-text);
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--primary-blue);
      padding-left: 5px;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: var(--gray-text);
  
  .icon {
    margin-right: 10px;
    color: var(--primary-blue);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
  color: var(--gray-text);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo to="/">DEVI<span>GO</span></FooterLogo>
          <FooterDescription>
            Transforming ideas into digital reality with cutting-edge web development and design solutions.
          </FooterDescription>
          <Social>
            <SocialLink href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
          </Social>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Quick Links</ColumnTitle>
          <FooterLinks>
            <FooterLink><Link to="/">Home</Link></FooterLink>
            <FooterLink><Link to="/about">About Us</Link></FooterLink>
            <FooterLink><Link to="/services">Services</Link></FooterLink>
            <FooterLink><Link to="/portfolio">Portfolio</Link></FooterLink>
            <FooterLink><Link to="/contact">Contact</Link></FooterLink>
            <FooterLink><Link to="/faq">FAQ</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Services</ColumnTitle>
          <FooterLinks>
            <FooterLink><Link to="/services">Full Stack Development</Link></FooterLink>
            <FooterLink><Link to="/services">Web Design</Link></FooterLink>
            <FooterLink><Link to="/services">Android Development</Link></FooterLink>
            <FooterLink><Link to="/services">Custom Software</Link></FooterLink>
            <FooterLink><Link to="/services">WordPress Development</Link></FooterLink>
            <FooterLink><Link to="/services">SEO Optimization</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <ColumnTitle>Contact Us</ColumnTitle>
          <ContactInfo>
            <span className="icon">📍</span>
            <span>123 Web Dev Street, Digital City</span>
          </ContactInfo>
          <ContactInfo>
            <span className="icon">📧</span>
            <span>info@devigo.com</span>
          </ContactInfo>
          <ContactInfo>
            <span className="icon">📱</span>
            <span>+1 (555) 123-4567</span>
          </ContactInfo>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} DEVIGO. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 