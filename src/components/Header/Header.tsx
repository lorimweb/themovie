import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';
import {
  StyledNavbar,
  StyledContainer,
  BrandName,
  StyledNavDropdown,
  LanguageToggle
} from './Header.styles';

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <StyledNavbar bg="dark" variant="dark" fixed="top">
      <StyledContainer>
        <BrandName onClick={() => navigate('/')}>
          {t('header.title')}
        </BrandName>
        <StyledNavDropdown 
          title={
            <LanguageToggle>
              <FaGlobe />
              {t('header.language')}
            </LanguageToggle>
          }
          className="ms-auto"
          align="end"
        >
          <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
          <NavDropdown.Item onClick={() => changeLanguage('pt')}>Português</NavDropdown.Item>
          <NavDropdown.Item onClick={() => changeLanguage('es')}>Español</NavDropdown.Item>
        </StyledNavDropdown>
      </StyledContainer>
    </StyledNavbar>
  );
};

export default Header;