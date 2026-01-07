<script setup>
import Header from '../features/components/Header.vue'
import SwipableCard from '../features/components/SwipableCard.vue'
import { useMovies } from '../features/useMovies';

const {
  likedMovies,
  currentMovie,
  like,
  reject,
} = useMovies();


</script>

<template>
  <Header />
  <main class="container">
    


<p>Liked movies so far: {{likedMovies.length}}</p>

<SwipableCard v-if="currentMovie != null"
:movie ="currentMovie"
@like="like"
@reject="reject"
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
