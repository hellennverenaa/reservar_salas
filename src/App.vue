
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/calendario">Calendário</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  background: linear-gradient(90deg, #42b983 0%, #369870 100%);
  box-shadow: 0 2px 12px #0001;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 10;
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
  color: #fff;
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
  background: #fff;
  color: #42b983;
  font-weight: 700;
  box-shadow: 0 2px 8px #0001;
}
nav a:hover {
  background: #369870;
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
