import type { Slide, Stat, Post, NewsItem } from '@/lib/types';
import { unsplash, PHOTO } from '@/lib/images';

export const site = {
  name: 'Ilaiyaraaja',
  fullName: 'Isaignani Ilaiyaraaja',
  tagline: 'Composer · Conductor · Singer · Lyricist · Music Producer',
  url: 'https://www.ilaiyaraaja-official.com',
  description:
    'The official-style portfolio of Isaignani Ilaiyaraaja, legendary Indian composer, conductor, singer and lyricist who has scored more than a thousand films across five decades.',
  keywords: [
    'Ilaiyaraaja',
    'Isaignani',
    'Indian film music',
    'composer',
    'Tamil cinema',
    'Maestro',
    'symphony',
    'Carnatic',
  ],
};

/** Primary navigation. `children` renders as an accessible dropdown menu. */
export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Biography', href: '/biography' },
  {
    label: 'Compositions',
    href: '/compositions',
    children: [
      { label: 'Movies', href: '/compositions?tab=Movies' },
      { label: 'Albums', href: '/compositions?tab=Albums' },
      { label: 'Background Score', href: '/compositions?tab=Background+Score' },
      { label: 'Devotional', href: '/compositions?tab=Devotional' },
    ],
  },
  {
    label: 'Concerts',
    href: '/concerts',
    children: [
      { label: 'Maestroverse', href: '/concerts?series=Maestroverse' },
      { label: 'Live In Concert', href: '/concerts?series=Live+In+Concert' },
    ],
  },
  { label: 'Awards', href: '/awards' },
  { label: 'Shop', href: '/shop' },
  {
    label: 'More',
    href: '/gallery',
    children: [
      { label: 'Gallery', href: '/gallery' },
      { label: 'Quiz', href: '/quiz' },
      { label: 'Apply Certificate', href: '/certificate' },
      { label: 'Admin', href: '/admin' },
    ],
  },
];

export const socials = [
  { label: 'YouTube', href: 'https://www.youtube.com/@ilaiyaraaja', icon: 'Youtube' },
  { label: 'Facebook', href: 'https://www.facebook.com/ilaiyaraaja', icon: 'Facebook' },
  { label: 'Twitter', href: 'https://twitter.com/ilaiyaraaja', icon: 'Twitter' },
  { label: 'Instagram', href: 'https://www.instagram.com/ilaiyaraaja', icon: 'Instagram' },
];

