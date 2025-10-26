import { Metadata } from "next";
import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const movie = await getMovie(params.id);
  return {
    title: movie.title,
  };
};

const MoviesDetailPage = ({ params }) => {
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={params.id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={params.id} />
      </Suspense>
    </div>
  );
};

export default MoviesDetailPage;
