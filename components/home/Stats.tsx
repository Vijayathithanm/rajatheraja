import { Section } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { Icon } from '@/components/ui/Icon';
import { stats } from '@/data/site';

export function Stats() {
  return (
    <Section tone="hover" className="py-16 sm:py-20">
      <RevealGroup className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <RevealItem key={s.id}>
            <div className="flex flex-col items-center rounded-2xl border border-line bg-paper px-4 py-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-gold-soft hover:shadow-card">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="font-display text-3xl font-bold text-ink sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-2 text-xs font-semibold uppercase tracking-widest2 text-muted">{s.label}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
