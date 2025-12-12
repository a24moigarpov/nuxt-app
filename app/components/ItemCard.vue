<template>
  <div class="item-card">
    <router-link :to="`/item/${item.imdbID}`" class="item-link">
      <img 
        :src="item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'" 
        :alt="item.Title"
        class="item-poster"
      />
      <div class="item-info">
        <h3>{{ item.Title }}</h3>
        <p>{{ item.Year }}</p>
      </div>
    </router-link>
    
    <!-- SLOT: Espacio para acciones personalizadas (botones, etc.) -->
    <!-- El componente padre puede llenar este espacio con lo que necesite -->
    <div class="item-actions">
      <slot name="actions" :item="item"></slot>
    </div>
  </div>
</template>

<script setup>
// PROPS: Datos que recibe el componente
// El componente es reutilizable y solo necesita el item
defineProps({
  item: {
    type: Object,
    required: true
  }
});

// No necesitamos emits porque usamos slots para las acciones
// El componente padre decide qué acciones mostrar mediante el slot
</script>

<style scoped>
.item-card {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: #161b22;
  border: 1px solid #30363d;
  transition: border-color 0.2s ease;
}

.item-card:hover {
  border-color: #f9c74f;
}

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.item-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
  background: #0d1117;
}

.item-info {
  padding: 1rem;
}

.item-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-info p {
  margin: 0;
  color: #8b949e;
  font-size: 0.875rem;
}

.item-actions {
  padding: 0.75rem;
}
</style>
