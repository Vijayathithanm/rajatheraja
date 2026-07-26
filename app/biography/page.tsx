import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Timeline } from '@/components/biography/Timeline';
import { bioIntro } from '@/data/biography';

export const metadata: Metadata = {
  title: 'Biography',
  description:
    'The life and journey of Isaignani Ilaiyaraaja — from Pannaipuram to the Royal Philharmonic Orchestra. An interactive timeline of milestones.',
  alternates: { canonical: '/biography' },
};

export default function BiographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Life Journey"
        icon="BookOpen"
        title="The Journey of a Maestro"
        subtitle="Five decades of melody — from a rural childhood steeped in folk to the world’s great concert halls."
      />

      <Section className="pb-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
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
