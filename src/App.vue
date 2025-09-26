<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';

const breakPoint = 768; // ponto de interrupção para mobile
const windowSize = ref(window.innerWidth)
const isMobile = ref(window.innerWidth < breakPoint)

onMounted(() => {
  window.addEventListener('resize', () => {
    windowSize.value = window.innerWidth
    isMobile.value = windowSize.value < breakPoint
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    windowSize.value = window.innerWidth
    isMobile.value = windowSize.value < breakPoint
  })
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <Header :isMobile="isMobile" />

    <main class="
      w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
      md:pt-24 md:pb-8"
      :class="isMobile ? 'pb-20' : 'pt-20'"
      >

      <router-view />

    </main>
  </div>
</template>

<style scoped>
header {
  width: 100%;
  background: linear-gradient(90deg, #141415 0%, #afacb5 100%);
  box-shadow: 0 2px 14px rgba(233, 229, 229, 0.067);
  padding: 1;
  position: 10px;
  top: 0;
  z-index: 4;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 1.2rem 0;
}

nav a {
  color: #e5e5ea;
  background: rgba(16, 16, 16, 0.08);
  padding: 0.6rem 1.3rem;
  border-radius: 24px;
  font-size: 1.08rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  border: none;
}

nav a.router-link-exact-active,
nav a.router-link-active {
  background: #151416;
  color: #fafafa;
  font-weight: 700;
  box-shadow: 0 2px 8px #0001;
}

nav a:hover {
  background: #191819;
  color: #fff;
}

@media (max-width: 600px) {
  .wrapper {
    padding: 0.5rem 0.5rem;
  }

  nav {
    gap: 0.5rem;
    padding: 0.7rem 0;
  }

  nav a {
    font-size: 0.98rem;
    padding: 0.5rem 0.7rem;
  }
}

/* Estilo para o link ativo no desktop */
.md .router-link-exact-active {
  color: #ef4444;
  /* red-500 */
  background-color: #374151;
  /* gray-700 */
}

/* Estilo para o link ativo no mobile */
.router-link-exact-active {
  color: #ef4444;
  /* red-500 */
  background-color: #1F2937;
  /* gray-800 */
}
</style>
