'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { timeline } from '@/data/biography';

const phaseIcon: Record<string, string> = {
  Birth: 'Baby',
  'Early Years': 'Music',
  Education: 'GraduationCap',
  'Rise to Fame': 'TrendingUp',
  Milestones: 'Star',
  International: 'Globe',
  Recognition: 'Award',
  Achievements: 'Medal',
  'Life Journey': 'Landmark',
};

export function Timeline() {
  return (
    <ol className="relative ml-3 border-l-2 border-line sm:ml-5">
      {timeline.map((e, i) => (
        <motion.li
          key={e.id}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10 pl-8 last:mb-0 sm:pl-12"
        >
          {/* Node */}
          <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold bg-paper sm:-left-[15px]">
            <span className="h-2 w-2 rounded-full bg-gold" />
          </span>

          <div className="rounded-2xl border border-line bg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-card">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-2xl font-bold text-gold">{e.year}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest2 text-muted">
                <Icon name={phaseIcon[e.phase] ?? 'Music2'} className="h-3.5 w-3.5 text-gold" />
                {e.phase}
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-bold text-ink">{e.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{e.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
