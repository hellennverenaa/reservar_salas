<template>
  <div class="relative z-50">
    <!-- Header unificado -->
    <header class="sticky top-0 z-50 w-full h-14 md:h-16 flex items-center justify-between px-4 md:px-8
      bg-gray-900/80 backdrop-blur-md border-b border-white/10 shadow-sm">

      <!-- Logo -->
      <div class="flex items-center gap-2">
        <CalendarIcon class="w-5 h-5 text-red-400" />
        <span class="text-base font-semibold text-white tracking-tight">Sistema de Reservas</span>
      </div>

      <!-- Nav desktop -->
      <nav class="hidden md:flex items-center gap-1">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
          active-class="!text-white !bg-white/10"
        >
          <component :is="item.icon" class="w-4 h-4" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- Direita: usuário (desktop) + hambúrguer (mobile) -->
      <div class="flex items-center gap-3">
        <div class="hidden md:flex items-center gap-2">
          <div class="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-300">
            U
          </div>
          <span class="text-sm font-medium text-gray-400">Usuário</span>
        </div>

        <button
          v-if="isMobile"
          @click="menuOpen = !menuOpen"
          class="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
          aria-label="Abrir menu"
        >
          <XIcon v-if="menuOpen" class="w-5 h-5" />
          <MenuIcon v-else class="w-5 h-5" />
        </button>
      </div>
    </header>

    <!-- Menu mobile dropdown -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobile && menuOpen"
        class="fixed top-14 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-white/10 shadow-lg"
      >
        <nav class="flex flex-col p-3 gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            @click="menuOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            active-class="!text-white !bg-white/10"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.label }}</span>
          </router-link>
        </nav>
      </div>
    </Transition>

    <!-- Backdrop do menu mobile -->
    <div
      v-if="isMobile && menuOpen"
      @click="menuOpen = false"
      class="fixed inset-0 z-30"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { HomeIcon, CalendarIcon, CoffeeIcon, MenuIcon, XIcon } from 'lucide-vue-next'

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true
  }
})

const menuOpen = ref(false)

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/reserva-sala', label: 'Nova Reserva', icon: CalendarIcon },
  { to: '/calendario', label: 'Calendário', icon: CalendarIcon },
  { to: '/LiberarCoffee', label: 'Admin Coffee', icon: CoffeeIcon },
]
</script>
