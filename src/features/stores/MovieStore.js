import { defineStore } from "pinia";
import { writeToStorage, readFromStorage  } from "../useLocalStorage";
import { useDiscoverMovies } from "../useDiscoverMovies";

export const MovieStore = defineStore('movie', {
  state: () => {
    return {
      likedMovies: readFromStorage('MS_LIKED_MOVIES'),
      rejectedMovies: readFromStorage('MS_REJECTED_MOVIES'),
      currentMovie: null,
      currentPage: 1,
      currentIndex: 0,
      error: null,
      loading: false,
      movieList: [],
    };
  },
  actions: {

    nextPage() {
      this.currentPage += 1;
    },


    async loadPage() {
      this.loading = true;
      this.error = null;
      try {
        const results = await useDiscoverMovies.fetchMovies(this.currentPage);
        const seen = new Set([...this.likedMovies, ...this.rejectedMovies]);
        const filtered = results.filter(m => !seen.has(m.id));

        if (filtered.length === 0) {
          this.nextPage();
          return this.loadPage();
        }

        this.movieList = filtered;
        this.currentIndex = 0;
        this.currentMovie = this.movieList[this.currentIndex] ?? null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    async handleNextMovie() {
      this.currentIndex += 1;
      this.currentMovie = this.movieList[this.currentIndex] ?? null;
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