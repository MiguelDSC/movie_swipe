<template>
    <div class="movie-list">
        <MovieCard v-if="movieList.length > 0"
            v-for="movie in movieList"
            :key="movie.id"
            :movie="movie"
            :style="cardStyle"
          
        >
        </MovieCard>

    </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue';
import { useMovieStore } from '../stores/useMovieStore.js';
import { onMounted, ref, computed } from 'vue';

const movieStore = useMovieStore();
const movieList = ref([]);


onMounted(async () => {
    movieList.value = await movieStore.getLikedMovies();
    console.log(movieList.value);
    
    
});


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