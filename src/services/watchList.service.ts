import { $db } from "../constants/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { getMoviesFilter } from "./movie.service";

const watchListRef = collection($db, "watchLists");

const findWatchListOrError = async (uid: string, movie_id: string) => {
  const watchListQuery = query(
    watchListRef,
    where("uid", "==", uid),
    where("movie_id", "==", movie_id)
  );

  const watchLists = await getDocs(watchListQuery);

  return watchLists.docs[0];
};

const addDocToWatchList = async (obj: any) => {
  const findOrError = await findWatchListOrError(obj.uid, obj.movie_id);

  if (!findOrError) {
    await addDoc(watchListRef, obj);
    return { success: true };
  }

  return { success: false };
};

const watchListMovies = async (
  uid: string,
  search: string = "",
  sortType: string = "asc"
) => {
  let movies: any[] = [];

  const AllWatchListByQuery = query(watchListRef, where("uid", "==", uid));
  const AllWatchLists = await getDocs(AllWatchListByQuery);

  const AllWatchIds = AllWatchLists.docs.map((doc) => {
    return doc.data().movie_id;
  });

  if (AllWatchIds.length) {
    movies = (await getMoviesFilter("", search, AllWatchIds, sortType)).sort(
      (a: any, b: any) =>
        sortType === "asc"
          ? a.published_at - b.published_at
          : b.published_at - a.published_at
    );
  }

  return movies;
};

export { addDocToWatchList, watchListMovies };
