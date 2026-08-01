import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { QuizGame } from '@/components/quiz/QuizGame';

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Test your knowledge of Ilaiyaraaja with an interactive quiz, score points and climb the leaderboard.',
  alternates: { canonical: '/quiz' },
};

export default function QuizPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive"
        icon="Music"
        title="The Ilaiyaraaja Quiz"
        subtitle="Six questions on the life and music of Ilaiyaraaja. How well do you know the legend?"
      />
      <Section>
        <QuizGame />
      </Section>
    </>
  );
}
