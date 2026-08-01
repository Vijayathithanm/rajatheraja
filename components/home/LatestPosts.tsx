'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Media } from '@/components/ui/Media';
import { CardGridSkeleton } from '@/components/ui/Skeleton';
import { getPosts } from '@/lib/services';

export function LatestPosts() {
  const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  return (
    <Section>
      <SectionHeading
        eyebrow="Latest"
        icon="Headphones"
        title="Latest Posts"
        subtitle="Coming soon, live concerts and studio sessions, the newest from the maestro’s world."
      />
      {isLoading || !posts ? (
        <CardGridSkeleton count={4} />
      ) : (
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <RevealItem key={p.id}>
              <Link href="/concerts" className="card card-hover group block h-full overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Media
                    src={p.image}
                    fallbackSrc={p.fallback}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-widest2 text-gold">
                    {p.category}
                  </span>
                  <h3 className="mt-2 flex items-center justify-between gap-2 font-display text-lg font-bold text-ink">
                    {p.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-gold" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </Section>
  );
}
