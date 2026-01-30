<template>
  <div
    class="movie-row"
    :class="{ expanded: isExpanded }"
    :style="style"
    @click="handleClick"
    ref="cardRef"
  >
    <div class="poster-container" @click.stop="handleTrailerClick">
      <img class="poster" :src="posterUrl" :alt="movie.title" />
      <div v-if="isExpanded" class="play-icon" @click.stop="handleTrailerClick">
        ▶
      </div>
    </div>

    <div class="content">
      <div class="top">
        <h2 class="title" :title="movie.title">
          {{ movie.title }}
          <span class="year">({{ releaseYear }})</span>
        </h2>

        <div v-if="isExpanded" class="top-right">
          <div class="action-icons">
            <button
              class="icon-button"
              @click.stop="openStremio(movie)"
              title="open in Stremio"
            >
              <img :src="stremioIcon" alt="Stremio" width="16" height="16" />
            </button>
            <button
              class="icon-button"
              @click.stop="openImdb(movie)"
              title="open in IMDb"
            >
              <img :src="imdbIcon" alt="IMDb" width="25" height="16" />
            </button>
            <div class="ratings">
              <span class="rating">⭐ {{ rating }}</span>
              <span v-if="movie.rtScore" class="rt">
                🍅 {{ movie.rtScore }}%
              </span>
            </div>
          </div>
        </div>

        <div v-if="!isExpanded" class="ratings">
          <span class="rating">⭐ {{ rating }}</span>
          <span v-if="movie.rtScore" class="rt">🍅 {{ movie.rtScore }}%</span>
        </div>
      </div>

      <p
        class="description"
        :class="{ expanded: isExpanded }"
        :title="movie.overview"
      >
        {{ movie.overview }}
      </p>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import { stremioBaseUrl, imdbBaseUrl } from "../../shared/constants.js";
import { computed, ref } from "vue";
import placeholder from "../../assets/stock-img.jpg";
import stremioIcon from "../../assets/stremio.png";
import imdbIcon from "../../assets/imdb.png";
import { baseUrl } from "../../shared/constants.js";
import { useMovieTrailer } from "../composables/useMovieTrailer.js";

const { openTrailer } = useMovieTrailer();

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  style: {
    type: Object,
    default: () => ({}),
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
});

const handleTrailerClick = async (event) => {
  event.stopPropagation();
  await openTrailer(props.movie.id);
};

const openStremio = (movie) => {
  const stremioUrl = `${stremioBaseUrl}${movie.imdb_id}`;
  window.open(stremioUrl, "_blank");
};

const openImdb = (movie) => {
  if (!movie.imdb_id) {
    console.warn("IMDb ID not available for this movie.");
    return;
  }
  const imdbUrl = `${imdbBaseUrl}${movie.imdb_id}/`;
  window.open(imdbUrl, "_blank");
};

const emit = defineEmits(["toggle"]);
const cardRef = ref(null);

const handleClick = (event) => {
  event.stopPropagation();
  emit("toggle");
};

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
/* Full-width, slim list row */
.movie-row {
  position: relative;
  width: 90%;
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

  transition:
    height 0.3s ease,
    max-height 0.3s ease,
    background 0.2s ease;
}

.movie-row.expanded {
  height: auto;
  max-height: 400px;
  align-items: flex-start;
  padding: 12px;
  background: #1a1a1a;
}

.movie-row:hover {
  background: #222;
}

.movie-row.expanded:hover {
  background: #1a1a1a;
}

/* Poster becomes a small square/thumbnail */
.poster-container {
  position: relative;
  height: 100%;
  width: 38px;
  flex: 0 0 auto;
  transition:
    width 0.3s ease,
    height 0.3s ease;
}

.movie-row.expanded .poster-container {
  width: 80px;
  height: 120px;
}

.poster {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  background: #000;
  pointer-events: none;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  padding-left: 3px;
  backdrop-filter: blur(4px);
  animation: fadeInDelayed 0.1s ease 0.1s both;
  pointer-events: none;
}

@keyframes fadeInDelayed {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.movie-row.expanded .poster {
  width: 80px;
  height: 120px;
  align-self: flex-start;
}

/* Content takes remaining space */
.content {
  min-width: 0; /* IMPORTANT for ellipsis to work in flex */
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

.top-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
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
  width: 92%;
  color: #fff;
  opacity: 0.85;
  font-size: clamp(0.7rem, 2.2vw, 0.85rem);
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
}

.description.expanded {
  white-space: normal;
  line-height: 1.4;
  margin-top: 8px;
  max-height: 80px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #666 #222;
}

.description.expanded::-webkit-scrollbar {
  width: 6px;
}

.description.expanded::-webkit-scrollbar-track {
  background: #222;
  border-radius: 3px;
}

.description.expanded::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 3px;
}

.description.expanded::-webkit-scrollbar-thumb:hover {
  background: #888;
}

.extra-info {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-row {
  display: flex;
  gap: 8px;
  font-size: clamp(0.7rem, 2.2vw, 0.8rem);
}

.info-row .label {
  color: #aaa;
  font-weight: 600;
}

.info-row .value {
  color: #fff;
}

.action-icons {
  display: flex;
  gap: 8px;
  animation: fadeIn 0.3s ease;
  flex: 0 0 auto;
}

.icon-button {
  background: #222;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
}

.icon-button:hover {
  background: #333;
  border-color: #666;
  transform: scale(1.05);
}

.icon-button:active {
  transform: scale(0.95);
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
