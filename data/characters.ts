/**
 * Character records.
 *
 * All character portraits live in /public/characters-withnamesandbackgrond/
 * (the folder the author named). Descriptions, related chapters, voice lines,
 * and 3D models remain placeholders pending the story file.
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

const ph = {
  description: "[Character Description Placeholder]",
  relatedChapter: "[Story File Chapter Reference]",
  voicePlaceholder: "[Pipper Integration Placeholder]",
  modelPlaceholder: "[3D Model Placeholder]",
};

const folder = "/characters-withnamesandbackgrond";

export const CHARACTERS: Character[] = [
  // ─── TEACHERS ───
  { slug: "thuraya", name: "Thuraya", group: "teachers",
    role: "English Teacher · Author",
    image: `${folder}/thuraya-name+background.png`, ...ph },
  { slug: "mathla", name: "Mathla", group: "teachers",
    role: "[Role Placeholder]",
    image: `${folder}/math;a-name+background.png`, ...ph },
  { slug: "sofia", name: "Sofia", group: "teachers",
    role: "[Role Placeholder]",
    image: `${folder}/sofia-name+background.png`, ...ph },
  { slug: "fatakat", name: "Fatakat", group: "teachers",
    role: "[Role Placeholder]",
    image: `${folder}/fatakat-name+background.png`, ...ph },
  { slug: "noorah", name: "Noorah", group: "teachers",
    role: "[Role Placeholder]",
    image: `${folder}/noorah-name+background.png`, ...ph },
  { slug: "rahma", name: "Rahma", group: "teachers",
    role: "[Role Placeholder]",
    image: `${folder}/rahma-name+background.png`, ...ph },

  // ─── STUDENTS ───
  { slug: "minnah-mustafa", name: "Minnah & Mustafa", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/minnah+mustafa-name+background.png`, ...ph },
  { slug: "ahmed", name: "Ahmed", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/Ahmed-name+background.png`, ...ph },
  { slug: "ali", name: "Ali", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/ali-name+background.png`, ...ph },
  { slug: "khalil", name: "Khalil", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/khalil-name+background.png`, ...ph },
  { slug: "khalaf", name: "Khalaf", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/khalaf-name+background.png`, ...ph },
  { slug: "sadoo", name: "Sadoo", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/sadoo-name+background.png`, ...ph },
  { slug: "john", name: "John", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/john-name+background.png`, ...ph },
  { slug: "mohamadain", name: "Mohamadain", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/mohamadain-name+background.png`, ...ph },
  { slug: "marhoon", name: "Marhoon", group: "students",
    role: "[Role Placeholder]",
    image: `${folder}/marhoon-name+background.png`, ...ph },

  // ─── VILLAGERS ───
  { slug: "mansoor", name: "Mansoor", group: "villagers",
    role: "[Role Placeholder]",
    image: `${folder}/mansoorname+background.png`, ...ph },
  { slug: "malood", name: "Malood", group: "villagers",
    role: "[Role Placeholder]",
    image: `${folder}/malood-name+background.png`, ...ph },
  { slug: "nasser", name: "Nasser", group: "villagers",
    role: "[Role Placeholder]",
    image: `${folder}/nasser-name+background.png`, ...ph },
  { slug: "khamees", name: "Khamees", group: "villagers",
    role: "[Role Placeholder]",
    image: `${folder}/khamees-name+background.png`, ...ph },
  { slug: "obaid", name: "Obaid", group: "villagers",
    role: "[Role Placeholder]",
    image: `${folder}/Obaid-name+background.png`, ...ph },
  { slug: "zahran", name: "Zahran", group: "villagers",
    role: "[Role Placeholder]",
    image: `${folder}/zahran-name+background.png`, ...ph },
];

export const PALM_TREE_FAMILY_IMAGE = `${folder}/palm-tree-family.png`;
