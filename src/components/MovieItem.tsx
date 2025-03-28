import { Card, Space, Rate, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';

const { Paragraph } = Typography;

interface MovieItemProps {
  movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      size="small"
      onClick={() => navigate(`/movie/${movie.id}`)}
      cover={
        <img
          alt={movie.title}
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
            : 'https://via.placeholder.com/342x513?text=No+Image'}
          style={{ 
            width: '100%',
            height: 'auto',
            aspectRatio: '2/3',
            objectFit: 'cover'
          }}
        />
      }
    >
      <Card.Meta
        title={movie.title}
        description={
          <Space direction="vertical" size="small">
            <Space>
              <Rate 
                allowHalf 
                disabled 
                value={movie.vote_average / 2}
                style={{ fontSize: 14 }}
              />
              <span>({movie.vote_average.toFixed(1)})</span>
            </Space>
            <Paragraph
              type="secondary"
              ellipsis={{ rows: 3 }}
            >
              {movie.overview}
            </Paragraph>
          </Space>
        }
      />
    </Card>
  );
};

export default MovieItem;