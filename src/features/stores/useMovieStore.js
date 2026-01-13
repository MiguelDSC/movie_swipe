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
      lastSeenMovieId: null,
      error: null,
      loading: false,
      movieList: [],
    };
  },
  getters: {
    currentMovieObj: (state) => {
      return state.movieList[state.currentIndex] ?? null;
    },
    canReturn(state) {
      console.log(
        "index:", state.currentIndex,
        "| page:", state.currentPage,
        "| list length:", this.movieList.length
      )


      if (state.currentPage === 1 && state.currentIndex === 0) {
        return false;
      }
      return true;
    }
  },

  actions: {

    nextPage() {
      return this.currentPage += 1;

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


    async return() {
      if (!this.canReturn) return;

      if (this.currentIndex === 0 && this.currentPage > 1) {
        // Going back from first movie of current page
        this.currentPage -= 1;
        console.log(`Going back to page ${this.currentPage}`);
        

        const lastLikedIndex = this.likedMovies.findIndex(id => this.lastSeenMovieId === id); 
        const lastRejectedIndex = this.rejectedMovies.findIndex(id => this.lastSeenMovieId === id);
          if (lastLikedIndex !== -1 ) {
          this.likedMovies.splice(lastLikedIndex, 1);
          writeToStorage("MS_LIKED_MOVIES", this.likedMovies);
}
          if (lastRejectedIndex !== -1 ) {
          this.rejectedMovies.splice(lastRejectedIndex , 1);
          writeToStorage("MS_REJECTED_MOVIES", this.rejectedMovies);
}


        await this.loadPage(this.currentPage);
        this.currentIndex = this.movieList.length - 1;
        console.log("Returned to previous page, index set to", this.currentIndex);

      } else {
        // Going back within same page
        this.currentIndex -= 1;

        // Same cleanup for liked/rejected
        const lastLikedId = this.likedMovies[this.likedMovies.length - 1];
        if (this.currentMovieObj?.id === lastLikedId) {
           console.log(`found and removed id ${lastLikedId} `);
          
          this.likedMovies.pop();
          writeToStorage("MS_LIKED_MOVIES", this.likedMovies);
        }

        const lastRejectedId = this.rejectedMovies[this.rejectedMovies.length - 1];
        if (this.currentMovieObj?.id === lastRejectedId) {
                    console.log(`found and removed id ${lastRejectedId} `);
          this.rejectedMovies.pop();
          writeToStorage("MS_REJECTED_MOVIES", this.rejectedMovies);
        }
      }
    },




    async loadPage(page = this.currentPage) {
      this.loading = true;
      this.error = null;

      try {
        console.log(`Loading page: ${page}`);

        const results = await fetchMovies(page);

        const seen = new Set([...this.likedMovies, ...this.rejectedMovies]);
        const filtered = results.filter(m => !seen.has(m.id));

        if (filtered.length === 0) {
          // Do not mutate currentPage here
          console.log(`Page ${page} empty, skipping to next page...`);
          return this.loadPage(page + 1);
        }

        this.movieList = filtered;
        this.currentIndex = 0;
        this.currentPage = page; // commit only here
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    async handleNextMovie() {
      this.lastSeenMovieId = this.currentMovieObj?.id || null;
      this.currentIndex += 1;
      if (this.currentIndex > this.movieList.length - 1) {
        this.nextPage();
        console.log("doing next page oops");

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