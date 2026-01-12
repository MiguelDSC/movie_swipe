<template>
    <img class="loading" :src="loadingGif" alt="Loading..."/>

</template>

<script setup>

import loadingGif from '../../assets/loading.gif';
</script>

<style scoped>

.loading {
    width: 100px;
    height: 100px;
    margin-top: 50px;
}

</style>