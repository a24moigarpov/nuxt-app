# 🎬 Colecionista de Películas

Una aplicación web moderna para buscar, explorar y coleccionar tus películas favoritas. Construida con **Nuxt 4**, integra la API de **OMDB** para información de películas y **Gemini AI** para generar resúmenes inteligentes.

![Nuxt](https://img.shields.io/badge/Nuxt-4.2.1-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-State%20Management-FFD859?style=flat&logo=pinia&logoColor=white)

## ✨ Características

- 🔍 **Búsqueda de películas** en tiempo real usando OMDB API
- 🌟 **Películas populares** del momento
- ❤️ **Sistema de favoritos** con persistencia en localStorage
- 🤖 **Resúmenes con IA** generados por Gemini AI
- 📱 **Diseño responsive** y moderno
- ⚡ **Rendimiento optimizado** con Nuxt 4
- 🎨 **Interfaz intuitiva** y atractiva

## 🚀 Demo

Explora las siguientes páginas:
- **Inicio**: Películas populares del momento
- **Búsqueda**: Encuentra cualquier película por título
- **Favoritos**: Tu colección personal
- **Detalles**: Información completa con resumen AI

### 🔗 Enlaces del Proyecto

| Tipo de Enlace | URL |
| :--- | :--- |
| **Dominio Principal** | [nuxt-app-nine-amber.vercel.app](https://nuxt-app-nine-amber.vercel.app) |
| **Deployment Preview** | [nuxt-nwz7i1pgs-mois-projects-f974e75b.vercel.app](https://nuxt-nwz7i1pgs-mois-projects-f974e75b.vercel.app) |

## 🛠️ Tecnologías

- **[Nuxt 4](https://nuxt.com/)** - Framework Vue.js para aplicaciones web
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progresivo
- **[Pinia](https://pinia.vuejs.org/)** - State management para Vue
- **[OMDB API](http://www.omdbapi.com/)** - Base de datos de películas
- **[Gemini AI](https://ai.google.dev/)** - IA de Google para resúmenes

## 📋 Requisitos previos

- Node.js 18.x o superior
- npm o yarn
- Claves API:
  - [OMDB API Key](http://www.omdbapi.com/apikey.aspx)
  - [Gemini API Key](https://aistudio.google.com/app/apikey)

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/a24moigarpov/nuxt-app.git
cd nuxt-app
```

2. **Navega al directorio del proyecto**
```bash
cd nuxt-app
```

3. **Instala las dependencias**
```bash
npm install
```

4. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto `nuxt-app`:

```env
NUXT_OMDB_API_KEY=tu_clave_omdb_aqui
NUXT_GEMINI_API_KEY=tu_clave_gemini_aqui
```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

### Producción
```bash
# Generar build de producción
npm run build

# Previsualizar build
npm run preview

# Generar sitio estático
npm run generate
```

## 📁 Estructura del proyecto

```
nuxt-app/
├── app/
│   ├── components/          # Componentes Vue reutilizables
│   │   ├── ItemCard.vue     # Tarjeta de película
│   │   ├── SearchBar.vue    # Barra de búsqueda
│   │   └── TheNavbar.vue    # Barra de navegación
│   ├── composables/         # Composables de Vue
│   │   ├── useApi.js        # Cliente API base
│   │   ├── useGeminiSummary.js   # Integración Gemini
│   │   ├── useMovieDetail.js     # Detalles de película
│   │   ├── usePopularMovies.js   # Películas populares
│   │   └── useSearch.js          # Búsqueda
│   ├── pages/               # Rutas de la aplicación
│   │   ├── index.vue        # Página principal
│   │   ├── search.vue       # Búsqueda
│   │   ├── favorites.vue    # Favoritos
│   │   └── item/[id].vue    # Detalle de película
│   ├── stores/              # Estado global (Pinia)
│   │   └── favoritesStore.js
│   └── services/            # Servicios externos
│       ├── communicationManager.js
│       └── omdb.js
├── server/
│   └── api/                 # API endpoints
│       ├── gemini.js        # Proxy Gemini AI
│       └── omdb/
│           ├── [id].js      # Detalles por ID
│           └── search.js    # Búsqueda
└── nuxt.config.ts          # Configuración de Nuxt
```

## 🎯 Características principales

### Sistema de Favoritos
Guarda tus películas favoritas con persistencia en localStorage:
```javascript
// Añadir a favoritos
store.addFavorite(movie)

// Eliminar de favoritos
store.removeFavorite(movieId)

// Verificar si es favorito
store.isFavorite(movieId)
```

### Resúmenes con IA
Genera resúmenes inteligentes de películas usando Gemini AI:
```javascript
const { summary, loading, error } = await generateSummary(plot)
```

### Búsqueda en tiempo real
Busca películas por título con resultados instantáneos:
```javascript
const { results, loading, error, search } = useSearch()
await search('Matrix')
```

## 🔐 Seguridad

- Las API keys están protegidas en el servidor (no se exponen al cliente)
- Las variables de entorno se manejan con `runtimeConfig`
- Los endpoints del servidor actúan como proxy seguro

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Moisés García**
- GitHub: [@a24moigarpov](https://github.com/a24moigarpov)

## 🙏 Agradecimientos

- [OMDB API](http://www.omdbapi.com/) por proporcionar datos de películas
- [Google Gemini](https://ai.google.dev/) por la IA generativa
- [Nuxt Team](https://nuxt.com/) por el increíble framework

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
