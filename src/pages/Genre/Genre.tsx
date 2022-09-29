import { useQuery } from "../../helper/hooks";
import { useEffect, useState } from "react";
import { getMoviesFilter } from "../../services/movie.service";
import { useRouteMatch } from "react-router-dom";
import { AppLoading } from "../../components/AppLoading/AppLoading";
import { Movie } from "../../types";
import { AppCard } from "../../components/AppCard/AppCard";
import { AppShimmer } from "../../components/AppShimmer/AppShimmer";

export const GenrePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState();
  const [yearSort, setYearSort] = useState("asc");

  const query = useQuery();
  const route: any = useRouteMatch();

  useEffect(() => {
    (async () => {
      const movies: any =
        (await getMoviesFilter(route.params.id, search, [], yearSort)) || [];
      setIsLoading(false);
      setMovies(movies);
    })();
  }, [route.params.id, search, yearSort]);

  return (
    <div className="genre">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap mb-xl">
          <h3 className="fs-xl fw-bold mb-0">{query.get("genre")}</h3>
          {!isLoading && (
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={(e: any) => setSearch(e.target.value)}
              />
              <select
                className="form-select ms-3"
                onChange={(e) => {
                  if (e.target.value) setYearSort(e.target.value);
                }}
              >
                <option value="">Sorted By Year</option>
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          )}
          {isLoading && <AppLoading size="sm" />}
        </div>
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
              <p>Movies not exits.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
