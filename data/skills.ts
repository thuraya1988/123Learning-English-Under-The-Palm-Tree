export type Skill = {
  slug: string;
  title: string;
  description: string;
  prerequisite: string;
  /** Optional H5P activity file under /public/h5p/<h5p> */
  h5p?: string;
};

export const SKILLS: Skill[] = [
  {
    slug: "grammar",
    title: "Grammar",
    description:
      "Practice sentence structures grounded in the chapters of the story file.",
    prerequisite: "Read the linked chapters before practicing.",
    h5p: "grammar.html",
  },
  {
    slug: "listening",
    title: "Listening",
    description:
      "Listen to chapter narrations and character dialogue from the story file.",
    prerequisite: "Read the linked chapters before practicing.",
    h5p: "listening-skill-app.html",
  },
  {
    slug: "reading",
    title: "Reading",
    description: "Read chapter passages and comprehension excerpts.",
    prerequisite: "Open the related chapter first.",
    h5p: "palm-activities.html",
  },
  {
    slug: "writing",
    title: "Writing",
    description: "Compose short responses inspired by the story file.",
    prerequisite: "Complete reading of the related chapter.",
    h5p: "writing.html",
  },
  {
    slug: "speaking",
    title: "Speaking",
    description: "Speak with characters and rehearse short dialogues.",
    prerequisite: "Read the linked chapters before practicing.",
  },
  {
    slug: "vocabulary",
    title: "Vocabulary",
    description: "Build word knowledge anchored to the chapters.",
    prerequisite: "Read the linked chapters before practicing.",
    h5p: "word-hunt.html",
  },
  {
    slug: "spelling",
    title: "Spelling",
    description: "Practice spelling drawn from the story file vocabulary.",
    prerequisite: "Complete the related vocabulary set.",
    h5p: "spelling-skill-app.html",
  },
  {
    slug: "pronunciation",
    title: "Pronunciation",
    description:
      "Mirror character pronunciation with TTS and feedback placeholders.",
    prerequisite: "Read the linked chapters before practicing.",
  },
  {
    slug: "progress-tracker",
    title: "Progress Tracker",
    description: "Track chapters completed, skills unlocked, and scores.",
    prerequisite: "Open after starting the journey.",
  },
  {
    slug: "improvement-plan",
    title: "Improvement Plan",
    description: "A guided plan based on completed activities and scores.",
    prerequisite: "Complete at least one chapter and one skill activity.",
  },
];
