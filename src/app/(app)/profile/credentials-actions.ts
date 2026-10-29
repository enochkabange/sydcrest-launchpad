"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/path/service-client";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";
import { extractBakedBadge, isPng } from "@/lib/credentials/baked";
import {
  CREDENTIAL_REPORT_REASONS,
  CREDENTIALS_BUCKET,
  credentialFilePath,
  isOwnFilePath,
  MAX_BADGE_BYTES,
  parseCredentialForm,
  type CredentialErrors,
} from "@/lib/credentials/model";
import { importOpenBadge } from "@/lib/credentials/open-badges-import";
import { safeFetch, safeFetchJson } from "@/lib/credentials/safe-fetch";
import { SafeFetchError } from "@/lib/credentials/url-guard";
import type { Json } from "@/lib/supabase/database.types";

/**
 * Credentials wallet actions (issue #253). Every action re-checks the user;
 * RLS and column grants keep a learner to their own rows and away from the
 * verification columns, which only record_credential_import (secret key)
 * writes after an Open Badge check.
 */

async function revalidateWallet(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  revalidatePath("/profile");
  const { data } = await supabase.from("profiles").select("public_slug").eq("id", userId).maybeSingle();
  if (data?.public_slug) {
    revalidatePath(`/u/${data.public_slug}`);
    revalidatePath(`/u/${data.public_slug}/credentials`);
  }
}

async function removeFile(supabase: Awaited<ReturnType<typeof createClient>>, path: string | null | undefined) {
  if (path) await supabase.storage.from(CREDENTIALS_BUCKET).remove([path]);
}

// Add and edit --------------------------------------------------------------------

export type SaveCredentialState = { errors?: CredentialErrors; done?: boolean };

/** Adds a credential (`credentialId` null) or edits one. The file, if any, was uploaded by the browser first. */
export async function saveCredential(credentialId: string | null, _prev: SaveCredentialState, form: FormData): Promise<SaveCredentialState> {
  const user = await requireUser();
  const { input, errors } = parseCredentialForm(form);
  const filePath = String(form.get("file_path") ?? "").trim() || null;
  const removeExisting = form.get("remove_file") === "1";
  if (filePath && !isOwnFilePath(user.id, filePath)) errors.file_path = "That upload did not finish. Choose the file again.";
  if (!input || Object.keys(errors).length) return { errors };

  const supabase = await createClient();
  if (credentialId) {
    const { data: existing } = await supabase.from("external_credentials").select("file_path").eq("id", credentialId).maybeSingle();
    if (!existing) return { errors: { form: "That credential is no longer here." } };
    const nextFile = filePath ?? (removeExisting ? null : existing.file_path);
    const { error } = await supabase
      .from("external_credentials")
      .update({ ...input, file_path: nextFile })
      .eq("id", credentialId)
      .eq("profile_id", user.id);
    if (error) {
      return { errors: { form: error.code === "42501" ? "Our team hid this credential, so it stays private." : "We could not save that. Try again." } };
    }
    if (existing.file_path && existing.file_path !== nextFile) await removeFile(supabase, existing.file_path);
  } else {
    const { error } = await supabase.from("external_credentials").insert({ ...input, profile_id: user.id, file_path: filePath });
    if (error) {
      await removeFile(supabase, filePath);
      return { errors: { form: isRateLimited(error) ? RATE_LIMIT_MESSAGE : "We could not save that. Try again." } };
    }
  }
  await revalidateWallet(supabase, user.id);
  return { done: true };
}

// Visibility and delete ---------------------------------------------------------

export type VisibilityState = { error?: string };

export async function setCredentialVisibility(credentialId: string, _prev: VisibilityState, form: FormData): Promise<VisibilityState> {
  const user = await requireUser();
  const visibility = form.get("visibility") === "public" ? "public" : "private";
  const supabase = await createClient();
  const { error } = await supabase
    .from("external_credentials")
    .update({ visibility })
    .eq("id", credentialId)
    .eq("profile_id", user.id);
  if (error) return { error: error.code === "42501" ? "Our team hid this credential, so it stays private." : "We could not change that. Try again." };
  await revalidateWallet(supabase, user.id);
  return {};
}

export async function deleteCredential(credentialId: string) {
  const user = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("external_credentials")
    .delete()
    .eq("id", credentialId)
    .eq("profile_id", user.id)
    .select("file_path")
    .maybeSingle();
  await removeFile(supabase, data?.file_path);
  await revalidateWallet(supabase, user.id);
}

// Open Badge import ---------------------------------------------------------------

export type ImportState = { error?: string; done?: { title: string; verified: boolean; note: string } };

const IMAGE_SIGNATURES: [string, (b: Buffer) => boolean][] = [
  ["image/png", (b) => isPng(b)],
  ["image/jpeg", (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff],
  ["image/webp", (b) => b.length > 12 && b.toString("latin1", 0, 4) === "RIFF" && b.toString("latin1", 8, 12) === "WEBP"],
];

function sniffImage(bytes: Buffer) {
  return IMAGE_SIGNATURES.find(([, test]) => test(bytes))?.[0] ?? null;
}

/** The badge picture as bytes, through the same guarded fetch. Never throws. */
async function fetchBadgeImage(src: string | null): Promise<Buffer | null> {
  if (!src) return null;
  try {
    const data = src.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);
    if (data) return Buffer.from(data[2], "base64");
    const res = await safeFetch(src, { accept: "image/png, image/jpeg, image/webp", maxBytes: 2 * 1024 * 1024, timeoutMs: 6000 });
    return res.status === 200 ? res.body : null;
  } catch {
    return null;
  }
}

