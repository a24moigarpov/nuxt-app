# 🏗️ Arquitectura del Projecte amb Composables

## 📐 Diagrama d'arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         NUXT APP                             │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   PAGES      │      │  COMPONENTS  │      │   STORES     │
│              │      │              │      │              │
│ search.vue   │◄─────┤ SearchBar    │      │ favorites    │
│ index.vue    │      │ ItemCard     │      │   Store      │
│ favorites.vue│      │ TheNavbar    │      │   (Pinia)    │
└──────┬───────┘      └──────────────┘      └──────────────┘
       │
       │ usa
       ▼
┌─────────────────────────────────────────────────────────────┐
│                      COMPOSABLES                             │
│  (Capa de lògica reutilitzable)                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────┐      ┌──────────────────────┐    │
│  │   useSearch.js       │◄─────┤   useApi.js          │    │
│  │                      │      │                      │    │
│  │  • query (ref)       │      │  • get()             │    │
│  │  • results (ref)     │      │  • post()            │    │
│  │  • loading (ref)     │      │  • apiClient (axios) │    │
│  │  • error (ref)       │      │                      │    │
│  │  • search()          │      │                      │    │
│  └──────────┬───────────┘      └──────────┬───────────┘    │
│             │                              │                │
└─────────────┼──────────────────────────────┼────────────────┘
              │                              │
              └──────────────┬───────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   EXTERNAL API   │
                    │                  │
                    │  Google Gemini   │
                    │   (AI Service)   │
                    └──────────────────┘
```

## 🔄 Flux de dades

### Escenari: L'usuari fa una cerca

```
1. USER ACTION
   │
   │  Escriu "Matrix" a SearchBar
   │  Prem botó cerca
   │
   ▼
2. COMPONENT (search.vue)
   │
   │  handleSearch() cridat
   │  await search() del composable
   │
   ▼
3. COMPOSABLE (useSearch.js)
   │
   │  query.value = "Matrix"
   │  loading.value = true
   │  search() executat
   │
   ▼
4. API CLIENT (useApi.js)
   │
   │  post('/models/gemini-pro:generateContent', {...})
   │  Afegeix API key automàticament
   │
   ▼
5. EXTERNAL API (Gemini)
   │
   │  Processa el prompt
   │  Genera recomanacions
   │  Retorna JSON
   │
   ▼
6. COMPOSABLE (useSearch.js)
   │
   │  Parseja resposta
   │  results.value = [movies...]
   │  loading.value = false
   │
   ▼
7. COMPONENT (search.vue)
   │
   │  Reactivitat actualitza UI
   │  Mostra resultats
   │
   ▼
8. USER SEES RESULTS 🎉
```

## 📦 Responsabilitats per capa

### Pages (Presentació)
```javascript
// search.vue
✓ Renderitzar UI
✓ Gestionar esdeveniments d'usuari
✓ Orquestrar composables
✗ Lògica de negoci
✗ Crides directes a API
```

### Composables (Lògica)
```javascript
// useSearch.js
✓ Encapsular lògica reutilitzable
✓ Gestionar estat reactiu
✓ Coordinar amb API client
✗ Conèixer detalls de la UI
✗ Implementar crides HTTP directes
```

### API Client (Comunicació)
```javascript
// useApi.js
✓ Configurar client HTTP
✓ Gestionar autenticació
✓ Interceptors i middleware
✗ Lògica de negoci
✗ Gestió d'estat
```

## 🎯 Comparativa d'arquitectures

### ❌ Abans: Arquitectura Monolítica

```
┌─────────────────────────────────┐
│      search.vue (93 línies)     │
│  ┌───────────────────────────┐  │
│  │  Template (UI)            │  │
│  ├───────────────────────────┤  │
│  │  Script Setup             │  │
│  │  • Import services        │  │
│  │  • Definir state          │  │
│  │  • Lògica de cerca        │  │
│  │  • Gestió d'errors        │  │
│  │  • Loading states         │  │
│  │  • Parseja resposta       │  │
│  │  • Gestió de favorits     │  │
│  ├───────────────────────────┤  │
│  │  Styles (CSS)             │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
         │
         │ crida directa
         ▼
