import { ref } from "vue";
import { useApi } from "./useApi";

/**
 * Composable per gestionar la cerca de pel·lícules amb OMDB
 * Encapsula la lògica de cerca amb estat reactiu
 * @returns {Object} Estat reactiu i funció de cerca
 */
export const useSearch = () => {
  const api = useApi();

  // Estat reactiu
  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);

  /**
   * Realitza una cerca utilitzant l'API d'OMDB
   */
  const search = async () => {
    if (!query.value.trim()) {
      error.value = "Por favor, introduce un término de búsqueda.";
      return;
    }

    loading.value = true;
    error.value = null;
    results.value = [];

    try {
      const data = await api.searchMovies(query.value);

      if (data.Response === 'False') {
        error.value = data.Error || 'No se encontraron resultados.';
        results.value = [];
      } else {
        results.value = data.Search || [];
      }
    } catch (e) {
      console.error("Error en la cerca:", e);
      error.value = "Error cargando datos. Por favor, inténtalo de nuevo.";
      results.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { query, results, loading, error, search };
};
