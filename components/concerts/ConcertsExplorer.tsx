'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { MapPin, CalendarDays, Ticket, Globe } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { Skeleton } from '@/components/ui/Skeleton';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { getConcerts } from '@/lib/services';
import { cn, formatDate } from '@/lib/utils';
import type { ConcertSeries, ConcertStatus } from '@/lib/types';

const SERIES: ConcertSeries[] = ['Maestroverse', 'Live In Concert'];
const STATUS: ConcertStatus[] = ['Upcoming', 'Completed'];

export function ConcertsExplorer() {
  const params = useSearchParams();
  const initialSeries = (params.get('series') as ConcertSeries) ?? 'Maestroverse';

  const { data, isLoading } = useQuery({ queryKey: ['concerts'], queryFn: getConcerts });
  const [series, setSeries] = useState<ConcertSeries>(
    SERIES.includes(initialSeries) ? initialSeries : 'Maestroverse',
  );
  const [status, setStatus] = useState<ConcertStatus | 'All'>('All');

  const list = useMemo(() => {
    let l = (data ?? []).filter((c) => c.series === series);
    if (status !== 'All') l = l.filter((c) => c.status === status);
    return l.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [data, series, status]);

  return (
    <div>
      {/* Series tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {SERIES.map((s) => (
          <button
            key={s}
            onClick={() => setSeries(s)}
            className={cn(
              'rounded-full border px-5 py-2.5 text-sm font-semibold transition-all',
              series === s ? 'border-ink bg-ink text-white' : 'border-line text-muted hover:border-gold hover:text-gold',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {(['All', ...STATUS] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest2 transition-colors',
              status === s ? 'text-gold' : 'text-faint hover:text-ink',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading || !data ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="py-16 text-center text-muted">No {status !== 'All' ? status.toLowerCase() : ''} concerts in this series yet.</p>
      ) : (
        <RevealGroup key={`${series}|${status}`} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {list.map((c) => (
            <RevealItem key={c.id}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden sm:flex-row">
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-2/5">
                  <Media src={c.image} fallbackSrc={c.fallback} alt={c.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw, 40vw" />
                  <span
                    className={cn(
                      'absolute left-3 top-3 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest2',
                      c.status === 'Upcoming' ? 'bg-gold text-white' : 'bg-paper/90 text-muted backdrop-blur',
                    )}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-ink">{c.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    <li className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gold" /> {formatDate(c.date)}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold" /> {c.venue}, {c.city}
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gold" /> {c.country}
                    </li>
                  </ul>
                  <div className="mt-auto pt-5">
                    {c.status === 'Upcoming' ? (
                      <a href={c.bookingUrl} className="btn-gold w-full sm:w-auto">
                        <Ticket className="h-4 w-4" /> Book tickets
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-faint">
                        <Ticket className="h-4 w-4" /> Concluded
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
