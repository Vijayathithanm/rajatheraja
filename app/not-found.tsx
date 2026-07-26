import Link from 'next/link';
import { Home, Music4 } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 pt-[72px]">
      <div className="text-center">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Music4 className="h-7 w-7" />
        </span>
        <p className="font-display text-6xl font-black text-ink">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink">This note is off the score</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you’re looking for doesn’t exist. Let’s get you back to the music.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
