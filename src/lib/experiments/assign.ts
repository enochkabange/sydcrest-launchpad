import { createHash } from "node:crypto";

/**
 * Stable assignment for experiments, holdouts and feature flags (issue #327).
 * Pure apart from the hash, so it is unit tested and shared by the server
 * helper (`variant()`) and the re-engagement job.
 *
 * A person's bucket is the first 32 bits of sha256("<experiment key>:<subject>")
 * scaled to 0..9999, where the subject is the profile id, or the anonymous
 * visitor id for someone signed out. The bucket picks a variant by walking
 * the weights in order, so the same person always gets the same variant
 * while the weights stay the same, and a person's buckets in two experiments
 * are unrelated. Nothing is stored to assign; the first exposure is recorded
 * only so dashboards can count it (public.record_experiment_exposure).
 *
 * The first variant is the control: what people get while the experiment is
 * not running, and what people who turned analytics off always get. A feature
 * flag is an experiment with variants off (first) and on.
 */

export type Variant = { code: string; weight: number };

export const BUCKETS = 10_000;

const CODE = /^[a-z][a-z0-9_]{0,29}$/;
export const EXPERIMENT_KEY = /^[a-z][a-z0-9_]{1,59}$/;

/** The person's bucket in an experiment, 0 to 9999. */
export function bucket(key: string, subject: string): number {
  const hex = createHash("sha256")
    .update(`${key}:${subject}`)
    .digest("hex")
    .slice(0, 8);
  return Math.floor((parseInt(hex, 16) / 0x1_0000_0000) * BUCKETS);
}

/**
 * Variants from the database, or null when they are not a valid list (2 to 6
 * unique lower case codes, whole number weights adding up to 1 to 10000).
 * The same rule as private.experiment_variants_ok().
 */
export function parseVariants(value: unknown): Variant[] | null {
  if (!Array.isArray(value) || value.length < 2 || value.length > 6)
    return null;
  const seen = new Set<string>();
  let total = 0;
  const out: Variant[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const { code, weight } = item as { code?: unknown; weight?: unknown };
    if (typeof code !== "string" || !CODE.test(code) || seen.has(code))
      return null;
    if (
      typeof weight !== "number" ||
      !Number.isInteger(weight) ||
      weight < 0 ||
      weight > BUCKETS
    )
      return null;
    seen.add(code);
    total += weight;
    out.push({ code, weight });
  }
  return total >= 1 && total <= BUCKETS ? out : null;
}

/** The variant a bucket falls in: weights are shares of their total, in order. */
export function pickVariant(variants: readonly Variant[], b: number): string {
  const total = variants.reduce((s, v) => s + v.weight, 0);
  const point = Math.floor((b * total) / BUCKETS);
  let edge = 0;
  for (const v of variants) {
    edge += v.weight;
    if (point < edge) return v.code;
  }
  return variants[variants.length - 1].code;
}

/** The variant a person gets in an experiment. */
export function assign(
  key: string,
  subject: string,
  variants: readonly Variant[],
): string {
  return pickVariant(variants, bucket(key, subject));
}

/**
 * Parses "control:50, change:50" (the admin form) into variants, or an error
 * message. Weights are whole numbers; they need not add up to 100.
 */
export function parseVariantList(
  text: string,
): { variants: Variant[] } | { error: string } {
  const parts = text
    .split(/[,\n]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const variants: Variant[] = [];
  for (const part of parts) {
    const match = /^([a-z][a-z0-9_]{0,29})\s*[:=]\s*(\d{1,5})$/.exec(part);
    if (!match)
      return {
        error: `"${part}" should look like control:50 (a lower case name, a colon and a whole number).`,
      };
    variants.push({ code: match[1], weight: Number(match[2]) });
  }
  const parsed = parseVariants(variants);
  if (!parsed)
    return {
      error:
        "Give 2 to 6 variants with different names, weights adding up to between 1 and 10000.",
    };
  return { variants: parsed };
}

/** "nudge 90%, holdout 10%". */
export function describeSplit(variants: readonly Variant[]): string {
  const total = variants.reduce((s, v) => s + v.weight, 0) || 1;
  return variants
    .map((v) => `${v.code} ${Math.round((v.weight / total) * 1000) / 10}%`)
    .join(", ");
}
