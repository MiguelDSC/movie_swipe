<template>
    <ToggleViewComponent @viewMode="viewModeHandler" />
    <FilterActionsList />
    <div class="movie-list" :style="styleForViewMode"
        v-if="movieStore.getFilteredMovies.length > 0 && !movieStore.loading">
        <template v-for="movie in movieStore.getFilteredMovies" :key="movie.id">
            <MovieListCardItem v-if="viewMode === view_modes.ListView" :movie="movie" />
            <MovieCard v-else :movie="movie" :style="cardStyle" />
        </template>
    </div>

    <h1 v-if="movieStore.getFilteredMovies.length === 0 && !movieStore.loading">No movies liked yet</h1>
</template>

<script setup>
import MovieCard from './MovieCard.vue';
import FilterActionsList from './FilterActionsList.vue';
import { useMovieStore } from '../stores/useMovieStore.js';
import { computed, ref } from 'vue';
import ToggleViewComponent from './ToggleViewComponent.vue';
import { view_modes } from '../../shared/constants.js';
import MovieListCardItem from './MovieListCardItem.vue';
const movieStore = useMovieStore();


// computed style based on screen size can be added here if needed
// mobile max 2 per row, else just let it grow


const styleForViewMode = computed(() => {
    if (viewMode.value === view_modes.ListView) {
        return {
            flexDirection: 'column',
            alignItems: 'center',
        };
    } else {
        return {
            flexDirection: 'row',
            alignItems: 'stretch',
        };
    }
});

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

const viewMode = ref(view_modes.CardView);

const viewModeHandler = (mode) => {
    console.log(mode);
    viewMode.value = mode;
}


</script>

<style scoped>
.movie-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 16px;
    justify-content: center;
}
</style>