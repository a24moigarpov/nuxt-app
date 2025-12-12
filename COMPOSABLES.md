# Composables - El Col·leccionista Funcional

## Què són els Composables?

Els composables són funcions reutilitzables que encapsulen lògica amb estat reactiu utilitzant la Composition API de Vue 3. Segueixen la convenció de nomenar-se amb el prefix `use...`.

## Avantatges dels Composables vs Services

| Característica | Service (communicationManager) | Composable |
|---------------|-------------------------------|------------|
| Reactivitat | ❌ No | ✅ Sí (ref, computed, reactive) |
| Cicle de vida | ❌ No | ✅ Sí (onMounted, onUnmounted, etc.) |
| Reutilització | ⚠️ Limitada | ✅ Total |
| Integració Vue | ⚠️ Manual | ✅ Nativa |
| Components nets | ⚠️ Lògica dispersa | ✅ Lògica centralitzada |

## Estructura

```
app/
  composables/
    useApi.js              # Gestió centralitzada de crides API
    useSearch.js           # Cerca de pel·lícules amb OMDB
    useGeminiSummary.js    # Generació de resums amb Gemini AI
```

## 1. useApi.js

Composable per gestionar totes les crides a l'API de Gemini.

### Característiques:
- Configuració centralitzada de l'API client
- Gestió automàtica de claus API
- Mètodes `get` i `post` reutilitzables
- Fàcil d'estendre amb interceptors, tokens, etc.

### Exemple d'ús:

```javascript
import { useApi } from '~/composables/useApi'

const api = useApi()

// POST request
const response = await api.post('/models/gemini-pro:generateContent', { 
  contents: [{ parts: [{ text: "prompt" }] }] 
})
```

## 2. useSearch.js

Composable per gestionar la cerca de pel·lícules amb OMDB API.

### Estat reactiu:
- `query` - El terme de cerca actual
- `results` - Array de resultats (pel·lícules reals d'OMDB)
- `loading` - Indicador de càrrega
- `error` - Missatges d'error

### Mètodes:
- `search()` - Executa la cerca amb el query actual utilitzant OMDB

### Exemple d'ús:

```javascript
import { useSearch } from '~/composables/useSearch'

const { query, results, loading, error, search } = useSearch()

// Establir el query
query.value = "Matrix"

// Executar cerca
await search()

// Accedir als resultats
console.log(results.value) // Array de pel·lícules reals d'OMDB
```

## 3. useGeminiSummary.js

Composable per generar resums intel·ligents de pel·lícules amb Gemini AI.

### Estat reactiu:
- `summary` - Text del resum generat
- `loading` - Indicador de càrrega
- `error` - Missatges d'error

### Mètodes:
- `generateSummary(movie)` - Genera un resum analític de la pel·lícula
- `clearSummary()` - Neteja el resum actual

### Exemple d'ús:

```javascript
import { useGeminiSummary } from '~/composables/useGeminiSummary'

const { summary, loading, error, generateSummary } = useGeminiSummary()

// Generar resum
await generateSummary({
  Title: "The Matrix",
  Year: "1999",
  Director: "Wachowski Brothers",
  // ... més dades
})

// Mostrar resum
console.log(summary.value) // Anàlisi detallada generada per IA
```

## Migració de communicationManager a Composables

### Abans (amb communicationManager):

```javascript
import { ref } from 'vue'
import { searchApi } from '../services/communicationManager.js'

const query = ref('')
const movies = ref(null)
const loading = ref(false)
const error = ref(null)

async function handleSearch() {
  if (!query.value.trim()) return
  
  try {
    loading.value = true
    error.value = null
    const result = await searchApi(query.value)
    movies.value = result.Search || []
  } catch (err) {
    error.value = 'Error al buscar'
  } finally {
    loading.value = false
  }
}
```

### Després (amb composable):

```javascript
import { useSearch } from '../composables/useSearch'

const { query, results, loading, error, search } = useSearch()

async function handleSearch() {
  await search()
}
```

## Configuració de l'API de Gemini

1. Obté una clau API de Gemini: https://makersuite.google.com/app/apikey

2. Crea un fitxer `.env` a l'arrel del projecte:

```bash
NUXT_PUBLIC_GEMINI_API_KEY=la_teva_clau_api_aqui
```

3. La configuració es llegeix automàticament des de `nuxt.config.ts`

## Per què és millor?

### 1. Separació de responsabilitats
- Els components només gestionen la UI
- Els composables gestionen la lògica de negoci
- Els services (si calen) només fan crides HTTP

### 2. Reutilització real
Un composable es pot utilitzar en múltiples components sense duplicar codi:

```javascript
// En SearchPage.vue
const { query, results, search } = useSearch()

// En HomePage.vue (si cal)
const { results: homeResults, search: homeSearch } = useSearch()
```

### 3. Components més nets
Compare:
- **Abans**: 40 línies de lògica + 30 línies de template = 70 línies
- **Després**: 10 línies de lògica + 30 línies de template = 40 línies (43% menys!)

### 4. Escalabilitat
És fàcil afegir funcionalitat:
- Paginació
- Filtres
- Cache
- Sincronització amb localStorage
- Etc.

Tot això sense tocar els components!

## Bones pràctiques

1. **Un composable = Una responsabilitat**
   - `useSearch` només gestiona cerca
   - `useApi` només gestiona HTTP
   - `useFavorites` només gestiona favorits

2. **Retorna objectes, no arrays**
   ```javascript
   // ✅ Bé
   return { query, results, loading, error, search }
   
   // ❌ Malament
   return [query, results, loading, error, search]
   ```

3. **Fes servir noms descriptius**
   ```javascript
   // ✅ Bé
   const { results, search } = useSearch()
   
   // ❌ Malament
   const { data, fn } = useSearch()
   ```

4. **Gestiona errors dins del composable**
   El component no ha de preocupar-se dels detalls d'error

## Exercicis proposats

1. Crea un composable `useMovieDetail(id)` per obtenir detalls d'una pel·lícula
2. Afegeix paginació a `useSearch`
3. Crea un composable `useLocalStorage(key)` per persistir dades
4. Implementa cache als resultats de cerca

## Recursos addicionals

- [Vue 3 Composition API](https://vuejs.org/guide/reusability/composables.html)
- [Nuxt 3 Composables](https://nuxt.com/docs/guide/directory-structure/composables)
- [Google Gemini API](https://ai.google.dev/docs)
