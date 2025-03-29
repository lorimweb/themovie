import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const FooterWrapper = styled.footer`
  background: #1a1a1a;
  padding: 1.5rem 0;
  margin-top: auto;
`;

export const StyledContainer = styled(Container)`
  max-width: 1200px;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const Copyright = styled.p`
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.8);
`;