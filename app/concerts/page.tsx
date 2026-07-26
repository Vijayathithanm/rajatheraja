import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Skeleton } from '@/components/ui/Skeleton';
import { ConcertsExplorer } from '@/components/concerts/ConcertsExplorer';

export const metadata: Metadata = {
  title: 'Concerts',
  description:
    'Maestroverse and Live In Concert, upcoming and past performances of Ilaiyaraaja around the world, with venues, cities and booking links.',
  alternates: { canonical: '/concerts' },
};

export default function ConcertsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live On Stage"
        icon="Mic2"
        title="Concerts"
        subtitle="Experience the maestro live, a symphonic journey through the songs that scored a generation."
      />
      <Section>
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <ConcertsExplorer />
        </Suspense>
      </Section>
    </>
  );
}
