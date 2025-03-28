import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Home from './components/Home'
import Banner from './components/Banner'
import Footer from './components/Footer'
import MovieDetail from './components/MovieDetail'
import BackToTop from './components/BackToTop'

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#1a1a1a' }}>
        <Header />
        <Banner />
        <Container className="py-4 flex-grow-1" style={{ maxWidth: 1200 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Container>
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  )
}

export default App
