<template>
  <div
    class="movie-card"
    :style="cardStyle"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <img
      class="poster"
      :src="posterUrl"
      :alt="movie.title"
      draggable="false"
    />

    <div class="info">
      <h2 class="title">
        {{ movie.title }}
        <span class="year">({{ releaseYear }})</span>
      </h2>

      <div class="ratings">
        ⭐ {{ movie.vote_average.toFixed(1) }}
        <span v-if="movie.rtScore">🍅 {{ movie.rtScore }}%</span>
      </div>

      <p class="description">
        {{ movie.overview }}
      </p>
    </div>

    <!-- Swipe feedback -->
    <div v-if="swipeDirection" class="badge" :class="swipeDirection">
      {{ swipeDirection === 'like' ? 'LIKE' : 'NOPE' }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import placeholder from '../../assets/cover.jpg'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'reject'])

const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)

const threshold = 120

const deltaX = computed(() => currentX.value - startX.value)

const swipeDirection = computed(() => {
  if (!isDragging.value) return null
  if (deltaX.value > threshold) return 'like'
  if (deltaX.value < -threshold) return 'nope'
  return null
})

const cardStyle = computed(() => ({
  transform: `translateX(${deltaX.value}px) rotate(${deltaX.value * 0.05}deg)`,
  transition: isDragging.value ? 'none' : 'transform 0.3s ease'
}))

function onPointerDown(e) {
  startX.value = e.clientX
  currentX.value = e.clientX
  isDragging.value = true
}

function onPointerMove(e) {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

function onPointerUp() {
  if (!isDragging.value) return

  if (deltaX.value > threshold) {
    emit('like', props.movie)
  } else if (deltaX.value < -threshold) {
    emit('reject', props.movie)
  }

  isDragging.value = false
  startX.value = 0
  currentX.value = 0
}

const posterUrl = computed(() =>
    //   props.movie.poster_path
    //     ? `../assets/${props.movie.poster_path}`
    //     : '/placeholder.png'

       placeholder
)

const releaseYear = computed(() =>
  props.movie.release_date
    ? props.movie.release_date.split('-')[0]
    : '—'
)
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 80%;
  max-width: 380px;
  height: 500px;
  background: #111;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  touch-action: pan-y;
  user-select: none;
}

.poster {
  width: 100%;
  height: 65%;
  object-fit: cover;
}

.info {
  padding: 16px;
  color: #fff;
}

.title {
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.year {
  font-weight: normal;
  opacity: 0.7;
}

.ratings {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.description {
  font-size: 0.85rem;
  line-height: 1.4;
  opacity: 0.9;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.badge {
  position: absolute;
  top: 20px;
  padding: 8px 14px;
  border: 3px solid;
  font-size: 1.2rem;
  font-weight: bold;
  transform: rotate(-10deg);
}

.badge.like {
  left: 20px;
  color: #4ade80;
  border-color: #4ade80;
}

.badge.nope {
  right: 20px;
  color: #f87171;
  border-color: #f87171;
  transform: rotate(10deg);
}
</style>
