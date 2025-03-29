import styled from 'styled-components'

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  .form-control {
    padding-left: 3rem;
    background-color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.secondary};
    color: #333;

    &:focus {
      background-color: ${({ theme }) => theme.colors.background};
      border-color: ${({ theme }) => theme.colors.primary};
      color: #333;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    z-index: 1;
    color: #333;
  }
`

export const CarouselSection = styled.div`
  margin-bottom: 3rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }

  .react-multi-carousel-list {
    padding: 1rem 0;
  }
`

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`