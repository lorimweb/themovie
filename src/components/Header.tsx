import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
          {t('header.title')}
        </Navbar.Brand>
        <NavDropdown 
          title={
            <span className="d-flex align-items-center gap-2" style={{ color: 'white' }}>
              <FaGlobe />
              {t('header.language')}
            </span>
          }
          className="ms-auto"
          align="end"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: '4px',
            padding: '4px 12px',
            height: '35px',
          }}
        >
          <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
          <NavDropdown.Item onClick={() => changeLanguage('pt')}>Português</NavDropdown.Item>
          <NavDropdown.Item onClick={() => changeLanguage('es')}>Español</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Header;