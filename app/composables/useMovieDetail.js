import { ref } from 'vue'
import { useApi } from './useApi'

export const useMovieDetail = () => {
  const api = useApi()
  const movie = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const loadMovie = async (id) => {
    if (!id) {
      error.value = 'ID de película no proporcionado'
      return
    }

    loading.value = true
    error.value = null
    movie.value = null

    try {
      const data = await api.getMovieById(id)
      
      if (data.Response === 'True') {
        movie.value = data
      } else {
        error.value = data.Error || 'Película no encontrada'
      }
    } catch (err) {
      error.value = 'Error cargando los detalles de la película'
      console.error('Error loading movie detail:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    movie,
    loading,
    error,
    loadMovie
  }
}
