import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import type { GameQuestion } from '@/lib/questions';

interface QuestionCardProps {
  question: GameQuestion;
  onAnswer: (index: number) => void;
  /** index locked in after answering, or null while awaiting a pick */
  selected?: number | null;
  showHint?: boolean;
}

/** Overlay card for prompts/options with entrance pop animation. */
export default function QuestionCard({
  question,
  onAnswer,
  selected = null,
  showHint = true,
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.q}
      initial={{ scale: 0.8, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-paper/90 backdrop-blur rounded-3xl shadow-xl border-2 border-white/60 p-6 w-full max-w-lg"
    >
      <p className="font-display font-extrabold text-xl text-ink mb-4">
        {question.q}
      </p>
      <div className="grid gap-2.5">
        {question.choices.map((c, i) => {
          const isSel = selected === i;
          const isRight = selected != null && i === question.answer;
          const cls =
            selected == null
              ? 'bg-white hover:bg-turquoise/15 text-ink'
              : isRight
                ? 'bg-palm text-white'
                : isSel
                  ? 'bg-coral/80 text-white'
                  : 'bg-white/60 text-ink/50';
          return (
            <motion.button
              key={c}
              whileTap={{ scale: 0.96 }}
              disabled={selected != null}
              onClick={() => onAnswer(i)}
              className={`rounded-2xl px-4 py-3 font-bold text-left shadow border-2 border-white/60 transition-colors ${cls}`}
            >
              {c}
            </motion.button>
          );
        })}
      </div>
      {showHint && question.fact && (
        <p className="mt-4 text-sm text-ink/60 flex items-start gap-2">
          <Lightbulb size={16} className="text-brass shrink-0 mt-0.5" />
          {question.fact}
        </p>
      )}
    </motion.div>
  );
}
