import { API_URL } from "../../lib/constants";
import { Movie } from "../../components/movie";
import styles from "../../styles/home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

async function getMovies() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetch(API_URL).then(response => response.json());
}

const HomePage = async () => {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map(movie => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
        />
      ))}
    </div>
  );
};

export default HomePage;
