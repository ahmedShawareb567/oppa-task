import { useEffect, useState } from "react";
import { AppLoading } from "../../components/AppLoading/AppLoading";
import { AppCard } from "../../components/AppCard/AppCard";

import "./watchList.scss";
import { Movie } from "../../types";
import { watchListMovies } from "../../services/watchList.service";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const WatchListPage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user: any = useSelector((state: RootState) => state.Auth.user);

  useEffect(() => {
    (async () => {
      setMovies([]);
      const movies: any = (await watchListMovies(user.uid, search)) || [];
      setIsLoading(false);
      setMovies(movies);
    })();
  }, [search, user.uid]);

  return (
    <div className="watchList">
      <div className="container">
        <div className="d-flex mb-xl align-items-center justify-content-between flex-wrap">
          <h3 className="fs-xl fw-bold">Your Watchlist</h3>
          {!isLoading && (
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className="form-select ms-3">
                <option value="">Sorted By year</option>
              </select>
            </div>
          )}
          {isLoading && <AppLoading size="sm" />}
        </div>

        {isLoading && (
          <div className="container">
            <AppLoading size="sm" />
          </div>
        )}
        {!isLoading && (
          <>
            {movies.length > 0 ? (
              <div className="row">
                {movies.map((item: Movie) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-md"
                    key={item.id}
                  >
                    <AppCard movie={item} />
                  </div>
                ))}
              </div>
            ) : (
              <p>Movies not exist.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
