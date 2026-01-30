<template>
  <div class="movie-card"  :style="style">
    <img class="poster" :src="posterUrl" :class="infoClass" :alt="movie.title" />

    <div class="info">
      <h2 class="title">
        {{ movie.title }}
        <span class="year">({{ releaseYear }})</span>
      </h2>

      <div class="ratings">
        ⭐ {{ rating }}
        <span v-if="movie.rtScore">🍅 {{ movie.rtScore }}%</span>
        
      </div>

      <button
        class="toggle-info"
        type="button"
        :aria-expanded="showInfo"
        aria-label="Toggle details"
        @click="toggleInfo"
      >
        <ArrowIcon :open="showInfo" />
      </button>

      <p class="description">
        {{ movie.overview }}
      </p>

    </div>

  
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import placeholder from "../../assets/stock-img.jpg";
import ArrowIcon from "./ArrowIcon.vue";
import { baseUrl } from "../../shared/constants.js";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  style: {
    type: Object,
    default: () => ({}), // ensures always an object
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const showInfo = ref(false);


const toggleInfo = () => {
  console.log( "clockk");
  
  showInfo.value = !showInfo.value;
};


const infoClass = computed(() => (showInfo.value ? "expanded" : ""));



const posterUrl = computed(() =>
  props.movie.poster_path
    ? `${baseUrl}${props.movie.poster_path}`
    : placeholder,
);
const rating = computed(() =>
  typeof props.movie.vote_average === "number"
    ? props.movie.vote_average.toFixed(1)
    : "—",
);

const releaseYear = computed(() =>
  props.movie.release_date ? props.movie.release_date.split("-")[0] : "—",
);
</script>

<style scoped>
.list-style {
  width: 90%;
  max-width: 600px;
  height: 30px;
  flex-direction: row;
}

.card-style {
  width: 90%;
  max-width: 380px;
  height: min(90dvh, 500px);
  flex-direction: column;
}

.toggle-info {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius:  15px;
  background-color: gray;
  padding: 0;
  z-index: 10;
  pointer-events: auto;
  cursor: pointer;
}

.poster.expanded {
  max-height: 0%;
}

.movie-card {
  position: relative;
  display: flex;
  flex-direction: column;

  max-width: 380px;
  width: 90%;
  height: min(90dvh, 500px);
  /* use height in percentages */

  background: #111;
  border-radius: 16px;
  overflow: hidden;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  touch-action: pan-y;
  user-select: none;
  cursor: pointer;
}
/* ---------- Poster ---------- */
.poster {
  width: 100%;
  height: auto;
  max-height: 78%;
  object-fit: fill;
  background: #000;
  pointer-events: none;

  transition: max-height 0.35s ease;
}

/* .movie-card:hover .poster {
  max-height: 0%;
} */

/* ---------- Info section ---------- */
.info {
  flex: 1;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #fff;
  overflow: hidden;

  transition: padding 0.35s ease;
}

/* ---------- Title ---------- */
.title {
  font-size: clamp(1rem, 4vw, 1.2rem);
  font-weight: 600;
  line-height: 1.2;
}

.year {
  font-weight: normal;
  opacity: 0.7;
}

/* ---------- Ratings ---------- */
.ratings {
  font-size: clamp(0.85rem, 3vw, 0.95rem);
  opacity: 0.9;
  display: flex;
  gap: 10px;
}

/* ---------- Description ---------- */
.description {
  font-size: clamp(0.8rem, 3vw, 0.9rem);
  line-height: 1.4;
  opacity: 0.9;
  /* background-color:  red; */
  height: 100%;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  overflow-y: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox, Safari 18.2+, Chromium 121+ */
  text-overflow: ellipsis;
}

.description::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

/* ---------- Swipe badges ---------- */
.badge {
  position: absolute;
  top: 16px;
  padding: 6px 12px;

  border: 3px solid;
  font-size: 1.1rem;
  font-weight: bold;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.badge.like {
  left: 16px;
  color: #4ade80;
  border-color: #4ade80;
  transform: rotate(-10deg);
}

.badge.nope {
  right: 16px;
  color: #f87171;
  border-color: #f87171;
  transform: rotate(10deg);
}

/* ---------- Small screens ---------- */
@media (max-height: 600px) {
  .poster {
    max-height: 40%;
  }

  .description {
    -webkit-line-clamp: 2;
  }
}
</style>
