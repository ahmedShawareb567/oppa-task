import "./movie.scss";

import { useEffect, useState } from "react";
import { getMovieById, getRelatedMovies } from "../../services/movie.service";
import { AppImage } from "../../components/AppImage/AppImage";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Movie } from "../../types";
import { AppCard } from "../../components/AppCard/AppCard";
import { SvgIcon } from "../../components/SvgIcon/SvgIcon";

import { addDocToWatchList } from "../../services/watchList.service";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { AppShimmer } from "../../components/AppShimmer/AppShimmer";

export const MoviePage = () => {
  const route: any = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const user: any = useSelector((state: RootState) => state.Auth.user);

  const [movie, setMovie]: any = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const item: any = await getMovieById(route.params.id);
      setIsLoading(false);
      setMovie(item);

      const relatedMovies: any = await getRelatedMovies(
        item?.id,
        item?.genre_id
      );
      setRelatedLoading(false);
      setRelatedMovies(relatedMovies);
    })();
  }, [route.params.id]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  const addToWatchList = async () => {
    const { success } = await addDocToWatchList({
      uid: user?.uid,
      movie_id: movie?.id,
    });
    if (success) {
      history.push("/watchlist");
      return;
    }

    history.push("/watchlist");
    toast.error("This movie is already in watchlist.", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="container pt-xl">
        <AppShimmer />
      </div>
    );
  }

  return (
    <div className="movie pb-xl">
      <div className="movie-header">
        <AppImage src={movie?.image} alt="movie iamge" ratio="is-2-1" />
        <div className="movie-header-content">
          <button
            onClick={() => history.go(-1)}
            className="p-3 bg-transparent border-none text-white outline-none backWord"
          >
            <SvgIcon name="arrow-left" />
          </button>
        </div>
        <div className="movie-header-watchList">
          <button className="btn btn-white" onClick={addToWatchList}>
            Add To WatchList
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="fs-sm pt-lg">{movie?.description}</p>
          </div>
        </div>
        
        <h3 className="pt-xl fs-xxl pb-lg">Related Movies</h3>
        {relatedLoading && <AppShimmer />}
        {!relatedLoading && (
          <>
            {relatedMovies.length > 0 && (
              <div className="row">
                {relatedMovies.map((item: Movie) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-md"
                    key={item.id}
                  >
                    <AppCard movie={item} />
                  </div>
                ))}
              </div>
            )}
            {relatedMovies.length === 0 && <p>Not Exists</p>}
          </>
        )}
      </div>
    </div>
  );
};
