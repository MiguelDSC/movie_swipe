<template>
  <MovieCard :movie="movie" :style="cardStyle" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp"
    @pointercancel="onPointerUp">

    <!-- Swipe feedback -->
    <div v-if="swipeDirection" class="badge" :class="swipeDirection">
      {{ swipeDirection === 'like' ? 'LIKE' : 'NOPE' }}
    </div>
  </MovieCard>
  
</template>

<script setup>
import { computed, ref } from 'vue'
import MovieCard  from './MovieCard.vue'


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


</script>

<style scoped>
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
