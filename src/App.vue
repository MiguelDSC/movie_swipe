<script setup>
import Header from './components/Header.vue'
import SwipableCard from './components/SwipableCard.vue'



const handleLike = (movie) => {
  console.log('Liked movie:', movie.title);
};

const handleReject = (movie) => {
  console.log('Rejected movie:', movie.title);
};



</script>

<template>
  <Header />
  <main class="container">
    




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
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin: 50px auto;
  background-color: green;

}



</style>
