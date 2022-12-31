import Movie from "../components/Movie";
import { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json(); // response 를 url로부터 가져와서, json화 한다.
    setMovies(json.data.movies); // json에 있는 data 자식의 movies 정보로 current state를 바꾼다.
    setLoading(false); // loading state 를 false로 바꾼다.
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genre}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
