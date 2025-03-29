import styled from 'styled-components';
import { Container, Button, Card } from 'react-bootstrap';

export const StyledContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const BackButton = styled(Button)`
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover {
    opacity: 0.9;
  }
`;

export const MovieCard = styled(Card)`
  height: 100%;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RatingStars = styled.div`
  display: flex;
`;

export const RatingText = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

export const MovieTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0;
`;

export const SectionTitle = styled.h5`
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0;
`;

export const YearBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  max-width: 100px;
  padding: 0.5rem;
  border-radius: 0.375rem;
  text-align: center;
`;