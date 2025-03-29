import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { scrollToTop } from '../../utils/utils';
import { StyledBackToTopButton } from './BackToTop.styles';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', toggleVisibility);
    
    // Call once to set initial state
    handleResize();
    toggleVisibility();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const goToTop = () => {
    scrollToTop(0, 'smooth');
  };

  return (
    <>
      {isVisible && (
        <StyledBackToTopButton
          variant="danger"
          onClick={goToTop}
          $isMobile={isMobile}
        >
          <FaArrowUp />
        </StyledBackToTopButton>
      )}
    </>
  );
};

export default BackToTop;