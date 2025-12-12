import { ref } from 'vue'
import { useApi } from './useApi'

export const usePopularMovies = () => {
  const api = useApi()
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)

  const popularSearches = ['Avengers', 'Batman', 'Star Wars', 'Matrix', 'Inception']

  const loadPopularMovies = async (limit = 6) => {
    loading.value = true
    error.value = null
    
    try {
      const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)]
      const data = await api.searchMovies(randomSearch)
      
      if (data.Response === 'True' && data.Search) {
        movies.value = data.Search.slice(0, limit)
      } else {
        movies.value = []
        error.value = data.Error || 'No se encontraron películas'
      }
    } catch (err) {
      error.value = 'Error cargando películas populares'
      movies.value = []
      console.error('Error loading popular movies:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    movies,
    loading,
    error,
    loadPopularMovies
  }
}
