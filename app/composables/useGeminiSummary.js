import { ref } from 'vue'

export const useGeminiSummary = () => {
  const summary = ref('')
  const loading = ref(false)
  const error = ref(null)

  const generateSummary = async (movie) => {
    loading.value = true
    error.value = null
    summary.value = ''

    try {
      const prompt = `Genera un análisis detallado de "${movie.Title}" (${movie.Year}). Director: ${movie.Director}. Actores: ${movie.Actors}. Género: ${movie.Genre}. Sinopsis: ${movie.Plot}. Puntuación: ${movie.imdbRating}/10. Incluye introducción, análisis de elementos destacables, contexto cultural y por qué verla. Máximo 250 palabras.`

      const response = await $fetch('/api/gemini', {
        method: 'POST',
        body: {
          contents: [{ parts: [{ text: prompt }] }]
        }
      })

      if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        summary.value = response.candidates[0].content.parts[0].text
      } else {
        throw new Error('Respuesta inesperada')
      }
    } catch (e) {
      error.value = 'Error generando el resumen'
    } finally {
      loading.value = false
    }
  }

  const clearSummary = () => {
    summary.value = ''
    error.value = null
  }

  return { summary, loading, error, generateSummary, clearSummary }
}
