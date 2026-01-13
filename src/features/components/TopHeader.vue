<template>
  <header>
    <h1>{{ title }}</h1>
    <button @click="$emit('setMode', 2)">{{ myListBtn }}</button>
    <button @click="$emit('setMode', 1)">{{ swipeMoviesBtn }}</button>
  </header>
</template>

<script setup>


defineEmits(['setMode']);


const title = "Movie Swipe";
const myListBtn = "My List";
const swipeMoviesBtn = "Swipe Movies";


</script>


<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}
</style>