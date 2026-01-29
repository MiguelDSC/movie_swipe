<template>
  <div
    class="movie-row"
    :class="{ expanded: isExpanded }"
    :style="style"
    @click="handleClick"
    ref="cardRef"
  >
    <div class="poster-container">
      <img class="poster" :src="posterUrl" :alt="movie.title" />
      <div v-if="isExpanded" class="play-icon">▶</div>
    </div>

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

      <p
        class="description"
        :class="{ expanded: isExpanded }"
        :title="movie.overview"
      >
        {{ movie.overview }}
      </p>

      <!-- <div v-if="isExpanded" class="extra-info">
        <div class="info-row" v-if="movie.release_date">
          <span class="label">Release Date:</span>
          <span class="value">{{ formattedReleaseDate }}</span>
        </div>
        <div class="info-row" v-if="movie.vote_count">
          <span class="label">Vote Count:</span>
          <span class="value">{{ movie.vote_count.toLocaleString() }}</span>
        </div>
        <div class="info-row" v-if="movie.popularity">
          <span class="label">Popularity:</span>
          <span class="value">{{ movie.popularity.toFixed(1) }}</span>
        </div>
      </div> -->
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
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
  isExpanded: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle"]);
const cardRef = ref(null);

const handleClick = (event) => {
  event.stopPropagation();
  emit("toggle");
};

const handleClickOutside = (event) => {
  if (
    props.isExpanded &&
    cardRef.value &&
    !cardRef.value.contains(event.target)
  ) {
    emit("toggle");
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

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

const formattedReleaseDate = computed(() => {
  if (!props.movie.release_date) return "—";
  const date = new Date(props.movie.release_date);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<style scoped>
/* Full-width, slim list row */
.movie-row {
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
