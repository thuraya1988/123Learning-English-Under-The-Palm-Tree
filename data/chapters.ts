/**
 * 36 chapter records for the story file:
 * "123 Let's Learn English Under the Palm Tree"
 *
 * Per the project rules, chapter titles, summaries, vocabulary, dialogue and
 * comprehension content must be grounded in the story file. Where that content
 * is not yet linked, clean placeholders are used.
 */

export type Chapter = {
  id: number;
  title: string;
  summary: string;
  vocabularyPlaceholder: string;
  listeningPlaceholder: string;
  comprehensionPlaceholder: string;
  dialoguePlaceholder: string;
  scene3dPlaceholder: string;
  arScenePlaceholder: string;
  skillUnlock: string;
};

export const CHAPTERS: Chapter[] = Array.from({ length: 36 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    title: `[Chapter ${id} Title Placeholder]`,
    summary: "[Chapter Summary Placeholder]",
    vocabularyPlaceholder: "[Story File Vocabulary Placeholder]",
    listeningPlaceholder: "[Audio Placeholder]",
    comprehensionPlaceholder: "[Chapter-Based Activity Placeholder]",
    dialoguePlaceholder: "[Story File Dialogue Placeholder]",
    scene3dPlaceholder: "[3D Model Placeholder]",
    arScenePlaceholder: "[AR Scene Placeholder]",
    skillUnlock: "[Skill Unlock Placeholder]",
  };
});
