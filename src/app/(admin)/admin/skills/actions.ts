"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { parseQuestions } from "@/components/learn/quiz-data";
import { requireAdmin } from "@/lib/admin";
import { keyMatchesQuestions, parseAnswerKey, parseQuizAuthoring } from "@/lib/skills/assessment";
import { ROADMAP_SLUG_PATTERN, parseAssessmentForm, parseRevokeReason, parseSkillForm } from "@/lib/skills/admin";
import { skillErrorMessage } from "@/lib/skills/errors";
import { revalidateSkills } from "@/lib/skills/revalidate";

/**
 * Admin writes for the skill catalogue (issue #165). Every action re-checks
 * the admin role (requireAdmin) and writes with the admin's own session, so
 * RLS (private.is_admin) checks it again. Admins never write verified_skills:
 * badges come only from the database (path completion, a passed quiz, an
 * approved portfolio), and revoking goes through revoke_verified_skill.
 */

export type FormState = {
  errors?: Record<string, string | undefined>;
  message?: string;
  saved?: number;
};

const UNIQUE_VIOLATION = "23505";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function id(form: FormData, key = "id") {
  const value = form.get(key);
  return typeof value === "string" && UUID.test(value) ? value : "";
}

/** Public skill pages change with every catalogue write; expire them all (writes are rare). */
function catalogueChanged() {
  revalidateSkills();
  refresh();
}

// Skills ----------------------------------------------------------------------------------------

export async function createSkill(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseSkillForm(form);
  if (Object.keys(errors).length) return { errors };
  const { data: row, error } = await supabase.from("skills").insert(data).select("id").single();
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another skill already uses this slug." } };
  if (error) return { message: "We couldn't create the skill. Try again." };
  revalidateSkills();
  redirect(`/admin/skills/${row.id}`);
}

export async function updateSkill(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { data, errors } = parseSkillForm(form);
  if (Object.keys(errors).length) return { errors };
  const { error } = await supabase.from("skills").update(data).eq("id", id(form));
  if (error?.code === UNIQUE_VIOLATION) return { errors: { slug: "Another skill already uses this slug." } };
  if (error) return { message: "We couldn't save the skill. Try again." };
  catalogueChanged();
  return { saved: Date.now() };
}

export async function setSkillPublished(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("skills")
    .update({ is_published: form.get("publish") === "true" })
    .eq("id", id(form));
  if (error) throw new Error(`Could not change publish state: ${error.message}`);
  catalogueChanged();
}

// Roadmap mappings ------------------------------------------------------------------------------

export async function addRoadmapMapping(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const skillId = id(form, "skill_id");
  const slug = String(form.get("roadmap_slug") ?? "").trim();
  if (!ROADMAP_SLUG_PATTERN.test(slug)) return { errors: { roadmap_slug: "Choose a roadmap." } };
  const { error } = await supabase.from("skill_roadmaps").insert({ skill_id: skillId, roadmap_slug: slug });
  if (error?.code === UNIQUE_VIOLATION) return { errors: { roadmap_slug: "That roadmap is already mapped to this skill." } };
  if (error) return { message: "We couldn't add the mapping. Try again." };
  catalogueChanged();
  return { saved: Date.now() };
}

export async function removeRoadmapMapping(form: FormData) {
  const { supabase } = await requireAdmin();
  const slug = String(form.get("roadmap_slug") ?? "");
  const { error } = await supabase.from("skill_roadmaps").delete().eq("skill_id", id(form, "skill_id")).eq("roadmap_slug", slug);
  if (error) throw new Error(`Could not remove the mapping: ${error.message}`);
  catalogueChanged();
}

// Assessments -----------------------------------------------------------------------------------

