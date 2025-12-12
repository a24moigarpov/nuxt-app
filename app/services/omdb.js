const API_URL = "https://www.omdbapi.com/";
const API_KEY = "95c10c60";  // <-- cámbiala por la tuya

// Buscar películas por título
export async function searchMovies(query) {
  const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();

  return data; // devuelve la respuesta tal cual
}

// Buscar una película por ID (p.ej. tt3896198)
export async function getMovieById(id) {
  const url = `${API_URL}?apikey=${API_KEY}&i=${id}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
