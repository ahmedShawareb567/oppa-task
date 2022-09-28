import { $db } from "../constants/firebase";
import { collection, getDocs } from "firebase/firestore";

const getGenres = async () => {
  const genreRef = collection($db, "genre");
  const genres = await getDocs(genreRef);
  return genres.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export { getGenres };
