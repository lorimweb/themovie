import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Typography,
  Rate,
  Space,
  Tag,
  Spin,
  Image,
  Descriptions,
  Button
} from 'antd';
import { getMovieDetails } from '../services/api';
import type { Movie } from '../types/movie';

const { Title, Paragraph } = Typography;

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={3}>Movie not found</Title>
      </div>
    );
  }

  return (
    <Card bordered={false} style={{ background: 'transparent' }}>
      <Button
        type="primary"
        onClick={() => navigate('/')}
        style={{ marginBottom: 16, backgroundColor: '#d9292a', borderColor: '#d9292a' }}
      >
        Back to Home
      </Button>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
            fallback="https://via.placeholder.com/500x750?text=No+Image"
          />
        </Col>
        <Col xs={24} md={16}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={2} style={{ margin: 0, color: '#fff' }}>
              {movie.title}
            </Title>

            <Space>
              <Rate
                allowHalf
                disabled
                value={movie.vote_average / 2}
                style={{ fontSize: 16 }}
              />
              <span style={{ color: '#fff' }}>
                ({movie.vote_average.toFixed(1)}/10 from {movie.vote_count} votes)
              </span>
            </Space>

            <Tag color="blue">{new Date(movie.release_date).getFullYear()}</Tag>

            <Descriptions
              column={1}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              contentStyle={{ color: '#rgba(255,255,255,0.85)' }}
            >
              <Descriptions.Item label="Overview">
                <Paragraph style={{ color: '#fff', margin: 0 }}>
                  {movie.overview}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Release Date">
                {new Date(movie.release_date).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieDetail;