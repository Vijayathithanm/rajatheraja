/**
 * services/ — the data-access layer.
 *
 * The site is a static export (GitHub Pages) with no server of its own.
 * Reads go through Supabase when it is configured (see lib/supabase.ts); the
 * browser fetches directly from Postgres via the public anon key + RLS. When
 * Supabase is not configured — or a request fails — we transparently fall back
 * to the bundled mock data (merged with any local admin overrides). Components
 * consume these functions through React Query and never need to know which
 * source answered.
 */
import { compositions as seedCompositions } from '@/data/compositions';
import { concerts as seedConcerts } from '@/data/concerts';
import { awards as seedAwards } from '@/data/awards';
import { products as seedProducts } from '@/data/shop';
import { gallery as seedGallery } from '@/data/gallery';
import { news as seedNews, posts as seedPosts, slides as seedSlides } from '@/data/site';
import { delay } from '@/lib/utils';
import { readCollection } from '@/lib/cms';
import { fetchCollection } from '@/lib/db';
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

/** Prefer the database; fall back to bundled mock data (+ local overrides). */
async function load<T>(table: string, seed: T[]): Promise<T[]> {
  const remote = await fetchCollection<T>(table);
  const list = remote && remote.length ? remote : readCollection<T>(table, seed);
  return delay(list);
}

export const getCompositions = () => load<Composition>('compositions', seedCompositions);

export const getConcerts = () => load<Concert>('concerts', seedConcerts);

export const getAwards = () => load<Award>('awards', seedAwards);

export const getProducts = () => load<Product>('products', seedProducts);

export const getGallery = () => load<GalleryItem>('gallery', seedGallery);

export const getNews = () => load<NewsItem>('news', seedNews);

export const getPosts = () => load<Post>('posts', seedPosts);

export const getSlides = () => load<Slide>('slides', seedSlides);

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
