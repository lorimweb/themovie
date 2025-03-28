import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Form, Spinner } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const fetchPopularMovies = useCallback(async () => {
    try {
      const response = await getPopularMovies()
      setPopularMovies(response.data.results)
    } catch (error) {
      console.error('Error fetching popular movies:', error)
    }
  }, [])

  const fetchSearchResults = useCallback(async (query: string) => {
    setIsLoading(true)
    setError('')
    try {
      const response = await searchMovies(query)
      setSearchResults(response.data.results)
    } catch (error) {
      setError('Failed to search movies. Please try again.')
      console.error('Error searching movies:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPopularMovies()
  }, [fetchPopularMovies])

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (value.length >= 3) {
        fetchSearchResults(value)
      } else if (!value) {
        setSearchResults([])
      }
    }, 500)
  }, [fetchSearchResults])

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
          placeholder={t('home.searchPlaceholder')}
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
            <span className="visually-hidden">{t('home.loading')}</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="movie-carousel mb-5">
            <h3 className="text-white mb-3">{t('home.searchResults')}</h3>
            <Carousel
              responsive={responsive}
              infinite={false}
              draggable
              swipeable
              containerClass="py-3"
              itemClass="px-2"
            >
              {searchResults.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </Carousel>
          </div>

          <div className="movie-carousel">
            <h3 className="text-white mb-3">{t('home.popularMovies')}</h3>
            <Carousel
              responsive={responsive}
              infinite={false}
              draggable
              swipeable
              containerClass="py-3"
              itemClass="px-2"
            >
              {popularMovies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
            </Carousel>
          </div>
        </>
      )}
    </>
  )
}

export default Home