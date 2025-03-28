import { Carousel, Typography, Grid } from 'antd';
import { Movie } from '../types/movie';
import { useCallback, useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Banner = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const screens = useBreakpoint();

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

  const getBannerHeight = () => {
    if (screens.xs) return '300px';
    if (screens.sm) return '400px';
    if (screens.md) return '500px';
    return '600px';
  };

  const getContentPadding = () => {
    if (screens.xs) return '20px';
    if (screens.sm) return '40px';
    return '60px';
  };

  return (
    <div className="banner-carousel" style={{ marginTop: '64px' }}>
      <Carousel
        autoplay={true}
        effect="fade"
        dots={true}
        autoplaySpeed={5000}
      >
        {movies.slice(0, 5).map((movie) => (
          <div key={movie.id}>
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
                <div style={{
                  maxWidth: 1200,
                  margin: '0 auto',
                }}>
                  <Title
                    level={screens.xs ? 3 : 2}
                    style={{
                      color: 'white',
                      margin: 0,
                      fontSize: screens.xs ? '1.5rem' : screens.sm ? '2rem' : '2.5rem'
                    }}
                  >
                    {movie.title}
                  </Title>
                  <Paragraph
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: screens.xs ? '0.9em' : '1.1em',
                      marginTop: '1em',
                      maxWidth: screens.xs ? '100%' : '600px',
                      display: screens.xs ? '-webkit-box' : 'block',
                      WebkitLineClamp: screens.xs ? 3 : 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {movie.overview}
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;