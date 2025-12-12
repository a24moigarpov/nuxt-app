<template>
  <div class="search-box">
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="handleSearch"
      placeholder="Título de la película..."
      class="search-input"
    />
    <button 
      @click="handleSearch"
      class="search-button"
      :disabled="loading"
    >
      <span v-if="!loading">Buscar</span>
      <span v-else>Buscando...</span>
    </button>
  </div>
</template>

<script setup>
// PROPS: Recibe el valor del v-model desde el padre
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// EMITS: Define los eventos que puede emitir al componente padre
const emit = defineEmits(['update:modelValue', 'search']);

// FUNCIÓN: Emite el evento de búsqueda al padre
function handleSearch() {
  emit('search');
}
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  flex: 1;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #f9c74f;
}

.search-input::placeholder {
  color: #6e7681;
}

.search-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #f9c74f;
  color: #0d1117;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;
  white-space: nowrap;
}

.search-button:hover:not(:disabled) {
  background: #ffd60a;
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
