<script setup>
import { onMounted, ref, watch } from 'vue';
import Header from '../features/components/TopHeader.vue'
import SwipableCard from '../features/components/SwipableCard.vue'
import { useMovieStore } from '../features/stores/useMovieStore';
import Loading from '../features/components/LoadingComponent.vue';
import MyMovieList from '../features/components/MyMovieList.vue';


const movieStore = useMovieStore();
const currentScreen = ref(1);

onMounted(() => {
  // Load initial movies for swiping
  if (currentScreen.value === 1 && !movieStore.currentMovieObj) {
    movieStore.loadPage();
  }
});

watch(currentScreen, (newScreen) => {
  //  Load movies when switching to swipe screen if not already loaded
  if (newScreen === 1 && !movieStore.currentMovieObj) {
    movieStore.loadPage();
  }
    if (newScreen === 2) {
    movieStore.getLikedMovies();
  }
}); 

const setCurrentScreen = (screenNumber) => {
  currentScreen.value = screenNumber;
};



</script>

<template>
  <Header @setMode="setCurrentScreen" />
  <main class="container">


    <p>{{ currentScreen === 1 ? 'Swipe Movies' : 'My Movie List' }}</p>

    <SwipableCard v-if="movieStore.currentMovieObj != null && currentScreen === 1" :movie="movieStore.currentMovieObj" :canReturn="movieStore.canReturn" @return="movieStore.return()" 
      @like="movieStore.like" @reject="movieStore.reject" />

    <Loading v-if="movieStore.loading" />

    <MyMovieList v-if="currentScreen === 2" />


  </main>

</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
