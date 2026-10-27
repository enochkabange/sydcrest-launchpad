import { SelectField, TextField } from "@/components/ui/field";
import { REGIONS } from "@/lib/regions";
import { ORG_KINDS, type OrganisationFields } from "@/lib/organisations/forms";
import type { FieldErrors } from "@/lib/validation";
import { TextAreaField } from "./bits";

export type OrganisationValues = {
  name: string;
  slug: string;
  kind: string;
  description: string | null;
  website: string | null;
  region: string | null;
  registration_number: string | null;
};

/**
 * The organisation fields shared by /business/new and the profile editor.
 * Used inside a Client Component form; renders no state of its own.
 */
export function OrganisationFieldset({
  values,
  errors,
  slugHint,
}: {
  values?: Partial<OrganisationValues>;
  errors?: FieldErrors<OrganisationFields>;
  slugHint: string;
}) {
  return (
    <>
      <TextField id="name" label="Organisation name" autoComplete="organization" defaultValue={values?.name ?? ""} error={errors?.name} required maxLength={120} />
      <TextField
        id="slug"
        label="Web address (optional)"
        hint={slugHint}
        defaultValue={values?.slug ?? ""}
        error={errors?.slug}
        autoCapitalize="none"
        spellCheck={false}
        maxLength={60}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id="kind" label="Kind of organisation" defaultValue={values?.kind ?? "business"} error={errors?.kind}>
          {ORG_KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="region" label="Region (optional)" defaultValue={values?.region ?? ""} error={errors?.region}>
          <option value="">Choose a region</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </SelectField>
      </div>
      <TextField
        id="website"
        label="Website (optional)"
        type="url"
        inputMode="url"
        autoComplete="url"
        defaultValue={values?.website ?? ""}
        error={errors?.website}
      />
      <TextAreaField
        id="description"
        label="About (optional)"
        hint="What you do and the kind of people you hire. Shown on your public page once verified."
        defaultValue={values?.description ?? ""}
        error={errors?.description}
        maxLength={3000}
      />
      <TextField
        id="registration_number"
        label="Registration number (optional)"
        hint="From the Registrar of Companies or a similar body. Only our team sees it, to verify you."
        defaultValue={values?.registration_number ?? ""}
        error={errors?.registration_number}
        maxLength={60}
      />
    </>
  );
}
