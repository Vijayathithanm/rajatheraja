import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { AwardsExplorer } from '@/components/awards/AwardsExplorer';

export const metadata: Metadata = {
  title: 'Awards & Honours',
  description:
    'National Awards, State Awards, Filmfare, Padma honours, honorary doctorates and international recognition earned by Ilaiyaraaja across his career.',
  alternates: { canonical: '/awards' },
};

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        icon="Award"
        title="Awards & Honours"
        subtitle="A lifetime of acclaim — from India’s highest civilian honours to the world’s great concert halls."
      />
      <Section>
        <AwardsExplorer />
      </Section>
    </>
  );
}
