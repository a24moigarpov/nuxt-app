<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">Películas Populares del Momento</h1>
      <p class="hero-subtitle">Descubre las películas más buscadas y populares</p>
    </div>

    <div v-if="loading" class="loading">
      <p>Cargando películas populares...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="movies.length > 0" class="movies-section">
      <div class="movie-grid">
        <ItemCard 
          v-for="movie in movies" 
          :key="movie.imdbID" 
          :item="movie"
        >
          <template #actions="{ item }">
            <button 
              @click="handleAddToFavorites(item)"
              :disabled="store.isFavorite(item.imdbID)"
              class="favorite-btn"
            >
              {{ store.isFavorite(item.imdbID) ? '✓ En favoritos' : '♡ Añadir a favoritos' }}
            </button>
          </template>
        </ItemCard>
      </div>
    </div>

    <div class="cta">
      <router-link to="/search" class="btn-primary">
        Buscar más películas
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi'
import ItemCard from '../components/ItemCard.vue'
import { useFavoritesStore } from '../stores/favoritesStore.js'

const store = useFavoritesStore()
const api = useApi()
const movies = ref([])
const loading = ref(true)
const error = ref(null)

// Lista de películas populares para buscar
const popularSearches = ['Avengers', 'Batman', 'Star Wars', 'Matrix', 'Inception']

onMounted(async () => {
  try {
    // Buscar una película popular aleatoria
    const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)]
    
    const data = await api.searchMovies(randomSearch)

    if (data.Response === 'True') {
      movies.value = data.Search.slice(0, 6) // Mostrar solo 6 películas
    }
  } catch (err) {
    console.error('Error loading popular movies:', err)
    error.value = 'Error cargando películas populares'
  } finally {
    loading.value = false
  }
})

function handleAddToFavorites(movie) {
  store.addFavorite(movie)
}
</script>

<style scoped>
.home {
  max-width: 100%;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #8b949e;
  margin: 0;
  font-weight: 400;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: #8b949e;
  font-size: 1.1rem;
}

.error-message {
  background: #161b22;
  border: 1px solid #f85149;
  color: #f85149;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 2rem;
}

.movies-section {
  margin-bottom: 3rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.favorite-btn {
  width: 100%;
  padding: 0.65rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.favorite-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.favorite-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: #161b22;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #30363d;
  transition: border-color 0.2s ease;
}

.feature-card:hover {
  border-color: #f9c74f;
}

.feature-card h3 {
  color: #ffffff;
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.feature-card p {
  color: #8b949e;
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.cta {
  text-align: center;
}

.btn-primary {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: #f9c74f;
  color: #0d1117;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #ffd60a;
}
</style>
