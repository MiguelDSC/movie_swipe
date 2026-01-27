<template>
  <div class="movie-row" :style="style">
    <img class="poster" :src="posterUrl" :alt="movie.title" />

    <div class="content">
      <div class="top">
        <h2 class="title" :title="movie.title">
          {{ movie.title }}
          <span class="year">({{ releaseYear }})</span>
        </h2>

        <div class="ratings">
          <span class="rating">⭐ {{ rating }}</span>
          <span v-if="movie.rtScore" class="rt">🍅 {{ movie.rtScore }}%</span>
        </div>
      </div>

      <p class="description" :title="movie.overview">
        {{ movie.overview }}
      </p>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";
import placeholder from "../../assets/stock-img.jpg";
import { baseUrl } from "../../shared/constants.js";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});

const posterUrl = computed(() =>
  props.movie.poster_path ? `${baseUrl}${props.movie.poster_path}` : placeholder
);

const rating = computed(() =>
  typeof props.movie.vote_average === "number"
    ? props.movie.vote_average.toFixed(1)
    : "—"
);

const releaseYear = computed(() =>
  props.movie.release_date ? props.movie.release_date.split("-")[0] : "—"
);
</script>

<style scoped>
/* Full-width, slim list row */
.movie-row {
  width: 100%;
  max-width: 100%;

  height: 50px;
  max-height: 50px;

  display: flex;
  align-items: center;
  gap: 10px;

  background: #111;
  border-radius: 12px;
  overflow: hidden;

  padding: 6px 10px;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);

  user-select: none;
  cursor: pointer;
}

/* Poster becomes a small square/thumbnail */
.poster {
  height: 100%;
  width: 38px;              /* fixed thumb width */
  border-radius: 8px;
  object-fit: cover;
  flex: 0 0 auto;
  background: #000;
  pointer-events: none;
}

/* Content takes remaining space */
.content {
  min-width: 0;             /* IMPORTANT for ellipsis to work in flex */
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

/* First line: title (left) + ratings (right) */
.top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.title {
  min-width: 0;
  margin: 0;

  font-size: clamp(0.85rem, 2.6vw, 1rem);
  font-weight: 650;
  color: #fff;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.year {
  font-weight: 400;
  opacity: 0.7;
  margin-left: 6px;
}

.ratings {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: clamp(0.72rem, 2.2vw, 0.85rem);
  color: #fff;
  opacity: 0.9;
  white-space: nowrap;
}

.description {
  margin: 0;
  color: #fff;
  opacity: 0.85;

  font-size: clamp(0.7rem, 2.2vw, 0.85rem);
  line-height: 1.1;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Very small screens: shrink thumb + tighten spacing */
@media (max-width: 420px) {
  .movie-row {
    height: 44px;
    max-height: 44px;
    padding: 6px 8px;
    gap: 8px;
  }

  .poster {
    width: 32px;
  }

  .ratings {
    gap: 6px;
  }
}
</style>
