import axios from 'axios'

export const useApi = () => {
  const config = useRuntimeConfig()
  
  const getMovie = async (params) => {
    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: { apikey: config.public.omdbApiKey, ...params }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching movie:', error)
      throw error
    }
  }

  return { 
    searchMovies: (query) => getMovie({ s: query }),
    getMovieById: (id) => getMovie({ i: id })
  }
}
