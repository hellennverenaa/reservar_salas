<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { HomeIcon, CalendarIcon, CoffeeIcon } from 'lucide-vue-next';

</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Normal Nav -->
    <header class="
      w-full bg-gray-900 text-white shadow-lg z-50 fixed top-0 left-0 right-0 h-16 
      md:h-20 flex items-center justify-between px-4 md:px-8">

      <div class="flex items-center gap-3">
        <CalendarIcon class="w-6 h-6 text-red-500" />
        <span class="text-lg md:text-xl font-semibold">Sistema de Reservas</span>
      </div>

      <nav class="hidden md:block">
        <ul class="flex items-center gap-6">
          <li>
            <router-link to="/"
              class="flex items-center gap-2 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
              <HomeIcon class="w-5 h-5" />
              <span class="font-medium">Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/calendario"
              class="flex items-center gap-2 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
              <CalendarIcon class="w-5 h-5" />
              <span class="font-medium">Calendário</span>
            </router-link>
          </li>
          <li>
            <router-link to="/LiberarCoffee"
              class="flex items-center gap-2 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
              <CoffeeIcon class="w-5 h-5" />
              <span class="font-medium">Admin Coffee</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="hidden md:flex items-center gap-3">
        <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">U</div>
        <span class="text-sm font-semibold text-gray-300">Nome do Usuário</span>
      </div>
    </header>

    <main class="
      w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
      pt-20 pb-20 /* Padding para compensar o cabeçalho e o nav mobile */
      md:pt-24 md:pb-8 /* Padding para compensar apenas o cabeçalho no desktop */">

      <router-view />

    </main>

    <!-- bottom nav -->
    <nav class="
      fixed bottom-0 left-0 w-full h-16 bg-gray-900 text-white shadow-lg z-50
      md:hidden">
      <ul class="flex justify-around items-center h-full">
        <li>
          <router-link to="/"
            class="flex flex-col items-center justify-center w-full h-full p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <HomeIcon class="w-6 h-6" />
            <span class="text-xs font-medium">Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/calendario"
            class="flex flex-col items-center justify-center w-full h-full p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <CalendarIcon class="w-6 h-6" />
            <span class="text-xs font-medium">Calendário</span>
          </router-link>
        </li>
        <li>
          <router-link to="/liberarCoffee"
            class="flex flex-col items-center justify-center w-full h-full p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <CoffeeIcon class="w-6 h-6" />
            <span class="text-xs font-medium">Admin Coffee</span>
          </router-link>
        </li>
      </ul>
    </nav>
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
