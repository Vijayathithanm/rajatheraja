'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Counter } from '@/components/ui/Counter';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { awards, awardStats } from '@/data/awards';
import { cn } from '@/lib/utils';
import type { AwardCategory } from '@/lib/types';

const CATS: (AwardCategory | 'All')[] = [
  'All',
  'Padma',
  'National',
  'State',
  'Filmfare',
  'International',
  'Honorary Doctorate',
];

const catIcon: Record<string, string> = {
  Padma: 'Award',
  National: 'Trophy',
  State: 'Medal',
  Filmfare: 'Star',
  International: 'Globe',
  'Honorary Doctorate': 'GraduationCap',
};

export function AwardsExplorer() {
  const [cat, setCat] = useState<AwardCategory | 'All'>('All');

  const list = useMemo(() => {
    const l = cat === 'All' ? awards : awards.filter((a) => a.category === cat);
    return [...l].sort((a, b) => b.year - a.year);
  }, [cat]);

  return (
    <div>
      {/* Counters */}
      <RevealGroup className="mb-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {awardStats.map((s) => (
          <RevealItem key={s.id}>
            <div className="flex flex-col items-center rounded-2xl border border-line bg-paper px-4 py-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-card">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="font-display text-3xl font-bold text-ink sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix ?? ''} />
              </span>
              <span className="mt-2 text-xs font-semibold uppercase tracking-widest2 text-muted">{s.label}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Category filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
              cat === c ? 'border-ink bg-ink text-white' : 'border-line text-muted hover:border-gold hover:text-gold',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <ol className="relative mx-auto max-w-3xl border-l-2 border-line pl-2">
        {list.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
            className="relative mb-6 pl-8 last:mb-0"
          >
            <span className="absolute -left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold bg-paper">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5 transition-all duration-500 hover:border-gold-soft hover:shadow-card">
              <span className="mt-0.5 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hover text-gold sm:flex">
                <Icon name={catIcon[a.category] ?? 'Award'} className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-xl font-bold text-gold">{a.year}</span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.66rem] font-semibold uppercase tracking-widest2 text-muted">
                    {a.category}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">{a.detail}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
