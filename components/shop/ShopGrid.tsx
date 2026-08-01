'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Plus, Check, ArrowRight } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { CardGridSkeleton } from '@/components/ui/Skeleton';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { getProducts } from '@/lib/services';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/hooks';
import { addToCart } from '@/lib/cart';
import type { ProductType } from '@/lib/types';

const TYPES: (ProductType | 'All')[] = ['All', 'Books', 'CD', 'Vinyl', 'Merchandise', 'Music Collection'];

export function ShopGrid() {
  const { data, isLoading } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const [type, setType] = useState<ProductType | 'All'>('All');
  const { items, count } = useCart();

  const qtyById = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach((i) => (map[i.id] = i.qty));
    return map;
  }, [items]);

  const list = useMemo(() => {
    if (!data) return [];
    return type === 'All' ? data : data.filter((p) => p.type === type);
  }, [data, type]);

  return (
    <div>
      <div className="mb-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap justify-center gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                type === t ? 'border-ink bg-ink text-white' : 'border-line text-muted hover:border-gold hover:text-gold',
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <Link
          href="/checkout"
          className={cn(
            'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
            count ? 'border-gold bg-gold text-white hover:bg-gold-deep' : 'border-line text-ink hover:border-gold',
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          {count ? `Checkout · ${count}` : '0 in bag'}
          {count > 0 && <ArrowRight className="h-4 w-4" />}
        </Link>
      </div>

      {isLoading || !data ? (
        <CardGridSkeleton count={9} />
      ) : (
        <RevealGroup key={type} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const inBag = qtyById[p.id] ?? 0;
            return (
              <RevealItem key={p.id}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-hover">
                    <Media
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-widest2 text-white">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-widest2 text-faint">{p.type}</span>
                    <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-ink">{p.name}</h3>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="font-display text-lg font-bold text-ink">{formatPrice(p.price, p.currency)}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all',
                          inBag ? 'bg-gold text-white' : 'bg-ink text-white hover:bg-black',
                        )}
                        aria-label={`Add ${p.name} to bag`}
                      >
                        {inBag ? (
                          <>
                            <Check className="h-3.5 w-3.5" /> Added {inBag > 1 ? `(${inBag})` : ''}
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      )}
      <p className="mt-10 text-center text-xs text-faint">
        Products shown are illustrative placeholders. Checkout is a demonstration — no payment is processed.
      </p>
    </div>
  );
}
