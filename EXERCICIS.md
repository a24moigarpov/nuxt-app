# 🎯 Exercicis Pràctics: Composables

## 📚 Nivell 1: Bàsic

### Exercici 1.1: Explorar el codi existent
**Objectiu**: Familiaritzar-se amb l'arquitectura actual

1. Obre `app/composables/useSearch.js`
2. Identifica:
   - Quines variables són reactives?
   - Quina funció fa la crida a l'API?
   - Com es gestionen els errors?
3. Compara amb `app/pages/search.vue` (versió antiga comentada)

**Preguntes per reflexionar:**
- Quantes línies de codi hi ha al composable vs al component?
- Per què és millor tenir la lògica separada?

---

### Exercici 1.2: Afegir un comptador de cerques
**Objectiu**: Modificar un composable existent

**Tasca**: Afegeix un comptador que registri quantes cerques s'han fet

```javascript
// app/composables/useSearch.js

export const useSearch = () => {
  const api = useApi();
  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  // 👉 AFEGEIX AQUÍ: Comptador de cerques
  const searchCount = ref(0);

  const search = async () => {
    // ... codi existent ...
    
    // 👉 AFEGEIX AQUÍ: Incrementar comptador
    searchCount.value++;
    
    // ... resta del codi ...
  };

  // 👉 MODIFICA AQUÍ: Retorna també searchCount
  return { query, results, loading, error, search, searchCount };
};
```

**Prova-ho:**
- Mostra el comptador a `search.vue`
- Fes diverses cerques
- Comprova que el número augmenta

---

### Exercici 1.3: Missatge personalitzat quan no hi ha resultats
**Objectiu**: Practicar amb computed properties

**Tasca**: Crea un `computed` que retorni un missatge personalitzat

```javascript
// app/composables/useSearch.js

import { ref, computed } from "vue";

export const useSearch = () => {
  // ... codi existent ...
  
  // 👉 AFEGEIX AQUÍ: Computed property
  const statusMessage = computed(() => {
    if (loading.value) return "Cercant...";
    if (error.value) return error.value;
    if (results.value.length === 0 && query.value) 
      return `No s'han trobat resultats per "${query.value}"`;
    if (results.value.length > 0) 
      return `S'han trobat ${results.value.length} pel·lícules`;
    return "Introdueix un terme de cerca";
  });

  return { 
    query, results, loading, error, search,
    statusMessage // 👈 Afegeix al return
  };
};
```

---

## 📚 Nivell 2: Intermedi

### Exercici 2.1: Crear `useMovieDetail.js`
**Objectiu**: Crear un nou composable des de zero

**Tasca**: Crea un composable per obtenir detalls d'una pel·lícula

```javascript
// app/composables/useMovieDetail.js

import { ref } from "vue";
import { useApi } from "./useApi";

export const useMovieDetail = (movieId) => {
  const api = useApi();
  
  const movie = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchMovie = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const prompt = `Genera detalls complets d'una pel·lícula amb l'ID ${movieId}. 
      Inclou: Title, Year, Director, Actors, Plot, Genre, imdbRating.
      Retorna només JSON.`;
      
      const response = await api.post("/models/gemini-pro:generateContent", {
        contents: [{
          parts: [{ text: prompt }]
        }]
      });
      
      // 👉 TU: Parseja la resposta
      // movie.value = ...
      
    } catch (e) {
      error.value = "Error carregant detalls";
    } finally {
      loading.value = false;
    }
  };

  return { movie, loading, error, fetchMovie };
};
```

**Prova-ho:**
- Usa-lo a `item-detail.vue`
- Mostra els detalls de la pel·lícula
- Gestiona els estats de càrrega

---

### Exercici 2.2: Afegir historial de cerques
**Objectiu**: Gestionar estat complex amb arrays

**Tasca**: Guarda les últimes 5 cerques

```javascript
// app/composables/useSearch.js

