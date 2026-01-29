<template>
  <ToggleViewComponent @viewMode="viewModeHandler" />
  <FilterActionsList />
  <div
    class="movie-list"
    :class="{ 'card-view': viewMode === view_modes.CardView }"
    v-if="movieStore.getFilteredMovies.length > 0 && !movieStore.loading"
  >
    <template v-for="movie in movieStore.getFilteredMovies" :key="movie.id">
      <MovieListCardItem
        v-if="viewMode === view_modes.ListView"
        :movie="movie"
      />
      <MovieCard v-else :movie="movie" :compact="true" />
    </template>
  </div>

  <h1 v-if="movieStore.getFilteredMovies.length === 0 && !movieStore.loading">
    No movies liked yet
  </h1>
</template>

<script setup>
import MovieCard from "./MovieCard.vue";
import FilterActionsList from "./FilterActionsList.vue";
import { useMovieStore } from "../stores/useMovieStore.js";
import { computed } from "vue";
import ToggleViewComponent from "./ToggleViewComponent.vue";
import { view_modes } from "../../shared/constants.js";
import { useFilterStore } from "../stores/useFilterStore.js";
import MovieListCardItem from "./MovieListCardItem.vue";
const movieStore = useMovieStore();
const filterStore = useFilterStore();

// computed style based on screen size can be added here if needed
// mobile max 2 per row, else just let it grow

const viewMode = computed(() => filterStore.getActiveViewMode);
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
