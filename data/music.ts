export type MusicCategory = "songs" | "soundtrack" | "educational";

export type Track = {
  id: number;
  title: string;
  category: MusicCategory;
  audio: string;
  desc: string;
  relatedChapter: string;
};

const SONG = (file: string) => `/Songs-section/${file}`;

/**
 * Songs composed by Thuraya Mohammed bin Ali Al Naabi.
 * 19 of the planned 22 songs are wired to the actual MP4 files in
 * /public/Songs-section/. Real lyrics and chapter mapping will replace
 * the placeholder descriptions when the user provides them.
 */
export const TRACKS: Track[] = [
  {
    id: 1,
    title: "Welcome — Qurwashiya Characters",
    audio: SONG("wellcome-qurwashiya-characters.mp4"),
    desc: "An opening welcome to every character of the village.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 2,
    title: "ABC Under The Palm Tree",
    audio: SONG("ABC-under-the-palm-tree.mp4"),
    desc: "The alphabet song, sung beneath the palm.",
    category: "educational",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 3,
    title: "123 — Under The Fard Palm",
    audio: SONG("123-Under_the_Fard_Palm.mp4"),
    desc: "A counting melody under the Fard palm.",
    category: "educational",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 4,
    title: "Letters In The Sky",
    audio: SONG("Letters_in_the_Sky.mp4"),
    desc: "Letters drift like clouds above the village.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 5,
    title: "Morning Tea And Wooden Doors",
    audio: SONG("Morning_Tea_and_Wooden_Doors.mp4"),
    desc: "A morning by the carved wooden door.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 6,
    title: "Simple Rhyme",
    audio: SONG("Simple_Rhyme.mp4"),
    desc: "A simple, playful rhyme for young learners.",
    category: "educational",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 7,
    title: "Stars In Their Eyes",
    audio: SONG("Stars_In_Their_Eyes.mp4"),
    desc: "A song for the students of the village.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 8,
    title: "Tales Of Al Qurawashiyah",
    audio: SONG("Tales_of_Al_Qurawashiyah.mp4"),
    desc: "The village's stories set to melody.",
    category: "soundtrack",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 9,
    title: "The Moon Above Samail",
    audio: SONG("The_Moon_Above_Samail.mp4"),
    desc: "A nocturne for the moon above Samail.",
    category: "soundtrack",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 10,
    title: "Under Amber Palms",
    audio: SONG("Under_Amber_Palms.mp4"),
    desc: "Amber light filters through the palm fronds.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 11,
    title: "Under The Same Palm Sky",
    audio: SONG("Under_the_Same_Palm_Sky.mp4"),
    desc: "Beneath one sky, one palm, one song.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 12,
    title: "Where The Falaj Flows",
    audio: SONG("Where_The_Falaj_Flows.mp4"),
    desc: "The water of the falaj moves through the song.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 13,
    title: "Where The Falaj Runs",
    audio: SONG("Where_the_Falaj_Runs.mp4"),
    desc: "The falaj runs, and the village wakes.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 14,
    title: "Where The Mountains Lean",
    audio: SONG("Where_The_Mountains_Lean.mp4"),
    desc: "The mountains lean down to listen.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 15,
    title: "By The Flowing Falaj",
    audio: SONG("By_the_Flowing_Falaj.mp4"),
    desc: "By the flowing water, the song begins.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 16,
    title: "ALOA — Heeh",
    audio: SONG("ALOA-HEEH.mp4"),
    desc: "A bright, joyful call across the village.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 17,
    title: "بين الكلام · Between Words",
    audio: SONG("بين_الكلام.mp4"),
    desc: "Between the words, the meaning lives.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 18,
    title: "جرس الصبح · Morning Bell",
    audio: SONG("جرس_الصبح.mp4"),
    desc: "The morning bell sounds across the village.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
  {
    id: 19,
    title: "يا نخلة عاليه · Oh Tall Palm",
    audio: SONG("يا_نخلة_عاليه.mp4"),
    desc: "A song addressed to the tallest palm.",
    category: "songs",
    relatedChapter: "[Chapter Reference Placeholder]",
  },
];

export const MUSIC_CATEGORIES: {
  key: MusicCategory;
  title: string;
  blurb: string;
}[] = [
  { key: "songs", title: "Songs", blurb: "Custom songs inspired by the story." },
  { key: "soundtrack", title: "Soundtrack", blurb: "Cinematic underscore." },
  { key: "educational", title: "Educational", blurb: "Vocabulary and rhythm pieces." },
];

/**
 * Approved website music + sound effects, sitting under
 * /public/Website-music-soundeffect/.
 */
export const WEBSITE_AUDIO = {
  bgMain: "/Website-music-soundeffect/main-background-website-music.mpeg",
  bgSecond: "/Website-music-soundeffect/second-background-website-music.mpeg",
  music: "/Website-music-soundeffect/music-background.mp3",
  thinking: "/Website-music-soundeffect/thinking-music.mp3",
  cardSwipe: "/Website-music-soundeffect/card-swipe-sound.mp3",
  click: "/Website-music-soundeffect/click.mp3",
  notification: "/Website-music-soundeffect/notefication sound.mp3",
  right: "/Website-music-soundeffect/when-press-right-answer.mp3",
  wrong: "/Website-music-soundeffect/when-press-wrongbox-wronganswer.mp3",
  cheering: "/Website-music-soundeffect/cheering.mp3",
  kidsTalking: "/Website-music-soundeffect/people-kids-talking-loughing.mp3",
  projectIdea: "/Website-music-soundeffect/project-idea.mp3",
  dedication: "/Website-music-soundeffect/dedication.mpeg",
};
