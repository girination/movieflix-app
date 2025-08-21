export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  first_air_date?: string;
  videos?: {
    results: Video[];
  };
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// lib/tmdb.ts
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'da134af2940b533c6268085caa6d1860';
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

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
    
    // Fetch video data for each movie
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
