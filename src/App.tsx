import { Layout } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './components/Header'
import Home from './components/Home'
import Banner from './components/Banner'
import Footer from './components/Footer'
import MovieDetail from './components/MovieDetail'
import BackToTop from './components/BackToTop'

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a' }}>
        <Menu />
        <Banner />
        <Content style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 0', flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Content>
        <Footer />
        <BackToTop />
      </Layout>
    </BrowserRouter>
  )
}

export default App
