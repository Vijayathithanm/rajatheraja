import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Media } from '@/components/ui/Media';
import { bioIntro } from '@/data/biography';

export function BiographyPreview() {
  return (
    <Section id="biography">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right">
          <div className="relative mx-auto max-w-sm">
            <div className="overflow-hidden rounded-[2rem] border border-line shadow-soft">
              <Media
                src="/img/ilaiyaraaja-portrait-bw.jpg"
                fallbackSrc="/img/bio-portrait.svg"
                alt="Ilaiyaraaja in performance"
                width={573}
                height={415}
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-paper text-gold shadow-card">
              <Quote className="h-6 w-6" />
            </div>
          </div>
        </Reveal>

        <Reveal direction="left">
          <span className="eyebrow" style={{ justifyContent: 'flex-start' }}>Biography</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">{bioIntro.heading}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink">{bioIntro.lead}</p>
          {bioIntro.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <Link href="/biography" className="btn-outline mt-8">
            Read the full journey <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
