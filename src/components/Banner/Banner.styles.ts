import styled from 'styled-components';
import { Carousel, Container } from 'react-bootstrap';

interface StyledCarouselProps {
  bannerHeight: string;
}

interface StyledContentProps {
  padding: string;
  fontSize: {
    title: string;
    text: string;
  };
  windowWidth: number;
}

export const BannerWrapper = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
`;

export const StyledCarouselItem = styled(Carousel.Item)`
  &.animate__animated {
    animation-duration: 1s;
  }
`;

export const CarouselContainer = styled.div<StyledCarouselProps>`
  height: ${props => props.bannerHeight};
  position: relative;
  overflow: hidden;
`;

export const BackgroundImage = styled.div<{ backdrop: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => `https://image.tmdb.org/t/p/original${props.backdrop}`});
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
`;

export const ContentOverlay = styled.div<StyledContentProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.padding};
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
`;

export const StyledContainer = styled(Container)`
  max-width: 1200px;
`;

export const MovieTitle = styled.h2<{ fontSize: string }>`
  color: white;
  font-size: ${props => props.fontSize};
  margin-bottom: 1rem;
`;

export const MovieOverview = styled.p<StyledContentProps>`
  color: rgba(255,255,255,0.8);
  font-size: ${props => props.fontSize.text};
  max-width: ${props => props.windowWidth < 576 ? '100%' : '600px'};
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.windowWidth < 576 ? 3 : 4};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;