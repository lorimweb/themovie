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
    <div style={{ position: 'relative' }}>
      <Card
        hoverable
        size="small"
        onClick={() => navigate(`/movie/${movie.id}`)}
        style={{ border: '3px solid white' }}
        bodyStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
          padding: '60px 24px 24px',
          borderRadius: '5px',
        }}
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
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
        }
      >
        <Card.Meta
          title={<span style={{ color: 'white' }}>{movie.title}</span>}
          description={
            <Space direction="vertical" size="small">
              <Space>
                <Rate
                  allowHalf
                  disabled
                  value={movie.vote_average / 2}
                />
              </Space>
              <span style={{ color: 'white' }}>({movie.vote_average.toFixed(1)})</span>
              <Paragraph
                ellipsis={{ rows: 3 }}
                style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}
              >
                {movie.overview}
              </Paragraph>
            </Space>
          }
        />
      </Card>
    </div>
  );
};

export default MovieItem;