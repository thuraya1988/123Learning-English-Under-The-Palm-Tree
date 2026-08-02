import type { GameId } from './store';
import falaj from '@/data/falaj.json';
import souq from '@/data/souq.json';
import dhow from '@/data/dhow.json';
import bahla from '@/data/bahla.json';
import cave from '@/data/cave.json';
import khareef from '@/data/khareef.json';

/** Normalized question shape used by all games. */
export interface GameQuestion {
  q: string;
  choices: string[];
  answer: number;
  hint?: string;
  fact?: string;
}

export interface GameLevel {
  level: number;
  cefr: string;
  title: string;
  questions: GameQuestion[];
}

export interface GameBank {
  game: string;
  title: string;
  levels: GameLevel[];
}

const BANKS: Record<GameId, GameBank> = {
  falaj: falaj as GameBank,
  souq: souq as GameBank,
  dhow: dhow as GameBank,
  bahla: bahla as GameBank,
  cave: cave as GameBank,
  khareef: khareef as GameBank,
};

/** Full question bank for a game. */
export function getGameBank(gameId: GameId): GameBank {
  return BANKS[gameId];
}

/** All levels (with their questions) for a game. */
export function getGameQuestions(gameId: GameId): GameLevel[] {
  return BANKS[gameId].levels;
}

/** Questions of a specific level (1-based). */
export function getLevelQuestions(gameId: GameId, level: number): GameQuestion[] {
  return BANKS[gameId].levels.find((l) => l.level === level)?.questions ?? [];
}

export interface GameMeta {
  id: GameId;
  route: string;
  title: string;
  cefr: string;
  accent: string;
  tagline: string;
}

export const GAMES: GameMeta[] = [
  {
    id: 'falaj',
    route: '/game/falaj',
    title: 'Falaj Word Flow',
    cefr: 'A1',
    accent: '#3ED6C5',
    tagline: 'Match words to guide the water through the garden channels.',
  },
  {
    id: 'souq',
    route: '/game/souq',
    title: 'Souq Spelling Market',
    cefr: 'A1–A2',
    accent: '#E5599C',
    tagline: 'Spell with the vendors among lanterns, spices and pottery.',
  },
  {
    id: 'dhow',
    route: '/game/dhow',
    title: 'Dhow Voyager',
    cefr: 'A2–B1',
    accent: '#159AAD',
    tagline: 'Build sentences to catch the wind between the islands.',
  },
  {
    id: 'bahla',
    route: '/game/bahla',
    title: 'Bahla: Fort of Riddles',
    cefr: 'B1',
    accent: '#C97B4A',
    tagline: 'Solve jinn riddles and mini reading tales in the old fort.',
  },
  {
    id: 'cave',
    route: '/game/cave',
    title: 'Jinn Cave Escape',
    cefr: 'B1–B2+',
    accent: '#8B6FE8',
    tagline: 'Comprehension, proverbs and idioms among glowing crystals.',
  },
  {
    id: 'khareef',
    route: '/game/khareef',
    title: 'Frankincense Trail',
    cefr: 'Mixed',
    accent: '#4FBF67',
    tagline: 'Story quests across the misty green mountains of Salalah.',
  },
];

export function getGameMeta(id: GameId): GameMeta {
  return GAMES.find((g) => g.id === id)!;
}
