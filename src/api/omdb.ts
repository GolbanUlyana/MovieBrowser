const API_KEY = '5aa2e92e';
const BASE_URL = 'http://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
  imdbRating: string;
  imdbVotes: string;
  Country: string;
  Language: string;
  Awards: string;
  Type: string;
}

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<{
  movies: Movie[];
  totalResults: number;
  success: boolean;
  error?: string;
}> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    );
    const data = await response.json();

    if (data.Response === 'True') {
      return {
        movies: data.Search,
        totalResults: parseInt(data.totalResults),
        success: true,
      };
    } else {
      return {
        movies: [],
        totalResults: 0,
        success: false,
        error: data.Error,
      };
    }
  } catch (error: any) {
    return {
      movies: [],
      totalResults: 0,
      success: false,
      error: error.message,
    };
  }
};

export const getMovieDetails = async (
  imdbID: string
): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};