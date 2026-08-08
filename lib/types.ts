/**
 * Shared domain types for the Ilaiyaraaja website.
 * All content is public-domain / open-source factual information
 * or clearly-labelled placeholder data. No copyrighted media is bundled.
 */

export type CompositionCategory =
  | 'Movies'
  | 'Albums'
  | 'Background Score'
  | 'Devotional'
  | 'Independent Music';

export interface Composition {
  id: string;
  title: string;
  year: number;
  language: string;
  director: string;
  label: string;
  genre: string;
  songs: number;
  category: CompositionCategory;
  /** Local SVG poster placeholder in /public/img. */
  poster: string;
  featured?: boolean;
  /** Optional destination when the card is clicked. Falls back to a live
   *  YouTube search for the title when not set. */
  link?: string;
}

export type ConcertStatus = 'Upcoming' | 'Completed';
export type ConcertSeries = 'Live In Concert';

export interface Concert {
  id: string;
  title: string;
  series: ConcertSeries;
  status: ConcertStatus;
  date: string; // ISO
  venue: string;
  city: string;
  country: string;
  bookingUrl: string;
  image: string;
  fallback?: string;
}

export type AwardCategory =
  | 'National'
  | 'State'
  | 'Filmfare'
  | 'International'
  | 'Honorary Doctorate'
  | 'Padma';

export interface Award {
  id: string;
  year: number;
  title: string;
  detail: string;
  category: AwardCategory;
}

export type ProductType = 'Books' | 'CD' | 'Vinyl' | 'Merchandise' | 'Music Collection';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  currency: string;
  image: string;
  badge?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  phase: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  fallback?: string;
  span?: 'wide' | 'tall' | 'normal';
}

export interface NewsItem {
  id: string;
  date: string; // ISO
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
  fallback?: string;
  source?: string;
}

export interface Post {
  id: string;
  category: string;
  title: string;
  blurb: string;
  image: string;
  fallback?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // index into options
  fact: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string; // lucide icon name
}

export interface Slide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  fallback?: string;
  ctaLabel: string;
  ctaHref: string;
}
