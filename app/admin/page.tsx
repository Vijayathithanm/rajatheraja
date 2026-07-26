import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Content management dashboard for the Ilaiyaraaja website.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/admin' },
};

export default function AdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Content Management"
        icon="LayoutDashboard"
        title="Admin Dashboard"
        subtitle="Add and manage news, posts, concerts, compositions, products, the homepage slider, gallery and quiz."
      />
      <Section>
        <AdminDashboard />
      </Section>
    </>
  );
}
