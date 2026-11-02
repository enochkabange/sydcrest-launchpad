"use server";

import { track, trackRefusal } from "@/lib/analytics/track";
import { headers } from "next/headers";
import { createPublicClient } from "@/lib/supabase/public";
import { FORM_RATE_LIMIT_MESSAGE, formKey, isRateLimited } from "@/lib/rate-limit";
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
    // The anon client. join_waitlist counts this visitor's submission and adds
    // the address in one database call (issue #247: the limit lives in the
    // database, and nobody can insert into the table directly). A repeat
    // address answers exactly like a new one, so the form never reveals
    // whether an email is already on the list.
    const supabase = await createPublicClient();
    const { data: added, error } = await supabase.rpc("join_waitlist", {
      p_key: await formKey(await headers()),
      p_email: data.email,
      p_name: data.name,
      p_region: data.region,
      p_interest: data.interest,
    });
    if (isRateLimited(error) || (!error && added === false)) {
      await trackRefusal("waitlist_joined", "rate_limited");
      return { message: FORM_RATE_LIMIT_MESSAGE, values: data };
    }
    if (error) {
      console.error("waitlist insert failed", { code: error.code, message: error.message });
      await trackRefusal("waitlist_joined", "server_error", error.code);
      return { message: TRY_AGAIN, values: data };
    }
  } catch (cause) {
    console.error("waitlist insert failed", { message: cause instanceof Error ? cause.message : String(cause) });
    return { message: TRY_AGAIN, values: data };
  }

  await track("waitlist_joined");
  return { done: true };
}
