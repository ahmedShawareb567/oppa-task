import { $db } from "../constants/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  documentId,
} from "firebase/firestore";

const movieRef = collection($db, "movies");

const getMoviesFilter = async (
  id: string,
  search: string = "",
  watchListIds: string[] = []
) => {
  const filterArr = [];
  if (id) filterArr.push(where("genre_id", "==", id));
  if (search) filterArr.push(where("title", "==", search));
  if (watchListIds.length)
    filterArr.push(where(documentId(), "in", watchListIds));

  const moviesQuery = query(movieRef, ...filterArr);
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
