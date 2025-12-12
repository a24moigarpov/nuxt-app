// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      omdbApiKey: process.env.NUXT_PUBLIC_OMDB_API_KEY || '95c10c60',
      geminiApiKey: process.env.NUXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAp26bVhwDNtwA8l1eXg6V4WRQHZUYTuZI'
    }
  }
})
