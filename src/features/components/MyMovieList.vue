<template>
    <FilterActionsList />
    <div class="movie-list" v-if="movieStore.getFilteredMovies.length > 0">
        <MovieCard v-for="movie in movieStore.getFilteredMovies" :key="movie.id" :movie="movie" :style="cardStyle" />
    </div>

    <h1 v-if="movieStore.getFilteredMovies.length === 0 && !movieStore.loading">No movies liked yet</h1>
</template>

<script setup>
import MovieCard from './MovieCard.vue';
import FilterActionsList from './FilterActionsList.vue';
import { useMovieStore } from '../stores/useMovieStore.js';
import { computed } from 'vue';
const movieStore = useMovieStore();


// computed style based on screen size can be added here if needed
// mobile max 2 per row, else just let it grow

const cardStyle =
    computed(
        () => {
            const width = window.innerWidth;
            if (width < 600) {
                return { width: '45%', height: '300px' }; // 2 per row
            } else if (width < 900) {
                return { width: '30%', height: '300px' }; // 3 per row
            } else {
                return { width: '200px', height: '300px' }; // fixed size
            }
        }
    )



</script>

<style scoped>
.movie-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}
</style>