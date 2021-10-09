<template>
    <div class="menu">
      <span>Valentin Cernuta</span>
      <img @click="toggleMenu" src="../../assets/images/hamburger.svg">
  </div>
</template>

<script setup>
const emit = defineEmits(['menu'])

const toggleMenu = () => {
  emit('menu')
}
</script>

<style scoped>
.menu {
    display: flex; 
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
    padding: 16px;
    background-color: var(--background);
}

img {
  cursor: pointer;
}
</style>