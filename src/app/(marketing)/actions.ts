"use server";

import { parseWaitlist, type WaitlistField } from "@/lib/waitlist";
import type { FieldErrors } from "@/lib/validation";

export type WaitlistState = {
  errors?: FieldErrors<WaitlistField>;
  values?: { name?: string; email?: string; region?: string; interest?: string };
  done?: boolean;
};

export async function joinWaitlist(_prev: WaitlistState, form: FormData): Promise<WaitlistState> {
  const { data, errors } = parseWaitlist(form);
  if (Object.keys(errors).length) return { errors, values: data };

  // TODO(#39): insert into the `waitlist` table (email, name, region, interest) once the
  // Phase 1 schema PR merges. Until then nothing is stored, and the success copy says
  // so honestly ("the waitlist opens soon") rather than promising a confirmed place.
  return { done: true };
}
