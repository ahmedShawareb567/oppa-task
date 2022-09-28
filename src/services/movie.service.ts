import { $db } from "../constants/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  documentId,
  orderBy,
  limit,
} from "firebase/firestore";

const movieRef = collection($db, "movies");

const getMoviesFilter = async (
  id: string,
  search: string = "",
  watchListIds: string[] = [],
  sortType: any = "asc",
  limitOfItems = 8
) => {
  const filterArr = [];

  if (id) filterArr.push(where("genre_id", "==", id));
  if (search) filterArr.push(where("title", "==", search));

  if (watchListIds.length) {
    filterArr.push(orderBy(documentId()));
    filterArr.push(where(documentId(), "in", watchListIds));
  } else {
    filterArr.push(orderBy("published_at", sortType));
  }

  const moviesQuery = query(movieRef, ...filterArr, limit(8));
  const movies = await getDocs(moviesQuery);

  return movies.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

const getRelatedMovies = async (id: string, genre_id: string) => {
  const moviesQuery = query(
    movieRef,
    where(documentId(), "!=", id),
    where("genre_id", "==", genre_id)
  );

  const movies = await getDocs(moviesQuery);

  return movies.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};
const getMovieById = async (id: string) => {
  const movie = await getDoc(doc($db, "movies", id));

  if (movie.exists()) {
    return {
      id: movie.id,
      ...movie.data(),
    };
  }
};

export { getMoviesFilter, getRelatedMovies, getMovieById };