export const useSearch = () => {
  const api = useApi();
  
  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  // 👉 AFEGEIX AQUÍ: Historial
  const history = ref([]);
  const MAX_HISTORY = 5;

  const search = async () => {
    // ... codi existent ...
    
    // 👉 AFEGEIX AQUÍ: Guardar a historial
    if (query.value && !history.value.includes(query.value)) {
      history.value.unshift(query.value);
      if (history.value.length > MAX_HISTORY) {
        history.value.pop();
      }
    }
    
    // ... resta del codi ...
  };
  
  // 👉 AFEGEIX AQUÍ: Funció per cercar des de l'historial
  const searchFromHistory = async (term) => {
    query.value = term;
    await search();
  };

  return { 
    query, results, loading, error, search,
    history, searchFromHistory
  };
};
```

**Prova-ho:**
- Mostra l'historial a `search.vue`
- Permet clicar per repetir una cerca
- Limita a 5 elements màxim

---

### Exercici 2.3: Filtrar resultats per any
**Objectiu**: Afegir lògica de filtratge

**Tasca**: Afegeix un filtre per any de llançament

```javascript
// app/composables/useSearch.js

import { ref, computed } from "vue";

export const useSearch = () => {
  // ... codi existent ...
  
  const yearFilter = ref(null);
  
  // 👉 AFEGEIX AQUÍ: Resultats filtrats
  const filteredResults = computed(() => {
    if (!yearFilter.value) return results.value;
    
    return results.value.filter(movie => {
      const year = parseInt(movie.Year);
      return year === parseInt(yearFilter.value);
    });
  });

  return { 
    query, results, filteredResults, loading, error, search,
    yearFilter
  };
};
```

---

## 📚 Nivell 3: Avançat

### Exercici 3.1: Implementar cache amb localStorage
**Objectiu**: Persistir dades entre sessions

```javascript
// app/composables/useSearchWithCache.js

import { ref, onMounted } from "vue";
import { useApi } from "./useApi";

export const useSearchWithCache = () => {
  const api = useApi();
  
  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  const CACHE_KEY = "search-cache";
  const CACHE_DURATION = 1000 * 60 * 30; // 30 minuts
  
  // 👉 Carregar cache en muntar
  onMounted(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached);
      // Comprovar si és vàlid
      if (Date.now() - data.timestamp < CACHE_DURATION) {
        // Restaurar dades
      }
    }
  });

  const search = async () => {
    // 👉 TU: Comprova cache abans de fer la crida
    
    // 👉 TU: Si no hi ha cache, fes la crida
    
    // 👉 TU: Guarda els resultats al cache
    
  };

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
  };

  return { query, results, loading, error, search, clearCache };
};
```

---

### Exercici 3.2: Paginació de resultats
**Objectiu**: Gestionar grans volums de dades

```javascript
// app/composables/useSearchWithPagination.js

export const useSearchWithPagination = () => {
  const api = useApi();
  
  const query = ref("");
  const allResults = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  const page = ref(1);
  const pageSize = ref(10);
  
  // 👉 Resultats paginats
  const paginatedResults = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return allResults.value.slice(start, end);
  });
  
  // 👉 Informació de paginació
  const totalPages = computed(() => {
    return Math.ceil(allResults.value.length / pageSize.value);
  });
  
  const hasNextPage = computed(() => page.value < totalPages.value);
  const hasPrevPage = computed(() => page.value > 1);
  
  const nextPage = () => {
    if (hasNextPage.value) page.value++;
  };
  
  const prevPage = () => {
    if (hasPrevPage.value) page.value--;
  };
  
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages.value) {
      page.value = pageNum;
    }
  };

  const search = async () => {
    // ... cerca i guarda tots els resultats a allResults ...
    page.value = 1; // Reset a primera pàgina
  };

  return { 
    query, 
    paginatedResults,
    loading, 
    error, 
    search,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage
  };
};
```

---

### Exercici 3.3: Debounce per cerca automàtica
**Objectiu**: Optimitzar performance

```javascript
// app/composables/useSearchWithDebounce.js

import { ref, watch } from "vue";
import { useApi } from "./useApi";

