import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  // STATE: Donde guardamos las datos globales
  state: () => ({
    favorites: []
  }),

  // ACTIONS: Funciones que modifican el estado
  actions: {
    // Inicializar desde localStorage (solo en cliente)
    init() {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('favoriteMovies');
        if (stored) {
          this.favorites = JSON.parse(stored);
        }
      }
    },

    addFavorite(item) {
      // Solo añadir si no existe ya
      if (!this.isFavorite(item.imdbID)) {
        this.favorites.push(item);
        // Persistir en localStorage (solo en cliente)
        if (typeof window !== 'undefined') {
          localStorage.setItem('favoriteMovies', JSON.stringify(this.favorites));
        }
      }
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter(f => f.imdbID !== id);
      // Actualizar localStorage (solo en cliente)
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteMovies', JSON.stringify(this.favorites));
      }
    }
  },

  // GETTERS: Estado derivado (computado)
  getters: {
    // Devuelve true si el elemento ya es favorito
    isFavorite: (state) => (id) => state.favorites.some(f => f.imdbID === id),
    
    // Devuelve el número total de favoritos
    favoritesCount: (state) => state.favorites.length
  }
});