"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { TextAreaField } from "../roadmaps/fields";
import { createSkill, updateSkill, type FormState } from "./actions";

type Skill = { id: string; slug: string; name: string; summary: string | null };

/** Create a skill (no `skill`) or edit one. Publishing is a separate button. */
export function SkillForm({ skill }: { skill?: Skill }) {
  const [state, action, pending] = useActionState<FormState, FormData>(skill ? updateSkill : createSkill, {});
  const e = state.errors ?? {};

  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">Saved.</Alert>}
      {skill && <input type="hidden" name="id" value={skill.id} />}
      <TextField id="name" label="Name" defaultValue={skill?.name} error={e.name} required maxLength={80} />
      <TextField
        id="slug"
        label="Slug"
        hint={skill ? "Used in the skill's address. Changing it breaks shared links." : "Used in the address. Leave empty to make one from the name."}
        defaultValue={skill?.slug}
        error={e.slug}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        maxLength={50}
      />
      <TextAreaField
        id="summary"
        label="Summary"
        hint="What holding this skill means, in one or two sentences."
        defaultValue={skill?.summary ?? ""}
        error={e.summary}
        maxLength={1000}
      />
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving" : skill ? "Save skill" : "Create skill"}
      </Button>
    </form>
  );
}
