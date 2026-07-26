import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { CertificateForm } from '@/components/certificate/CertificateForm';

export const metadata: Metadata = {
  title: 'Apply Certificate',
  description: 'Apply for a commemorative appreciation certificate celebrating the music of Ilaiyaraaja.',
  alternates: { canonical: '/certificate' },
};

export default function CertificatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Others"
        icon="Award"
        title="Apply for a Certificate"
        subtitle="Request a commemorative appreciation certificate. Fill in the form and we’ll take care of the rest."
      />
      <Section>
        <CertificateForm />
      </Section>
    </>
  );
}
