import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailMovieResponse, Movie, MovieResponse } from "../types/movies";
import axios from "axios";

const MovieDetailPage = (): void | ReactElement => {
  const params = useParams();
  console.log(params);

  const [movie, setMovie] = useState<DetailMovieResponse>();

  //1. 로딩 상태
  const [isPending, setIsPending] = useState(false);

  //2. 에러 상태
  const [isError, setIsError] = useState(false);

  useEffect((): void => {
    const fetchMovies = async () => {
      // 로딩 중임
      setIsPending(true);

      try {
        // response.data.results 를 하는 과정을 {data} 구조 분해 할당으로 받음으로써 data.results 로 받음
        const { data } = await axios.get<DetailMovieResponse>(
          `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [params.movieId]);

  console.log(movie?.adult);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return <div>MovieDetail Page</div>;
};
export default MovieDetailPage;
