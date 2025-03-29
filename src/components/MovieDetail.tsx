import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner, Badge } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '../services/api';
import type { Movie } from '../types/movie';

// This function renders stars based on the movie rating
const renderStars = (rating: number) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;
  for (let i = 1; i <= 10; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} className="text-warning" />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-warning" />);
    }
  }
  return stars;
};

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
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('home.loading')}</span>
        </Spinner>
      </Container>
    );
  }

  // Handle case when movie is not found
  if (!movie) {
    return (
      <Container className="text-center py-5">
        <h3>Movie not found</h3>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button
        variant="danger"
        onClick={() => navigate('/')}
        className="mb-4"
        style={{ backgroundColor: '#d9292a' }}
      >
        {t('movieDetail.backToHome')}
      </Button>

      <Row className="g-4">
        <Col xs={12} md={4}>
          <Card className="h-100 border-2" style={{ borderColor: '#d9292a' }}>
            <Card.Img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <div className="d-flex flex-column gap-4">
            <h2 className="text-white mb-0">{movie.title}</h2>

            <div className="d-flex align-items-center gap-2">
              <div className="d-flex">
                {renderStars(movie.vote_average)}
              </div>
              <span className="text-white">
                ({movie.vote_average.toFixed(1)}/10 {t('movieDetail.votes', { count: movie.vote_count })})
              </span>
            </div>

            <Badge bg="primary" style={{ fontSize: '1rem', maxWidth: '100px' }}>
              {new Date(movie.release_date).getFullYear()}
            </Badge>

            <div className="text-white">
              <h5>{t('movieDetail.overview')}</h5>
              <p>{movie.overview}</p>
            </div>

            <div className="text-white">
              <h5>{t('movieDetail.releaseDate')}</h5>
              <p className="mb-0">
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;