function importErrorMessage(error: unknown) {
  if (error instanceof SafeFetchError) {
    if (error.reason === "bad_url") return error.message;
    if (error.reason === "blocked") return "That link does not point to a public website, so we cannot fetch it.";
    if (error.reason === "timeout") return "The issuer's website took too long to answer. Try again later.";
    if (error.reason === "too_large") return "The issuer sent more data than a badge needs, so we stopped.";
    return "We could not reach the issuer's website. Check the link and try again.";
  }
  return "We could not import that badge. Try again, or add the certificate by hand.";
}

export async function importBadge(_prev: ImportState, form: FormData): Promise<ImportState> {
  const user = await requireUser();
  const url = String(form.get("badge_url") ?? "").trim();
  const file = form.get("badge_file");
  const hasFile = file instanceof File && file.size > 0;
  if (!url && !hasFile) return { error: "Paste the badge link, or choose the badge image." };
  if (hasFile && file.size > MAX_BADGE_BYTES) return { error: "That image is too large for a badge. Badge images are under 900 KB." };

  const supabase = await createClient();
  const { data: allowed, error: limitError } = await supabase.rpc("take_credential_import_limit");
  if (limitError) return { error: "We could not import that badge. Try again." };
  if (allowed === false) return { error: RATE_LIMIT_MESSAGE };

  let payload = url;
  let bakedImage: Buffer | null = null;
  if (hasFile) {
    const bytes = Buffer.from(await file.arrayBuffer());
    const baked = extractBakedBadge(bytes);
    if (!baked) return { error: "That image has no Open Badge inside it. Try the badge's link instead." };
    payload = baked;
    if (isPng(bytes)) bakedImage = bytes;
  }

  let result: Awaited<ReturnType<typeof importOpenBadge>>;
  try {
    result = await importOpenBadge(payload, { fetchDoc: safeFetchJson, email: user.email });
  } catch (error) {
    return { error: importErrorMessage(error) };
  }
  if (!result.ok) return { error: result.error };

  // Keep a copy of the badge picture in the private bucket; never hotlink it.
  const image = bakedImage ?? (await fetchBadgeImage(result.fields.image));
  const mime = image ? sniffImage(image) : null;
  let filePath: string | null = null;
  if (image && mime) {
    const path = credentialFilePath(user.id, mime, randomUUID());
    if (path) {
      const { error } = await supabase.storage.from(CREDENTIALS_BUCKET).upload(path, image, { contentType: mime, upsert: false });
      if (!error) filePath = path;
    }
  }

  const { image: _image, ...fields } = result.fields;
  void _image;
  const { data: row, error } = await supabase
    .from("external_credentials")
    .insert({ ...fields, profile_id: user.id, file_path: filePath, visibility: "private" })
    .select("id")
    .single();
  if (error || !row) {
    await removeFile(supabase, filePath);
    return { error: isRateLimited(error) ? RATE_LIMIT_MESSAGE : "We could not save that badge. Try again." };
  }

  // Only the secret key records the issuer check. Without it the badge stays the learner's word.
  const service = createServiceClient();
  let verified = false;
  let note = result.note;
  if (service) {
    const { error: recordError } = await service.rpc("record_credential_import", {
      p_credential_id: row.id,
      p_ob_version: result.obVersion,
      p_verified: result.verified,
      p_method: result.method ?? "",
      p_note: result.note,
      p_document: result.document as Json,
    });
    if (recordError) {
      console.error("credential import not recorded", { code: recordError.code, message: recordError.message });
      note = "Saved as added by you: the issuer check could not be recorded.";
    } else {
      verified = result.verified;
    }
  } else if (result.verified) {
    note = "Saved as added by you: issuer checks are not switched on here.";
  }
  await revalidateWallet(supabase, user.id);
  return { done: { title: fields.title, verified, note } };
}

// Reports -------------------------------------------------------------------------

export type ReportCredentialState = { done?: boolean; error?: string };

export async function reportCredential(credentialId: string, _prev: ReportCredentialState, form: FormData): Promise<ReportCredentialState> {
  const user = await requireUser();
  const reason = String(form.get("reason") ?? "");
  const details = String(form.get("details") ?? "").trim();
  if (!CREDENTIAL_REPORT_REASONS.includes(reason as (typeof CREDENTIAL_REPORT_REASONS)[number])) return { error: "Choose a reason." };
  if (details.length > 900) return { error: "Keep the details under 900 characters." };
  const supabase = await createClient();
  const { data: own } = await supabase.from("external_credentials").select("profile_id").eq("id", credentialId).maybeSingle();
  if (own?.profile_id === user.id) return { error: "You can't report your own credential." };
  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    target_type: "external_credential",
    target_id: credentialId,
    reason: details ? `${reason}: ${details}` : reason,
  });
  if (error) return { error: isRateLimited(error) ? RATE_LIMIT_MESSAGE : "We couldn't send your report. Try again." };
  return { done: true };
}
