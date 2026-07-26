import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { GalleryMasonry } from '@/components/gallery/GalleryMasonry';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Exclusive photographs and frames from the world of Ilaiyaraaja, on stage, in the studio and beyond.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Exclusive Photographs"
        icon="Image"
        title="Gallery"
        subtitle="Moments from a lifetime in music, click any frame to view it up close."
      />
      <Section>
        <GalleryMasonry />
      </Section>
    </>
  );
}
