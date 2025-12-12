export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  if (!query.s) {
    throw createError({
      statusCode: 400,
      message: 'Query parameter "s" is required'
    });
  }

  try {
    const response = await $fetch('https://www.omdbapi.com/', {
      params: {
        apikey: config.omdbApiKey,
        s: query.s
      }
    });

    return response;
  } catch (error) {
    console.error('Error searching OMDB:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: 'Error searching movies'
    });
  }
});
