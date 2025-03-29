import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {
  StyledCard,
  ImageContainer,
  StyledCardImage,
  GradientOverlay,
  MovieTitle,
  RatingContainer,
  StarContainer,
  RatingNumber
} from './MovieItem.styles';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const navigate = useNavigate();

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

  return (
    <StyledCard onClick={() => navigate(`/movie/${movie.id}`)}>
      <ImageContainer>
        <StyledCardImage
          variant="top"
          src={movie.poster_path
            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
            : 'https://via.placeholder.com/342x513?text=No+Image'}
        />
        <GradientOverlay>
          <MovieTitle>{movie.title}</MovieTitle>
          <RatingContainer>
            <StarContainer>
              {renderStars(movie.vote_average)}
            </StarContainer>
            <RatingNumber>({movie.vote_average.toFixed(1)})</RatingNumber>
          </RatingContainer>
        </GradientOverlay>
      </ImageContainer>
    </StyledCard>
  );
};

export default MovieItem;