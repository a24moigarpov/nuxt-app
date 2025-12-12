export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  console.log('Llamando a Gemini API...');
  console.log('API Key:', config.geminiApiKey ? 'Presente' : 'NO PRESENTE');
  console.log('Body:', JSON.stringify(body, null, 2));

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.geminiApiKey}`;    
    const response = await $fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    console.log('Respuesta exitosa de Gemini');
    return response;
  } catch (error) {
    console.error('Error al llamar a Gemini:', error);
    console.error('Error details:', error.data || error.message);
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.error?.message || error.message || 'Error al generar el resumen con Gemini AI',
    });
  }
});
