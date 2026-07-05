import { defineStore } from "pinia";
import { readFromStorage, writeToStorage } from "../utils";
import { fetchMovieById, fetchMovies } from "../discoverMovies";
import { useFilterStore } from "./useFilterStore";

export const useMovieStore = defineStore("movie", {
  state: () => {
    return {
      likedMoviesIds: readFromStorage("MS_LIKED_MOVIES"),
      rejectedMoviesIds: readFromStorage("MS_REJECTED_MOVIES"),
      currentPage: 1,
      currentIndex: 0,
      error: null,
      loading: false,
      swipeMoviesList: [],
      likedMoviesList: [],
    };
  },
  getters: {
    currentMovieObj: (state) => {
      return state.swipeMoviesList[state.currentIndex] ?? null;
    },
    getFilteredMovies: (state) => {
      const filterStore = useFilterStore();
      if (
        filterStore.activeFilter == null ||
        filterStore.activeFilter.id === 1
      ) {
        return state.likedMoviesList;
      } else {
        return state.likedMoviesList.filter((movie) =>
          movie.genres.some(
            (genre) => genre.name === filterStore.activeFilter.name,
          ),
        );
      }
    },
  },
  actions: {
    nextPage() {
      return (this.currentPage += 1);
    },

    async getLikedMovies() {
      this.error = null;
      this.loading = true;

      try {
        const data = await Promise.all(
          this.likedMoviesIds.map((id) => fetchMovieById(id)),
        );

       this.likedMoviesList = data;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    async loadPage(page = this.currentPage) {
      this.loading = true;
      this.error = null;

      try {
        const results = await fetchMovies(page);

        const seen = new Set([...this.likedMoviesIds, ...this.rejectedMoviesIds]);
        const filtered = results.filter((m) => !seen.has(m.id));

        if (filtered.length === 0) {
          return this.loadPage(page + 1);
        }

        this.swipeMoviesList = filtered;
        this.currentIndex = 0;
        this.currentPage = page;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    async handleNextMovie() {
      this.currentIndex += 1;
      if (this.currentIndex > this.swipeMoviesList.length - 1) {
        this.nextPage();

        await this.loadPage();
      }
    },

    async like(movie) {
      if (movie?.id != null && !this.likedMoviesIds.includes(movie.id)) {
        this.likedMoviesIds.push(movie.id);
      }

      writeToStorage("MS_LIKED_MOVIES", this.likedMoviesIds);
      await this.handleNextMovie();
    },

    async reject(movie) {
      if (movie?.id != null && !this.rejectedMoviesIds.includes(movie.id)) {
        this.rejectedMoviesIds.push(movie.id);
      }

      writeToStorage("MS_REJECTED_MOVIES", this.rejectedMoviesIds);
      await this.handleNextMovie();
    },
  },
});
