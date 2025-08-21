export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
      <h1 className="text-2xl font-bold text-yellow-400">🎬 MovieFlix</h1>
      <ul className="flex gap-6 text-lg">
        <li className="hover:text-yellow-400 cursor-pointer transition">Movies</li>
        <li className="hover:text-yellow-400 cursor-pointer transition">Series</li>
      </ul>
    </nav>
  );
}
