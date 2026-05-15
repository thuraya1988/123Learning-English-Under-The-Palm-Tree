/**
 * Client-side progress + profile placeholders.
 * Real persistence (Schorom classroom sync, certificates) is wired through
 * `/lib/schorom.ts` later.
 */

export type Profile = {
  username: string;
  description: string;
  email: string;
  avatar: string;
  createdAt: string;
};

export type ProgressState = {
  chaptersCompleted: number[];
  skillsUnlocked: string[];
  gameLevels: Record<string, number>;
  scoreHistory: { id: string; score: number; date: string }[];
};

const PROFILE_KEY = "lutpt:profile";
const PROGRESS_KEY = "lutpt:progress";

const defaultProgress: ProgressState = {
  chaptersCompleted: [],
  skillsUnlocked: [],
  gameLevels: {},
  scoreHistory: [],
};

const safe = () => typeof window !== "undefined";

export function getProfile(): Profile | null {
  if (!safe()) return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function setProfile(p: Profile) {
  if (!safe()) return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("profile-updated"));
}

export function clearProfile() {
  if (!safe()) return;
  localStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new Event("profile-updated"));
}

export function getProgress(): ProgressState {
  if (!safe()) return defaultProgress;
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) return defaultProgress;
  try {
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function setProgress(p: ProgressState) {
  if (!safe()) return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

export function markChapterRead(id: number) {
  const p = getProgress();
  if (!p.chaptersCompleted.includes(id)) {
    p.chaptersCompleted.push(id);
    setProgress(p);
  }
}

export function hasReadChapter(id: number) {
  return getProgress().chaptersCompleted.includes(id);
}

export function isCertificateReady() {
  const p = getProgress();
  return p.chaptersCompleted.length >= 36;
}
