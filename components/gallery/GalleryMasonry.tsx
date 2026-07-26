'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Media } from '@/components/ui/Media';
import { Skeleton } from '@/components/ui/Skeleton';
import { getGallery } from '@/lib/services';
import { cn } from '@/lib/utils';

export function GalleryMasonry() {
  const { data, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: getGallery });
  const [active, setActive] = useState<number | null>(null);

  const items = data ?? [];
  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? i : (i + items.length - 1) % items.length));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % items.length));

  if (isLoading || !data) {
    return (
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className={cn('mb-5 w-full', i % 3 === 0 ? 'h-96' : 'h-72')} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <motion.button
            key={g.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            onClick={() => open(i)}
            className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-hover text-left"
          >
            <div className={cn('relative w-full', g.span === 'tall' ? 'aspect-[3/4]' : 'aspect-square')}>
              <Media
                src={g.image}
                alt={g.title}
                fill
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                sizes="(max-width:640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div>
                  <p className="font-display text-lg font-bold text-white">{g.title}</p>
                  <p className="text-xs text-white/80">{g.caption}</p>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="absolute right-5 top-5 text-white/80 hover:text-white">
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.figure
              key={items[active].id}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[82vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-paper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full">
                <Media src={items[active].image} alt={items[active].title} fill className="object-cover" sizes="80vw" />
              </div>
              <figcaption className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-display text-lg font-bold text-ink">{items[active].title}</p>
                  <p className="text-sm text-muted">{items[active].caption}</p>
                </div>
                <span className="text-xs text-faint">
                  {active + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
