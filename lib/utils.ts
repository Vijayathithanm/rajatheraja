import { clsx, type ClassValue } from 'clsx';

/** Tailwind-friendly conditional className helper. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Prefix a public asset path with the deploy base path (GitHub Pages safe). */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path.startsWith('/')) return path;
  return `${base}${path}`;
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatMonthYear(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

export function formatPrice(value: number, currency = '₹') {
  return `${currency}${value.toLocaleString('en-IN')}`;
}

/** Small deterministic delay so React Query loading states are visible. */
export function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
