"use client";

import { useState } from "react";
import { Movie, Video } from "@/types/movie";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const trailer = movie.videos?.results?.find(
      (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    
    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    } else {
      alert("Trailer not available for this movie.");
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerKey(null);
  };

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  return (
    <>
      <Link href={`/movie/${movie.id}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
          <div className="relative">
            {!imageError ? (
              <img
                src={posterUrl}
                alt={movie.title || movie.name || 'Movie poster'}
                className="w-full h-80 object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-80 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            
            {/* Trailer button overlay */}
            {movie.videos?.results?.some((vid: Video) => vid.type === "Trailer" && vid.site === "YouTube") && (
              <button
                onClick={handleTrailerClick}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                title="Watch Trailer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
              </button>
            )}
          </div>
          
          <div className="p-3">
            <h3 className="text-lg font-semibold truncate text-white">
              {movie.title || movie.name}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-yellow-400">
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </p>
              <p className="text-xs text-gray-400">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 
                 movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : ''}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeTrailer}
        >
          <div
            className="relative w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pb-9/16"> {/* 16:9 aspect ratio */}
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Movie Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <button
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-red-500 transition-colors"
              onClick={closeTrailer}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