┌─────────────────────────────────┐
│  communicationManager.js        │
│  • searchApi()                  │
│  • getItemById()                │
│  ❌ Sense reactivitat           │
│  ❌ Difícil de reutilitzar      │
└─────────────────────────────────┘
```

### ✅ Després: Arquitectura amb Composables

```
┌─────────────────────────────────┐
│   search.vue (70 línies -25%)   │
│  ┌───────────────────────────┐  │
│  │  Template (UI)            │  │
│  ├───────────────────────────┤  │
│  │  Script Setup (Simple!)   │  │
│  │  • Import composable      │  │
│  │  • Destructure state      │  │
│  │  • Crides simples         │  │
│  ├───────────────────────────┤  │
│  │  Styles (CSS)             │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
         │
         │ usa composable
         ▼
┌─────────────────────────────────┐
│     useSearch.js                │
│  • query, results, loading...   │
│  • search()                     │
│  ✅ Estat reactiu               │
│  ✅ Totalment reutilitzable     │
│  ✅ Fàcil de testejar           │
└─────────────────────────────────┘
         │
         │ usa API client
         ▼
┌─────────────────────────────────┐
│       useApi.js                 │
│  • apiClient configurat         │
│  • get(), post()                │
│  ✅ Centralitzat                │
│  ✅ Fàcil d'estendre            │
└─────────────────────────────────┘
```

## 🧩 Patró de composició

### Composables com "Peces de LEGO"

```javascript
// Cada composable és independent i reutilitzable

// En SearchPage.vue
const { query, results, search } = useSearch()
const store = useFavoritesStore()

// En HomePage.vue (si cal)
const { results: trending } = useSearch()
const { results: popular } = useSearch()

// En DetailPage.vue (futur)
const { movie, loading, fetch } = useMovieDetail(id)

// En ProfilePage.vue (futur)
const { user, logout } = useAuth()
const { data, save } = useLocalStorage('preferences')
```

## 📈 Escalabilitat

### Afegir noves funcionalitats sense tocar components

```javascript
// useSearch.js - Versió inicial
export const useSearch = () => {
  const query = ref('')
  const results = ref([])
  const search = async () => { /* ... */ }
  return { query, results, search }
}

// useSearch.js - Amb cache (no cal tocar search.vue!)
export const useSearch = () => {
  const query = ref('')
  const results = ref([])
  const cache = new Map()
  
  const search = async () => {
    if (cache.has(query.value)) {
      results.value = cache.get(query.value)
      return
    }
    // ... fer cerca
    cache.set(query.value, results.value)
  }
  
  return { query, results, search }
}

// useSearch.js - Amb paginació (search.vue segueix igual!)
export const useSearch = () => {
  const query = ref('')
  const results = ref([])
  const page = ref(1)
  const hasMore = ref(true)
  
  const search = async () => { /* ... */ }
  const loadMore = async () => { /* ... */ }
  
  return { query, results, page, hasMore, search, loadMore }
}
```

## 🎓 Principis SOLID aplicats

### ✅ Single Responsibility
- `useApi`: Només gestiona HTTP
- `useSearch`: Només gestiona cerca
- `search.vue`: Només gestiona UI

### ✅ Open/Closed
- Obert a extensió: Pots afegir funcionalitat
- Tancat a modificació: No cal canviar el codi existent

### ✅ Dependency Inversion
- Components depenen d'abstraccions (composables)
- No depenen d'implementacions concretes

## 🚀 Avantatges clau

| Aspecte | Benefici |
|---------|----------|
| **Mantenibilitat** | Codi organitzat per responsabilitats |
| **Testabilitat** | Cada peça es pot testejar aïlladament |
| **Reutilització** | Composables en múltiples components |
| **Llegibilitat** | Components simples i concisos |
| **Escalabilitat** | Afegir funcions sense modificar |
| **Reactivitat** | Actualitzacions automàtiques de la UI |
| **Separació** | Lògica de negoci vs presentació |

---

**Aquesta és l'arquitectura professional que fan servir equips de desenvolupament moderns! 🎯**
