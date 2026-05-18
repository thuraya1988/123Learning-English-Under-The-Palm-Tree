/**
 * Chapter records.
 *
 * 9 chapters are grounded in the official story file
 * (Under_The_Palm_Complete.html). Chapters 10–36 are reserved slots that
 * remain placeholder until the next chapters are written by the author.
 *
 * The story file path:
 *   /story/complete.html
 */

export type Chapter = {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  available: boolean;
  vocabularyPlaceholder: string;
  listeningPlaceholder: string;
  comprehensionPlaceholder: string;
  dialoguePlaceholder: string;
  scene3dPlaceholder: string;
  arScenePlaceholder: string;
  skillUnlock: string;
};

const PALM_ORDINALS = [
  "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
];

const REAL_SUBTITLES = [
  "Thuraya's Book of Thoughts",
  "The First Walk in the Village",
  "The First Day at School",
  "A Different Morning",
  "A Picnic of Another Kind",
  "The Man Everyone Was Afraid Of",
  "The Hot Falaj and the Long Names",
  "The Day the Smoke Chased Us",
  "The Salon of Marhoona",
];

const REAL_SUMMARIES = [
  "A teacher's quiet notebook becomes the door into the village — a memory of London, a flight back to Oman, and a first meeting that will shape everything.",
  "Thuraya walks the lanes of Al-Qurawashiyah for the first time and meets the village as it really is — palms, doors, and unhurried mornings.",
  "School begins. New names, careful hands, and the first English words spoken under the palm.",
  "A morning unlike the others — and the rhythm of the village shifts.",
  "An ordinary picnic turns into a story the children will remember for a long time.",
  "The whispers say one thing about Khalaf. The truth says another.",
  "The hot falaj water and a chain of long, beautiful names.",
  "The day the smoke chased the village — and what was learnt along the way.",
  "Inside Marhoona's salon — laughter, lemon, and the smallest disasters.",
];

const placeholderBase = {
  vocabularyPlaceholder: "[Story File Vocabulary Placeholder]",
  listeningPlaceholder: "[Audio Placeholder]",
  comprehensionPlaceholder: "[Chapter-Based Activity Placeholder]",
  dialoguePlaceholder: "[Story File Dialogue Placeholder]",
  scene3dPlaceholder: "[3D Model Placeholder]",
  arScenePlaceholder: "[AR Scene Placeholder]",
  skillUnlock: "[Skill Unlock Placeholder]",
};

export const CHAPTERS: Chapter[] = Array.from({ length: 36 }, (_, i) => {
  const id = i + 1;
  const real = id <= 9;
  return {
    id,
    title: real ? `Palm ${PALM_ORDINALS[i]}` : `Chapter ${id}`,
    subtitle: real ? REAL_SUBTITLES[i] : "[Chapter Title Placeholder]",
    summary: real ? REAL_SUMMARIES[i] : "[Chapter Summary Placeholder]",
    available: real,
    ...placeholderBase,
  };
});
