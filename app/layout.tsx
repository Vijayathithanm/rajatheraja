import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';
import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Official`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.fullName }],
  applicationName: `${site.fullName} Official`,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    title: `${site.fullName} — Official`,
    description: site.description,
    siteName: site.fullName,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.fullName} — Official`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ilaiyaraaja',
  alternateName: 'Isaignani',
  jobTitle: ['Composer', 'Conductor', 'Singer', 'Lyricist', 'Music Producer'],
  description: site.description,
  url: site.url,
  sameAs: [
    'https://en.wikipedia.org/wiki/Ilaiyaraaja',
    'https://www.youtube.com/@ilaiyaraaja',
    'https://twitter.com/ilaiyaraaja',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
