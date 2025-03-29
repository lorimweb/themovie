import { Container } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 mt-auto" style={{ background: '#1a1a1a' }}>
      <Container className="text-center" style={{ maxWidth: 1200 }}>
        <div className="d-flex flex-column align-items-center gap-3">
          <div className="d-flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} color="#fff" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} color="#fff" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} color="#fff" />
            </a>
          </div>
          <p className="mb-0" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {t('footer.rights', { year: currentYear })}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;