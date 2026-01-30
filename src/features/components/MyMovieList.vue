<template>
  <FilterActionsList />
  <div
    class="movie-list"
    :class="{ 'card-view': viewMode === view_modes.CardView }"
    v-if="movieStore.getFilteredMovies.length > 0 && !movieStore.loading"
  >
    <MovieListCardItem
      :movie="movie"
      v-for="movie in movieStore.getFilteredMovies"
      :key="movie.id"
      :isExpanded="expandedMovieId === movie.id"
      @toggle="handleToggle(movie.id)"
    />
  </div>

  <h1 v-if="movieStore.getFilteredMovies.length === 0 && !movieStore.loading">
    No movies liked yet
  </h1>
</template>

<script setup>
import FilterActionsList from "./FilterActionsList.vue";
import { useMovieStore } from "../stores/useMovieStore.js";
import { view_modes } from "../../shared/constants.js";
import MovieListCardItem from "./MovieListCardItem.vue";
import { ref } from "vue";

const movieStore = useMovieStore();

const expandedMovieId = ref(null);

const handleToggle = (movieId) => {
  if (expandedMovieId.value === movieId) {
    expandedMovieId.value = null;
  } else {
    expandedMovieId.value = movieId;
  }
};
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  gap: 16px;
  padding: 16px;
}

.movie-list.card-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  justify-content: center;
}

@media (min-width: 640px) {
  .movie-list.card-view {
    grid-template-columns: repeat(auto-fit, minmax(280px, 380px));
  }
}
</style>
