import { ALLOWED_FILE_TYPES, MAX_FILE_BYTES } from "./config";

/** Problem with a chosen file, in words for the learner, or null when it is fine. */
export function fileProblem(file: { size: number; type: string }): string | null {
  if (!ALLOWED_FILE_TYPES[file.type]) {
    return "That type of file is not accepted. Use a PDF, an image, a short video, a text file or a Word, PowerPoint or Excel file.";
  }
  if (file.size > MAX_FILE_BYTES) return "That file is over 50 MB. Try a smaller export or share a link instead.";
  if (file.size === 0) return "That file is empty. Choose it again.";
  return null;
}

/** A safe object name part: letters, digits, dot, dash and underscore only. */
export function safeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "file";
  const cleaned = base
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^[._]+/, "")
    .slice(-80);
  return cleaned || "file";
}

/**
 * Object name in the private bucket. The first folder must be the owner's id
 * (storage policy and the table check). Every upload gets a fresh name,
 * because a file attached to sent work can never be replaced or deleted.
 */
export function submissionObjectPath(profileId: string, weekId: string, fileName: string, now = Date.now()): string {
  return `${profileId}/${weekId}/${now.toString(36)}-${safeFileName(fileName)}`;
}

/** The name to show for a stored object (drops the folders and the upload stamp). */
export function displayFileName(path: string | null): string | null {
  if (!path) return null;
  const last = path.split("/").pop() ?? path;
  return last.replace(/^[a-z0-9]+-/, "");
}

/** True when the path sits in this learner's own folder, as storage and the table require. */
export function isOwnPath(profileId: string, path: string): boolean {
  return path.split("/")[0] === profileId && !path.includes("..");
}
