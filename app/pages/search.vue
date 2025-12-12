<template>
  <div class="search-container">
    <div class="search-header">
      <h1>Buscar Películas</h1>
      <p class="subtitle">Ingresa el título de una película</p>
    </div>
    
    <SearchBar v-model="query" :loading="loading" @search="search" />

    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="results?.length" class="results-container">
      <h2>Resultados ({{ results.length }})</h2>
      <div class="movie-grid">
        <ItemCard v-for="movie in results" :key="movie.imdbID" :item="movie">
          <template #actions="{ item }">
            <button 
              @click="store.addFavorite(item)"
              :disabled="store.isFavorite(item.imdbID)"
              class="favorite-btn"
            >
              {{ store.isFavorite(item.imdbID) ? '✓ En favoritos' : '♡ Añadir' }}
            </button>
          </template>
        </ItemCard>
      </div>
    </div>
    
    <div v-else-if="results?.length === 0" class="no-results">
      No se encontraron películas.
    </div>
  </div>
</template>

<script setup>
import { useSearch } from '../composables/useSearch'
import { useFavoritesStore } from '../stores/favoritesStore'

const { query, results, loading, error, search } = useSearch()
const store = useFavoritesStore()
</script>

<style scoped>
.search-container {
  max-width: 100%;
  margin: 0 auto;
}

.search-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.search-header h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  font-weight: 600;
}

.subtitle {
  color: #8b949e;
  font-size: 1rem;
  margin: 0;
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

.results-container h2 {
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.no-results {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
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
</style>
