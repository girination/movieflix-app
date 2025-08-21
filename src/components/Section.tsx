import MovieCard from "./MovieCard";

export default function Section({ title, movies }: { title: string; movies: any[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-5">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
