/**
 * services/ — the data-access layer.
 *
 * The site is a fully static export (GitHub Pages), so there is no server.
 * These async functions stand in for API calls: they read from the bundled
 * mock data (merged with any admin overrides saved in localStorage) and return
 * Promises, so components can consume them through React Query exactly as they
 * would a real REST/GraphQL backend. Swap the bodies for `fetch()` calls to a
 * live API without touching the components.
 */
import { compositions as seedCompositions } from '@/data/compositions';
import { concerts as seedConcerts } from '@/data/concerts';
import { awards as seedAwards } from '@/data/awards';
import { products as seedProducts } from '@/data/shop';
import { gallery as seedGallery } from '@/data/gallery';
import { news as seedNews, posts as seedPosts, slides as seedSlides } from '@/data/site';
import { delay } from '@/lib/utils';
import { readCollection } from '@/lib/cms';
import type {
  Composition,
  Concert,
  Award,
  Product,
  GalleryItem,
  NewsItem,
  Post,
  Slide,
} from '@/lib/types';

export const getCompositions = () =>
  delay(readCollection<Composition>('compositions', seedCompositions));

export const getConcerts = () => delay(readCollection<Concert>('concerts', seedConcerts));

export const getAwards = () => delay(readCollection<Award>('awards', seedAwards));

export const getProducts = () => delay(readCollection<Product>('products', seedProducts));

export const getGallery = () => delay(readCollection<GalleryItem>('gallery', seedGallery));

export const getNews = () => delay(readCollection<NewsItem>('news', seedNews));

export const getPosts = () => delay(readCollection<Post>('posts', seedPosts));

export const getSlides = () => delay(readCollection<Slide>('slides', seedSlides));

/** Global search across the searchable collections. */
export interface SearchResult {
  id: string;
  title: string;
  type: string;
  href: string;
  meta?: string;
}

export async function search(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const [comps, conc, awd] = await Promise.all([getCompositions(), getConcerts(), getAwards()]);

  const results: SearchResult[] = [];
  comps.forEach((c) => {
    if (`${c.title} ${c.director} ${c.language} ${c.genre}`.toLowerCase().includes(q))
      results.push({
        id: c.id,
        title: c.title,
        type: c.category === 'Albums' ? 'Album' : 'Movie',
        href: `/compositions?tab=${encodeURIComponent(c.category)}`,
        meta: `${c.year} · ${c.language}`,
      });
  });
  conc.forEach((c) => {
    if (`${c.title} ${c.city} ${c.country}`.toLowerCase().includes(q))
      results.push({ id: c.id, title: c.title, type: 'Concert', href: '/concerts', meta: `${c.city}, ${c.country}` });
  });
  awd.forEach((a) => {
    if (`${a.title} ${a.detail}`.toLowerCase().includes(q))
      results.push({ id: a.id, title: a.title, type: 'Award', href: '/awards', meta: `${a.year}` });
  });
  return results.slice(0, 12);
}
