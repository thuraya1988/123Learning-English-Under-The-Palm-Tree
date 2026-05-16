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

/**
 * 22 tracks composed by Thuraya Mohammed bin Ali Al Naabi.
 * Real titles, lyrics, audio files, and chapter mappings will be supplied
 * by the author. Until then every slot uses clean placeholders — no
 * invented song titles or lyrics.
 */
export const TRACKS: Track[] = Array.from({ length: 22 }, (_, i) => {
  const id = i + 1;
  // first 12 are songs, 13-18 are soundtrack, 19-22 are educational
  const category: MusicCategory =
    id <= 12 ? "songs" : id <= 18 ? "soundtrack" : "educational";
  return {
    id,
    title: `[Song ${String(id).padStart(2, "0")} Title Placeholder]`,
    category,
    audioPlaceholder: "[Audio Placeholder]",
    lyricsPlaceholder: "[Story File Lyrics Placeholder]",
    relatedChapter: "[Chapter Reference Placeholder]",
    ttsPlaceholder: "[Pipper Integration Placeholder]",
    pipperPlaceholder: "[Pipper Voice Placeholder]",
  };
});
