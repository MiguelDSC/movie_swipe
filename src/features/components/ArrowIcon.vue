<template>
  <svg
    class="arrow"
    :class="{ open }"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <!-- default is "down" chevron -->
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
});
</script>

<style scoped>
.arrow {
  width: 22px;
  height: 22px;
  display: block;

  /* down by default */
  transform: rotate(180deg);
  transition: transform 220ms ease;
  transform-origin: 50% 50%;
}

.arrow.open {
  /* flips to point up */
  transform: rotate(0deg);
}
</style>
