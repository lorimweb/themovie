import { api } from "../config/axios";

  export const getPopularMovies = () => api.get('/movie/popular');
  export const searchMovies = (query: string) => api.get('/search/movie', { params: { query } });
  export const getMovieDetails = (movieId: number) => api.get(`/movie/${movieId}`);