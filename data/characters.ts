/**
 * Character records.
 *
 * Names are grouped as Teachers / Students / Villagers, all in English.
 * Each character carries the real cartoon image from /public/images/characters.
 * Descriptions, related chapters, voice lines, and 3D models remain placeholders
 * pending the story file linking — nothing is invented.
 */

export type CharacterGroup = "teachers" | "students" | "villagers";

export type Character = {
  slug: string;
  name: string;
  group: CharacterGroup;
  role: string;
  description: string;
  image: string;
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
      "The wise guides who kindle curiosity and nurture every young mind that sits beneath the palm.",
  },
  {
    key: "students",
    title: "Students",
    blurb:
      "Bright-eyed learners from the village, each carrying a dream that words alone can set free.",
  },
  {
    key: "villagers",
    title: "Villagers",
    blurb:
      "The heartbeat of the community — storytellers, elders, and neighbours who colour every chapter.",
  },
];

const placeholder = {
  description: "[Character Description Placeholder]",
  relatedChapter: "[Story File Chapter Reference]",
  voicePlaceholder: "[Pipper Integration Placeholder]",
  modelPlaceholder: "[3D Model Placeholder]",
};

export const CHARACTERS: Character[] = [
  // ─── TEACHERS ───
  {
    slug: "thuraya",
    name: "Thuraya",
    group: "teachers",
    role: "English Teacher · Author",
    image: "/images/characters/thuraya.jpeg",
    ...placeholder,
  },
  {
    slug: "mathla",
    name: "Mathla",
    group: "teachers",
    role: "[Role Placeholder]",
    image: "/images/characters/mathla.png",
    ...placeholder,
  },
  {
    slug: "sofia",
    name: "Sofia",
    group: "teachers",
    role: "[Role Placeholder]",
    image: "/images/characters/sofia.png",
    ...placeholder,
  },
  {
    slug: "fatakat",
    name: "Fatakat",
    group: "teachers",
    role: "[Role Placeholder]",
    image: "/images/characters/fatakat.jpeg",
    ...placeholder,
  },

  // ─── STUDENTS ───
  {
    slug: "minnah",
    name: "Minnah",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/minnah.png",
    ...placeholder,
  },
  {
    slug: "ahmed",
    name: "Ahmed",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/ahmed.png",
    ...placeholder,
  },
  {
    slug: "ali",
    name: "Ali",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/ali.jpg",
    ...placeholder,
  },
  {
    slug: "khalil",
    name: "Khalil",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/khalil.png",
    ...placeholder,
  },
  {
    slug: "kalaf",
    name: "Kalaf",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/kalaf.png",
    ...placeholder,
  },
  {
    slug: "mustafa",
    name: "Mustafa",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/mustafa.png",
    ...placeholder,
  },
  {
    slug: "sadoo",
    name: "Sadoo",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/sadoo.png",
    ...placeholder,
  },
  {
    slug: "jhon",
    name: "Jhon",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/jhon.png",
    ...placeholder,
  },
  {
    slug: "mohammadain",
    name: "Mohammadain",
    group: "students",
    role: "[Role Placeholder]",
    image: "/images/characters/mohammadain.png",
    ...placeholder,
  },

  // ─── VILLAGERS ───
  {
    slug: "mansoor",
    name: "Mansoor",
    group: "villagers",
    role: "[Role Placeholder]",
    image: "/images/characters/mansoor.png",
    ...placeholder,
  },
  {
    slug: "malood",
    name: "Malood",
    group: "villagers",
    role: "[Role Placeholder]",
    image: "/images/characters/malood.png",
    ...placeholder,
  },
  {
    slug: "nasser",
    name: "Nasser",
    group: "villagers",
    role: "[Role Placeholder]",
    image: "/images/characters/nasser.png",
    ...placeholder,
  },
  {
    slug: "khamees",
    name: "Khamees",
    group: "villagers",
    role: "[Role Placeholder]",
    image: "/images/characters/khamees.jpeg",
    ...placeholder,
  },
  {
    slug: "obaid",
    name: "Obaid",
    group: "villagers",
    role: "[Role Placeholder]",
    image: "/images/characters/obaid.jpeg",
    ...placeholder,
  },
  {
    slug: "zahran",
    name: "Zahran",
    group: "villagers",
    role: "[Role Placeholder]",
    image: "/images/characters/zahran.jpeg",
    ...placeholder,
  },
];
