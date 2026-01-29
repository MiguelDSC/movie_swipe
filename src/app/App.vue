<script setup>
import { onMounted, ref, watch } from "vue";
import Header from "../features/components/TopHeader.vue";
import SwipableCard from "../features/components/SwipableCard.vue";
import { useMovieStore } from "../features/stores/useMovieStore";
import Loading from "../features/components/LoadingComponent.vue";
import MyMovieList from "../features/components/MyMovieList.vue";
import { SCREEN_MODES } from "../shared/constants";

const movieStore = useMovieStore();
const currentScreen = ref(SCREEN_MODES.SWIPE_MODE);

onMounted(() => {
  // Load initial movies for swiping
  if (
    currentScreen.value === SCREEN_MODES.SWIPE_MODE &&
    !movieStore.currentMovieObj
  ) {
    movieStore.loadPage();
  }
});

watch(currentScreen, (newScreen) => {
  //  Load movies when switching to swipe screen if not already loaded
  if (newScreen === SCREEN_MODES.SWIPE_MODE && !movieStore.currentMovieObj) {
    movieStore.loadPage();
  }
  if (newScreen === SCREEN_MODES.BROWSE_MODE) {
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
    <p>
      {{
        currentScreen === SCREEN_MODES.SWIPE_MODE
          ? "Swipe Movies"
          : "My Movie List"
      }}
    </p>

    <SwipableCard
      v-if="
        movieStore.currentMovieObj != null &&
        currentScreen === SCREEN_MODES.SWIPE_MODE
      "
      :movie="movieStore.currentMovieObj"
      :canReturn="movieStore.canReturn"
      @return="movieStore.return()"
      @like="movieStore.like"
      @reject="movieStore.reject"
    />

    <MyMovieList v-if="currentScreen === SCREEN_MODES.BROWSE_MODE" />

    <Loading v-if="movieStore.loading" />
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
