import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { getMovies } from "@/lib/tmdb";
import { Movie } from "@/types/movie";

export default async function HomePage() {
  let movies: Movie[] = [];
  let error: string | null = null;

  try {
    movies = await getMovies();
  } catch (err) {
    console.error('Failed to fetch movies:', err as Error);
    error = 'Failed to load movies. Please try again later.';
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Popular Movies</h1>
        
        <SearchBar />

        {error ? (
          <div className="text-center text-red-500 p-8">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 p-8">
            <p>No movies found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
