"use client";

import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { addRoadmapMapping, createAssessment, revokeSkill, type FormState } from "../actions";

/** Map the skill to a roadmap by slug. Drafts are listed too, so a skill can be ready before its roadmap opens. */
export function MappingForm({
  skillId,
  roadmaps,
}: {
  skillId: string;
  roadmaps: { slug: string; title: string; isPublished: boolean }[];
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(addRoadmapMapping, {});
  if (roadmaps.length === 0) return <p className="text-sm text-content-2">Every roadmap is already mapped to this skill.</p>;
  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-3 rounded-lg border border-line p-4 sm:flex-row sm:items-end">
      <input type="hidden" name="skill_id" value={skillId} />
      <div className="flex-1">
        <SelectField id="roadmap_slug" label="Add a roadmap" defaultValue="" error={state.errors?.roadmap_slug}>
          <option value="" disabled>
            Choose a roadmap
          </option>
          {roadmaps.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.title}
              {r.isPublished ? "" : " (draft)"}
            </option>
          ))}
        </SelectField>
      </div>
      <Button type="submit" variant="secondary" disabled={pending}>
        Add roadmap
      </Button>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
    </form>
  );
}

/** Start a quiz or a portfolio review; questions and instructions are written on its own page. */
export function AssessmentCreateForm({ skillId, kinds }: { skillId: string; kinds: ("quiz" | "portfolio")[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createAssessment, {});
  const e = state.errors ?? {};
  const [kind, setKind] = useState(kinds[0]);
  return (
    <form action={action} className="flex flex-col gap-4 rounded-lg border border-line p-4" noValidate>
      <h3 className="text-h3 text-content">Add an assessment</h3>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <input type="hidden" name="skill_id" value={skillId} />
      <SelectField id="kind" label="Kind" value={kind} onChange={(ev) => setKind(ev.target.value as typeof kind)} error={e.kind}>
        {kinds.map((k) => (
          <option key={k} value={k}>
            {k === "quiz" ? "Quiz" : "Portfolio review"}
          </option>
        ))}
      </SelectField>
      <TextField
        id="title"
        label="Title"
        defaultValue={kind === "quiz" ? "Skill assessment" : "Portfolio review"}
        key={kind}
        error={e.title}
        maxLength={120}
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Creating" : "Create and edit"}
      </Button>
    </form>
  );
}

/** Revoke with a reason (required by revoke_verified_skill). Hidden behind a toggle so it is never one tap. */
export function RevokeForm({ verifiedSkillId }: { verifiedSkillId: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<FormState, FormData>(revokeSkill, {});
  if (state.saved) return <Alert tone="success">Revoked.</Alert>;
  if (!open) {
    return (
      <Button variant="ghost" className="self-start" onClick={() => setOpen(true)}>
        Revoke
      </Button>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-3" noValidate>
      <input type="hidden" name="id" value={verifiedSkillId} />
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <TextField
        id={`reason-${verifiedSkillId}`}
        name="reason"
        label="Reason"
        hint="Kept on record with the revocation."
        error={state.errors?.reason}
        maxLength={500}
        required
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="secondary" disabled={pending}>
          {pending ? "Revoking" : "Revoke the badge"}
        </Button>
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
