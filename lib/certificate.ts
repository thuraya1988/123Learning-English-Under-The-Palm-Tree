import type { Profile } from "./progress";

export function buildCertificatePayload(profile: Profile | null) {
  return {
    username: profile?.username ?? "[Username Placeholder]",
    avatar: profile?.avatar ?? "[Avatar Placeholder]",
    course: "Learn Under The Palm Tree",
    completionDate: new Date().toISOString().slice(0, 10),
    signature: "[Signature Placeholder]",
    statement:
      "Has completed the cinematic English-learning journey of Learn Under The Palm Tree.",
  };
}
