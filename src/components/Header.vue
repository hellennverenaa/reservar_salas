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
        <!-- Usuário desktop -->
        <div class="hidden md:flex items-center" data-user-menu>
          <!-- Não autenticado -->
          <button
            v-if="!isLoggedIn"
            @click="handleLoginClick"
            class="flex items-center gap-2 bg-transparent border border-gray-600 hover:border-indigo-500 hover:text-indigo-400 text-gray-400 rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-200"
          >
            <LogIn class="w-4 h-4" />
            Entrar
          </button>

          <!-- Autenticado -->
          <div v-else class="relative flex items-center gap-2 cursor-pointer" @click="toggleDropdown">
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase select-none">
              {{ userInitial }}
            </div>
            <span class="text-sm font-medium text-gray-300">{{ userName }}</span>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="dropdownOpen"
                class="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-1 min-w-[160px] z-50"
              >
                <button
                  @click="logout"
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg cursor-pointer transition-colors"
                >
                  <LogOut class="w-4 h-4" />
                  Sair
                </button>
              </div>
            </Transition>
          </div>
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

          <!-- Usuário mobile -->
          <div class="border-t border-white/10 mt-1 pt-1">
            <button
              v-if="!isLoggedIn"
              @click="handleLoginClick; menuOpen = false"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              <LogIn class="w-5 h-5" />
              Entrar
            </button>

            <button
              v-else
              @click="logout; menuOpen = false"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              <div class="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase">
                {{ userInitial }}
              </div>
              <span class="flex-1 text-left">{{ userName }}</span>
              <LogOut class="w-4 h-4 ml-auto" />
            </button>
          </div>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { HomeIcon, CalendarIcon, CoffeeIcon, MenuIcon, XIcon, LogIn, LogOut } from 'lucide-vue-next'

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['login-click'])

const menuOpen = ref(false)

// Estado de autenticação (placeholder)
const isLoggedIn = ref(false)
const userName = ref('Hendrius')
const userInitial = computed(() => userName.value?.charAt(0)?.toUpperCase() || '?')

const dropdownOpen = ref(false)

const toggleDropdown = () => { dropdownOpen.value = !dropdownOpen.value }

const logout = () => {
  isLoggedIn.value = false
  dropdownOpen.value = false
}

const handleLoginClick = () => { emit('login-click') }

const closeDropdownOnOutsideClick = (e) => {
  if (!e.target.closest('[data-user-menu]')) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeDropdownOnOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', closeDropdownOnOutsideClick))

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/reserva-sala', label: 'Nova Reserva', icon: CalendarIcon },
  { to: '/calendario', label: 'Calendário', icon: CalendarIcon },
  { to: '/LiberarCoffee', label: 'Admin Coffee', icon: CoffeeIcon },
]
</script>
