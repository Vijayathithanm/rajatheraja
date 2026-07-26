import type { Award } from '@/lib/types';

/**
 * Publicly-documented honours (factual, open-source information).
 */
export const awards: Award[] = [
  { id: 'aw1', year: 2018, title: 'Padma Vibhushan', detail: 'India’s second-highest civilian award.', category: 'Padma' },
  { id: 'aw2', year: 2010, title: 'Padma Bhushan', detail: 'India’s third-highest civilian award.', category: 'Padma' },
  { id: 'aw3', year: 2012, title: 'Sangeet Natak Akademi Award', detail: 'For creative music, from India’s national academy.', category: 'National' },
  { id: 'aw4', year: 2013, title: 'National Film Award — Best Music Direction', detail: 'For an acclaimed feature-film score.', category: 'National' },
  { id: 'aw5', year: 2010, title: 'National Film Award — Best Music Direction', detail: 'For outstanding composition in feature film.', category: 'National' },
  { id: 'aw6', year: 1988, title: 'National Film Award — Best Music Direction', detail: 'Recognising a landmark film score.', category: 'National' },
  { id: 'aw7', year: 1985, title: 'National Film Award — Best Music Direction', detail: 'Early national recognition for film music.', category: 'National' },
  { id: 'aw8', year: 1979, title: 'Tamil Nadu State Film Award', detail: 'Best Music Director, State honours.', category: 'State' },
  { id: 'aw9', year: 1983, title: 'Tamil Nadu State Film Award', detail: 'Best Music Director, State honours.', category: 'State' },
  { id: 'aw10', year: 1986, title: 'Filmfare Award South — Best Music Director', detail: 'For excellence in South Indian cinema.', category: 'Filmfare' },
  { id: 'aw11', year: 1991, title: 'Filmfare Award South — Best Music Director', detail: 'For excellence in South Indian cinema.', category: 'Filmfare' },
  { id: 'aw12', year: 1994, title: 'Filmfare Award South — Best Music Director', detail: 'For excellence in South Indian cinema.', category: 'Filmfare' },
  { id: 'aw13', year: 1993, title: 'Royal Philharmonic Orchestra Symphony', detail: 'First Asian to compose a full symphony recorded by the RPO, London.', category: 'International' },
  { id: 'aw14', year: 2015, title: 'Honorary Doctorate', detail: 'Conferred by a leading university for contribution to music.', category: 'Honorary Doctorate' },
  { id: 'aw15', year: 2018, title: 'Honorary Doctorate', detail: 'Recognising a lifetime of musical achievement.', category: 'Honorary Doctorate' },
  { id: 'aw16', year: 2019, title: 'International Recognition', detail: 'Celebrated at global music forums and festivals.', category: 'International' },
];

export const awardStats = [
  { id: 'national', label: 'National Awards', value: 5, icon: 'Award' },
  { id: 'state', label: 'State Awards', value: 15, suffix: '+', icon: 'Medal' },
  { id: 'filmfare', label: 'Filmfare Awards', value: 10, suffix: '+', icon: 'Trophy' },
  { id: 'doctorates', label: 'Honorary Doctorates', value: 3, icon: 'GraduationCap' },
];
