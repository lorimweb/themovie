import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Layout.Header style={{ background: '#1a1a1a', padding: '1rem', display: 'flex', alignItems: 'center' }}>
      <Layout.Content style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Typography.Title
          level={2}
          style={{
            margin: 0,
            color: '#e50914',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          THE MOVIE
        </Typography.Title>
      </Layout.Content>
    </Layout.Header>
  );
};

export default Header;