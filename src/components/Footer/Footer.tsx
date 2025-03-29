import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { FooterWrapper, StyledContainer, ContentWrapper, SocialLinks, Copyright } from './Footer.styles';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <StyledContainer>
        <ContentWrapper>
          <SocialLinks>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} color="#fff" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} color="#fff" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} color="#fff" />
            </a>
          </SocialLinks>
          <Copyright>
            {t('footer.rights', { year: currentYear })}
          </Copyright>
        </ContentWrapper>
      </StyledContainer>
    </FooterWrapper>
  );
};

export default Footer;