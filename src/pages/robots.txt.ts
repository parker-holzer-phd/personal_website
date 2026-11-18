import type { APIContext } from 'astro';
import { site } from '../config';
export function GET(context: APIContext) {
  const ready = import.meta.env.PUBLIC_LAUNCH_READY === 'true' && !site.profileIsPlaceholder;
  return new Response(`User-agent: *\n${ready ? 'Allow: /' : 'Disallow: /'}\n${context.site ? `Sitemap: ${new URL('/sitemap-index.xml', context.site).href}\n` : ''}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
