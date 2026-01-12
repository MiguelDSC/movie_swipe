<script setup>
import { onMounted, ref } from 'vue';
import Header from '../features/components/Header.vue'
import SwipableCard from '../features/components/SwipableCard.vue'
import { useMovieStore } from '../features/stores/useMovieStore';
import Loading from '../features/components/Loading.vue';
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
  <Header @setMode="setCurrentScreen" />
  <main class="container">


    <p>{{ currentScreen === 1 ? 'Swipe Movies' : 'My Movie List' }}</p>

    <SwipableCard v-if="movieStore.currentMovieObj != null && currentScreen === 1" :movie="movieStore.currentMovieObj"
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
