import type { APIRoute } from 'astro';
import { getAllElements } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('`site` must be set in astro.config.mjs to generate the sitemap');

  const elements = await getAllElements();
  const paths = ['/', '/about/', ...elements.map((element) => `/${element.slug.fr}/`)];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
