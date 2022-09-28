import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types";
import { AppImage } from "../AppImage/AppImage";

import "./appCard.scss";

interface AppCardInterface {
  movie: Movie;
}

export const AppCard: FunctionComponent<AppCardInterface> = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="appCard position-relative d-block"
    >
      <div className="appCard-header">
        <AppImage src={movie.image} />
      </div>
      <div className="appCard-body">
        <div>
          <h3 className="mb-xs fs-lg">{movie.title.substr(0, 20)}</h3>
          <p className="appCard-description">
            {movie.description.substr(0, 30)}...
          </p>
        </div>
      </div>
    </Link>
  );
};
