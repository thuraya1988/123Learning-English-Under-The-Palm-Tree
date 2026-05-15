/**
 * Games data.
 *
 * Two categories — Traditional (1973) and Modern (2026). Each game has 10
 * levels. Content placeholders refer back to the story file.
 *
 * IMPORTANT EXCLUSIONS for Modern (2026) games — do NOT add any of:
 *  Odd One Out, Crosswords, Word Hunt, Memory Game, Kahoot, Fill It,
 *  or any direct clone of those.
 */

export type GameCategory = "1973" | "2026";

export type LevelBlueprint = {
  level: number;
  title: string;
  contentPlaceholder: string;
};

export type Game = {
  slug: string;
  title: string;
  category: GameCategory;
  intro: string;
  objective: string;
  levels: LevelBlueprint[];
};

const TRADITIONAL_LEVELS: LevelBlueprint[] = [
  { level: 1, title: "Beginner Recognition", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 2, title: "Word Matching", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 3, title: "Picture-to-Word Practice", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 4, title: "Listening Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 5, title: "Sentence Building", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 6, title: "Character-Based Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 7, title: "Chapter-Based Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 8, title: "Timed Practice", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 9, title: "Mixed Skills Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 10, title: "Final Mastery Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
];

const MODERN_LEVELS: LevelBlueprint[] = [
  { level: 1, title: "Warm-Up", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 2, title: "Guided Practice", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 3, title: "Vocabulary Focus", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 4, title: "Sentence Focus", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 5, title: "Listening Focus", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 6, title: "Speaking Focus", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 7, title: "Chapter Connection", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 8, title: "Mixed Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 9, title: "Timed Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
  { level: 10, title: "Master Challenge", contentPlaceholder: "[Story File Game Content Placeholder]" },
];

export const TRADITIONAL_GAMES: Game[] = [
  { slug: "dominah", title: "Dominah", category: "1973",
    intro: "A village-inspired matching pursuit under the palm tree.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "palm-stone-path", title: "Palm Stone Path", category: "1973",
    intro: "Step-by-step word path along sun-warmed stones.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "village-word-race", title: "Village Word Race", category: "1973",
    intro: "A heritage race through village landmarks and words.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "date-basket-challenge", title: "Date Basket Challenge", category: "1973",
    intro: "Fill your basket by gathering the right words.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "desert-listening-trail", title: "Desert Listening Trail", category: "1973",
    intro: "Walk the trail and listen for the cue.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "traditional-market-match", title: "Traditional Market Match", category: "1973",
    intro: "Match goods, names, and meanings in the souq.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "palm-shadow-guess", title: "Palm Shadow Guess", category: "1973",
    intro: "Identify the silhouette under the palm tree.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "heritage-sentence-builder", title: "Heritage Sentence Builder", category: "1973",
    intro: "Arrange words into sentences inspired by the village.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "old-village-treasure-hunt", title: "Old Village Treasure Hunt", category: "1973",
    intro: "Follow the clues through old village lanes.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
  { slug: "pearl-and-palm-quest", title: "Pearl and Palm Quest", category: "1973",
    intro: "A quest tying the coast and the grove together.",
    objective: "[Story File Learning Objective Placeholder]", levels: TRADITIONAL_LEVELS },
];

export const MODERN_GAMES: Game[] = [
  { slug: "ai-speaking-coach", title: "AI Speaking Coach", category: "2026",
    intro: "A cinematic AI coach for speaking practice.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "grammar-galaxy-mission", title: "Grammar Galaxy Mission", category: "2026",
    intro: "Voyage across grammar systems on a glass spacecraft.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "listening-light-tunnel", title: "Listening Light Tunnel", category: "2026",
    intro: "Travel a luminous tunnel calibrated to listening cues.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "vocabulary-builder-lab", title: "Vocabulary Builder Lab", category: "2026",
    intro: "A glass laboratory for building vocabulary towers.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "story-timeline-architect", title: "Story Timeline Architect", category: "2026",
    intro: "Construct the story timeline like a luminous bridge.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "pronunciation-mirror", title: "Pronunciation Mirror", category: "2026",
    intro: "Reflect your pronunciation against a master template.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "sentence-repair-studio", title: "Sentence Repair Studio", category: "2026",
    intro: "Restore broken sentences in a cinematic studio.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "chapter-detective", title: "Chapter Detective", category: "2026",
    intro: "Investigate clues hidden in chapter passages.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "dialogue-roleplay-arena", title: "Dialogue Roleplay Arena", category: "2026",
    intro: "Step on stage and rehearse character dialogue.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
  { slug: "progress-quest", title: "Progress Quest", category: "2026",
    intro: "A long-form quest that tracks your full journey.",
    objective: "[Story File Learning Objective Placeholder]", levels: MODERN_LEVELS },
];

export const ALL_GAMES: Game[] = [...TRADITIONAL_GAMES, ...MODERN_GAMES];

export function getGame(category: GameCategory, slug: string): Game | undefined {
  return ALL_GAMES.find((g) => g.category === category && g.slug === slug);
}
