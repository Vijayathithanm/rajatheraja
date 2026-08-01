'use client';

import { useEffect, useRef, useState } from 'react';
import { getCart, cartCount, cartSubtotal, type CartItem } from '@/lib/cart';

/** Count from 0 → target once the element scrolls into view. */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

/** Track document scroll progress 0 → 1 for a top progress bar. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** Live view of the shopping cart, kept in sync across pages. */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    window.addEventListener('cart:update', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('cart:update', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return {
    items,
    count: cartCount(items),
    subtotal: cartSubtotal(items),
  };
}

/** Re-render subscribers when the localStorage-backed CMS changes. */
export function useCmsVersion() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const onUpdate = () => setV((x) => x + 1);
    window.addEventListener('cms:update', onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener('cms:update', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, []);
  return v;
}
