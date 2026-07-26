'use client';

import { useQuery } from '@tanstack/react-query';
import { CalendarDays } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Media } from '@/components/ui/Media';
import { Skeleton } from '@/components/ui/Skeleton';
import { getNews } from '@/lib/services';
import { formatDate } from '@/lib/utils';

export function LatestNews() {
  const { data: news, isLoading } = useQuery({ queryKey: ['news'], queryFn: getNews });

  return (
    <Section tone="hover">
      <SectionHeading
        eyebrow="Newsroom"
        icon="Radio"
        title="Latest News"
        subtitle="Updates from concerts, releases and honours — refreshed from the press desk."
      />

      {isLoading || !news ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.08}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Media
                    src={n.image}
                    fallbackSrc={n.fallback}
                    alt={n.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="font-semibold uppercase tracking-widest2 text-gold">{n.kicker}</span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" /> {formatDate(n.date)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink">{n.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{n.excerpt}</p>
                  {n.source && <p className="mt-4 text-xs text-faint">Source: {n.source}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
