import { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, Clock, Users, Play, Calendar, Trophy, BookOpen, Globe, MapPin, Languages, Coins, Sun, Radio, Store, Handshake, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import type { Country, ContentItem, PartnerCategory } from '@/types';
import PartnerCard from './PartnerCard';

interface CountryPanelProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
  onContinueLearning: (lessonTitle: string) => void;
}

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string, string> = {
    youtube: 'bg-red-600',
    instagram: 'bg-gradient-to-br from-purple-600 to-pink-500',
    tiktok: 'bg-black border border-cyan-400',
    twitch: 'bg-purple-700',
    zoom: 'bg-blue-600',
    custom: 'bg-[var(--accent)]',
  };

  const labels: Record<string, string> = {
    youtube: 'YouTube',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    twitch: 'Twitch',
    zoom: 'Zoom',
    custom: 'Live',
  };

  return (
    <span className={`${colors[platform] || colors.custom} text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1`}>
      <Radio className="w-3 h-3" />
      {labels[platform] || platform}
    </span>
  );
}

function ContentCard({ item, index, onContinueLearning }: {
  item: ContentItem;
  index: number;
  onContinueLearning?: (title: string) => void;
}) {
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

  if (item.type === 'liveLesson') {
    return (
      <div
        ref={cardRef}
        className="glass-card overflow-hidden"
        style={{
          animation: 'fadeInUp 0.4s ease-out',
          animationDelay: `${index * 0.05}s`,
          animationFillMode: 'backwards',
          boxShadow: item.isLive ? '0 0 20px rgba(42, 157, 143, 0.15)' : undefined,
        }}
      >
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-video object-cover cursor-pointer"
            loading="lazy"
            onClick={() => {
              if (item.streamUrl && item.streamUrl !== '#') {
                window.open(item.streamUrl, '_blank', 'noopener');
              }
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <PlatformBadge platform={item.platform} />
            {item.isLive && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          {item.duration && (
            <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded font-mono">
              {item.duration}m
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Teacher Avatar */}
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] text-sm font-semibold shrink-0 -mt-7 border-2 border-[var(--bg-secondary)]">
              {item.teacher.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-semibold text-[15px] text-[var(--text-primary)] leading-tight">
                {item.title}
              </h4>
              <p className="font-body text-xs text-[var(--text-secondary)] mt-1">
                {item.teacher.name}
              </p>
            </div>
          </div>

          <p className="font-body text-xs text-[var(--text-secondary)] mt-2 line-clamp-2">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-teal">{tag}</span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-3 text-[var(--text-tertiary)]">
            {item.isLive && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">{item.viewerCount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">
                {new Date(item.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Open CTA — real link into the Palm Tree site */}
          <button
            onClick={() => {
              if (item.streamUrl && item.streamUrl !== '#') {
                window.open(item.streamUrl, '_blank', 'noopener');
              }
            }}
            className="btn-primary w-full mt-3 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Open · افتح
          </button>

          {/* Continue Learning CTA */}
          <button
            onClick={() => onContinueLearning?.(item.title)}
            className="w-full mt-2 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.12), rgba(42, 157, 143, 0.08))',
              border: '1px solid rgba(212, 168, 67, 0.2)',
              color: 'var(--accent)',
            }}
          >
            <GraduationCap className="w-4 h-4" />
            Continue Learning on Under the Palm Tree
          </button>
        </div>
      </div>
    );
  }

  if (item.type === 'culturalVideo' || item.type === 'historicalExperience') {
    return (
      <div
        ref={cardRef}
        className="glass-card overflow-hidden shrink-0 w-[200px]"
        style={{
          animation: 'fadeInUp 0.4s ease-out',
          animationDelay: `${index * 0.05}s`,
          animationFillMode: 'backwards',
        }}
      >
        <div className="relative">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-video object-cover cursor-pointer"
            loading="lazy"
            onClick={() => {
              if (item.streamUrl && item.streamUrl !== '#') {
                window.open(item.streamUrl, '_blank', 'noopener');
              }
            }}
          />
          {item.duration && (
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
              {item.duration}m
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <Play className="w-5 h-5 text-[var(--bg-primary)] ml-0.5" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <h4 className="font-display font-medium text-[13px] text-[var(--text-primary)] leading-tight line-clamp-2">
            {item.title}
          </h4>
          <p className="font-body text-[11px] text-[var(--text-tertiary)] mt-1">
            {item.teacher.name}
          </p>
        </div>
      </div>
    );
  }

  if (item.type === 'event') {
    const eventDate = new Date(item.scheduledStart);
    return (
      <div
        ref={cardRef}
        className="glass-card p-4 flex items-center gap-4"
        style={{
          animation: 'fadeInUp 0.4s ease-out',
          animationDelay: `${index * 0.05}s`,
          animationFillMode: 'backwards',
        }}
      >
        <div className="shrink-0 w-14 h-14 rounded-xl bg-[var(--accent)]/15 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-lg text-[var(--accent)] leading-none">
            {eventDate.getDate()}
          </span>
          <span className="font-mono text-[9px] text-[var(--accent)] uppercase">
            {eventDate.toLocaleDateString([], { month: 'short' })}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-sm text-[var(--text-primary)]">
            {item.title}
          </h4>
          <p className="font-body text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">
            {item.description}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-[var(--text-tertiary)]">
            <span className="font-mono text-[10px]">
              {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <PlatformBadge platform={item.platform} />
          </div>
        </div>
      </div>
    );
  }

  if (item.type === 'challenge') {
    return (
      <div
        ref={cardRef}
        className="glass-card p-4"
        style={{
          animation: 'fadeInUp 0.4s ease-out',
          animationDelay: `${index * 0.05}s`,
          animationFillMode: 'backwards',
        }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-tertiary)]/15 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-[var(--accent-tertiary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-display font-semibold text-sm text-[var(--text-primary)]">
                {item.title}
              </h4>
              <span className="tag-gold text-[9px]">{item.level}</span>
            </div>
            <p className="font-body text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-tertiary)]"
                  style={{ width: `${Math.min((item.viewerCount / 1000) * 100, 100)}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                {item.viewerCount} joined
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function SectionHeader({ title, icon: Icon, count }: { title: string; icon: React.ElementType; count?: number }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[var(--accent)]" />
        <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] uppercase tracking-wider">
          {title}
        </h3>
      </div>
      {count !== undefined && (
        <span className="font-mono text-[11px] text-[var(--text-tertiary)]">
          {count}
        </span>
      )}
    </div>
  );
}

export default function CountryPanel({ country, isOpen, onClose, onContinueLearning }: CountryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activePartnerCategory, setActivePartnerCategory] = useState<PartnerCategory | 'all'>('all');

  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(panelRef.current, { x: '100%', duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Reset partner category filter when country changes
  useEffect(() => {
    setActivePartnerCategory('all');
  }, [country?.id]);

  if (!country) return null;

  const liveItems = country.content.filter((c) => c.isLive);
  const upcomingItems = country.content.filter((c) => !c.isLive && c.type === 'liveLesson');
  const culturalItems = country.content.filter((c) => c.type === 'culturalVideo');
  const historicalItems = country.content.filter((c) => c.type === 'historicalExperience');
  const eventItems = country.content.filter((c) => c.type === 'event');
  const challengeItems = country.content.filter((c) => c.type === 'challenge');

  const totalViewers = liveItems.reduce((a, c) => a + c.viewerCount, 0);

  // Oman partners filtering
  const hasPartners = country.partners && country.partners.length > 0;
  const partnerCategories = country.partnerCategories || [];
  const filteredPartners = hasPartners
    ? activePartnerCategory === 'all'
      ? country.partners
      : country.partners?.filter((p) => p.category === activePartnerCategory)
    : [];

  const isOman = country.id === 'OM';

  return (
    <div
      ref={panelRef}
      className="fixed right-0 top-0 h-full w-full sm:w-[460px] z-40"
      style={{
        background: 'rgba(11, 20, 38, 0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderLeft: '1px solid rgba(212, 168, 67, 0.08)',
        transform: 'translateX(100%)',
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="shrink-0 px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body text-xs">Back</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4 text-[var(--text-tertiary)]" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] leading-tight">
                {country.name}
              </h2>
              <p className="font-body text-sm text-[var(--text-tertiary)] mt-0.5">
                {country.region}
              </p>
            </div>
          </div>

          {totalViewers > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="live-dot" />
              <span className="font-mono text-[11px] text-[var(--accent-secondary)]">
                {liveItems.length} live now &middot; {totalViewers.toLocaleString()} watching
              </span>
            </div>
          )}

          {/* Oman Special Banner */}
          {isOman && (
            <div
              className="mt-4 rounded-xl p-4 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.12), rgba(231, 111, 81, 0.08))',
                border: '1px solid rgba(212, 168, 67, 0.15)',
              }}
            >
              <Handshake className="w-5 h-5 text-[var(--accent)] shrink-0" />
              <div>
                <p className="font-display font-semibold text-sm text-[var(--accent)]">
                  Trusted English Partners in Oman
                </p>
                <p className="font-body text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {country.partners?.length} verified partners &middot; Official centres, IELTS trainers & independent teachers
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto panel-scroll px-6 pb-8 space-y-6">
          {/* PARTNERS SECTION (Oman only) */}
          {isOman && hasPartners && (
            <section>
              <SectionHeader title="Verified Partners" icon={Store} count={filteredPartners?.length} />

              {/* Partner Category Filter */}
              <div className="flex gap-1.5 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide mb-3">
                <button
                  onClick={() => setActivePartnerCategory('all')}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                    activePartnerCategory === 'all'
                      ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
                      : 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                  }`}
                >
                  All Partners
                </button>
                {partnerCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActivePartnerCategory(cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all whitespace-nowrap ${
                      activePartnerCategory === cat
                        ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
                        : 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Compliance Note */}
              <div className="mb-4 p-3 rounded-xl bg-[var(--accent-secondary)]/5 border border-[var(--accent-secondary)]/10">
                <p className="font-mono text-[9px] text-[var(--accent-secondary)] leading-relaxed">
                  <strong>Content Policy:</strong> Only official embeds, public links & approved partner content are displayed. Recorded sessions require written permission. Paid partnerships follow clear agreements covering logos, recordings & referral rules.
                </p>
              </div>

              <div className="space-y-3">
                {filteredPartners?.map((partner, i) => (
                  <PartnerCard key={partner.id} partner={partner} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* LIVE NOW */}
          {liveItems.length > 0 && (
            <section>
              <SectionHeader title="LIVE NOW" icon={Radio} count={liveItems.length} />
              <div className="space-y-3">
                {liveItems.map((item, i) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    index={i}
                    onContinueLearning={onContinueLearning}
                  />
                ))}
              </div>
            </section>
          )}

          {/* UPCOMING */}
          {upcomingItems.length > 0 && (
            <section>
              <SectionHeader title="UPCOMING" icon={Calendar} count={upcomingItems.length} />
              <div className="space-y-3 opacity-80">
                {upcomingItems.map((item, i) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    index={i}
                    onContinueLearning={onContinueLearning}
                  />
                ))}
              </div>
            </section>
          )}

          {/* CULTURAL VIDEOS */}
          {culturalItems.length > 0 && (
            <section>
              <SectionHeader title="CULTURAL VIDEOS" icon={Globe} count={culturalItems.length} />
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {culturalItems.map((item, i) => (
                  <ContentCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* HISTORICAL EXPERIENCES */}
          {historicalItems.length > 0 && (
            <section>
              <SectionHeader title="HISTORICAL EXPERIENCES" icon={BookOpen} count={historicalItems.length} />
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {historicalItems.map((item, i) => (
                  <ContentCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* EVENTS */}
          {eventItems.length > 0 && (
            <section>
              <SectionHeader title="EVENTS" icon={Calendar} count={eventItems.length} />
              <div className="space-y-3">
                {eventItems.map((item, i) => (
                  <ContentCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* CHALLENGES */}
          {challengeItems.length > 0 && (
            <section>
              <SectionHeader title="CHALLENGES" icon={Trophy} count={challengeItems.length} />
              <div className="space-y-3">
                {challengeItems.map((item, i) => (
                  <ContentCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* COUNTRY FACTS */}
          <section>
            <SectionHeader title="QUICK FACTS" icon={MapPin} />
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-3 flex items-center gap-3">
                <Sun className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase">Timezone</p>
                  <p className="font-body text-xs text-[var(--text-primary)]">{country.timezone}</p>
                </div>
              </div>
              <div className="glass-card p-3 flex items-center gap-3">
                <Languages className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase">Language</p>
                  <p className="font-body text-xs text-[var(--text-primary)]">English</p>
                </div>
              </div>
              <div className="glass-card p-3 flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase">Activities</p>
                  <p className="font-body text-xs text-[var(--text-primary)]">{country.content.length}</p>
                </div>
              </div>
              <div className="glass-card p-3 flex items-center gap-3">
                <Coins className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <div>
                  <p className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase">Focus</p>
                  <p className="font-body text-xs text-[var(--text-primary)]">ESL Education</p>
                </div>
              </div>
              {hasPartners && (
                <div className="glass-card p-3 flex items-center gap-3 col-span-2">
                  <Handshake className="w-4 h-4 text-[var(--accent-secondary)] shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase">Verified Partners</p>
                    <p className="font-body text-xs text-[var(--text-primary)]">{country.partners?.length} partner institutions</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
