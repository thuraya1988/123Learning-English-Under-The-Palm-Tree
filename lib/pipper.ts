/**
 * Pipper integration scaffolding.
 *
 * Do not hardcode real credentials here. All values are placeholders that
 * downstream pages can read and that a deployment configuration can later
 * override at build time.
 */

export const PIPPER_CONFIG = {
  apiKey: "[Pipper API Key Placeholder]",
  voiceId: "[Pipper Voice ID Placeholder]",
  endpoint: "[Pipper Endpoint Placeholder]",
};

export type PipperVoiceRequest = {
  text: string;
  voice?: string;
  speed?: number;
};

export async function pipperSpeak(_req: PipperVoiceRequest): Promise<{
  status: "placeholder";
  audioPlaceholder: string;
}> {
  // [Pipper Integration Placeholder] — wire to the real Pipper endpoint later.
  return { status: "placeholder", audioPlaceholder: "[Audio Placeholder]" };
}

export async function pipperPronounce(_word: string) {
  return { status: "placeholder", feedback: "[Pipper Pronunciation Feedback Placeholder]" };
}

export async function pipperNarrateChapter(chapterId: number) {
  return {
    status: "placeholder",
    chapterId,
    audio: "[Chapter Narration Placeholder]",
  };
}
