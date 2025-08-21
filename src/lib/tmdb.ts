import { Movie, MovieResponse } from "@/types/movie";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'da134af2940b533c6268085caa6d1860';
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

/**
 * Fetch popular movies with video data
 */
export async function getMovies(page: number = 1): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}&append_to_response=videos`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch movies: ${res.status}`);
    }
    
    const data: MovieResponse = await res.json();
    
    // Fetch video data for each movie since append_to_response doesn't always work for lists
    const moviesWithVideos = await Promise.all(
      data.results.map(async (movie) => {
        try {
          const videoRes = await fetch(
            `${TMDB_BASE_URL}/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`
          );
          if (videoRes.ok) {
            const videoData = await videoRes.json();
            return { ...movie, videos: videoData };
          }
          return movie;
        } catch (error) {
          console.warn(`Failed to fetch videos for movie ${movie.id}:`, error);
          return movie;
        }
      })
    );
    
    return moviesWithVideos;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

/**
 * Fetch a single movie by ID with full details including videos
 */
export async function getMovie(id: string): Promise<Movie> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch movie: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
}

/**
 * Search for movies by query
 */
export async function searchMovies(query: string, page: number = 1): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
    );
    
    if (!res.ok) {
      throw new Error(`Failed to search movies: ${res.status}`);
    }
    
    const data: MovieResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

/**
 * Fetch trending movies (optional - for more variety)
 */
export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch trending movies: ${res.status}`);
    }
    
    const data: MovieResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}

/**
 * Fetch movies by genre (optional)
 */
export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch movies by genre: ${res.status}`);
    }
    
    const data: MovieResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
}

/**
 * Fetch movie genres list (optional - useful for filtering)
 */
export async function getGenres() {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch genres: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}