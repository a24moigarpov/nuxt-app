import { ref } from 'vue'
import { useApi } from './useApi'

export const useSearch = () => {
  const api = useApi()
  const query = ref('')
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)

  const search = async () => {
    if (!query.value.trim()) {
      error.value = 'Por favor, introduce un término de búsqueda'
      return
    }

    loading.value = true
    error.value = null
    results.value = []

    try {
      const data = await api.searchMovies(query.value)
      if (data.Response === 'False') {
        error.value = data.Error || 'No se encontraron resultados'
      } else {
        results.value = data.Search || []
      }
    } catch (e) {
      error.value = 'Error cargando datos'
    } finally {
      loading.value = false
    }
  }

  return { query, results, loading, error, search }
}
