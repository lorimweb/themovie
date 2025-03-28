import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { scrollToTop } from '../utils/utils';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = window.innerWidth <= 768;

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const goToTop = () => {
    scrollToTop(0, 'smooth')
  };

  return (
    <>
      {isVisible && (
        <Button
          type="primary"
          shape="circle"
          icon={<UpOutlined />}
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
          }}
        />
      )}
    </>
  );
};

export default BackToTop;