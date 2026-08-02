import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameId = 'falaj' | 'souq' | 'dhow' | 'bahla' | 'cave' | 'khareef';

export interface GameProgress {
  /** stars per level index (0-3 each) */
  stars: Record<number, number>;
  /** best score per level index */
  scores: Record<number, number>;
  /** highest unlocked level (1-based) */
  unlockedLevel: number;
}

interface GameState {
  muted: boolean;
  playerName: string;
  games: Record<GameId, GameProgress>;
  toggleMute: () => void;
  setPlayerName: (name: string) => void;
  /** record result of a level; unlocks the next level; returns stars stored */
  recordResult: (game: GameId, level: number, score: number, stars: number) => void;
  totalStars: () => number;
}

const emptyGame = (): GameProgress => ({ stars: {}, scores: {}, unlockedLevel: 1 });

export const GAME_IDS: GameId[] = ['falaj', 'souq', 'dhow', 'bahla', 'cave', 'khareef'];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      muted: false,
      playerName: 'Explorer',
      games: {
        falaj: emptyGame(),
        souq: emptyGame(),
        dhow: emptyGame(),
        bahla: emptyGame(),
        cave: emptyGame(),
        khareef: emptyGame(),
      },
      toggleMute: () => set((s) => ({ muted: !s.muted })),
      setPlayerName: (name) => set({ playerName: name }),
      recordResult: (game, level, score, stars) =>
        set((s) => {
          // defensive: persisted state from before a game was added may lack its entry
          const g = s.games[game] ?? emptyGame();
          const newStars = Math.max(g.stars[level] ?? 0, stars);
          const newScore = Math.max(g.scores[level] ?? 0, score);
          return {
            games: {
              ...s.games,
              [game]: {
                stars: { ...g.stars, [level]: newStars },
                scores: { ...g.scores, [level]: newScore },
                unlockedLevel: Math.max(g.unlockedLevel, level + 1),
              },
            },
          };
        }),
      totalStars: () =>
        GAME_IDS.reduce(
          (sum, id) =>
            sum +
            Object.values(get().games[id].stars).reduce((a, b) => a + b, 0),
          0,
        ),
    }),
    { name: 'palm-tree-hub' },
  ),
);
