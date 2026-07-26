import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for the Ilaiyaraaja tribute website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      sections={[
        {
          heading: 'Acceptance of terms',
          body: ['By accessing this website you agree to use it for personal, non-commercial and informational purposes only.'],
        },
        {
          heading: 'Intellectual property',
          body: [
            'The music, film titles and honours referenced here are the property of their respective rights holders. This site uses only publicly available factual information and original placeholder artwork. No copyrighted media is hosted or distributed.',
          ],
        },
        {
          heading: 'Commerce',
          body: ['Products shown in the shop are illustrative placeholders. No real transactions are processed in this demonstration.'],
        },
        {
          heading: 'Changes',
          body: ['These terms may be updated at any time. Continued use of the site constitutes acceptance of the current terms.'],
        },
      ]}
    />
  );
}
