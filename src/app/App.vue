<script setup>
import Header from '../features/components/Header.vue'
import SwipableCard from '../features/components/SwipableCard.vue'
import { MovieStore } from '../features/stores/MovieStore';


const movieStore = MovieStore();
movieStore.loadPage();


</script>

<template>
  <Header />
  <main class="container">
    


<p>Liked movies so far: {{movieStore.likedMovies.length}}</p>

<SwipableCard v-if="movieStore.currentMovie != null"
:movie ="movieStore.currentMovie"
@like="movieStore.like"
@reject="movieStore.reject"
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
