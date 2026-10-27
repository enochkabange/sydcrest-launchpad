/**
 * Submission and AI review knobs in one place. Changing a model or a limit is
 * a one line edit here; nothing else hard codes these values.
 */

export const REVIEW_MODELS = {
  /** Every ordinary week. */
  routine: "claude-haiku-5-5",
  /** Capstone weeks (program_weeks.is_capstone) get the stronger reviewer. */
  capstone: "claude-sonnet-5-5",
} as const;

export type ReviewTier = keyof typeof REVIEW_MODELS;

/** Room for adaptive thinking plus the JSON review; the real cost cap per review. */
export const REVIEW_MAX_TOKENS: Record<ReviewTier, number> = {
  routine: 4000,
  capstone: 8000,
};

export const REVIEW_EFFORT: Record<ReviewTier, "low" | "medium"> = {
  routine: "low",
  capstone: "medium",
};

/** Longest summary and per criterion comment we store from the model. */
export const MAX_SUMMARY_CHARS = 1200;
export const MAX_COMMENT_CHARS = 600;

/** Mirrors the table checks so the form can say so before the database does. */
export const MAX_BODY_CHARS = 20000;
export const MAX_LINK_CHARS = 2000;
export const MAX_MENTOR_FEEDBACK_CHARS = 8000;

/** The private bucket and its limits (mirrors the storage bucket settings). */
export const SUBMISSIONS_BUCKET = "submissions";
export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const ALLOWED_FILE_TYPES: Record<string, string> = {
  "application/pdf": "PDF",
  "text/plain": "text file",
  "image/png": "PNG image",
  "image/jpeg": "JPEG image",
  "image/webp": "WebP image",
  "video/mp4": "MP4 video",
  "video/quicktime": "MOV video",
  "video/webm": "WebM video",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PowerPoint deck",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel sheet",
};
export const FILE_ACCEPT = ".pdf,.txt,.png,.jpg,.jpeg,.webp,.mp4,.mov,.webm,.docx,.pptx,.xlsx";

/** Signed links to a submission file last this long (seconds). */
export const SIGNED_URL_SECONDS = 60 * 10;
