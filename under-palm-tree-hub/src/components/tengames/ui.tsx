import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function GameButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? 'px-6 py-2.5 rounded-full border border-[#c9a96e] text-sm transition-all duration-300 bg-gradient-to-br from-[#c9a96e] to-[#8b7355] text-[#0a0a0f] hover:-translate-y-0.5'
          : 'px-6 py-2.5 rounded-full border border-[#c9a96e] text-sm transition-all duration-300 bg-gradient-to-br from-[#7c3aed] to-[#4338ca] text-white hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(124,58,237,0.4)]'
      }
      style={{ fontFamily: '"Noto Naskh Arabic", serif' }}
    >
      {children}
    </button>
  );
}

export function InfoOverlay({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-8 bg-[rgba(10,10,15,0.95)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl text-center rounded-[20px] border-2 border-[#c9a96e] p-8 bg-gradient-to-br from-[#1a0a2e] to-[#2a1a4e] max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-9 h-9 rounded-full border border-[#c9a96e] text-[#c9a96e] text-xl transition-colors hover:bg-[#c9a96e] hover:text-[#0a0a0f]"
              aria-label="إغلاق"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TagChips({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex gap-2 justify-center flex-wrap">
      {items.map((item, i) => (
        <span
          key={i}
          className="px-3 py-1 rounded-full text-xs text-[#c9a96e] bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.2)]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2100] px-6 py-3 rounded-full border border-[#c9a96e] bg-[rgba(26,10,46,0.95)] text-[#f5f0e8] text-sm shadow-[0_0_30px_rgba(201,169,110,0.3)] whitespace-pre-line text-center"
          style={{ fontFamily: '"Noto Naskh Arabic", serif' }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useToast(timeout = 2600): [string | null, (msg: string) => void] {
  const [msg, setMsg] = useStateLocal<string | null>(null);
  const show = (m: string) => setMsg(m);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), timeout);
    return () => clearTimeout(t);
  }, [msg, timeout]);
  return [msg, show];
}

// Local alias to keep imports tidy
import { useState as useStateLocal } from 'react';
