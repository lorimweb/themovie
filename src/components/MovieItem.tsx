import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
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
    <Card 
      className="h-100 border-2" 
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{ cursor: 'pointer', borderColor: '#d9292a' }}
    >
      <div style={{ position: 'relative' }}>
        <Card.Img
          variant="top"
          src={movie.poster_path
            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
            : 'https://via.placeholder.com/342x513?text=No+Image'}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '2/3',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
            padding: '60px 24px 24px',
          }}
        >
          <h5 className="text-white mb-2">{movie.title}</h5>
          <div className="d-flex flex-column align-items-start">
            <div className="mb-1">
              {renderStars(movie.vote_average / 2)}
            </div>
            <span className="text-white">({movie.vote_average.toFixed(1)})</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieItem;