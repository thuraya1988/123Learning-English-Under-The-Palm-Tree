import { Link } from 'react-router-dom';
import { GAMES } from '@/lib/questions';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80 mt-0">
      <div className="h-6 bg-[url('/pattern-omani.svg')] bg-repeat-x bg-[length:auto_24px] opacity-80" />
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo-hub.png" alt="" className="w-9 h-9" />
            <span className="font-display font-extrabold text-paper">
              Under the Palm Tree
            </span>
          </div>
          <p className="text-sm">
            Learn English through Omani tales — a 3D playing hub of folklore,
            water and light. <span className="font-arabic">حديقة الحكايات</span>
          </p>
        </div>
        <div>
          <h4 className="text-paper font-bold mb-3 text-sm uppercase tracking-widest">
            Games
          </h4>
          <ul className="space-y-1.5 text-sm">
            {GAMES.map((g) => (
              <li key={g.id}>
                <Link to={g.route} className="hover:text-turquoise">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-paper font-bold mb-3 text-sm uppercase tracking-widest">
            Explore
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li><Link to="/" className="hover:text-turquoise">Hub World</Link></li>
            <li><Link to="/progress" className="hover:text-turquoise">Progress Map</Link></li>
            <li><Link to="/about" className="hover:text-turquoise">About &amp; Heritage</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-paper/50 pb-6">
        Made with palm trees, falaj water and starlight · CEFR A1 → B2+
      </div>
    </footer>
  );
}
