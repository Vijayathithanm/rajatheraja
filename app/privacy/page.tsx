import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Ilaiyaraaja tribute website.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      sections={[
        {
          heading: 'Information we collect',
          body: [
            'This demonstration website does not run a server backend. Any information entered into forms (such as the certificate application or search) stays within your browser and is not transmitted to or stored on any external server.',
          ],
        },
        {
          heading: 'Local storage',
          body: [
            'The admin dashboard demo persists content edits to your browser’s local storage so you can preview changes. Clearing your browser data removes them. No personal data is shared with third parties.',
          ],
        },
        {
          heading: 'Cookies & analytics',
          body: ['No tracking cookies or third-party analytics are used in this demonstration build.'],
        },
        {
          heading: 'Contact',
          body: ['For any privacy questions, please use the contact details provided in the footer.'],
        },
      ]}
    />
  );
}
