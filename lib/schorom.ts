/**
 * Schorom integration scaffolding.
 *
 * All values are placeholders. The connector below is meant to be later wired
 * to the live Schorom classroom platform.
 */

export const SCHOROM_CONFIG = {
  apiKey: "[Schorom API Key Placeholder]",
  endpoint: "[Schorom Endpoint Placeholder]",
  classroomId: "[Schorom Classroom ID Placeholder]",
};

export async function schoromSyncProgress(_progress: unknown) {
  return { status: "placeholder", message: "[Schorom Classroom Sync Placeholder]" };
}

export async function schoromPublishAssignment(_data: unknown) {
  return { status: "placeholder", message: "[Schorom Assignment Placeholder]" };
}

export async function schoromSubmitScore(_data: unknown) {
  return { status: "placeholder", message: "[Schorom Score Sync Placeholder]" };
}

export async function schoromSyncCertificate(_data: unknown) {
  return { status: "placeholder", message: "[Schorom Certificate Sync Placeholder]" };
}
