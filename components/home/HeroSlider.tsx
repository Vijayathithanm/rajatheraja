'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Media } from '@/components/ui/Media';
import { getSlides } from '@/lib/services';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

export function HeroSlider() {
  const { data: slides } = useQuery({ queryKey: ['slides'], queryFn: getSlides });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!slides) {
    return (
      <div className="container-page py-8">
        <Skeleton className="aspect-[16/7] w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-hover shadow-soft">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((s) => (
              <div className="embla__slide" key={s.id}>
                <div className="relative aspect-[16/9] w-full sm:aspect-[16/7]">
                  <Media src={s.image} alt={s.title} fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="container-page">
                      <div className="max-w-lg">
                        <span className="eyebrow">{s.tag}</span>
                        <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">
                          {s.title}
                        </h2>
                        <p className="mt-3 hidden text-sm text-muted sm:block sm:text-base">{s.subtitle}</p>
                        <Link href={s.ctaHref} className="btn-primary mt-6">
                          {s.ctaLabel} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper/80 text-ink backdrop-blur transition hover:bg-paper hover:text-gold sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper/80 text-ink backdrop-blur transition hover:bg-paper hover:text-gold sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all',
                i === selected ? 'w-7 bg-gold' : 'w-2 bg-ink/25 hover:bg-ink/40',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
