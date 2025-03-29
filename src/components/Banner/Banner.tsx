import { Carousel } from 'react-bootstrap';
import { Movie } from '../../types/movie';
import { useCallback, useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../../services/api';
import 'animate.css';
import {
  BannerWrapper,
  StyledCarouselItem,
  CarouselContainer,
  BackgroundImage,
  ContentOverlay,
  StyledContainer,
  MovieTitle,
  MovieOverview
} from './Banner.styles';

const Banner = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchMovies = useCallback(async (query?: string) => {
    try {
      const response = await (query ? searchMovies(query) : getPopularMovies())
      setMovies(response.data.results)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBannerHeight = () => {
    if (windowWidth < 576) return '300px'; // xs
    if (windowWidth < 768) return '600px'; // sm
    if (windowWidth < 992) return '500px'; // md
    return '600px'; // lg and above
  };

  const getContentPadding = () => {
    if (windowWidth < 576) return '20px'; // xs
    if (windowWidth < 768) return '40px'; // sm
    return '60px'; // md and above
  };

  const getFontSize = () => {
    if (windowWidth < 576) return { title: '1.5rem', text: '0.9rem' }; // xs
    if (windowWidth < 768) return { title: '2rem', text: '1rem' }; // sm
    return { title: '2.5rem', text: '1.1rem' }; // md and above
  };

  return (
    <BannerWrapper>
      <Carousel 
        controls={true}
        indicators={true}
        interval={5000}
        fade
      >
        {movies.slice(0, 5).map((movie) => (
          <StyledCarouselItem key={movie.id} className="animate__animated animate__fadeIn">
            <CarouselContainer bannerHeight={getBannerHeight()}>
              <BackgroundImage backdrop={movie.backdrop_path || ''} />
              <ContentOverlay
                padding={getContentPadding()}
                fontSize={getFontSize()}
                windowWidth={windowWidth}
              >
                <StyledContainer>
                  <MovieTitle fontSize={getFontSize().title}>
                    {movie.title}
                  </MovieTitle>
                  <MovieOverview
                    padding={getContentPadding()}
                    fontSize={getFontSize()}
                    windowWidth={windowWidth}
                  >
                    {movie.overview}
                  </MovieOverview>
                </StyledContainer>
              </ContentOverlay>
            </CarouselContainer>
          </StyledCarouselItem>
        ))}
      </Carousel>
    </BannerWrapper>
  );
};

export default Banner;