<script setup>
import { onMounted, ref } from 'vue';
import Header from '../features/components/Header.vue'
import SwipableCard from '../features/components/SwipableCard.vue'
import { useMovieStore } from '../features/stores/useMovieStore';
import MyMovieList from '../features/components/MyMovieList.vue';


const movieStore = useMovieStore();

const currentScreen = ref(1);

// onmount to call fetchMovies
onMounted(() => {
  if (!movieStore.currentMovie) movieStore.loadPage();
});


const setCurrentScreen = (screenNumber) => {
  currentScreen.value = screenNumber;
};

</script>

<template>
  <Header @setMode="setCurrentScreen"/>
  <main class="container">
    


<p>Liked movies so far: {{movieStore.likedMovies.length}}</p>

 <SwipableCard v-if="movieStore.currentMovie != null && currentScreen === 1"
:movie ="movieStore.currentMovie"
@like="movieStore.like"
@reject="movieStore.reject"
/>

<MyMovieList v-if="currentScreen === 2" />

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
