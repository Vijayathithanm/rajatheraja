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
            'Photographs of the artist are used for identification and tribute purposes and remain the property of their respective photographers and copyright owners. All other imagery consists of original vector placeholders or free-licensed stock photography.',
          ],
        },
      ]}
    />
  );
}