export async function createAssessment(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const skillId = id(form, "skill_id");
  const { data, errors } = parseAssessmentForm(form);
  if (Object.keys(errors).length) return { errors };
  // One of each kind per skill: the public page offers one quiz and one portfolio review.
  const { count } = await supabase
    .from("skill_assessments")
    .select("id", { count: "exact", head: true })
    .eq("skill_id", skillId)
    .eq("kind", data.kind);
  if (count) return { errors: { kind: `This skill already has a ${data.kind === "quiz" ? "quiz" : "portfolio review"}.` } };
  const { data: row, error } = await supabase
    .from("skill_assessments")
    .insert({ ...data, skill_id: skillId })
    .select("id")
    .single();
  if (error) return { message: "We couldn't create the assessment. Try again." };
  redirect(`/admin/skills/${skillId}/assessments/${row.id}`);
}

export async function updateAssessment(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const assessmentId = id(form);
  const { data: current } = await supabase.from("skill_assessments").select("kind").eq("id", assessmentId).maybeSingle();
  if (!current) return { message: "That assessment no longer exists." };
  const { data, errors } = parseAssessmentForm(form, current.kind === "portfolio" ? "portfolio" : "quiz");
  if (Object.keys(errors).length) return { errors };
  // The kind is fixed once created.
  const { error } = await supabase
    .from("skill_assessments")
    .update({
      title: data.title,
      instructions: data.instructions,
      pass_threshold: data.pass_threshold,
      retry_after_hours: data.retry_after_hours,
    })
    .eq("id", assessmentId);
  if (error) return { message: "We couldn't save the assessment. Try again." };
  catalogueChanged();
  return { saved: Date.now() };
}

/**
 * Saves the questions and the answer key together. The key goes first, so a
 * published quiz is never graded against questions it does not cover.
 */
export async function saveQuizQuestions(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const assessmentId = id(form);
  const { data, errors } = parseQuizAuthoring(form);
  if (Object.keys(errors).length) return { errors, message: errors.form ?? "Check the questions marked below." };

  const { error: keyError } = await supabase
    .from("skill_assessment_answers")
    .upsert({ assessment_id: assessmentId, answer_key: data.answerKey });
  if (keyError) return { message: "We couldn't save the answers. Nothing was changed." };
  const { error } = await supabase.from("skill_assessments").update({ questions: data.questions }).eq("id", assessmentId);
  if (error) return { message: "We couldn't save the questions. Try again." };
  catalogueChanged();
  return { saved: Date.now() };
}

export async function setAssessmentPublished(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const assessmentId = id(form);
  const publish = form.get("publish") === "true";
  if (publish) {
    const [{ data: assessment }, { data: key }] = await Promise.all([
      supabase.from("skill_assessments").select("kind, questions").eq("id", assessmentId).maybeSingle(),
      supabase.from("skill_assessment_answers").select("answer_key").eq("assessment_id", assessmentId).maybeSingle(),
    ]);
    if (!assessment) return { message: "That assessment no longer exists." };
    if (assessment.kind === "quiz") {
      const questions = parseQuestions(assessment.questions);
      if (questions.length === 0) return { message: "Add questions before you publish the quiz." };
      if (!keyMatchesQuestions(questions, parseAnswerKey(key?.answer_key))) {
        return { message: "Every question needs a right answer. Save the questions again before you publish." };
      }
    }
  }
  const { error } = await supabase.from("skill_assessments").update({ is_published: publish }).eq("id", assessmentId);
  if (error) return { message: "We couldn't change the publish state. Try again." };
  catalogueChanged();
  return { saved: Date.now() };
}

export async function deleteAssessment(form: FormData) {
  const { supabase } = await requireAdmin();
  const skillId = id(form, "skill_id");
  const { error } = await supabase.from("skill_assessments").delete().eq("id", id(form)).eq("skill_id", skillId);
  if (error) throw new Error(`Could not delete the assessment: ${error.message}`);
  revalidateSkills();
  redirect(`/admin/skills/${skillId}`);
}

// Revoking --------------------------------------------------------------------------------------

export async function revokeSkill(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const { reason, error: reasonError } = parseRevokeReason(form);
  if (reasonError) return { errors: { reason: reasonError } };
  const { error } = await supabase.rpc("revoke_verified_skill", { p_verified_skill_id: id(form), p_reason: reason });
  if (error) return { message: skillErrorMessage(error) };
  refresh();
  return { saved: Date.now() };
}
