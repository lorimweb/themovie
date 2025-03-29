import styled from 'styled-components';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';

export const StyledNavbar = styled(Navbar)`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

export const StyledContainer = styled(Container)`
  max-width: 1200px;
`;

export const BrandName = styled(Navbar.Brand)`
  color: #e50914;
  font-size: 1.75rem;
  font-weight: bold;
  cursor: pointer;
`;

export const StyledNavDropdown = styled(NavDropdown)`
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  padding: 4px 12px;
  height: 35px;

  .dropdown-toggle {
    color: white;
  }
`;

export const LanguageToggle = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
`;