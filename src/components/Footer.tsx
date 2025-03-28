import { Layout, Space, Typography } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter style={{ 
      background: '#1a1a1a', 
      padding: '24px',
      marginTop: 'auto',
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <Space direction="vertical" size="middle">
          <Space size="large">
            <Link href="https://github.com" target="_blank">
              <GithubOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <TwitterOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <LinkedinOutlined style={{ fontSize: '24px', color: '#fff' }} />
            </Link>
          </Space>
          <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
            © {currentYear} The Movie. All rights reserved.
          </Text>
        </Space>
      </div>
    </AntFooter>
  );
};

export default Footer;