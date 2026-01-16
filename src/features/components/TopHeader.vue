<template>
  <header class="app-header">
    <div class="left">
      🎬
      <h1>{{ title }}</h1>
    </div>

    <nav class="nav">
      <button
        class="nav-btn"
        @click="$emit('setMode', 1)"
        aria-label="Swipe movies"
      >
        <span class="icon">⬅️👆🏼</span>
        <span class="label">{{ swipeMoviesBtn }}</span>
      </button>

      <button class="nav-btn" @click="$emit('setMode', 2)" aria-label="My list">
        <span class="icon">⭐</span>
        <span class="label">{{ myListBtn }}</span>
      </button>
    </nav>
  </header>
</template>

<script setup>
defineEmits(["setMode"]);

const title = "Movie Swipe";
const myListBtn = "My List";
const swipeMoviesBtn = "Swipe Movies";
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px;
  background: #111;
  color: #fff;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* ---------- Title ---------- */
.left {
  display: flex;
  align-items: center;
  gap: 8px;
}

h1 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* ---------- Navigation ---------- */
.nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px 12px;
  border-radius: 999px;
  border: none;

  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 0.9rem;

  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}

.nav-btn:active {
  transform: translateY(0);
}

.icon {
  font-size: 1rem;
}

/* ---------- Mobile friendly ---------- */
@media (max-width: 480px) {
  .label {
    display: none;
  }

  .nav-btn {
    padding: 8px;
  }
}
</style>
