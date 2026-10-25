import { parseAnswers, type PathAnswers } from "./quiz";

/**
 * Browser copy of the quiz answers, kept through sign up and email
 * confirmation. Storage can be missing or throw (private mode, blocked site
 * data), so every access is guarded and failure just means "nothing stored".
 */
const KEY = "sydcrest.pathAnswers";

export function readLocalAnswers(): PathAnswers | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? parseAnswers(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function writeLocalAnswers(answers: PathAnswers) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    // The signed cookie is the fallback.
  }
}

export function clearLocalAnswers() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}
