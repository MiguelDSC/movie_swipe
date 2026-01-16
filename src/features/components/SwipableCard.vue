<template>
  <MovieCard
    :movie="movie"
    :style="cardStyle"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <!-- Swipe feedback -->
    <div v-if="swipeDirection" class="badge" :class="swipeDirection">
      {{ swipeDirection === "like" ? "LIKE" : "NOPE" }}
    </div>
  </MovieCard>

  <button @click="emit('return')" class="return" :style="canReturnStyle">
    Return Previous
  </button>
</template>

<script setup>
import { computed, ref } from "vue";
import MovieCard from "./MovieCard.vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  canReturn: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["like", "reject", "return"]);

const startX = ref(0);
const currentX = ref(0);
const isDragging = ref(false);

const threshold = 120;
const maxDrag = 300;

const rawDeltaX = computed(() => currentX.value - startX.value);

const deltaX = computed(() => {
  return Math.max(-maxDrag, Math.min(rawDeltaX.value, maxDrag));
});

const swipeDirection = computed(() => {
  if (!isDragging.value) return null;
  if (deltaX.value > threshold) return "like";
  if (deltaX.value < -threshold) return "nope";
  return null;
});

// Restrict card drag, so it cant be moved too far offscreen
const cardStyle = computed(() => ({
  transform: `translateX(${deltaX.value}px) rotate(${deltaX.value * 0.05}deg)`,
  transition: isDragging.value ? "none" : "transform 0.3s ease",
  cursor: isDragging.value ? "grabbing" : "grab",
}));

const canReturnStyle = computed(() => ({
  opacity: props.canReturn ? 1 : 0.3,
  cursor: props.canReturn ? "pointer" : "not-allowed",
}));

const onPointerDown = (event) => {
  event.target.setPointerCapture(event.pointerId);

  startX.value = event.clientX;
  currentX.value = event.clientX;
  isDragging.value = true;
};

const onPointerMove = (event) => {
  if (!isDragging.value) return;
  currentX.value = event.clientX;
};

const onPointerUp = (event) => {
  if (!isDragging.value) return;

  if (deltaX.value > threshold) {
    emit("like", props.movie);
  } else if (deltaX.value < -threshold) {
    emit("reject", props.movie);
  }

  isDragging.value = false;
  startX.value = 0;
  currentX.value = 0;

  event.target.releasePointerCapture(event.pointerId);
};
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

.return {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
