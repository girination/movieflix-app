"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { searchMovies } from "@/lib/tmdb";
import { Movie } from "@/types/movie";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Search Movies</h1>
        
        <SearchBar />

        {query && (
          <p className="text-center text-gray-400 mb-6">
            Search results for: &quot;{query}&quot;
          </p>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 p-8">
            <p>{error}</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center text-gray-400 p-8">
            <p>No movies found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="text-center text-gray-400 p-8">
            <p>Enter a search term to find movies</p>
          </div>
        )}
      </div>
    </div>
  );
}