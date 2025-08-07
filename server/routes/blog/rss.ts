const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const xml = await $fetch<string>('/api/atom', {
    baseURL: config.public.apiBase,
    responseType: 'text',
  }).catch((error) => {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching atom feed",
      fatal: true,
    })
});
  setResponseHeader(event, 'Content-Type', 'application/atom+xml');
  setResponseHeader(event, 'Content-Disposition', 'filename="cassidys_blog.atom"');

  return xml;
});