export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Movie ID is required'
    });
  }

  try {
    const response = await $fetch('https://www.omdbapi.com/', {
      params: {
        apikey: config.omdbApiKey,
        i: id
      }
    });

    return response;
  } catch (error) {
    console.error('Error fetching item from OMDB:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: 'Error fetching movie details'
    });
  }
});
