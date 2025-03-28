import { Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="py-1">
      <Container style={{ maxWidth: 1200 }}>
        <Navbar.Brand 
          onClick={() => navigate('/')} 
          style={{ 
            color: '#e50914', 
            fontSize: '1.75rem', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          THE MOVIE
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;