import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { CheckoutClient } from '@/components/checkout/CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Review your bag and complete your order from the Ilaiyaraaja collection.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/checkout' },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Bag"
        icon="ShoppingBag"
        title="Checkout"
        subtitle="Review your items and complete your order. This is a demonstration checkout — no payment is processed."
      />
      <Section>
        <CheckoutClient />
      </Section>
    </>
  );
}
