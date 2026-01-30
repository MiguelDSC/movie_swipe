import { ref } from "vue";
import { fetchTrailerInfoById } from "../discoverMovies.js";
import { videoBaseUrl } from "../../shared/constants.js";

export function useMovieTrailer() {
  const isLoading = ref(false);
  const error = ref(null);

  const openTrailer = async (movieId) => {
    isLoading.value = true;
    error.value = null;

    try {
      const key = await fetchTrailerInfoById(movieId);
      if (key) {
        window.open(`${videoBaseUrl}${key}`, "_blank");
      } else {
        error.value = "No trailer available";
        console.warn("No trailer found for movie ID:", movieId);
      }
    } catch (e) {
      error.value = e.message;
      console.error("Error opening trailer:", e);
    } finally {
      isLoading.value = false;
    }
  };

  return { openTrailer, isLoading, error };
}
