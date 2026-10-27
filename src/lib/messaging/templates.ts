/**
 * Message text. Plain English, short, no dashes, no marketing. Every message
 * ends with how to stop them. WhatsApp messages a business starts outside a
 * 24 hour reply window need a Meta approved template in production; when
 * those are approved, register them in Twilio with this exact wording.
 */

export const OPT_OUT_LINE = "Reply STOP to stop these messages.";

export const TEMPLATES = {
  welcome:
    "Hi {name}, this is SydCrest. You turned on WhatsApp updates, so we will message you about your learning and your cohort. " +
    OPT_OUT_LINE,
  reengage:
    "Hi {name}, it has been a week since you last worked on your SydCrest roadmap. Pick up where you left off at {url} " +
    OPT_OUT_LINE,
  event_reminder:
    "Hi {name}, a reminder that {event} starts {when}. Details and any joining link are at {url} " +
    OPT_OUT_LINE,
} as const;

export type TemplateName = keyof typeof TEMPLATES;
export type TemplateVars = Record<string, string | null | undefined>;

const FALLBACKS: Record<string, string> = { name: "there" };

/** Fill {placeholders}. Missing values use a neutral fallback, never "undefined". */
export function renderTemplate(name: TemplateName, vars: TemplateVars = {}) {
  return TEMPLATES[name].replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = vars[key]?.trim();
    return value || FALLBACKS[key] || "";
  });
}

/** First word of a display name, so "Wumpini Alhassan" reads "Hi Wumpini". */
export function firstName(displayName: string | null | undefined) {
  return displayName?.trim().split(/\s+/)[0] || null;
}
