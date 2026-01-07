<script setup>
import Header from '../features/components/Header.vue'
import SwipableCard from '../features/components/SwipableCard.vue'
import { ref } from 'vue'


const likedMovies = ref([]);
const rejectedMovies = ref([]);

const handleLike = (movie) => {
likedMovies.value.push(movie);

};

const handleReject = (movie) => {
rejectedMovies.value.push(movie);
};


// create get movie function to fetch random movie from themoviedb api
const getRandomMovie = () => {
 const result = fetch

}


// check both liked and rejected movies to avoid duplicates before fetching new movie






</script>

<template>
  <Header />
  <main class="container">
    


<p>Liked movies so far: {{likedMovies.length}}</p>

<SwipableCard
:movie ="{
  id: 550,
  title: 'Fight Club',
  overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy',
  poster_path: 'cover.jpg',
  release_date: '1999-10-15',
  vote_average: 8.4
}"
@like="handleLike"
@reject="handleReject"
/> 

<!-- divider -->

<!-- main content -->

<!-- swipable card  -->

<!--  -->

  </main>

</template>

<style scoped>

.container {
width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin: 50px auto; */
  /* background-color:  green; */


}



</style>
