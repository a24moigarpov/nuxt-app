import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({ favorites: [] }),

  actions: {
    init() {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('favoriteMovies')
        if (stored) this.favorites = JSON.parse(stored)
      }
    },

    addFavorite(item) {
      if (!this.isFavorite(item.imdbID)) {
        this.favorites.push(item)
        this.save()
      }
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter(f => f.imdbID !== id)
      this.save()
    },

    save() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteMovies', JSON.stringify(this.favorites))
      }
    }
  },

  getters: {
    isFavorite: (state) => (id) => state.favorites.some(f => f.imdbID === id),
    favoritesCount: (state) => state.favorites.length
  }
})