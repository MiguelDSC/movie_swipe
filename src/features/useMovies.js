import { ref, onMounted } from 'vue';
import { discoverMovies } from '../services/tmdbService';

export function useMovies() {
  const likedMovies = ref([]);
  const rejectedMovies = ref([]);
  const currentMovie = ref(null);
  const currentPage = ref(1);
  const currentIndex = ref(0);
  const movieList = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const nextPage = () => {
    currentPage.value += 1;
  };

  const loadPage = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await discoverMovies({ page: currentPage.value });
      const results = Array.isArray(data?.results) ? data.results : [];
      const seen = new Set([...likedMovies.value, ...rejectedMovies.value]);
      const filtered = results.filter(m => !seen.has(m.id));
      if (filtered.length === 0) {
        nextPage();
        return loadPage();
      }
      movieList.value = filtered;
      currentIndex.value = 0;
      currentMovie.value = movieList.value[currentIndex.value] ?? null;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  const handleNextMovie = async () => {
    currentIndex.value += 1;
    currentMovie.value = movieList.value[currentIndex.value] ?? null;
    if (currentIndex.value >= movieList.value.length - 1) {
      nextPage();
      await loadPage();
    }
  };

  const like = async (movie) => {
    if (movie?.id != null) likedMovies.value.push(movie.id);
    await handleNextMovie();
  };

  const reject = async (movie) => {
    if (movie?.id != null) rejectedMovies.value.push(movie.id);
    await handleNextMovie();
  };

  onMounted(async () => {
    await loadPage();
  });

  return {
    // state
    likedMovies,
    rejectedMovies,
    currentMovie,
    currentPage,
    currentIndex,
    movieList,
    loading,
    error,
    // actions
    like,
    reject,
    loadPage,
  };
}
