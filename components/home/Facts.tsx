import { Section, SectionHeading } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { facts } from '@/data/site';

export function Facts() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Many Facets"
        icon="Sparkles"
        title="Interesting Facts"
        subtitle="A composer, a lyricist, a photographer and a parliamentarian, the many dimensions of Ilaiyaraaja."
      />
      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <RevealItem key={f.id}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-soft hover:shadow-lift">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
                <Icon name={f.icon} className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="font-display text-lg font-bold text-ink">{f.role}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.text}</p>
              <span className="pointer-events-none absolute -bottom-6 -right-6 font-display text-8xl font-black text-hover transition-colors duration-500 group-hover:text-gold/10">
                ♪
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
