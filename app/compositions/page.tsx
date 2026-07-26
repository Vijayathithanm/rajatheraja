import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { CardGridSkeleton } from '@/components/ui/Skeleton';
import { CompositionsExplorer } from '@/components/compositions/CompositionsExplorer';

export const metadata: Metadata = {
  title: 'Compositions',
  description:
    'Explore the filmography and discography of Ilaiyaraaja, movies, albums, background scores, devotional and independent music. Filter, search and sort.',
  alternates: { canonical: '/compositions' },
};

export default function CompositionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discography"
        icon="Disc"
        title="Compositions"
        subtitle="A lifetime of music across films, albums and symphonies. Filter by category, search a title, and sort by year or scale."
      />
      <Section>
        <Suspense fallback={<CardGridSkeleton count={9} />}>
          <CompositionsExplorer />
        </Suspense>
      </Section>
    </>
  );
}
