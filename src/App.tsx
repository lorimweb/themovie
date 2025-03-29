import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import BackToTop from './components/BackToTop/BackToTop'
import Banner from './components/Banner/Banner'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import { theme } from './theme'

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
`;

const MainContainer = styled(Container)`
  padding: ${({ theme }) => theme.spacing.md};
  flex-grow: 1;
  max-width: 1200px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppWrapper>
          <Header />
          <Banner />
          <MainContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </MainContainer>
          <Footer />
          <BackToTop />
        </AppWrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
