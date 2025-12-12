import { ref } from "vue";

/**
 * Composable per generar resums de pel·lícules amb Gemini AI
 * @returns {Object} Estat reactiu i funció per generar resums
 */
export const useGeminiSummary = () => {
  const summary = ref("");
  const loading = ref(false);
  const error = ref(null);

  /**
   * Genera un resum intel·ligent d'una pel·lícula utilitzant Gemini
   * @param {Object} movie - Objecte amb la informació de la pel·lícula
   */
  const generateSummary = async (movie) => {
    loading.value = true;
    error.value = null;
    summary.value = "";

    try {
      const prompt = `Genera un resum interessant i detallat sobre la pel·lícula "${movie.Title}" (${movie.Year}).
      
      Informació disponible:
      - Director: ${movie.Director || 'Desconocido'}
      - Actores: ${movie.Actors || 'Desconocidos'}
      - Género: ${movie.Genre || 'Desconocido'}
      - Sinopsis: ${movie.Plot || 'No disponible'}
      - Puntuación IMDb: ${movie.imdbRating || 'N/A'}
      
      El resum ha d'incloure:
      1. Una breu introducció sobre la pel·lícula i el seu impacte
      2. Anàlisi dels elements més destacables (direcció, actuacions, temàtiques)
      3. Context cultural o històric si és rellevant
      4. Per què val la pena veure-la
      
      Escriu en un to professional però accessible, màxim 250 paraules.`;

      // Utilitzem l'endpoint del servidor per evitar problemes de CORS
      const response = await $fetch('/api/gemini', {
        method: 'POST',
        body: {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      });

      if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        summary.value = response.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Respuesta inesperada de la API");
      }
    } catch (e) {
      console.error("Error generando resumen:", e);
      error.value = "Error generando el resumen. Por favor, inténtalo de nuevo.";
    } finally {
      loading.value = false;
    }
  };

  const clearSummary = () => {
    summary.value = "";
    error.value = null;
  };

  return { summary, loading, error, generateSummary, clearSummary };
};
