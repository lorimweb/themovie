import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Form, Spinner } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'react-i18next'
import { getPopularMovies, searchMovies } from '../../services/movie.service'
import type { Movie } from '../../types/movie'
import { responsive } from '../../mocks/carousel.mock'
import MovieItem from '../MovieItem/MovieItem'
import { SearchContainer, CarouselSection, LoadingContainer } from './Home.styles'

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
      <SearchContainer>
        <FaSearch className="search-icon" />
        <Form.Control
          type="search"
          placeholder={t('home.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control-lg"
        />
      </SearchContainer>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {isLoading ? (
        <LoadingContainer>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t('home.loading')}</span>
          </Spinner>
        </LoadingContainer>
      ) : (
        <>
          <CarouselSection>
            <h3>{t('home.searchResults')}</h3>
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
          </CarouselSection>

          <CarouselSection>
            <h3>{t('home.popularMovies')}</h3>
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
          </CarouselSection>
        </>
      )}
    </>
  )
}

export default Home