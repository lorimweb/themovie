import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { renderStars } from '../../utils/utils';
import {
  GradientOverlay,
  ImageContainer,
  MovieTitle,
  RatingContainer,
  RatingNumber,
  StarContainer,
  StyledCard,
  StyledCardImage
} from './MovieItem.styles';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const navigate = useNavigate();

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
            <StarContainer data-testid="star-container">
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