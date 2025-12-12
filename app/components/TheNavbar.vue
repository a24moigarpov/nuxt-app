<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <span class="brand-text">MOVIES SEARCH</span>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">
          Inicio
        </router-link>
        <router-link to="/search" class="nav-link" active-class="active">
          Buscar
        </router-link>
        <router-link to="/favorites" class="nav-link" active-class="active">
          Favoritos
          <ClientOnly>
            <span v-if="favoritesStore.favoritesCount > 0" class="badge">{{ favoritesStore.favoritesCount }}</span>
          </ClientOnly>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useFavoritesStore } from '../stores/favoritesStore.js'
const favoritesStore = useFavoritesStore()
</script>

<style scoped>
.navbar {
  background: #161b22;
  border-bottom: 1px solid #30363d;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.nav-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem 3rem; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-brand {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: #ffffff;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #8b949e;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link.active {
  color: #f9c74f;
  border-bottom: 2px solid #f9c74f;
}

.badge {
  background: #f9c74f;
  color: #0d1117;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>
