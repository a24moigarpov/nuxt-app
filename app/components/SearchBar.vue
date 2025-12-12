<template>
  <div class="search-box">
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('search')"
      placeholder="Título de la película..."
      class="search-input"
    />
    <button 
      @click="$emit('search')"
      class="search-button"
      :disabled="loading"
    >
      {{ loading ? 'Buscando...' : 'Buscar' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  loading: Boolean
});

defineEmits(['update:modelValue', 'search']);
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
