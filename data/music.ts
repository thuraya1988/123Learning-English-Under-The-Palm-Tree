export type MusicCategory = "songs" | "soundtrack" | "educational";

export type Track = {
  id: number;
  title: string;
  category: MusicCategory;
  audioPlaceholder: string;
  lyricsPlaceholder: string;
  relatedChapter: string;
  ttsPlaceholder: string;
  pipperPlaceholder: string;
};

export const MUSIC_CATEGORIES: { key: MusicCategory; title: string; blurb: string }[] = [
  { key: "songs", title: "Songs", blurb: "Custom songs inspired by the story file." },
  { key: "soundtrack", title: "Soundtrack", blurb: "Cinematic underscore for chapters and scenes." },
  { key: "educational", title: "Educational Music", blurb: "Vocabulary and rhythm-based listening pieces." },
];

export const TRACKS: Track[] = Array.from({ length: 10 }, (_, i) => {
  const id = i + 1;
  const category: MusicCategory =
    id <= 6 ? "songs" : id <= 8 ? "soundtrack" : "educational";
  return {
    id,
    title: `Custom Song ${id}`,
    category,
    audioPlaceholder: "[Audio Placeholder]",
    lyricsPlaceholder: "[Story File Lyrics Placeholder]",
    relatedChapter: "[Chapter Reference Placeholder]",
    ttsPlaceholder: "[Pipper Integration Placeholder]",
    pipperPlaceholder: "[Pipper Voice Placeholder]",
  };
});
