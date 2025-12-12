# Guia Ràpida: Configuració de l'API de Gemini

## Passos per completar la configuració

### 1. Obtenir clau API de Gemini

1. Visita: https://makersuite.google.com/app/apikey
2. Inicia sessió amb el teu compte de Google
3. Crea una nova clau API
4. Copia la clau generada

### 2. Configurar variables d'entorn

Crea un fitxer `.env` a l'arrel del projecte `nuxt-app/`:

```bash
NUXT_PUBLIC_GEMINI_API_KEY=la_teva_clau_aqui
```

**IMPORTANT**: No comparteixis mai aquest fitxer! Està al `.gitignore` per protegir-lo.

### 3. Instal·lar dependències (si cal)

```powershell
cd nuxt-app
npm install
```

### 4. Executar el projecte

```powershell
npm run dev
```

### 5. Provar la funcionalitat

1. Obre el navegador a http://localhost:3000
2. Navega a la pàgina "Buscar"
3. Introdueix un terme de cerca (per exemple: "acció", "comèdia", "Matrix")
4. Premeu el botó de cerca
5. Hauries de veure resultats generats per Gemini

## Resolució de problemes

### Error: "API key not valid"
- Verifica que has copiat correctament la clau al fitxer `.env`
- Assegura't que el fitxer es diu exactament `.env` (no `.env.txt`)
- Reinicia el servidor de desenvolupament

### Error: "Cannot find module"
- Executa `npm install` per assegurar que totes les dependències estan instal·lades

### No apareixen resultats
- Obre la consola del navegador (F12) per veure possibles errors
- Verifica que el servei de Gemini està disponible
- Comprova que la connexió a Internet funciona correctament

## Diferències clau amb OMDB

| Aspecte | OMDB (Abans) | Gemini (Ara) |
|---------|-------------|--------------|
| Font de dades | Base de dades real | IA generativa |
| Resultats | Pel·lícules reals | Recomanacions generades |
| Imatges | URLs reals | Placeholders |
| Precisió | 100% real | Plausible però fictici |
| Cost | Gratuït limitat | Gratuït amb límits generosos |

## Nota important sobre els resultats

L'API de Gemini genera **recomanacions** basades en el teu query, no cerca en una base de dades real. Els resultats són:
- ✅ Rellevants al teu terme de cerca
- ✅ Diversificats i creatius
- ⚠️ Poden incloure pel·lícules fictícies
- ⚠️ Els IMDb IDs són generats aleatòriament

Això és perfecte per a:
- Aprendre a usar composables
- Prototipar aplicacions
- Demostrar funcionalitat
- Evitar dependències de APIs externes

## Següents passos

Un cop funcioni correctament:

1. ✅ Explora el codi dels composables (`app/composables/`)
2. ✅ Llegeix la documentació completa (`COMPOSABLES.md`)
3. ✅ Prova a crear nous composables (exercicis proposats)
4. ✅ Compara el codi abans/després de la migració

## Suport

Si tens problemes:
1. Revisa la consola del navegador (F12)
2. Comprova els errors al terminal
3. Verifica el fitxer `.env`
4. Consulta la documentació de Gemini: https://ai.google.dev/docs
