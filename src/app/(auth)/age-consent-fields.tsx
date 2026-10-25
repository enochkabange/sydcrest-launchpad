import Link from "@/components/ui/link";
import { CheckboxField, TextField } from "@/components/ui/field";

/** Date of birth and terms consent, shared by sign up and the /welcome step. */
export function AgeConsentFields({
  defaultDateOfBirth,
  defaultTerms,
  errors,
}: {
  defaultDateOfBirth?: string;
  /** Keeps the box ticked when the form comes back with an error elsewhere. */
  defaultTerms?: boolean;
  errors?: { date_of_birth?: string; terms?: string };
}) {
  return (
    <>
      <TextField
        id="date_of_birth"
        label="Date of birth"
        type="date"
        autoComplete="bday"
        hint="SydCrest is for people aged 18 and over. We use this only to check your age."
        defaultValue={defaultDateOfBirth}
        error={errors?.date_of_birth}
        required
      />
      <CheckboxField id="terms" error={errors?.terms} defaultChecked={defaultTerms} required>
        I agree to the{" "}
        <Link href="/terms" target="_blank" className="font-semibold">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" target="_blank" className="font-semibold">
          Privacy Policy
        </Link>
      </CheckboxField>
    </>
  );
}
