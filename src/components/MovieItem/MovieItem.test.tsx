import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import type { Movie } from '../../types/movie';
import MovieItem from '../MovieItem/MovieItem';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  };
});

describe('MovieItem', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    poster_path: '/test-path.jpg',
    backdrop_path: '/backdrop-path.jpg',
    release_date: '2024-01-01',
    vote_average: 8.4,
    vote_count: 1000
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <ThemeProvider theme={theme}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {component}
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  it('renders movie title and rating', () => {
    renderWithProviders(<MovieItem movie={mockMovie} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('(8.4)')).toBeInTheDocument();
  });

  it('renders the correct star rating visualization', () => {
    renderWithProviders(<MovieItem movie={mockMovie} />);

    const starContainer = screen.getByTestId('star-container');
    expect(starContainer).toBeInTheDocument();
    // With vote_average of 8.4, we expect 8 full stars (rounded from 8.4 in a 10-star system)
    expect(starContainer.querySelectorAll('[data-testid="star-full"]')).toHaveLength(8);
    expect(starContainer.querySelectorAll('[data-testid="star-half"]')).toHaveLength(1);
    expect(starContainer.querySelectorAll('[data-testid="star-empty"]')).toHaveLength(1);
  });

  it('renders placeholder image when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    renderWithProviders(<MovieItem movie={movieWithoutPoster} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/342x513?text=No+Image');
  });

  it('navigates to movie detail page when clicked', () => {
    renderWithProviders(<MovieItem movie={mockMovie} />);

    const card = screen.getByRole('img').parentElement?.parentElement;
    fireEvent.click(card!);
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });
});