import type { QuizQuestion } from '@/lib/types';

/** Interactive quiz — factual, open-source trivia. */
export const quiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'In which year was Ilaiyaraaja born?',
    options: ['1938', '1943', '1950', '1955'],
    answer: 1,
    fact: 'Ilaiyaraaja was born on 2 June 1943 in Pannaipuram, Tamil Nadu.',
  },
  {
    id: 'q2',
    question: 'What is the honorific title given to Ilaiyaraaja?',
    options: ['Isaignani', 'Kalaimamani', 'Nadhaswaram', 'Sangeetha Kalanidhi'],
    answer: 0,
    fact: '“Isaignani” means “the wise man of music”.',
  },
  {
    id: 'q3',
    question: 'Ilaiyaraaja was the first Asian to compose a full symphony recorded by which orchestra?',
    options: ['Berlin Philharmonic', 'Vienna Philharmonic', 'Royal Philharmonic Orchestra', 'London Symphony Orchestra'],
    answer: 2,
    fact: 'He recorded a full symphony with the Royal Philharmonic Orchestra in London.',
  },
  {
    id: 'q4',
    question: 'Which civilian honour did he receive in 2018?',
    options: ['Padma Shri', 'Padma Bhushan', 'Padma Vibhushan', 'Bharat Ratna'],
    answer: 2,
    fact: 'He was awarded the Padma Vibhushan in 2018, India’s second-highest civilian honour.',
  },
  {
    id: 'q5',
    question: 'Approximately how many films has he scored?',
    options: ['200+', '500+', '750+', '1000+'],
    answer: 3,
    fact: 'He has composed music for more than a thousand films across many languages.',
  },
  {
    id: 'q6',
    question: 'Which 1986 fusion album blended Bach with Indian classical music?',
    options: ['Nothing But Wind', 'How To Name It?', 'Thiruvasagam', 'Guru'],
    answer: 1,
    fact: '“How To Name It?” (1986) is a landmark fusion album dedicated to Bach and Thyagaraja.',
  },
];

export const leaderboard = [
  { name: 'Anitha R.', score: 6 },
  { name: 'Karthik S.', score: 6 },
  { name: 'Meera V.', score: 5 },
  { name: 'David J.', score: 5 },
  { name: 'Priya N.', score: 4 },
];
