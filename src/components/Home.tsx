import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Form, Spinner } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { getPopularMovies, searchMovies } from '../services/api'
import type { Movie } from '../types/movie'
import MovieItem from './MovieItem'

const responsive = {
  superLarge: {
    breakpoint: { max: 4000, min: 1600 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 5
  },
  laptop: {
    breakpoint: { max: 1200, min: 992 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 768, min: 576 },
    items: 2
  },
  small: {
    breakpoint: { max: 576, min: 0 },
    items: 1
  }
};

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (value.length >= 3) {
        fetchMovies(value)
      } else if (!value) {
        fetchMovies()
      }
    }, 500)
  }, [fetchMovies])

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="position-relative mb-4">
        <FaSearch className="position-absolute top-50 translate-middle-y ms-3" style={{ zIndex: 1 }} />
        <Form.Control
          type="search"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control-lg ps-5"
        />
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="movie-carousel">
          <Carousel
            responsive={responsive}
            infinite={false}
            draggable
            swipeable
            containerClass="py-3"
            itemClass="px-2"
          >
            {movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </Carousel>
        </div>
      )}
    </>
  )
}

export default Home