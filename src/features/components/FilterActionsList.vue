<template>
  <section class="filter-actions-list">
    <button
      @click="setActiveFilter(filter)"
      :style="
        filterStore.getActiveFilterName === filter.name ? activeFilterStyle : {}
      "
      class="filter-btn"
      v-for="filter in filterList"
      :key="filter.id"
    >
      {{ filter.name }}
    </button>
  </section>
</template>

<script setup>
import { useFilterStore } from "../stores/useFilterStore";

const filterStore = useFilterStore();
const filterList = filterStore.filters;

const setActiveFilter = (filter) => {
  filterStore.setActiveFilter(filter);
};

const activeFilterStyle = {
  backgroundColor: "white",
  color: "black",
};
</script>

<style scoped>
.filter-btn {
  padding: 5px 10px;
  font-size: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filter-actions-list {
  display: flex;
  gap: 10px;
  padding-bottom: 20px;
  overflow-x: auto;
}
</style>
