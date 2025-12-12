export const useApi = () => {
  const searchMovies = async (query) => {
    try {
      const response = await $fetch('/api/omdb/search', {
        params: { s: query }
      })
      return response
    } catch (error) {
      console.error('Error searching movies:', error)
      throw error
    }
  }

  const getMovieById = async (id) => {
    try {
      const response = await $fetch(`/api/omdb/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching movie:', error)
      throw error
    }
  }

  return { 
    searchMovies,
    getMovieById
  }
}
