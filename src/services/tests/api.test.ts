import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api, getPopularMovies, searchMovies, getMovieDetails } from '../api';
import type { Movie, MovieResponse } from '../../types/movie';

// Mock the axios instance
vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: vi.fn(),
    }),
  },
}));

describe('API Services', () => {
  const mockMovieResponse: MovieResponse = {
    results: [
      {
        id: 1,
        title: 'Test Movie',
        overview: 'Test Overview',
        poster_path: '/test-path.jpg',
        backdrop_path: '/backdrop-path.jpg',
        release_date: '2024-01-01',
        vote_average: 8.5,
        vote_count: 1000,
      },
    ],
    page: 1,
    total_pages: 1,
    total_results: 1,
  };

  const mockMovieDetail: Movie = mockMovieResponse.results[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPopularMovies', () => {
    it('should fetch popular movies successfully', async () => {
      // Mock the API response
      api.get = vi.fn().mockResolvedValue({ data: mockMovieResponse });

      const response = await getPopularMovies();
      
      expect(api.get).toHaveBeenCalledWith('/movie/popular');
      expect(response.data).toEqual(mockMovieResponse);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      api.get = vi.fn().mockRejectedValue(error);

      await expect(getPopularMovies()).rejects.toThrow('API Error');
      expect(api.get).toHaveBeenCalledWith('/movie/popular');
    });
  });

  describe('searchMovies', () => {
    it('should search movies with query parameter', async () => {
      api.get = vi.fn().mockResolvedValue({ data: mockMovieResponse });
      const query = 'test movie';

      const response = await searchMovies(query);

      expect(api.get).toHaveBeenCalledWith('/search/movie', { params: { query } });
      expect(response.data).toEqual(mockMovieResponse);
    });

    it('should handle empty search query', async () => {
      api.get = vi.fn().mockResolvedValue({ data: { ...mockMovieResponse, results: [] } });
      const query = '';

      const response = await searchMovies(query);

      expect(api.get).toHaveBeenCalledWith('/search/movie', { params: { query } });
      expect(response.data.results).toHaveLength(0);
    });
  });

  describe('getMovieDetails', () => {
    it('should fetch movie details by ID', async () => {
      api.get = vi.fn().mockResolvedValue({ data: mockMovieDetail });
      const movieId = 1;

      const response = await getMovieDetails(movieId);

      expect(api.get).toHaveBeenCalledWith(`/movie/${movieId}`);
      expect(response.data).toEqual(mockMovieDetail);
    });

    it('should handle non-existent movie ID', async () => {
      const error = new Error('Movie not found');
      api.get = vi.fn().mockRejectedValue(error);
      const movieId = 999999;

      await expect(getMovieDetails(movieId)).rejects.toThrow('Movie not found');
      expect(api.get).toHaveBeenCalledWith(`/movie/${movieId}`);
    });
  });
});