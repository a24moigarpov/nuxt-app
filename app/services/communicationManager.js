import axios from 'axios';

/**
 * Buscar películas por título
 * @param {string} query - El título a buscar
 * @returns {Promise} - La respuesta de la API
 */
export async function searchApi(query) {
  try {
    const config = useRuntimeConfig();
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: config.public.omdbApiKey,
        s: query
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching API:', error);
    throw error;
  }
}

/**
 * Obtener una película por ID
 * @param {string} id - El ID de la película (ej: tt3896198)
 * @returns {Promise} - La respuesta de la API
 */
export async function getItemById(id) {
  try {
    const config = useRuntimeConfig();
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: config.public.omdbApiKey,
        i: id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
}
