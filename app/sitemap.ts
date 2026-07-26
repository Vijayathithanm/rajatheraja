import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export const dynamic = 'force-static';

const routes = [
  '',
  '/biography',
  '/compositions',
  '/concerts',
  '/awards',
  '/shop',
  '/gallery',
  '/quiz',
  '/certificate',
  '/privacy',
  '/terms',
  '/disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
