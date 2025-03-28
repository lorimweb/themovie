import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa';
import { scrollToTop } from '../utils/utils';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const goToTop = () => {
    scrollToTop(0, 'smooth');
  };

  return (
    <>
      {isVisible && (
        <Button
          variant="danger"
          className="rounded-circle d-flex align-items-center justify-content-center"
          onClick={goToTop}
          style={{
            position: 'fixed',
            bottom: isMobile ? '16px' : '20px',
            right: isMobile ? '16px' : '20px',
            zIndex: 1000,
            width: isMobile ? '36px' : '40px',
            height: isMobile ? '36px' : '40px',
            opacity: 0.8,
            backgroundColor: '#d9292a',
            padding: 0
          }}
        >
          <FaArrowUp />
        </Button>
      )}
    </>
  );
};

export default BackToTop;