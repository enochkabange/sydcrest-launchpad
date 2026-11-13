import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export type ExposureContext = {
  /** Only honoured for the service role (the re-engagement job); a signed in caller is always themselves. */
  profileId?: string;
  anonymous_id?: string | null;
  session_id?: string | null;
  device_class?: string;
  route?: string | null;
};

/** Records a person's first exposure to a running experiment (later calls do nothing). Logs, never throws. */
export async function recordExposure(
  client: Pick<SupabaseClient<Database>, "rpc">,
  key: string,
  variant: string,
  context: ExposureContext,
) {
  try {
    const { profileId, ...ctx } = context;
    const { error } = await client.rpc("record_experiment_exposure", {
      p_key: key,
      p_variant: variant,
      ...(profileId ? { p_profile_id: profileId } : {}),
      p_context: ctx,
    });
    if (error)
      console.error("experiments: exposure failed", {
        key,
        code: error.code,
        message: error.message,
      });
  } catch (error) {
    console.error("experiments: exposure failed", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
