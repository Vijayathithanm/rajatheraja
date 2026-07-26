'use client';

import { Music, Music2, Music4 } from 'lucide-react';
import { useMemo } from 'react';

const glyphs = [Music, Music2, Music4];

/**
 * Subtle floating music notes — a decorative, low-opacity background motif.
 * Purely aesthetic; hidden from assistive tech.
 */
export function MusicNotes({ count = 10, className = '' }: { count?: number; className?: string }) {
  const notes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: `${(i * 97) % 100}%`,
        size: 16 + ((i * 7) % 22),
        delay: `${(i * 0.9) % 8}s`,
        duration: `${8 + ((i * 1.7) % 6)}s`,
        Glyph: glyphs[i % glyphs.length],
        opacity: 0.05 + ((i % 4) * 0.03),
      })),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {notes.map((n, i) => (
        <n.Glyph
          key={i}
          className="absolute bottom-0 text-gold animate-float-note"
          style={{
            left: n.left,
            width: n.size,
            height: n.size,
            animationDelay: n.delay,
            animationDuration: n.duration,
            opacity: n.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Animated equalizer bars. */
export function Equalizer({ bars = 5, className = '' }: { bars?: number; className?: string }) {
  return (
    <div aria-hidden className={`flex items-end gap-1 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="w-1 origin-bottom rounded-full bg-gold animate-eq"
          style={{ height: 22, animationDelay: `${(i * 0.15).toFixed(2)}s` }}
        />
      ))}
    </div>
  );
}
