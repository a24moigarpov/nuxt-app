import axios from "axios";

/**
 * Composable per gestionar les crides a l'API
 * Centralitza totes les crides API i permet afegir interceptors, tokens o headers personalitzats
 * @returns {Object} Mètodes get i post per fer crides a l'API
 */
export const useApi = () => {
  const config = useRuntimeConfig();
  
  /**
   * Realitza una petició GET a OMDB
   * @param {string} params - Paràmetres de la petició (s, i, etc.)
   * @returns {Promise} - La resposta de l'API
   */
  const getMovie = async (params) => {
    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          apikey: config.public.omdbApiKey,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  };

  /**
   * Cerca pel·lícules per títol
   * @param {string} query - El títol a buscar
   * @returns {Promise} - La resposta de l'API
   */
  const searchMovies = async (query) => {
    return await getMovie({ s: query });
  };

  /**
   * Obtenir una pel·lícula per ID
   * @param {string} id - El ID de la pel·lícula (ex: tt3896198)
   * @returns {Promise} - La resposta de l'API
   */
  const getMovieById = async (id) => {
    return await getMovie({ i: id });
  };

  /**
   * Realitza una petició POST a Gemini AI (via servidor)
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} body - El cos de la petició
   * @returns {Promise} - La resposta de l'API
   */
  const postGemini = async (endpoint, body) => {
    try {
      const response = await $fetch(endpoint, {
        method: 'POST',
        body: body
      });
      return response;
    } catch (error) {
      console.error('Error calling Gemini:', error);
      throw error;
    }
  };

  return { 
    getMovie,
    searchMovies, 
    getMovieById,
    postGemini
  };
};
