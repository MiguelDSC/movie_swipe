import { defineStore } from "pinia";
import { readFromStorage, writeToStorage } from "../utils";
import { fetchMovieById, fetchMovies } from "../discoverMovies";
import { filters } from "../../shared/filters";

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
      filters: filters,
      activeFilter: null,
      movieList: [],
    };
  },
  getters: {
    currentMovieObj: (state) => {
      return state.movieList[state.currentIndex] ?? null;
    },
    activeFilterName: (state) => {
      return state.filters.find(f => f.id === state.activeFilter?.id) || {
        id: 1, name: 'All'

      }
    },
    getFilteredMovies: (state) => {
      if (state.activeFilter == null || state.activeFilter.id === 1) {
        return state.movieList;
      } else {

        return state.movieList.filter(movie =>
          movie.genres.some(genre => genre.name === state.activeFilter.name)
        );
      }
    },
  },
  actions: {

    setActiveFilter(filter) {
      this.activeFilter = filter;
    },

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
        console.log(data);

        this.movieList = data;

      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
      ;

    },


    //   if (!this.canReturn) return;
    //     console.log( "trying to return");


    //   // CASE 1: going back from first item of a page
    //   if (this.currentIndex === 0 && this.currentPage > 1) {
    //     this.currentPage -= 1;

    //     const id = this.lastSeenMovieId;
    //     console.log( `id is ${id}` );  



    //     if (id == null) return;

    //     // check both lists and remove from exactly one
    //     const likedIndex = this.likedMovies.indexOf(id);
    //     if (likedIndex !== -1) {
    //       console.log(`removing from likedMovies at index ${likedIndex}`);

    //       this.likedMovies.splice(likedIndex, 1);
    //       writeToStorage("MS_LIKED_MOVIES", this.likedMovies);
    //     } else {
    //       const rejectedIndex = this.rejectedMovies.indexOf(id);
    //       if (rejectedIndex !== -1) {
    //         console.log(`removing from rejectedMovies at index ${rejectedIndex}`);
    //         this.rejectedMovies.splice(rejectedIndex, 1);
    //         writeToStorage("MS_REJECTED_MOVIES", this.rejectedMovies);
    //       }
    //     }

    //     await this.loadPage(this.currentPage);
    //     this.currentIndex = this.movieList.length - 1;
    //     this.lastSeenMovieId = this.movieList[this.currentIndex]?.id ?? null;

    //   }
    //   // CASE 2: going back within the same page
    //   else {
    //     const previousIndex = this.currentIndex - 1;
    //     const movieToUndo = this.movieList[previousIndex];

    //     if (!movieToUndo) return;

    //     const id = movieToUndo.id;

    //     // Remove from exactly one list
    //     const likedIndex = this.likedMovies.indexOf(id);
    //     if (likedIndex !== -1) {
    //       this.likedMovies.splice(likedIndex, 1);
    //       writeToStorage("MS_LIKED_MOVIES", this.likedMovies);
    //     } else {
    //       const rejectedIndex = this.rejectedMovies.indexOf(id);
    //       if (rejectedIndex !== -1) {
    //         this.rejectedMovies.splice(rejectedIndex, 1);
    //         writeToStorage("MS_REJECTED_MOVIES", this.rejectedMovies);
    //       }
    //     }

    //     this.currentIndex = previousIndex;
    //     this.lastSeenMovieId = id;
    //   }
    // },



    async loadPage(page = this.currentPage) {
      this.loading = true;
      this.error = null;

      try {

        const results = await fetchMovies(page);

        const seen = new Set([...this.likedMovies, ...this.rejectedMovies]);
        const filtered = results.filter(m => !seen.has(m.id));

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
      this.lastSeenMovieId = this.currentMovieObj?.id || null;
      this.currentIndex += 1;
      if (this.currentIndex > this.movieList.length - 1) {
        this.nextPage();

        await this.loadPage();
      }
    },

    async like(movie) {
      
      console.log("Liking movie:", movie);
    
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