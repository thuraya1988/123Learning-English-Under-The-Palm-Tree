/**
 * Gallery data.
 *
 * Each section maps to a folder under /public/gallery/. To add images:
 *   1. Drop the image files into the matching subfolder
 *   2. Add their filenames to the `images` array below
 *
 * No image is rendered unless it is listed here — the page degrades gracefully
 * to placeholder tiles when a section has no images yet.
 */

export type GallerySection = {
  key: string;
  title: string;
  blurb: string;
  folder: string;
  images: string[];
};

export const GALLERY_SECTIONS: GallerySection[] = [
  {
    key: "village",
    title: "The Village",
    blurb: "Sumail Al Qurooshiyah and the palm tree scenes that inspired the journey.",
    folder: "/gallery/village",
    images: [],
  },
  {
    key: "classroom",
    title: "The Classroom",
    blurb: "Lessons beneath the palm — where the story is taught every day.",
    folder: "/gallery/classroom",
    images: [],
  },
  {
    key: "students",
    title: "Our Students",
    blurb: "The bright-eyed young learners who carry the dream forward.",
    folder: "/gallery/students",
    images: [],
  },
  {
    key: "ceremonies",
    title: "Ceremonies",
    blurb: "Celebrations, milestones, and certificate moments.",
    folder: "/gallery/ceremonies",
    images: [],
  },
  {
    key: "heritage",
    title: "Heritage",
    blurb: "Traditional Omani heritage scenes that shaped the 1973 games.",
    folder: "/gallery/heritage",
    images: [],
  },
  {
    key: "museums",
    title: "Museums",
    blurb: "Museum visits and artefacts. Photos will be added soon.",
    folder: "/gallery/museums",
    images: [],
  },
  {
    key: "behind-the-scenes",
    title: "Behind The Scenes",
    blurb: "Production, recording, and the work behind the platform.",
    folder: "/gallery/behind-the-scenes",
    images: [],
  },
];
