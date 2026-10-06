import { Movie, searchMovies } from '@/api/omdb';
import { useState } from 'react';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [lastQuery, setLastQuery] = useState('');

  const search = async (query: string, searchPage: number = 1) => {
    if (!query.trim()) {
      setError('Введіть назву фільму');
      return;
    }

    if (searchPage === 1) {
      setLoading(true);
      setMovies([]);
    } else {
      setLoadingMore(true);
    }
    setError('');

    const result = await searchMovies(query, searchPage);

    if (result.success) {
      if (searchPage === 1) {
        setMovies(result.movies);
      } else {
        setMovies((prev) => [...prev, ...result.movies]);
      }
      setTotalResults(result.totalResults);
      setPage(searchPage);
      setLastQuery(query);
    } else {
      setError(result.error || 'Нічого не знайдено');
      if (searchPage === 1) setMovies([]);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  const loadMore = () => {
    if (movies.length < totalResults && !loadingMore && lastQuery) {
      search(lastQuery, page + 1);
    }
  };

  return {
    movies,
    loading,
    loadingMore,
    error,
    totalResults,
    search,
    loadMore,
  };
};