// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    // Variables privadas (solo servidor)
    omdbApiKey: process.env.NUXT_OMDB_API_KEY,
    geminiApiKey: process.env.NUXT_GEMINI_API_KEY,
    public: {
      // Variables públicas (solo si es necesario exponer algo al cliente)
    }
  }
})
