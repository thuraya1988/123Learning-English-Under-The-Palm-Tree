/**
 * Games data.
 *
 * Two categories — Modern (2026) and Traditional (1973). Each game has 10
 * levels. Content placeholders refer back to the story file.
 *
 * Modern (2026) list — 12 games as named by the author:
 *   palm-echo-speak, palm-scribe-write, palm-grove-grammar,
 *   falaj-builder-sentence, complete-the-story, palm-crossword,
 *   odd-one-out, quffah-match-memory, palm-board-adventure,
 *   palm-quiz-show, seedling-lab, shade-story-maker
 *
 * Traditional (1973) list — 2 games as named by the author:
 *   maloods-adventure, darwazat-mutrah
 *
 * Each game's `h5p` field is wired to its HTML activity file under
 * /public/h5p/ if the file exists on the repository yet, otherwise the
 * field stays undefined and the game page renders a placeholder.
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
  h5p?: string;
  available: boolean;
};

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

export const MODERN_GAMES: Game[] = [
  {
    slug: "palm-echo-speak",
    title: "Palm Echo · Speak",
    category: "2026",
    intro: "Speak after the palm — train your speaking with echo prompts.",
    objective: "Speaking practice grounded in chapter dialogue.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "palm-scribe-write",
    title: "Palm Scribe · Write",
    category: "2026",
    intro: "Write under the palm — guided scenes for handwriting and composition.",
    objective: "Writing practice grounded in story scenes.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "palm-grove-grammar",
    title: "Palm Grove · Grammar",
    category: "2026",
    intro: "Walk the grove and place every grammar piece in its correct spot.",
    objective: "Grammar practice grounded in chapter sentences.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "falaj-builder-sentence",
    title: "Falaj Builder · Sentence",
    category: "2026",
    intro: "Build sentences the way a falaj is built — channel by channel.",
    objective: "Sentence building grounded in story phrases.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "complete-the-story",
    title: "Complete the Story",
    category: "2026",
    intro: "Finish the page — choose the words that complete each chapter scene.",
    objective: "Reading + comprehension across the chapters.",
    levels: MODERN_LEVELS,
    h5p: "complete-the-story.html",
    available: true,
  },
  {
    slug: "palm-crossword",
    title: "Palm Crossword",
    category: "2026",
    intro: "Words of the village, woven into a grid.",
    objective: "Vocabulary recall.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "odd-one-out",
    title: "Odd One Out",
    category: "2026",
    intro: "Find the word that does not belong with the rest.",
    objective: "Category and vocabulary discrimination.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "quffah-match-memory",
    title: "Quffah Match · Memory",
    category: "2026",
    intro: "Match pairs hidden in the quffah baskets — a memory game.",
    objective: "Vocabulary memory + visual recall.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "palm-board-adventure",
    title: "Palm Board Adventure",
    category: "2026",
    intro: "A story-led board race across the village square.",
    objective: "Mixed-skill challenge across chapters.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "palm-quiz-show",
    title: "Palm Quiz Show",
    category: "2026",
    intro: "A cinematic quiz show under the palm — fast questions, gentle host.",
    objective: "Comprehension + speed quiz.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "seedling-lab",
    title: "Seedling Lab",
    category: "2026",
    intro: "Grow seedlings as you learn — each word becomes a small green leaf.",
    objective: "Vocabulary builder with gentle progression.",
    levels: MODERN_LEVELS,
    available: false,
  },
  {
    slug: "shade-story-maker",
    title: "Shade Story Maker",
    category: "2026",
    intro: "Sit in the shade and weave your own story from prompt cards.",
    objective: "Creative writing scaffolded by story prompts.",
    levels: MODERN_LEVELS,
    available: false,
  },
];

export const TRADITIONAL_GAMES: Game[] = [
  {
    slug: "maloods-adventure",
    title: "Malood's Adventure",
    category: "1973",
    intro: "Follow Malood the goat through the village — chaos, comedy, and English.",
    objective: "Story comprehension + vocabulary in motion.",
    levels: TRADITIONAL_LEVELS,
    h5p: "maloods-adventure.html",
    available: true,
  },
  {
    slug: "darwazat-mutrah",
    title: "Darwazat Mutrah",
    category: "1973",
    intro: "Step through the gates of Mutrah — a heritage journey through trade and language.",
    objective: "Cultural vocabulary + heritage scenes.",
    levels: TRADITIONAL_LEVELS,
    available: false,
  },
];

export const ALL_GAMES: Game[] = [...MODERN_GAMES, ...TRADITIONAL_GAMES];

export function getGame(category: GameCategory, slug: string): Game | undefined {
  return ALL_GAMES.find((g) => g.category === category && g.slug === slug);
}
