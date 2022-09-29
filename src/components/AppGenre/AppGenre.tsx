import { AppCard } from "../AppCard/AppCard";
import { Genre, Movie } from "../../types/index";
import { getMoviesFilter } from "../../services/movie.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShimmer } from "../AppShimmer/AppShimmer";

interface AppGenreInterface {
  genre: Genre;
}

export const AppGenre = ({ genre }: AppGenreInterface) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const items: any = (await getMoviesFilter(genre.id)) || [];
      setIsLoading(false);
      setMovies(items);
    })();
  }, [genre.id]);

  return (
    <div className="genre">
      <div className="container">
        <Link
          to={`/genre/${genre.id}?genre=${genre.name}`}
          className="fs-lg mb-lg fw-bold mb-lg d-block"
        >
          {genre.name}
        </Link>
        {isLoading && <AppShimmer />}
        {!isLoading && (
          <>
            {movies.length > 0 ? (
              <div className="row">
                {movies.map((item: Movie) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                    <div className="mb-md" key={item.id}>
                      <AppCard movie={item} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Movies Exists</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
