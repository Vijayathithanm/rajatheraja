'use client';

import { useCountUp } from '@/lib/hooks';

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {current.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
