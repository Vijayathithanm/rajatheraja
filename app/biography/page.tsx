import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Media } from '@/components/ui/Media';
import { Timeline } from '@/components/biography/Timeline';
import { bioIntro } from '@/data/biography';

export const metadata: Metadata = {
  title: 'Biography',
  description:
    'The life and journey of Isaignani Ilaiyaraaja, from Pannaipuram to the Royal Philharmonic Orchestra. An interactive timeline of milestones.',
  alternates: { canonical: '/biography' },
};

export default function BiographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Life Journey"
        icon="BookOpen"
        title="The Journey of Ilaiyaraaja"
        subtitle="Five decades of melody, from a rural childhood steeped in folk to the world’s great concert halls."
      />

      <Section className="pb-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal direction="right">
            <div className="relative mx-auto max-w-xs lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] border border-line shadow-soft">
                <Media
                  src="/img/ilaiyaraaja-portrait-color.jpg"
                  fallbackSrc="/img/hero-portrait.svg"
                  alt="Isaignani Ilaiyaraaja"
                  width={497}
                  height={960}
                  className="h-auto w-full"
                />
              </div>
              <span className="mt-4 block text-center text-xs font-semibold uppercase tracking-widest2 text-gold">
                Ilaiyaraaja
              </span>
            </div>
          </Reveal>

          <Reveal direction="left">
            <p className="text-lg leading-relaxed text-ink">{bioIntro.lead}</p>
            {bioIntro.body.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="hover" className="pt-8">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow justify-center">Interactive Timeline</span>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Milestones</h2>
          </Reveal>
          <Timeline />
        </div>
      </Section>
    </>
  );
}
