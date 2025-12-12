/**
 * Buscar películas por título
 * @param {string} query - El título a buscar
 * @returns {Promise} - La respuesta de la API
 */
export async function searchApi(query) {
  try {
    const response = await $fetch('/api/omdb/search', {
      params: { s: query }
    });
    return response;
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
    const response = await $fetch(`/api/omdb/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
}
