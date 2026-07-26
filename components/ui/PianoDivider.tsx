/**
 * A slim piano-key section divider — a subtle, tasteful music motif
 * used between sections. Decorative only.
 */
export function PianoDivider({ className = '' }: { className?: string }) {
  const keys = Array.from({ length: 28 });
  const blackAfter = new Set<number>();
  keys.forEach((_, i) => {
    const p = i % 7;
    if (p === 0 || p === 1 || p === 3 || p === 4 || p === 5) blackAfter.add(i);
  });
  return (
    <div aria-hidden className={`container-page ${className}`}>
      <div className="relative mx-auto flex h-6 max-w-xs items-stretch">
        {keys.map((_, i) => (
          <div key={i} className="relative flex-1 border-r border-line first:border-l">
            {blackAfter.has(i) && (
              <span className="absolute right-0 top-0 h-3/5 w-[42%] -translate-y-0 translate-x-1/2 bg-ink" />
            )}
          </div>
        ))}
        <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gold/60" />
      </div>
    </div>
  );
}
