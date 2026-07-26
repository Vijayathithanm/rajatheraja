import Link from 'next/link';
import { MapPin, Mail, Phone, Music4 } from 'lucide-react';
import { footer, socials, site } from '@/data/site';
import { Icon } from '@/components/ui/Icon';
import { PianoDivider } from '@/components/ui/PianoDivider';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper">
      <PianoDivider className="pt-14" />
      <div className="container-page grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1 — Address */}
        <div>
          <Link href="/" className="mb-5 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold">
              <Music4 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg font-bold">Ilaiyaraaja</span>
          </Link>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {footer.address.name}
                <br />
                {footer.address.lines.join(', ')}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${footer.address.email}`} className="hover:text-ink">
                {footer.address.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <span>{footer.address.phone}</span>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(footer.address.mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest2 text-gold hover:text-gold-deep"
          >
            View on map →
          </a>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest2 text-faint">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {footer.quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Legal */}
        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest2 text-faint">Legal</h3>
          <ul className="space-y-3 text-sm">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Socials */}
        <div>
          <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest2 text-faint">Follow</h3>
          <ul className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-card"
                >
                  <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Subscribe to the official channels for the latest music, concerts and news.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-faint sm:flex-row">
          <p>© {year} {site.fullName}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            A tribute portfolio built with publicly available information. Not an official commercial site.
          </p>
        </div>
      </div>
    </footer>
  );
}
