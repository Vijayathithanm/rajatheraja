import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for the Ilaiyaraaja tribute website.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclaimer"
      sections={[
        {
          heading: 'Unofficial tribute',
          body: [
            'This is an independently built tribute and portfolio demonstration celebrating the work of Ilaiyaraaja. It is not affiliated with, endorsed by, or the official website of the artist or any associated organisation.',
          ],
        },
        {
          heading: 'Accuracy of information',
          body: [
            'Biographical facts, filmography and awards are compiled from publicly available open sources such as encyclopaedias and public databases. While care has been taken, some details may be simplified or approximate.',
          ],
        },
        {
          heading: 'Imagery',
          body: [
            'All imagery on this site consists of original, license-safe vector placeholders. They are intended to be replaced with officially licensed photography in a production deployment.',
          ],
        },
      ]}
    />
  );
}
