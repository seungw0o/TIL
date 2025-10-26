import { API_URL } from "../lib/constants";
import styles from "../styles/movie-video.module.css";

const getVideos = async (id: string) => {
  console.log(`Fetching videos: ${Date.now()}`);
  await new Promise(resolve => setTimeout(resolve, 3000));
  // throw new Error("something broke...");
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
};

const MovieVideos = async ({ id }: { id: string }) => {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      {videos.map((video: any) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ))}
    </div>
  );
};

export default MovieVideos;