export const useSearchWithDebounce = (delay = 500) => {
  const api = useApi();
  
  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  let timeoutId = null;

  const search = async () => {
    // ... codi de cerca ...
  };
  
  // 👉 Watch amb debounce
  watch(query, (newQuery) => {
    // Cancel·lar timeout anterior
    if (timeoutId) clearTimeout(timeoutId);
    
    if (!newQuery.trim()) {
      results.value = [];
      return;
    }
    
    // Nou timeout
    timeoutId = setTimeout(() => {
      search();
    }, delay);
  });

  return { query, results, loading, error };
};
```

**Prova-ho:**
- L'usuari escriu a la barra de cerca
- La cerca s'executa automàticament
- Espera 500ms després de parar d'escriure

---

## 📚 Nivell 4: Expert

### Exercici 4.1: Composable genèric `useFetch`
**Objectiu**: Crear un composable reutilitzable per qualsevol API

```javascript
// app/composables/useFetch.js

import { ref, unref, watchEffect } from "vue";

export const useFetch = (url, options = {}) => {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  
  const execute = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(unref(url), {
        ...unref(options)
      });
      
      if (!response.ok) throw new Error(response.statusText);
      
      data.value = await response.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };
  
  // 👉 Auto-executa si l'URL canvia
  watchEffect(() => {
    if (unref(url)) execute();
  });

  const refresh = () => execute();

  return { data, loading, error, refresh };
};

// ÚS:
// const { data, loading } = useFetch(() => `/api/movies/${movieId.value}`)
```

---

### Exercici 4.2: Sistema de notificacions global
**Objectiu**: Composable amb estat compartit

```javascript
// app/composables/useNotifications.js

import { ref, readonly } from "vue";

// Estat global (compartit entre tots els components)
const notifications = ref([]);
let nextId = 0;

export const useNotifications = () => {
  const add = (message, type = "info", duration = 3000) => {
    const id = nextId++;
    
    notifications.value.push({
      id,
      message,
      type, // info, success, warning, error
      timestamp: Date.now()
    });
    
    // Auto-eliminar després de duration
    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }
    
    return id;
  };
  
  const remove = (id) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };
  
  const clear = () => {
    notifications.value = [];
  };

  return {
    notifications: readonly(notifications),
    add,
    remove,
    clear
  };
};
```

---

## 🎓 Solucions i Pistes

### Pista per l'exercici 1.2
<details>
<summary>Mostra la solució</summary>

```javascript
// search.vue
const { query, results, loading, error, search, searchCount } = useSearch()

// Al template
<div v-if="searchCount > 0" class="search-count">
  Total cerques: {{ searchCount }}
</div>
```
</details>

### Pista per l'exercici 2.1
<details>
<summary>Mostra la solució</summary>

```javascript
const responseText = response.data.candidates[0].content.parts[0].text;
const jsonMatch = responseText.match(/\{[\s\S]*\}/);
if (jsonMatch) {
  movie.value = JSON.parse(jsonMatch[0]);
}
```
</details>

### Pista per l'exercici 3.1
<details>
<summary>Mostra la solució</summary>

```javascript
const search = async () => {
  // Comprovar cache
  const cacheKey = `search-${query.value}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp < CACHE_DURATION) {
      results.value = data.results;
      return;
    }
  }
  
  // Fer la crida
  await /* ... */;
  
  // Guardar al cache
  localStorage.setItem(cacheKey, JSON.stringify({
    results: results.value,
    timestamp: Date.now()
  }));
};
```
</details>

---

## 📝 Checklist de completitud

- [ ] Exercici 1.1: Explorar codi ✅
- [ ] Exercici 1.2: Comptador de cerques ✅
- [ ] Exercici 1.3: Missatge personalitzat ✅
- [ ] Exercici 2.1: useMovieDetail ✅
- [ ] Exercici 2.2: Historial de cerques ✅
- [ ] Exercici 2.3: Filtrar per any ✅
- [ ] Exercici 3.1: Cache amb localStorage ✅
- [ ] Exercici 3.2: Paginació ✅
- [ ] Exercici 3.3: Debounce ✅
- [ ] Exercici 4.1: useFetch genèric ✅
- [ ] Exercici 4.2: Sistema de notificacions ✅

---

**Bones pràctiques recordatori:**
1. Sempre prova el codi després de cada canvi
2. Usa noms descriptius per les variables
3. Comenta el codi complex
4. Gestiona sempre els errors
5. Pensa en la reutilització

**Molt èxit amb els exercicis! 🚀**
