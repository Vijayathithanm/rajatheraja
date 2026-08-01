import type { TimelineEvent } from '@/lib/types';

export const bioIntro = {
  heading: 'A Life in Music',
  lead:
    'Born in 1943 in Pannaipuram, Tamil Nadu, Ilaiyaraaja transformed Indian film music by fusing Western classical counterpoint, Carnatic tradition and Tamil folk into a wholly original voice. Across five decades and thousands of songs, he has remained the standard against which film composers are measured.',
  body: [
    'Honoured with the title “Isaignani” (the wise man of music), Ilaiyaraaja became the first Asian to compose a full symphony performed by the Royal Philharmonic Orchestra in London.',
    'His work moves effortlessly between the intimate and the epic, a single melody line that can carry a village folk song or an entire orchestral movement. He is celebrated not only as a composer, but as a singer, lyricist, conductor and producer.',
  ],
};

/**
 * Timeline of publicly-documented milestones.
 * Factual, open-source biographical information, no copyrighted media.
 */
export const timeline: TimelineEvent[] = [
  {
    id: 't1',
    year: '1943',
    phase: 'Birth',
    title: 'Born in Pannaipuram',
    description:
      'Born on 2 June 1943 in Pannaipuram, Theni district, Tamil Nadu, into a rural family with deep roots in folk music.',
  },
  {
    id: 't2',
    year: '1950s',
    phase: 'Early Years',
    title: 'A childhood surrounded by folk',
    description:
      'Grew up immersed in Tamil folk traditions, travelling with a musical troupe and absorbing the melodies of the countryside.',
  },
  {
    id: 't3',
    year: '1968',
    phase: 'Education',
    title: 'Formal study of music',
    description:
      'Trained in classical guitar and Western classical composition, earning a diploma and mastering orchestration and counterpoint.',
  },
  {
    id: 't4',
    year: '1976',
    phase: 'Rise to Fame',
    title: 'Debut that changed film music',
    description:
      'His breakthrough film score introduced a fresh fusion of folk and Western sensibility, redefining the sound of Tamil cinema.',
  },
  {
    id: 't5',
    year: '1980s',
    phase: 'Milestones',
    title: 'The golden decade',
    description:
      'A staggering run of landmark scores across Tamil, Telugu, Malayalam, Kannada and Hindi cinema established Ilaiyaraaja as a national phenomenon.',
  },
  {
    id: 't6',
    year: '1986',
    phase: 'International',
    title: 'How To Name It & Nothing But Wind',
    description:
      'Released pioneering fusion albums blending Bach and Carnatic music, and later composed for the Royal Philharmonic Orchestra.',
  },
  {
    id: 't7',
    year: '1993',
    phase: 'Recognition',
    title: 'Symphony with the Royal Philharmonic',
    description:
      'Became the first Asian to compose and record a full symphony performed by the Royal Philharmonic Orchestra, London.',
  },
  {
    id: 't8',
    year: '2010',
    phase: 'Achievements',
    title: 'Padma Bhushan',
    description:
      'Conferred the Padma Bhushan, one of India’s highest civilian honours, in recognition of his contribution to music.',
  },
  {
    id: 't9',
    year: '2018',
    phase: 'Achievements',
    title: 'Padma Vibhushan',
    description:
      'Awarded the Padma Vibhushan, India’s second-highest civilian honour, cementing his place among the nation’s greatest artists.',
  },
  {
    id: 't10',
    year: '2022',
    phase: 'Life Journey',
    title: 'Nominated to the Rajya Sabha',
    description:
      'Nominated to the upper house of India’s Parliament, extending his lifelong service to music and culture into public life.',
  },
];
