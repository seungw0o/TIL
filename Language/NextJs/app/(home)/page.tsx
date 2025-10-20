import Link from "next/link";
import { API_URL } from "../../lib/constants";

export const metadata = {
  title: "Home",
};

async function getMovies() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetch(API_URL).then(response => response.json());
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
