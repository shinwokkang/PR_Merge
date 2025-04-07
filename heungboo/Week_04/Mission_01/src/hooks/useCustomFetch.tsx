import { useEffect } from "react";
import axios from "axios";

interface ApiResponse<T> {
  data: T;
  isPending: boolean;
  idError: boolean;
}

const useCustomFetch:: ApiResponse<T>= (url: string) => {
  useEffect((): void => {
    const fetchMovies = async () => {
      setIsPending(true);

      try {
        // response.data.results 를 하는 과정을 {data} 구조 분해 할당으로 받음으로써 data.results 로 받음
        const { data } = await axios.get<T>(`url`, {
          // 환경 변수를 사용할 때 항상 접두사 VITE 를 붙여줘야함. (VITE_TMDB_KEY)
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            "Content-Type": "application/json",
            // Content-Type : image 나 Form data 를 넣을 때 바꿔줘야함 ! -> json 형식이 아닌듯
          },
        });
        setMovies(data.results);
        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }
};

export default useCustomFetch;
