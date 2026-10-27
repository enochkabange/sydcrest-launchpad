"use client";

import { useActionState } from "react";
import { addNode, updateNode, type FormState } from "./actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, SelectField, TextField } from "@/components/ui/field";
import { NODE_KINDS } from "@/lib/roadmap-admin";
import { TextAreaField } from "./fields";

export type ParentOption = { id: string; title: string; depth: number };

type Node = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  parent_id: string | null;
  position: number;
  is_optional: boolean;
  kind: string | null;
  choice_group: string | null;
};

/** Add a node to a roadmap (no `node`) or edit one, including its parent and position. */
export function NodeForm({ roadmapId, parents, node }: { roadmapId: string; parents: ParentOption[]; node?: Node }) {
  const [state, action, pending] = useActionState<FormState, FormData>(node ? updateNode : addNode, {});
  const e = state.errors ?? {};
  // Add form ids are prefixed so they never clash with the roadmap form on the same page.
  const f = (name: string) => (node ? name : `node_${name}`);

  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">{node ? "Saved." : "Node added."}</Alert>}
      <input type="hidden" name="roadmap_id" value={roadmapId} />
      {node && <input type="hidden" name="id" value={node.id} />}
      <TextField id={f("title")} name="title" label="Node title" defaultValue={node?.title} error={e.title} required maxLength={120} />
      {node && (
        <TextField
          id="slug"
          label="Slug"
          hint="Unique within this roadmap. Changing it breaks shared links."
          defaultValue={node.slug}
          error={e.slug}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
      )}
      <TextAreaField id={f("summary")} name="summary" label="Node summary" defaultValue={node?.summary ?? ""} error={e.summary} maxLength={1000} />
      <SelectField id={f("parent_id")} name="parent_id" label="Parent" defaultValue={node?.parent_id ?? ""} error={e.parent_id}>
        <option value="">Top level section</option>
        {parents.map((p) => (
          <option key={p.id} value={p.id}>
            {`${"  ".repeat(p.depth)}${p.title}`}
          </option>
        ))}
      </SelectField>
      {node && (
        <TextField
          id="position"
          label="Position"
          hint="Order among nodes with the same parent; lower comes first. The arrows on the roadmap page do this too."
          type="number"
          inputMode="numeric"
          defaultValue={node.position}
          error={e.position}
        />
      )}
      <SelectField
        id={f("kind")}
        name="kind"
        label="Kind"
        hint="Automatic makes a top level node a section and anything under it a topic. A checkpoint marks a point to check your progress."
        defaultValue={node?.kind ?? ""}
        error={e.kind}
      >
        <option value="">Automatic</option>
        {NODE_KINDS.map((k) => (
          <option key={k.value} value={k.value}>
            {k.label}
          </option>
        ))}
      </SelectField>
      <TextField
        id={f("choice_group")}
        name="choice_group"
        label="Choice group"
        hint="Optional. Give alternatives under the same parent the same key, such as spreadsheet-tool, and learners pick one of them."
        defaultValue={node?.choice_group ?? ""}
        error={e.choice_group}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        maxLength={40}
      />
      <CheckboxField id={f("is_optional")} name="is_optional" defaultChecked={node?.is_optional}>
        Optional (not needed to complete the roadmap)
      </CheckboxField>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving…" : node ? "Save node" : "Add node"}
      </Button>
    </form>
  );
}
