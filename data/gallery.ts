import type { GalleryItem } from '@/lib/types';
import { unsplash, PHOTO } from '@/lib/images';

/**
 * Exclusive photographs. Atmospheric HD photography (Unsplash, free license)
 * depicting the world of the maestro's music — orchestras, studios, stages and
 * audiences. Each falls back to a local SVG. Identity portraits are omitted by
 * design (no stranger's face is presented as the artist).
 */
export const gallery: GalleryItem[] = [
  { id: 'g1', title: 'At the Podium', caption: 'Conducting a live orchestra', image: unsplash(PHOTO.orchestra, 800, 800), fallback: '/img/gallery-1.svg', span: 'normal' },
  { id: 'g2', title: 'In the Studio', caption: 'Behind the mixing console', image: unsplash(PHOTO.studio, 800, 800), fallback: '/img/gallery-2.svg', span: 'normal' },
  { id: 'g3', title: 'The Manuscript', caption: 'Where a melody begins', image: unsplash(PHOTO.manuscript, 800, 1000), fallback: '/img/gallery-3.svg', span: 'tall' },
  { id: 'g4', title: 'Rehearsal', caption: 'With the ensemble', image: unsplash(PHOTO.stageLights, 800, 800), fallback: '/img/gallery-4.svg', span: 'normal' },
  { id: 'g5', title: 'Live In Concert', caption: 'On stage', image: unsplash(PHOTO.concert, 800, 800), fallback: '/img/gallery-5.svg', span: 'normal' },
  { id: 'g6', title: 'The Grand Hall', caption: 'A cathedral of sound', image: unsplash(PHOTO.hall, 800, 1000), fallback: '/img/gallery-6.svg', span: 'tall' },
  { id: 'g7', title: 'Recording Session', caption: 'Layering the orchestra', image: unsplash(PHOTO.concert2, 800, 800), fallback: '/img/gallery-7.svg', span: 'normal' },
  { id: 'g8', title: 'Applause', caption: 'A standing ovation', image: unsplash(PHOTO.crowd, 800, 800), fallback: '/img/gallery-8.svg', span: 'normal' },
  { id: 'g9', title: 'Legacy', caption: 'Five decades of music', image: unsplash(PHOTO.hands, 800, 1000), fallback: '/img/gallery-9.svg', span: 'tall' },
];
