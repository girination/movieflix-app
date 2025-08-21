"use client";

import { useState, useEffect } from "react";
import { Movie, Video } from "@/types/movie";
import { getMovie } from "@/lib/tmdb";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import Image from "next/image"; // Add this import

interface MovieDetailProps {
  params: { id: string };
}

export default function MovieDetail({ params }: MovieDetailProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        const movieData = await getMovie(params.id);
        setMovie(movieData);

        const trailer = movieData.videos?.results?.find(
          (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Movie not found'}</p>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Backdrop */}
      {backdropUrl && (
        <div 
          className="relative h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="absolute bottom-4 left-4">
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="w-full rounded-lg shadow-lg">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-yellow-400 text-xl">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                </span>
                <span className="text-gray-400">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
                </span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {movie.overview || 'No overview available.'}
              </p>

              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Release Date:</span> {movie.release_date || 'Unknown'}</p>
              </div>
            </div>
          </div>

          {/* Trailer Section */}
          {trailerKey ? (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
              <div className="aspect-video max-w-4xl">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Movie Trailer"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-gray-400">Trailer not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}