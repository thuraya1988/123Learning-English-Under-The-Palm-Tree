import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Map, BookOpen, Home } from 'lucide-react';
import { useSfx } from '@/lib/sfx';
import { GAMES } from '@/lib/questions';

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-full font-bold text-sm transition-colors ${
    isActive ? 'bg-turquoise/25 text-door' : 'text-ink/70 hover:text-door'
  }`;

export default function Navbar() {
  const { play, muted, toggleMute } = useSfx();
  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b-2 border-white/60 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => play('click')}
        >
          <img src="/logo-hub.png" alt="Under the Palm Tree" className="w-10 h-10" />
          <span className="font-display font-extrabold text-lg text-door leading-tight hidden sm:block">
            Under the Palm Tree
          </span>
        </Link>

        <div className="flex-1 flex items-center justify-center gap-1 overflow-x-auto">
          <NavLink to="/" end className={linkCls}>
            <span className="inline-flex items-center gap-1">
              <Home size={14} /> Hub
            </span>
          </NavLink>
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-full font-bold text-sm text-ink/70 hover:text-door">
              Games
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden group-hover:block">
              <div className="bg-paper rounded-2xl shadow-xl border-2 border-white/60 p-2 w-56">
                {GAMES.map((g) => (
                  <Link
                    key={g.id}
                    to={g.route}
                    onClick={() => play('click')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-turquoise/15 text-sm font-bold text-ink/80"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: g.accent }}
                    />
                    {g.title}
                    <span className="ml-auto text-[10px] uppercase tracking-widest text-ink/40">
                      {g.cefr}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/progress" className={linkCls}>
            <span className="inline-flex items-center gap-1">
              <Map size={14} /> Progress
            </span>
          </NavLink>
          <NavLink to="/about" className={linkCls}>
            <span className="inline-flex items-center gap-1">
              <BookOpen size={14} /> About
            </span>
          </NavLink>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            toggleMute();
            play('click');
          }}
          aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
          className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-turquoise to-palm text-white grid place-items-center shadow-md"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      </div>
    </nav>
  );
}
