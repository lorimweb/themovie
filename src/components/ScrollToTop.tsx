import { UpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

const ScrollToTop = () => {
  return (
    <BackTop>
      <div style={{
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: '50%',
        backgroundColor: '#d9292a',
        color: '#fff',
        textAlign: 'center',
        fontSize: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <UpOutlined />
      </div>
    </BackTop>
  );
};

export default ScrollToTop;