"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { EXPERIMENT_KEY, parseVariantList } from "@/lib/experiments/assign";
import { isUuid } from "@/lib/talent/forms";

export type ExperimentFormState = { message?: string; done?: string };

const METRICS = ["came_back_7d", "active_7d"] as const;

function text(form: FormData, name: string) {
  const v = form.get(name);
  return typeof v === "string" ? v.trim() : "";
}

/** Creates a draft experiment. Starting it is a separate step, so the split can be checked first. */
export async function createExperiment(
  _prev: ExperimentFormState,
  form: FormData,
): Promise<ExperimentFormState> {
  const { supabase } = await requireAdmin();
  const key = text(form, "key");
  if (!EXPERIMENT_KEY.test(key))
    return {
      message:
        "Give the experiment a key of lower case letters, numbers and underscores, starting with a letter.",
    };
  const description = text(form, "description").slice(0, 500);
  const parsed = parseVariantList(text(form, "variants"));
  if ("error" in parsed) return { message: parsed.error };
  const metric = text(form, "metric");
  if (!METRICS.includes(metric as (typeof METRICS)[number]))
    return { message: "Choose what to measure." };

  const { error } = await supabase
    .from("experiments")
    .insert({ key, description, variants: parsed.variants, metric });
  if (error) {
    if (error.code === "23505")
      return {
        message:
          "An experiment with that key already exists. Keys are never reused.",
      };
    return { message: `Could not save: ${error.message}` };
  }
  revalidatePath("/admin/experiments");
  return { done: key };
}

/** Starts a draft or stops a running experiment. The database refuses any other change of status. */
export async function setExperimentStatus(
  id: string,
  _prev: ExperimentFormState,
  form: FormData,
): Promise<ExperimentFormState> {
  const { supabase } = await requireAdmin();
  if (!isUuid(id)) return { message: "That experiment is not valid." };
  const status = text(form, "status");
  if (status !== "running" && status !== "stopped")
    return { message: "Choose start or stop." };
  const { data, error } = await supabase
    .from("experiments")
    .update({ status })
    .eq("id", id)
    .select("id");
  if (error) return { message: `Could not save: ${error.message}` };
  if (!data?.length) return { message: "That experiment was not found." };
  revalidatePath("/admin/experiments");
  revalidatePath("/admin/insights/experiments");
  return { done: status };
}
