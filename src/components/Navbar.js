import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: rgba(30, 30, 30, 0.95);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: #fff;
  span {
    color: var(--primary-blue);
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    flex-direction: column;
    background-color: var(--primary-bg);
    width: 100%;
    transition: all 0.5s ease;
    padding: 2rem 0;
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: var(--primary-white);
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  padding: 0.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-blue);
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-white);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">DEVI<span>GO</span></Logo>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </MenuButton>
        <NavMenu isOpen={isOpen}>
          <NavItem>
            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/services" onClick={() => setIsOpen(false)}>Services</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/faq" onClick={() => setIsOpen(false)}>FAQ</NavLink>
          </NavItem>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 