import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const StyledBackToTopButton = styled(Button)`
  position: fixed;
  z-index: 1000;
  opacity: 0.8;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  bottom: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
  right: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
  width: ${({ $isMobile }) => ($isMobile ? '36px' : '40px')};
  height: ${({ $isMobile }) => ($isMobile ? '36px' : '40px')};

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;