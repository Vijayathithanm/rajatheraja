'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronLeft, ChevronRight, Film, Calendar, Languages, User, Tag, Disc } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { CardGridSkeleton } from '@/components/ui/Skeleton';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { getCompositions } from '@/lib/services';
import { cn } from '@/lib/utils';
import type { Composition, CompositionCategory } from '@/lib/types';

const TABS: (CompositionCategory | 'All')[] = [
  'All',
  'Movies',
  'Albums',
  'Background Score',
  'Devotional',
  'Independent Music',
];

type Sort = 'year-desc' | 'year-asc' | 'title' | 'songs';
const PAGE_SIZE = 9;

export function CompositionsExplorer() {
  const params = useSearchParams();
  const initialTab = (params.get('tab') as CompositionCategory) ?? 'All';

  const { data, isLoading } = useQuery({ queryKey: ['compositions'], queryFn: getCompositions });
  const [tab, setTab] = useState<CompositionCategory | 'All'>(
    TABS.includes(initialTab) ? initialTab : 'All',
  );
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('year-desc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list: Composition[] = data ?? [];
    if (tab !== 'All') list = list.filter((c) => c.category === tab);
    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter((c) =>
        `${c.title} ${c.director} ${c.language} ${c.genre} ${c.label}`.toLowerCase().includes(q),
      );
    const sorted = [...list];
    sorted.sort((a, b) => {
      switch (sort) {
        case 'year-asc':
          return a.year - b.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'songs':
          return b.songs - a.songs;
        default:
          return b.year - a.year;
      }
    });
    return sorted;
  }, [data, tab, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const reset = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => reset(() => setTab(t))}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
              tab === t
                ? 'border-ink bg-ink text-white'
                : 'border-line text-muted hover:border-gold hover:text-gold',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => reset(() => setQuery(e.target.value))}
            placeholder="Search compositions…"
            aria-label="Search compositions"
            className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-gold"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sort" className="text-muted">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => reset(() => setSort(e.target.value as Sort))}
            className="rounded-full border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-gold"
          >
            <option value="year-desc">Newest first</option>
            <option value="year-asc">Oldest first</option>
            <option value="title">Title A–Z</option>
            <option value="songs">Most songs</option>
          </select>
        </div>
      </div>

      {isLoading || !data ? (
        <CardGridSkeleton count={9} />
      ) : pageItems.length === 0 ? (
        <p className="py-16 text-center text-muted">No compositions match your search.</p>
      ) : (
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((c) => (
            <RevealItem key={c.id}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-hover">
                  <Media
                    src={c.poster}
                    alt={`${c.title} poster`}
                    fill
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest2 text-ink backdrop-blur">
                    {c.category === 'Albums' ? 'Album' : c.category === 'Movies' ? 'Film' : c.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold leading-tight text-ink">{c.title}</h3>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted">
                    <Meta icon={<Calendar className="h-3.5 w-3.5" />} label={`${c.year}`} />
                    <Meta icon={<Languages className="h-3.5 w-3.5" />} label={c.language} />
                    <Meta icon={<User className="h-3.5 w-3.5" />} label={c.director} />
                    <Meta icon={<Disc className="h-3.5 w-3.5" />} label={c.label} />
                    <Meta icon={<Tag className="h-3.5 w-3.5" />} label={c.genre} />
                    <Meta icon={<Film className="h-3.5 w-3.5" />} label={c.songs ? `${c.songs} songs` : 'Score'} />
                  </dl>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-gold hover:text-gold disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                'h-10 w-10 rounded-full text-sm font-semibold transition',
                current === i + 1 ? 'bg-ink text-white' : 'border border-line text-muted hover:border-gold hover:text-gold',
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current === totalPages}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-gold hover:text-gold disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function Meta({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 truncate">
      <span className="text-gold">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
