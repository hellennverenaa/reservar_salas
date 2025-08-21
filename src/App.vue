
<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Camera } from 'lucide-vue-next';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/calendario">Calendário</RouterLink>
        
      </nav>
    </div>
    <div class="size-full">
    <HomePage 
      v-if="currentView === 'home'" 
      @bookingStart="() => setCurrentView('booking')" 
    />
    <BookingForm 
      v-if="currentView === 'booking'"
      :bookings="bookings"
      @back="() => setCurrentView('home')"
      @addBooking="addBooking"
    />
    <Toaster />
  </div>
  </header>

  <RouterView />
</template>

<style scoped>

header {
  width: 100%;
  background: linear-gradient(90deg, #161516 0%, #d9d7dc 100%);
  box-shadow: 0 20px 120px #0001;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
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
  color: #d7d4dc;
  background: rgba(255,255,255,0.08);
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
  background: #171617;
  color: #fafafa;
  font-weight: 700;
  box-shadow: 0 2px 8px #0001;
}
nav a:hover {
  background: #080809;
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
</style>

