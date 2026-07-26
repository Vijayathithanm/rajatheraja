'use client';

import { useEffect, useMemo, useState } from 'react';
import { Lock, LogOut, LayoutDashboard, Info } from 'lucide-react';
import { CollectionManager, type CollectionConfig } from './CollectionManager';
import { Icon } from '@/components/ui/Icon';
import { isAdminAuthed, setAdminAuthed } from '@/lib/cms';
import { cn } from '@/lib/utils';
import { slides as seedSlides, news as seedNews, posts as seedPosts } from '@/data/site';
import { concerts as seedConcerts } from '@/data/concerts';
import { compositions as seedCompositions } from '@/data/compositions';
import { products as seedProducts } from '@/data/shop';
import { gallery as seedGallery } from '@/data/gallery';
import { quiz as seedQuiz } from '@/data/quiz';

const configs: (CollectionConfig & { icon: string })[] = [
  {
    key: 'slides',
    singular: 'Slide',
    icon: 'GalleryHorizontal',
    seed: seedSlides as unknown as Record<string, unknown>[],
    titleField: 'title',
    fields: [
      { name: 'tag', label: 'Tag' },
      { name: 'title', label: 'Title' },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'image', label: 'Image path', placeholder: '/img/slide-concert.svg' },
      { name: 'ctaLabel', label: 'CTA label' },
      { name: 'ctaHref', label: 'CTA link' },
    ],
  },
  {
    key: 'news',
    singular: 'News',
    icon: 'Radio',
    seed: seedNews as unknown as Record<string, unknown>[],
    titleField: 'title',
    fields: [
      { name: 'kicker', label: 'Kicker' },
      { name: 'title', label: 'Title' },
      { name: 'date', label: 'Date (YYYY-MM-DD)' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'image', label: 'Image path' },
      { name: 'source', label: 'Source' },
    ],
  },
  {
    key: 'posts',
    singular: 'Post',
    icon: 'Headphones',
    seed: seedPosts as unknown as Record<string, unknown>[],
    titleField: 'title',
    fields: [
      { name: 'category', label: 'Category' },
      { name: 'title', label: 'Title' },
      { name: 'blurb', label: 'Blurb', type: 'textarea' },
      { name: 'image', label: 'Image path' },
    ],
  },
  {
    key: 'concerts',
    singular: 'Concert',
    icon: 'Mic2',
    seed: seedConcerts as unknown as Record<string, unknown>[],
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'series', label: 'Series', type: 'select', options: ['Maestroverse', 'Live In Concert'] },
      { name: 'status', label: 'Status', type: 'select', options: ['Upcoming', 'Completed'] },
      { name: 'date', label: 'Date (YYYY-MM-DD)' },
      { name: 'venue', label: 'Venue' },
      { name: 'city', label: 'City' },
      { name: 'country', label: 'Country' },
      { name: 'bookingUrl', label: 'Booking URL' },
      { name: 'image', label: 'Image path' },
    ],
  },
  {
    key: 'compositions',
    singular: 'Composition',
    icon: 'Disc',
    seed: seedCompositions as unknown as Record<string, unknown>[],
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'year', label: 'Year', type: 'number' },
      { name: 'language', label: 'Language' },
      { name: 'director', label: 'Director' },
      { name: 'label', label: 'Music label' },
      { name: 'genre', label: 'Genre' },
      { name: 'songs', label: 'Songs', type: 'number' },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: ['Movies', 'Albums', 'Background Score', 'Devotional', 'Independent Music'],
      },
      { name: 'poster', label: 'Poster path' },
    ],
  },
  {
    key: 'products',
    singular: 'Product',
    icon: 'ShoppingBag',
    seed: seedProducts as unknown as Record<string, unknown>[],
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'type', label: 'Type', type: 'select', options: ['Books', 'CD', 'Vinyl', 'Merchandise', 'Music Collection'] },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'currency', label: 'Currency' },
      { name: 'image', label: 'Image path' },
      { name: 'badge', label: 'Badge' },
    ],
  },
  {
    key: 'gallery',
    singular: 'Photo',
    icon: 'Image',
    seed: seedGallery as unknown as Record<string, unknown>[],
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'caption', label: 'Caption' },
      { name: 'image', label: 'Image path' },
      { name: 'span', label: 'Span', type: 'select', options: ['normal', 'tall', 'wide'] },
    ],
  },
  {
    key: 'quiz',
    singular: 'Question',
    icon: 'Music',
    seed: seedQuiz as unknown as Record<string, unknown>[],
    titleField: 'question',
    fields: [
      { name: 'question', label: 'Question', type: 'textarea' },
      { name: 'answer', label: 'Correct option index (0-3)', type: 'number' },
      { name: 'fact', label: 'Fact', type: 'textarea' },
    ],
  },
];

export function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState('');
  const [active, setActive] = useState(configs[0].key);

  useEffect(() => {
    setAuthed(isAdminAuthed());
    setReady(true);
  }, []);

  const activeConfig = useMemo(() => configs.find((c) => c.key === active)!, [active]);

  if (!ready) return null;

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm rounded-3xl border border-line bg-paper p-8 shadow-soft">
        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
          <Lock className="h-5 w-5" />
        </span>
        <h2 className="font-display text-xl font-bold text-ink">Admin sign in</h2>
        <p className="mt-2 text-sm text-muted">
          This is a demo dashboard. Enter any passphrase to continue — edits are saved to your browser only.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAdminAuthed(true);
            setAuthed(true);
          }}
          className="mt-6"
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Passphrase"
            className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
          <button type="submit" className="btn-primary mt-4 w-full">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-4 flex items-center gap-2 px-3 text-sm font-semibold text-ink">
          <LayoutDashboard className="h-4 w-4 text-gold" /> Dashboard
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {configs.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={cn(
                'flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                active === c.key ? 'bg-ink text-white' : 'text-muted hover:bg-hover hover:text-ink',
              )}
            >
              <Icon name={c.icon} className="h-4 w-4" />
              {c.singular}
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            setAdminAuthed(false);
            setAuthed(false);
          }}
          className="mt-4 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-hover hover:text-red-500"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>

      {/* Panel */}
      <div>
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-line bg-hover p-4 text-sm text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            Changes are saved to your browser’s local storage and instantly reflected across the site
            (compositions, concerts, shop, gallery, slider and more). Use <strong>Reset</strong> to restore
            the original content. Image fields accept paths under <code>/img/…</code>.
          </p>
        </div>
        <CollectionManager key={activeConfig.key} config={activeConfig} />
      </div>
    </div>
  );
}
