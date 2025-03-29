import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Spinner, Card } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '../../services/api';
import type { Movie } from '../../types/movie';
import {
  StyledContainer,
  BackButton,
  MovieCard,
  MovieInfo,
  RatingContainer,
  RatingStars,
  RatingText,
  MovieTitle,
  SectionTitle,
  SectionText,
  YearBadge
} from './MovieDetail.styles';
import { renderStars } from '../../utils/utils';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Fetch movie details when the component mounts or when the id changes
    const fetchMovieDetails = async () => {
      if (!id) return;
      try {
        const response = await getMovieDetails(parseInt(id));
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch movie details
    fetchMovieDetails();
  }, [id]);

  // Handle loading state and error state
  if (loading) {
    return (
      <StyledContainer className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('home.loading')}</span>
        </Spinner>
      </StyledContainer>
    );
  }

  // Handle case when movie is not found
  if (!movie) {
    return (
      <StyledContainer className="text-center py-5">
        <h3>Movie not found</h3>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <BackButton
        variant="danger"
        onClick={() => navigate('/')}
      >
        {t('movieDetail.backToHome')}
      </BackButton>

      <Row className="g-4">
        <Col xs={12} md={4}>
          <MovieCard>
            <Card.Img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />
          </MovieCard>
        </Col>
        <Col xs={12} md={8}>
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>

            <RatingContainer>
              <RatingStars>
                {renderStars(movie.vote_average)}
              </RatingStars>
              <RatingText>
                ({movie.vote_average.toFixed(1)}/10 {t('movieDetail.votes', { count: movie.vote_count })})
              </RatingText>
            </RatingContainer>

            <YearBadge>
              {new Date(movie.release_date).getFullYear()}
            </YearBadge>

            <div>
              <SectionTitle>{t('movieDetail.overview')}</SectionTitle>
              <SectionText>{movie.overview}</SectionText>
            </div>

            <div>
              <SectionTitle>{t('movieDetail.releaseDate')}</SectionTitle>
              <SectionText>
                {new Date(movie.release_date).toLocaleDateString()}
              </SectionText>
            </div>
          </MovieInfo>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default MovieDetail;