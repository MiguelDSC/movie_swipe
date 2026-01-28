import { defineStore } from "pinia";
import { readFromStorage, writeToStorage } from "../utils";
import { fetchMovieById, fetchMovies } from "../discoverMovies";
import { useFilterStore } from "./useFilterStore";

export const useMovieStore = defineStore("movie", {
  state: () => {
    return {
      likedMovies: readFromStorage("MS_LIKED_MOVIES"),
      rejectedMovies: readFromStorage("MS_REJECTED_MOVIES"),
      currentPage: 1,
      currentIndex: 0,
      error: null,
      loading: false,
      movieList: [],
    };
  },
  getters: {
    currentMovieObj: (state) => {
      return state.movieList[state.currentIndex] ?? null;
    },
    getFilteredMovies: (state) => {
      const filterStore = useFilterStore();
      if (
        filterStore.activeFilter == null ||
        filterStore.activeFilter.id === 1
      ) {
        return state.movieList;
      } else {
        return state.movieList.filter((movie) =>
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
          this.likedMovies.map((id) => fetchMovieById(id)),
        );
        console.log(data);

        this.movieList = data;
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

        const seen = new Set([...this.likedMovies, ...this.rejectedMovies]);
        const filtered = results.filter((m) => !seen.has(m.id));

        if (filtered.length === 0) {
          return this.loadPage(page + 1);
        }

        this.movieList = filtered;
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
      if (this.currentIndex > this.movieList.length - 1) {
        this.nextPage();

        await this.loadPage();
      }
    },

    async like(movie) {
      if (movie?.id != null && !this.likedMovies.includes(movie.id)) {
        this.likedMovies.push(movie.id);
      }

      writeToStorage("MS_LIKED_MOVIES", this.likedMovies);
      await this.handleNextMovie();
    },

    async reject(movie) {
      if (movie?.id != null && !this.rejectedMovies.includes(movie.id)) {
        this.rejectedMovies.push(movie.id);
      }

      writeToStorage("MS_REJECTED_MOVIES", this.rejectedMovies);
      await this.handleNextMovie();
    },
  },
});
