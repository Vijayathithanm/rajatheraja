'use client';

import { useScrollProgress } from '@/lib/hooks';

/** Thin gold progress bar fixed to the very top of the viewport. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden>
      <div
        className="h-full origin-left bg-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
