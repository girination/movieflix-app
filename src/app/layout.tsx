import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "MovieFlix",
  description: "Browse Movies & TV Shows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto p-5">{children}</main>
      </body>
    </html>
  );
}
