<template>
  <div class="detail-container">
    <div v-if="loading" class="loading">
      <p>Cargando...</p>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="movie" class="movie-detail">
      <div class="movie-poster-section">
        <img 
          :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Poster'" 
          :alt="movie.Title"
          class="movie-poster"
        />
      </div>
      
      <div class="movie-info-section">
        <h1 class="movie-title">{{ movie.Title }}</h1>
        
        <div class="movie-meta">
          <span class="meta-item">{{ movie.Year }}</span>
          <span class="meta-item">{{ movie.Runtime }}</span>
          <span class="meta-item" v-if="movie.imdbRating">IMDb: {{ movie.imdbRating }}/10</span>
        </div>

        <div class="movie-genre">
          <span v-for="genre in movie.Genre?.split(', ')" :key="genre" class="genre-tag">
            {{ genre }}
          </span>
        </div>

        <div class="movie-plot">
          <h3>Sinopsis</h3>
          <p>{{ movie.Plot }}</p>
        </div>

        <div class="movie-details">
          <div class="detail-item">
            <strong>Director</strong>
            <span>{{ movie.Director }}</span>
          </div>
          <div class="detail-item">
            <strong>Actores</strong>
            <span>{{ movie.Actors }}</span>
          </div>
          <div class="detail-item" v-if="movie.Writer">
            <strong>Escritor</strong>
            <span>{{ movie.Writer }}</span>
          </div>
          <div class="detail-item" v-if="movie.Awards && movie.Awards !== 'N/A'">
            <strong>Premios</strong>
            <span>{{ movie.Awards }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <router-link to="/search" class="btn-back">Volver</router-link>
          <button 
            @click="generateSummary(movie)" 
            :disabled="summaryLoading"
            class="btn-summary"
          >
            {{ summaryLoading ? 'Generando...' : 'Resumen IA' }}
          </button>
          <a :href="`https://www.imdb.com/title/${movie.imdbID}`" target="_blank" class="btn-imdb">
            Ver en IMDb
          </a>
        </div>

        <div v-if="aiSummary" class="ai-summary">
          <div class="summary-header">
            <h3>Análisis generado por IA</h3>
            <button @click="clearSummary" class="btn-close">✕</button>
          </div>
          <p class="summary-text">{{ aiSummary }}</p>
        </div>

        <div v-if="summaryError" class="error-message">
          {{ summaryError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieDetail } from '../../composables/useMovieDetail'
import { useGeminiSummary } from '../../composables/useGeminiSummary'

const route = useRoute()
const { movie, loading, error, loadMovie } = useMovieDetail()
const { summary: aiSummary, loading: summaryLoading, error: summaryError, generateSummary, clearSummary } = useGeminiSummary()

onMounted(() => {
  loadMovie(route.params.id)
})
</script>

<style scoped>
.detail-container {
  max-width: 100%;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: #8b949e;
}

.movie-detail {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 2rem;
}

.movie-poster-section {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.movie-poster {
  width: 100%;
  border-radius: 6px;
  background: #0d1117;
}

.movie-info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.movie-title {
  font-size: 2rem;
  margin: 0;
  color: #ffffff;
  font-weight: 600;
  line-height: 1.3;
}

.movie-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  background: #0d1117;
  border: 1px solid #30363d;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  color: #8b949e;
  font-size: 0.875rem;
}

.movie-genre {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.genre-tag {
  background: #238636;
  color: #ffffff;
  padding: 0.4rem 0.875rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
}

.movie-plot {
  background: #0d1117;
  border: 1px solid #30363d;
  padding: 1.25rem;
  border-radius: 6px;
}

.movie-plot h3 {
  margin: 0 0 0.75rem 0;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
}

.movie-plot p {
  margin: 0;
  color: #8b949e;
  line-height: 1.6;
  font-size: 0.95rem;
}

.movie-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  padding: 0.875rem;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
}

.detail-item strong {
  color: #f9c74f;
  font-size: 0.875rem;
  font-weight: 600;
}

.detail-item span {
  color: #c9d1d9;
  line-height: 1.5;
  font-size: 0.875rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.btn-back,
.btn-imdb,
.btn-summary {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
}

.btn-back {
  background: #21262d;
  border: 1px solid #30363d;
  color: #c9d1d9;
}

.btn-back:hover {
  background: #30363d;
}

.btn-summary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-summary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-summary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-imdb {
  background: #f9c74f;
  color: #0d1117;
}

.btn-imdb:hover {
  background: #ffd60a;
}

.ai-summary {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 2px solid #667eea;
  padding: 1.5rem;
  border-radius: 6px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.summary-header h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
}

.btn-close {
  background: transparent;
  border: none;
  color: #8b949e;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.summary-text {
  margin: 0;
  color: #c9d1d9;
  line-height: 1.7;
  font-size: 0.95rem;
  white-space: pre-wrap;
}

.error-message {
  background: #161b22;
  border: 1px solid #f85149;
  color: #f85149;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
}

@media (max-width: 1024px) {
  .movie-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .movie-poster-section {
    position: static;
    max-width: 350px;
    margin: 0 auto;
  }
}
</style>
