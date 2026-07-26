'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X, RotateCcw, Trophy, Crown } from 'lucide-react';
import { quiz, leaderboard } from '@/data/quiz';
import { cn } from '@/lib/utils';

export function QuizGame() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quiz[index];
  const isLast = index === quiz.length - 1;

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const advance = () => {
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const board = [...leaderboard, { name: 'You', score }].sort((a, b) => b.score - a.score).slice(0, 6);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Quiz card */}
      <div className="rounded-3xl border border-line bg-paper p-7 shadow-soft sm:p-9">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest2 text-gold">
                  Question {index + 1} / {quiz.length}
                </span>
                <span className="text-sm font-semibold text-muted">Score {score}</span>
              </div>
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-hover">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${((index + (selected !== null ? 1 : 0)) / quiz.length) * 100}%` }}
                />
              </div>

              <h3 className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">{q.question}</h3>

              <div className="mt-6 space-y-3">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.answer;
                  const isChosen = i === selected;
                  const revealed = selected !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => choose(i)}
                      disabled={revealed}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-all',
                        !revealed && 'border-line hover:border-gold hover:bg-hover',
                        revealed && isCorrect && 'border-green-500/60 bg-green-50 text-green-800',
                        revealed && isChosen && !isCorrect && 'border-red-400/60 bg-red-50 text-red-700',
                        revealed && !isCorrect && !isChosen && 'border-line opacity-60',
                      )}
                    >
                      {opt}
                      {revealed && isCorrect && <Check className="h-4 w-4 shrink-0 text-green-600" />}
                      {revealed && isChosen && !isCorrect && <X className="h-4 w-4 shrink-0 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <p className="rounded-xl bg-hover p-4 text-sm text-muted">
                    <span className="font-semibold text-ink">Did you know? </span>
                    {q.fact}
                  </p>
                  <button onClick={advance} className="btn-gold mt-5 w-full sm:w-auto">
                    {isLast ? 'See results' : 'Next question'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Trophy className="h-7 w-7" />
              </span>
              <h3 className="font-display text-2xl font-bold text-ink">
                You scored {score} / {quiz.length}
              </h3>
              <p className="mt-3 text-muted">
                {score === quiz.length
                  ? 'A true connoisseur of the maestro’s legacy!'
                  : score >= quiz.length / 2
                    ? 'Well played, your ear for the maestro is sharp.'
                    : 'A good start, explore the biography and try again!'}
              </p>
              <button onClick={restart} className="btn-outline mt-7">
                <RotateCcw className="h-4 w-4" /> Play again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Leaderboard */}
      <div className="rounded-3xl border border-line bg-hover p-7">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <Crown className="h-5 w-5 text-gold" /> Leaderboard
        </h3>
        <ol className="mt-5 space-y-2">
          {board.map((b, i) => (
            <li
              key={`${b.name}-${i}`}
              className={cn(
                'flex items-center justify-between rounded-xl px-4 py-3 text-sm',
                b.name === 'You' ? 'border border-gold/40 bg-paper font-semibold text-ink' : 'text-muted',
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                    i === 0 ? 'bg-gold text-white' : 'bg-paper text-muted',
                  )}
                >
                  {i + 1}
                </span>
                {b.name}
              </span>
              <span className="font-semibold">{b.score}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs text-faint">
          Leaderboard is illustrative. Your live score appears highlighted as you play.
        </p>
      </div>
    </div>
  );
}
