import { defineStore } from "pinia";
import { readFromStorage, writeToStorage } from "../utils";
import { fetchMovieById, fetchMovies } from "../discoverMovies";

export const useMovieStore = defineStore('movie', {
  state: () => {
    return {
      likedMovies: readFromStorage('MS_LIKED_MOVIES'),
      rejectedMovies: readFromStorage('MS_REJECTED_MOVIES'),
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
    }
  },

  actions: {

    nextPage() {
      this.currentPage += 1;
    },

    async getLikedMovies() {

      this.error = null;
      this.loading = true;

      try {
        const data = await Promise.all(
          this.likedMovies.map(id => fetchMovieById(id))
        )
        return data

      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
      ;

    },




    async loadPage() {
      this.loading = true;
      this.error = null;
      try {
        const results = await fetchMovies(this.currentPage);
        const seen = new Set([...this.likedMovies, ...this.rejectedMovies]);
        const filtered = results.filter(m => !seen.has(m.id));

        if (filtered.length === 0) {
          this.nextPage();
          return this.loadPage();
        }

        this.movieList = filtered;
        this.currentIndex = 0;
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
      if (movie?.id != null) this.likedMovies.push(movie.id);
      writeToStorage('MS_LIKED_MOVIES', this.likedMovies);
      await this.handleNextMovie();
    },

    async reject(movie) {
      if (movie?.id != null) this.rejectedMovies.push(movie.id);
      writeToStorage('MS_REJECTED_MOVIES', this.rejectedMovies);
      await this.handleNextMovie();
    }

  }
}
);