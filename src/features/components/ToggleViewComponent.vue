<template>
    <div class="toggle-section">
        <button :style="viewMode === view_modes.CardView ? activeFilterStyle : {}" @click="setView(view_modes.CardView)">card view</button>
        <button :style="viewMode === view_modes.ListView ? activeFilterStyle : {}" @click="setView(view_modes.ListView)">list view</button>
    </div>
</template>

<script setup>
import { view_modes } from '../../shared/constants';

const emit = defineEmits(['viewMode']);


const setView = (view) => {
    emit('viewMode', view);
};

const activeFilterStyle = {
    backgroundColor: 'white',
    color: 'black',
};


</script>

<style scoped>

.toggle-section {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 16px;
}

button {
    padding: 8px 16px;
    border: none;
    background-color: black;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: white;
    color: black;
}


</style>