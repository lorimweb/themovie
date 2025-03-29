import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const StyledCard = styled(Card)`
  height: 100%;
  border-width: 2px;
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const StyledCardImage = styled(Card.Img)`
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  padding: 60px 24px 24px;
`;

export const MovieTitle = styled.h5`
  color: white;
  margin-bottom: 0.5rem;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StarContainer = styled.div`
  margin-bottom: 0.25rem;
`;

export const RatingNumber = styled.span`
  color: white;
`;