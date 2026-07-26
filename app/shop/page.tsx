import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { ShopGrid } from '@/components/shop/ShopGrid';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Books, CDs, vinyl records, merchandise and music collections celebrating the legacy of Ilaiyaraaja.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="E-Shopping"
        icon="ShoppingBag"
        title="The Collection"
        subtitle="Books, CDs, vinyl and merchandise, curated keepsakes for the connoisseur of great music."
      />
      <Section>
        <ShopGrid />
      </Section>
    </>
  );
}
