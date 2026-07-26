'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X, Film, Disc, Award as AwardIcon, MapPin, CornerDownLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { search, type SearchResult } from '@/lib/services';

const typeIcon: Record<string, React.ReactNode> = {
  Movie: <Film className="h-4 w-4" />,
  Album: <Disc className="h-4 w-4" />,
  Concert: <MapPin className="h-4 w-4" />,
  Award: <AwardIcon className="h-4 w-4" />,
};

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    let active = true;
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      const r = await search(query);
      if (active) {
        setResults(r);
        setLoading(false);
      }
    }, 200);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-24 sm:pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-paper shadow-lift"
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, albums, concerts, awards…"
                className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-faint"
                aria-label="Search query"
              />
              <button onClick={onClose} aria-label="Close search" className="text-faint hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {loading && <p className="px-4 py-6 text-sm text-muted">Searching…</p>}
              {!loading && query && results.length === 0 && (
                <p className="px-4 py-6 text-sm text-muted">No results for “{query}”.</p>
              )}
              {!loading && !query && (
                <p className="px-4 py-6 text-sm text-muted">
                  Try “Nayakan”, “Maestroverse” or “Padma”.
                </p>
              )}
              <ul>
                {results.map((r) => (
                  <li key={`${r.type}-${r.id}`}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-hover"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-gold">
                        {typeIcon[r.type] ?? <Search className="h-4 w-4" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">{r.title}</span>
                        {r.meta && <span className="block text-xs text-muted">{r.meta}</span>}
                      </span>
                      <span className="text-[0.7rem] uppercase tracking-widest2 text-faint">{r.type}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-line px-5 py-2.5 text-[0.7rem] text-faint">
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="h-3 w-3" /> to open
              </span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