export const footer = {
  address: {
    name: 'Ilaiyaraaja',
    lines: ['Kodambakkam', 'Chennai 600024', 'Tamil Nadu, India'],
    email: 'contact@ilaiyaraaja-official.com',
    phone: '+91 44 0000 0000',
    mapQuery: 'Kodambakkam, Chennai, Tamil Nadu',
  },
  quickLinks: [
    { label: 'Biography', href: '/biography' },
    { label: 'Maestroverse', href: '/concerts?series=Maestroverse' },
    { label: 'Awards', href: '/awards' },
    { label: 'Compositions', href: '/compositions' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
};

export const stats: Stat[] = [
  { id: 'movies', label: 'Films Scored', value: 1000, suffix: '+', icon: 'Film' },
  { id: 'songs', label: 'Songs Composed', value: 7000, suffix: '+', icon: 'Music2' },
  { id: 'awards', label: 'Awards & Honours', value: 40, suffix: '+', icon: 'Award' },
  { id: 'albums', label: 'Albums Released', value: 200, suffix: '+', icon: 'Disc' },
  { id: 'languages', label: 'Languages', value: 9, suffix: '', icon: 'Radio' },
];

export const slides: Slide[] = [
  {
    id: 's1',
    tag: 'Upcoming Concert',
    title: 'Maestroverse World Tour',
    subtitle: 'A live symphonic journey through five decades of unforgettable melody.',
    image: unsplash(PHOTO.orchestra, 1800, 1000),
    fallback: '/img/slide-concert.svg',
    ctaLabel: 'View concerts',
    ctaHref: '/concerts',
  },
  {
    id: 's2',
    tag: 'Latest Album',
    title: 'New Symphonic Works',
    subtitle: 'Orchestral compositions blending Carnatic tradition with Western classical form.',
    image: unsplash(PHOTO.vinyl, 1800, 1000),
    fallback: '/img/slide-album.svg',
    ctaLabel: 'Explore compositions',
    ctaHref: '/compositions?tab=Albums',
  },
  {
    id: 's3',
    tag: 'On Screen',
    title: 'The Latest Scores',
    subtitle: 'From intimate dramas to sweeping epics, the sound of Indian cinema.',
    image: unsplash(PHOTO.stageLights, 1800, 1000),
    fallback: '/img/slide-movie.svg',
    ctaLabel: 'Browse films',
    ctaHref: '/compositions?tab=Movies',
  },
  {
    id: 's4',
    tag: 'Honours',
    title: 'A Legacy of Recognition',
    subtitle: 'Padma Vibhushan, National Awards and a lifetime of global acclaim.',
    image: unsplash(PHOTO.hall, 1800, 1000),
    fallback: '/img/slide-awards.svg',
    ctaLabel: 'See awards',
    ctaHref: '/awards',
  },
  {
    id: 's5',
    tag: 'Life Journey',
    title: 'From Pannaipuram to the World',
    subtitle: 'The story of a self-made maestro who redefined Indian music.',
    image: unsplash(PHOTO.crowd, 1800, 1000),
    fallback: '/img/slide-journey.svg',
    ctaLabel: 'Read biography',
    ctaHref: '/biography',
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    category: 'Coming Soon',
    title: 'Releasing Soon',
    blurb: 'A new score, mixed and mastered, is on its way to the screen.',
    image: unsplash(PHOTO.studio, 900, 700),
    fallback: '/img/post-comingsoon.svg',
  },
  {
    id: 'p2',
    category: 'Maestroverse',
    title: 'Maestroverse Concerts',
    blurb: 'The Maestro takes the stage, a world tour of live orchestral concerts.',
    image: unsplash(PHOTO.concert, 900, 700),
    fallback: '/img/post-maestroverse.svg',
  },
  {
    id: 'p3',
    category: 'Live Concert',
    title: 'Live In Concert',
    blurb: 'Timeless melodies performed live with a full symphony orchestra.',
    image: unsplash(PHOTO.crowd, 900, 700),
    fallback: '/img/post-liveconcert.svg',
  },
  {
    id: 'p4',
    category: 'Studio Sessions',
    title: 'Live From Studio',
    blurb: 'Behind the console, a rare look inside the maestro’s recording sessions.',
    image: unsplash(PHOTO.stageLights, 900, 700),
    fallback: '/img/post-studio.svg',
  },
];

export const news: NewsItem[] = [
  {
    id: 'n1',
    date: '2026-06-18',
    kicker: 'Symphony',
    title: 'Ilaiyaraaja premieres new symphony with a European orchestra',
    excerpt:
      'The maestro conducts a full symphonic work, the latest chapter in a lifelong dialogue between Indian melody and Western classical form.',
    image: unsplash(PHOTO.orchestra, 1000, 700),
    fallback: '/img/news-1.svg',
    source: 'Press Release',
  },
  {
    id: 'n2',
    date: '2026-05-02',
    kicker: 'World Tour',
    title: 'Maestroverse tour adds new cities across three continents',
    excerpt:
      'Fresh dates have been announced for the acclaimed live concert series, bringing the orchestral experience to audiences worldwide.',
    image: unsplash(PHOTO.concert2, 1000, 700),
    fallback: '/img/news-2.svg',
    source: 'Tour Desk',
  },
  {
    id: 'n3',
    date: '2026-03-14',
    kicker: 'New Release',
    title: 'A remastered anthology celebrates five decades of melody',
    excerpt:
      'Landmark compositions return in pristine sound, curated into a definitive anthology for a new generation of listeners.',
    image: unsplash(PHOTO.vinyl, 1000, 700),
    fallback: '/img/news-3.svg',
    source: 'Label',
  },
];

export const facts = [
  {
    id: 'f1',
    icon: 'Music',
    role: 'Composer',
    text: 'Widely regarded as one of the most prolific film composers in history, with music for more than a thousand films.',
  },
  {
    id: 'f2',
    icon: 'BookOpen',
    role: 'Lyricist',
    text: 'Beyond composing, he pens verse steeped in philosophy, devotion and Tamil literary tradition.',
  },
  {
    id: 'f3',
    icon: 'Image',
    role: 'Photographer',
    text: 'An eye as keen as his ear, he frames the world in stills with the same instinct he brings to sound.',
  },
  {
    id: 'f4',
    icon: 'Landmark',
    role: 'Member of Parliament',
    text: 'Nominated to the Rajya Sabha, carrying a voice for the arts into India’s highest legislative house.',
  },
];
