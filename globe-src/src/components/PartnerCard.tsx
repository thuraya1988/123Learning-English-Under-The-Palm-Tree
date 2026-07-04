import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ExternalLink,
  Instagram,
  Youtube,
  Phone,
  Mail,
  Radio,
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  BookCheck,
  GraduationCap,
  Crown,
} from 'lucide-react';
import type { Partner } from '@/types';

interface PartnerCardProps {
  partner: Partner;
  index: number;
}

const credibilityConfig = {
  'Official Center': {
    icon: ShieldCheck,
    color: '#2A9D8F',
    bgColor: 'rgba(42, 157, 143, 0.15)',
  },
  'Verified Teacher': {
    icon: Award,
    color: '#A67C52',
    bgColor: 'rgba(166, 124, 82, 0.15)',
  },
  'IELTS Trainer': {
    icon: BookCheck,
    color: '#E76F51',
    bgColor: 'rgba(231, 111, 81, 0.15)',
  },
  'Curriculum Support': {
    icon: GraduationCap,
    color: '#9B5DE5',
    bgColor: 'rgba(155, 93, 229, 0.15)',
  },
  'Premium Partner': {
    icon: Crown,
    color: '#D4A843',
    bgColor: 'rgba(212, 168, 67, 0.15)',
  },
};

const categoryColors: Record<string, string> = {
  'Official English Centers': '#2A9D8F',
  'IELTS Preparation Centers': '#E76F51',
  'Independent English Teachers': '#A67C52',
  'Kids English Learning': '#F15BB5',
  'School Curriculum Support': '#9B5DE5',
  'Speaking & Conversation': '#00BBF9',
  'Online Live Lessons': '#38B000',
};

export default function PartnerCard({ partner, index }: PartnerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const credConfig = credibilityConfig[partner.credibilityLabel] || credibilityConfig['Verified Teacher'];
  const CredIcon = credConfig.icon;
  const catColor = categoryColors[partner.category] || '#9B4D5E';

  return (
    <div
      ref={cardRef}
      className="glass-card overflow-hidden hover:border-[var(--accent)]/20 transition-all"
      style={{
        animation: 'fadeInUp 0.4s ease-out',
        animationDelay: `${index * 0.05}s`,
        animationFillMode: 'backwards',
      }}
    >
      {/* Header with logo and live status */}
      <div className="p-4 flex items-start gap-3">
        {/* Logo circle */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
          style={{ background: `linear-gradient(135deg, ${catColor}, ${catColor}88)` }}
        >
          {partner.logo}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-display font-semibold text-sm text-[var(--text-primary)]">
              {partner.name}
            </h4>
            {partner.isLive && (
              <span className="flex items-center gap-1 bg-red-600/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Radio className="w-2.5 h-2.5" />
                LIVE
              </span>
            )}
          </div>
          <p className="font-body text-[11px] text-[var(--text-secondary)] mt-0.5">
            {partner.specialization}
          </p>
        </div>

        {/* Credibility Badge */}
        <div
          className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-full"
          style={{ background: credConfig.bgColor }}
        >
          <CredIcon className="w-3 h-3" style={{ color: credConfig.color }} />
          <span className="font-mono text-[9px] font-medium" style={{ color: credConfig.color }}>
            {partner.credibilityLabel}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="px-4 pb-3 font-body text-xs text-[var(--text-secondary)] line-clamp-2">
        {partner.description}
      </p>

      {/* Upcoming Sessions */}
      {partner.upcomingSessions.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Calendar className="w-3 h-3 text-[var(--accent)]" />
            <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider">
              Upcoming Sessions
            </span>
          </div>
          <div className="space-y-1.5">
            {partner.upcomingSessions.map((session, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2"
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: catColor }} />
                <span className="font-body text-[11px] text-[var(--text-primary)] flex-1">
                  {session.title}
                </span>
                <div className="flex items-center gap-1 text-[var(--text-tertiary)]">
                  <Clock className="w-3 h-3" />
                  <span className="font-mono text-[10px]">{session.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact & Social Links */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Official Link */}
          <a
            href={partner.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-medium hover:bg-[var(--accent)]/20 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Visit
          </a>

          {/* Instagram */}
          {partner.instagram && (
            <a
              href={`https://instagram.com/${partner.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-pink-300 text-[11px] font-medium hover:from-purple-600/30 hover:to-pink-500/30 transition-colors"
            >
              <Instagram className="w-3 h-3" />
              {partner.instagram}
            </a>
          )}

          {/* YouTube */}
          {partner.youtube && (
            <a
              href={`https://youtube.com/${partner.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/10 text-red-400 text-[11px] font-medium hover:bg-red-600/20 transition-colors"
            >
              <Youtube className="w-3 h-3" />
              YouTube
            </a>
          )}

          {/* Phone */}
          {partner.phone && (
            <a
              href={`tel:${partner.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[var(--text-tertiary)] text-[11px] font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="font-mono">{partner.phone}</span>
            </a>
          )}

          {/* Email */}
          {partner.email && (
            <a
              href={`mailto:${partner.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[var(--text-tertiary)] text-[11px] font-medium hover:bg-white/10 transition-colors"
            >
              <Mail className="w-3 h-3" />
              Email
            </a>
          )}
        </div>
      </div>

      {/* Verified Footer */}
      {partner.verified && (
        <div
          className="px-4 py-2.5 flex items-center gap-2"
          style={{
            background: 'rgba(42, 157, 143, 0.08)',
            borderTop: '1px solid rgba(42, 157, 143, 0.1)',
          }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
          <span className="font-mono text-[10px] text-[var(--accent-secondary)]">
            Verified Partner of Under the Palm Tree
          </span>
        </div>
      )}
    </div>
  );
}
