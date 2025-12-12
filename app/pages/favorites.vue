<template>
  <div class="favorites-container">
    <div class="favorites-header">
      <h1>Mis Favoritos</h1>
      <div v-if="store.favoritesCount" class="counter">
        {{ store.favoritesCount }} {{ store.favoritesCount === 1 ? 'película' : 'películas' }}
      </div>
    </div>
    
    <div v-if="!store.favorites.length" class="no-favorites">
      <div class="empty-state">
        <h2>Aún no tienes favoritos</h2>
        <p>Empieza a construir tu colección</p>
        <router-link to="/search" class="search-link">
          Buscar películas
        </router-link>
      </div>
    </div>
    
    <div v-else class="favorites-grid">
      <ItemCard v-for="movie in store.favorites" :key="movie.imdbID" :item="movie">
        <template #actions="{ item }">
          <button @click="store.removeFavorite(item.imdbID)" class="remove-btn">
            ✕ Quitar
          </button>
        </template>
      </ItemCard>
    </div>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '../stores/favoritesStore'

const store = useFavoritesStore()
</script>

<style scoped>
.favorites-container {
  max-width: 100%;
  margin: 0 auto;
}

.favorites-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.favorites-header h1 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-weight: 600;
}

.counter {
  display: inline-block;
  background: #161b22;
  border: 1px solid #30363d;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  color: #8b949e;
  font-weight: 600;
  font-size: 0.95rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

.remove-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #da3633 0%, #f85149 100%);
  color: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(248, 81, 73, 0.4);
}

.no-favorites {
  background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
  border: 2px dashed #30363d;
  border-radius: 12px;
  padding: 0;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h2 {
  color: #ffffff;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.empty-state p {
  color: #8b949e;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.search-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #f9c74f 0%, #ffd60a 100%);
  color: #0d1117;
  text-decoration: none;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(249, 199, 79, 0.3);
}

.search-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 199, 79, 0.5);
}

.search-link span {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .favorites-header h1 {
    font-size: 2rem;
  }
  
  .icon {
    font-size: 2rem;
  }
  
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
}
</style>