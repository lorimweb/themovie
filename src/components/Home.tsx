import {
  Alert,
  Carousel,
  Col,
  Input,
  Row,
  Space,
  Spin,
  Grid,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from '../services/api'
import type { Movie } from '../types/movie'
import MovieItem from './MovieItem'

const { Search } = Input;
const { useBreakpoint } = Grid;

const getMoviesPerSlide = (screens: any) => {
  if (screens.xxl) return 6;
  if (screens.xl) return 5;
  if (screens.lg) return 4;
  if (screens.md) return 3;
  if (screens.sm) return 2;
  return 1;
};

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const screens = useBreakpoint();

  const fetchMovies = useCallback(async (query?: string) => {
    setIsLoading(true)
    setError('')
    try {
      const response = await (query ? searchMovies(query) : getPopularMovies())
      setMovies(response.data.results)
    } catch (error) {
      setError(query
        ? 'Failed to search movies. Please try again.'
        : 'Failed to fetch popular movies. Please try again later.'
      )
      console.error('Error fetching movies:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (!value) {
      fetchMovies()
    } else {
      fetchMovies(value)
    }
  }

  const groupMoviesIntoSlides = (movies: Movie[]) => {
    const moviesPerSlide = getMoviesPerSlide(screens);
    return movies.reduce((acc: Movie[][], movie, index) => {
      const slideIndex = Math.floor(index / moviesPerSlide);
      if (!acc[slideIndex]) {
        acc[slideIndex] = [];
      }
      acc[slideIndex].push(movie);
      return acc;
    }, []);
  };

  const getResponsiveGutter = (): [number, number] => {
    if (screens.xs) return [8, 8];
    if (screens.sm) return [16, 16];
    return [24, 24];
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Search
          placeholder="Search movies..."
          size="large"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          style={{ width: '100%', marginBottom: 24 }}
        />

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin size="large" />
          </div>
        ) : (
          <div className="movie-carousel">
            <Carousel
              dots={true}
              style={{ margin: '0 -8px', padding: '20px 0px' }}
              swipeToSlide
              draggable
            >
              {groupMoviesIntoSlides(movies).map((slideMovies, slideIndex) => (
                <div key={slideIndex}>
                  <Row gutter={getResponsiveGutter()}>
                    {slideMovies.map((movie) => (
                      <Col 
                        xs={24} 
                        sm={12} 
                        md={8} 
                        lg={6} 
                        xl={screens.xxl ? 4 : 6} 
                        key={movie.id}
                      >
                        <div style={{ padding: '0 8px' }}>
                          <MovieItem movie={movie} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </Space>
    </>
  )
}

export default Home