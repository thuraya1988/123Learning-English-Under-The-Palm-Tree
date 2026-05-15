/**
 * Character records.
 *
 * Names are grouped as Teachers / Students / Villagers, all in English.
 * Descriptions, related chapters, voice lines, and 3D models are placeholders
 * pending the story file linking.
 */

export type CharacterGroup = "teachers" | "students" | "villagers";

export type Character = {
  slug: string;
  name: string;
  group: CharacterGroup;
  role: string;
  description: string;
  relatedChapter: string;
  voicePlaceholder: string;
  modelPlaceholder: string;
};

export const CHARACTER_GROUPS: {
  key: CharacterGroup;
  title: string;
  blurb: string;
}[] = [
  {
    key: "teachers",
    title: "Teachers",
    blurb:
      "The guiding voices of the palm tree classroom. Specific roles and chapters are grounded in the story file.",
  },
  {
    key: "students",
    title: "Students",
    blurb:
      "The young learners of Sumail Al Qurooshiyah. Personalities and chapters are sourced from the story file.",
  },
  {
    key: "villagers",
    title: "Villagers",
    blurb:
      "The community surrounding the palm tree. Their stories are linked to specific chapters of the novel.",
  },
];

export const CHARACTERS: Character[] = [
  {
    slug: "thuraya",
    name: "Thuraya",
    group: "teachers",
    role: "English Teacher (Author)",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "mathla",
    name: "Mathla",
    group: "teachers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "sofia",
    name: "Sofia",
    group: "teachers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "minnah",
    name: "Minnah",
    group: "students",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "ahmed",
    name: "Ahmed",
    group: "students",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "ali",
    name: "Ali",
    group: "students",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "khalil",
    name: "Khalil",
    group: "students",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "kalaf",
    name: "Kalaf",
    group: "students",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "mustafa",
    name: "Mustafa",
    group: "students",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "mansoor",
    name: "Mansoor",
    group: "villagers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "malood",
    name: "Malood",
    group: "villagers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "nasser",
    name: "Nasser",
    group: "villagers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "khamees",
    name: "Khamees",
    group: "villagers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "obaid",
    name: "Obaid",
    group: "villagers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
  {
    slug: "zahran",
    name: "Zahran",
    group: "villagers",
    role: "[Role Placeholder]",
    description: "[Character Description Placeholder]",
    relatedChapter: "[Story File Chapter Reference]",
    voicePlaceholder: "[Pipper Integration Placeholder]",
    modelPlaceholder: "[3D Model Placeholder]",
  },
];
