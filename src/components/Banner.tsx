import { Carousel, Container } from 'react-bootstrap';
import { Movie } from '../types/movie';
import { useCallback, useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';
import 'animate.css';

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
    <div className="banner-carousel" style={{ marginTop: '60px' }}>
      <Carousel 
        controls={true}
        indicators={true}
        interval={5000}
        fade
      >
        {movies.slice(0, 5).map((movie) => (
          <Carousel.Item key={movie.id} className="animate__animated animate__fadeIn">
            <div
              style={{
                height: getBannerHeight(),
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.7)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: getContentPadding(),
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white',
                }}
              >
                <Container style={{ maxWidth: 1200 }}>
                  <h2
                    className="mb-3"
                    style={{
                      color: 'white',
                      fontSize: getFontSize().title,
                    }}
                  >
                    {movie.title}
                  </h2>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: getFontSize().text,
                      maxWidth: windowWidth < 576 ? '100%' : '600px',
                      display: '-webkit-box',
                      WebkitLineClamp: windowWidth < 576 ? 3 : 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {movie.overview}
                  </p>
                </Container>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;