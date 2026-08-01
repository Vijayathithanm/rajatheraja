'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Disc, Play } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { MusicNotes, Equalizer } from '@/components/ui/MusicNotes';
import { site } from '@/data/site';

const roles = ['Composer', 'Conductor', 'Singer', 'Lyricist', 'Music Producer'];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <MusicNotes count={12} />
      {/* faint treble-clef watermark */}
      <Disc
        aria-hidden
        className="pointer-events-none absolute -right-24 top-28 h-[32rem] w-[32rem] text-line animate-spin-slow"
        strokeWidth={0.4}
      />

      <div className="container-page grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Copy */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <Equalizer className="h-4" />
            Isaignani Ilaiyaraaja
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-display text-[2.75rem] font-black leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Ilaiyaraaja
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {roles.map((r, i) => (
              <span key={r} className="flex items-center gap-3 text-sm font-medium text-muted">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
                {r}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Ilaiyaraaja, whose melodies scored a generation. Composer of more than a thousand films,
            still shaping the sound of Indian music with a rare fusion of Carnatic tradition, Western
            classical form and Tamil folk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href="/biography" className="btn-primary">
              Biography <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/compositions" className="btn-gold">
              <Play className="h-4 w-4" /> Compositions
            </Link>
            <Link href="/concerts" className="btn-outline">
              Concerts
            </Link>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto w-full max-w-md lg:order-2"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-hover shadow-soft">
            <Media
              src="/img/ilaiyaraaja-portrait-color.jpg"
              fallbackSrc="/img/hero-portrait.svg"
              alt="Portrait of Isaignani Ilaiyaraaja"
              width={497}
              height={960}
              priority
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-card">
            <Equalizer />
            <span className="text-xs font-semibold uppercase tracking-widest2 text-ink">Now Playing</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
