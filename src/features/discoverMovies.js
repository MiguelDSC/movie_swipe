import {
  discoverMovies,
  getMovieDetails,
  getMovieVideoInfo,
} from "../services/tmdbService";

export async function fetchMovies(page = 1) {
  try {
    const data = await discoverMovies({ page });
    return data.results;
  } catch (e) {
    console.error("Error fetching movies:", e);
    throw e;
  }
}

export async function fetchMovieById(id) {
  try {
    const data = await getMovieDetails(id);
    return data;
  } catch (e) {
    console.error("Error fetching movie by ID:", e);
    throw e;
  }
}

export async function fetchTrailerInfoById(id) {
  try {
    const data = await getMovieVideoInfo(id, { append_to_response: "videos" });
    console.log(data);

    return data.results[0].key;
  } catch (e) {
    console.error("Error fetching movie trailer info by ID:", e);
    throw e;
  }
}
