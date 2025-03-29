import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieItem from '../MovieItem';
import type { Movie } from '../../types/movie';

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

  it('renders movie title and rating', () => {
    render(
      <MemoryRouter>
        <MovieItem movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('(8.4)')).toBeInTheDocument();
  });

  it('renders placeholder image when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(
      <MemoryRouter>
        <MovieItem movie={movieWithoutPoster} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/342x513?text=No+Image');
  });

  it('navigates to movie detail page when clicked', () => {
    render(
      <MemoryRouter>
        <MovieItem movie={mockMovie} />
      </MemoryRouter>
    );

    const card = screen.getByRole('img').parentElement?.parentElement;
    fireEvent.click(card!);
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });
});