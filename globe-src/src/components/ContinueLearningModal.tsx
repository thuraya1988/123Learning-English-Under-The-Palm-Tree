import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  BookOpen,
  MessageCircleQuestion,
  Gamepad2,
  Layers,
  Sparkles,
  BookMarked,
  X,
  ArrowRight,
  GraduationCap,
  Bot,
} from 'lucide-react';

interface ContinueLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle?: string;
}

const learningOptions = [
  {
    id: 'exercises',
    url: 'https://play.under-palm-tree.com/games-skills.html',
    title: 'Interactive Exercises',
    description: 'Practice what you learned with hands-on activities and instant feedback.',
    icon: BookOpen,
    color: 'from-[#2A9D8F] to-[#2A9D8F]/70',
    bgColor: 'bg-[#2A9D8F]/15',
    borderColor: 'border-[#2A9D8F]/30',
    action: 'Start Exercises',
  },
  {
    id: 'vocabulary',
    url: 'https://play.under-palm-tree.com/public/new-version/vocabulary-skill-app.html',
    title: 'Vocabulary Practice',
    description: 'Expand your word bank with flashcards, quizzes, and spaced repetition.',
    icon: Sparkles,
    color: 'from-[#9B4D5E] to-[#9B4D5E]/70',
    bgColor: 'bg-[#9B4D5E]/15',
    borderColor: 'border-[#9B4D5E]/30',
    action: 'Practice Words',
  },
  {
    id: 'chapters',
    url: 'https://play.under-palm-tree.com/Palm_Tree_ENGLISH-TTS.html',
    title: 'Chapter Activities',
    description: 'Follow structured chapter-based lessons with progressive difficulty.',
    icon: Layers,
    color: 'from-[#E76F51] to-[#E76F51]/70',
    bgColor: 'bg-[#E76F51]/15',
    borderColor: 'border-[#E76F51]/30',
    action: 'Open Chapters',
  },
  {
    id: 'games',
    url: 'https://play.under-palm-tree.com/games-skills.html',
    title: 'Learning Games',
    description: 'Play educational games that make learning English fun and addictive.',
    icon: Gamepad2,
    color: 'from-[#9B5DE5] to-[#9B5DE5]/70',
    bgColor: 'bg-[#9B5DE5]/15',
    borderColor: 'border-[#9B5DE5]/30',
    action: 'Play Now',
  },
  {
    id: 'lateefa',
    url: 'https://thursday88-piper-tts-api.hf.space',
    title: 'Ask Lateefa AI',
    description: 'Get instant help from our AI tutor. Ask questions, check grammar, or practice conversation.',
    icon: Bot,
    color: 'from-[#00BBF9] to-[#00BBF9]/70',
    bgColor: 'bg-[#00BBF9]/15',
    borderColor: 'border-[#00BBF9]/30',
    action: 'Chat with Lateefa',
  },
  {
    id: 'stories',
    url: 'https://play.under-palm-tree.com/Palm_Tree_ARABIC-TTS.html',
    title: 'Related Stories',
    description: 'Read engaging stories that reinforce what you learned in the lesson.',
    icon: BookMarked,
    color: 'from-[#F15BB5] to-[#F15BB5]/70',
    bgColor: 'bg-[#F15BB5]/15',
    borderColor: 'border-[#F15BB5]/30',
    action: 'Read Stories',
  },
];

export default function ContinueLearningModal({
  isOpen,
  onClose,
  lessonTitle,
}: ContinueLearningModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(contentRef.current, {
        scale: 0.95,
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{
        background: 'rgba(11, 20, 38, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        opacity: 0,
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={contentRef}
        className="w-full max-w-[640px] max-h-[85vh] overflow-y-auto panel-scroll"
        style={{
          background: 'linear-gradient(145deg, rgba(21, 34, 56, 0.95), rgba(28, 46, 74, 0.95))',
          border: '1px solid rgba(212, 168, 67, 0.15)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 168, 67, 0.08)',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 pt-6 pb-4 flex items-start justify-between"
          style={{
            background: 'linear-gradient(145deg, rgba(21, 34, 56, 0.98), rgba(28, 46, 74, 0.98))',
            borderBottom: '1px solid rgba(212, 168, 67, 0.08)',
            borderRadius: '24px 24px 0 0',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-tertiary)] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
                Continue Learning
              </h2>
              <p className="font-body text-xs text-[var(--text-tertiary)] mt-0.5">
                Your journey continues on Under the Palm Tree
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 text-[var(--text-tertiary)]" />
          </button>
        </div>

        {/* Lesson Context */}
        {lessonTitle && (
          <div className="px-6 py-4">
            <div className="glass-card p-4 flex items-center gap-3">
              <MessageCircleQuestion className="w-5 h-5 text-[var(--accent)] shrink-0" />
              <div>
                <p className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase">
                  Completed Lesson
                </p>
                <p className="font-display font-semibold text-sm text-[var(--text-primary)]">
                  {lessonTitle}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="px-6 pb-2">
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.15), rgba(42, 157, 143, 0.1))',
              border: '1px solid rgba(212, 168, 67, 0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)', transform: 'translate(30%, -30%)' }}
            />
            <p className="font-display font-semibold text-base text-[var(--accent)] relative z-10">
              Keep the momentum going!
            </p>
            <p className="font-body text-sm text-[var(--text-secondary)] mt-1 relative z-10">
              Choose a learning path below to practice, play, and deepen your English skills after this lesson.
            </p>
          </div>
        </div>

        {/* Learning Options Grid */}
        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {learningOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => window.open(option.url, '_blank', 'noopener')}
                className={`${option.bgColor} ${option.borderColor} border rounded-2xl p-4 text-left transition-all hover:scale-[1.02] hover:shadow-lg group`}
                style={{
                  animation: `fadeInUp 0.4s ease-out`,
                  animationDelay: `${index * 0.06}s`,
                  animationFillMode: 'backwards',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shrink-0 shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">
                      {option.title}
                    </h3>
                    <p className="font-body text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-2">
                      {option.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="font-body text-[11px] font-medium text-[var(--accent)]">
                    {option.action}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <div className="glass-card p-4 flex items-center gap-3">
            <Bot className="w-8 h-8 text-[#00BBF9] shrink-0" />
            <div className="flex-1">
              <p className="font-display font-semibold text-sm text-[var(--text-primary)]">
                Not sure what to do next?
              </p>
              <p className="font-body text-xs text-[var(--text-secondary)] mt-0.5">
                Ask Lateefa AI for a personalised learning path based on this lesson.
              </p>
            </div>
            <button className="shrink-0 px-4 py-2 rounded-xl bg-[#00BBF9]/20 text-[#00BBF9] font-body text-xs font-medium hover:bg-[#00BBF9]/30 transition-colors">
              Ask Lateefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
