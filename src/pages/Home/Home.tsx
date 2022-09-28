import "./index.scss";

import { getGenres } from "../../services/genre.service";
import { useEffect, useState } from "react";
import { AppGenre } from "../../components/AppGenre/AppGenre";
import { Genre } from "../../types";
import { AppLoading } from "../../components/AppLoading/AppLoading";

export const HomePage = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const allGenres: any = (await getGenres()) || [];
      setIsLoading(false);
      setGenres(allGenres);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="container pt-xl">
        <AppLoading size="sm" />
      </div>
    );
  }

  return (
    <div className="home pb-xl">
      {genres.length === 0 && (
        <div className="container">
          <p>Genres not exist.</p>
        </div>
      )}
      {genres.length > 0 &&
        genres.map((item: Genre) => (
          <div className="mb-lg" key={item?.id}>
            <AppGenre genre={item} />
          </div>
        ))}
    </div>
  );
};
