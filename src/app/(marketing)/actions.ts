"use server";

import { createPublicClient } from "@/lib/supabase/public";
import { parseWaitlist, WAITLIST_HONEYPOT, type WaitlistField } from "@/lib/waitlist";
import type { FieldErrors } from "@/lib/validation";

export type WaitlistState = {
  errors?: FieldErrors<WaitlistField>;
  values?: { name?: string; email?: string; region?: string; interest?: string };
  message?: string;
  done?: boolean;
};

const TRY_AGAIN = "We couldn't add you to the waitlist. Try again in a moment.";

export async function joinWaitlist(_prev: WaitlistState, form: FormData): Promise<WaitlistState> {
  // A bot that fills the hidden field gets the same thanks as everyone else
  // and nothing is stored, so it learns nothing about the trap.
  const trap = form.get(WAITLIST_HONEYPOT);
  if (typeof trap === "string" && trap.trim() !== "") return { done: true };

  const { data, errors } = parseWaitlist(form);
  if (Object.keys(errors).length) return { errors, values: data };

  try {
    // The anon client: anyone may join, only an admin may read the list back,
    // so the insert asks for no rows in return.
    const supabase = await createPublicClient();
    const { error } = await supabase.from("waitlist").insert(data);
    // 23505 means the address is already on the list. Answer exactly as for a new
    // sign up so the form never reveals whether an email is already there.
    if (error && error.code !== "23505") {
      console.error("waitlist insert failed", { code: error.code, message: error.message });
      return { message: TRY_AGAIN, values: data };
    }
  } catch (cause) {
    console.error("waitlist insert failed", { message: cause instanceof Error ? cause.message : String(cause) });
    return { message: TRY_AGAIN, values: data };
  }

  return { done: true };
}
