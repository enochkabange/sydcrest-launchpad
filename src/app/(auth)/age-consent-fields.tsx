import Link from "@/components/ui/link";
import { CheckboxField, TextField } from "@/components/ui/field";

/**
 * Date of birth, "I confirm I am 18 or over" (founder decision D1) and terms
 * consent, shared by sign up and the /welcome step. /welcome leaves the date
 * out when one is already on file: it cannot change (#251).
 */
export function AgeConsentFields({
  askDateOfBirth = true,
  defaultDateOfBirth,
  defaultTerms,
  defaultAdult,
  errors,
}: {
  askDateOfBirth?: boolean;
  defaultDateOfBirth?: string;
  /** Keep the boxes ticked when the form comes back with an error elsewhere. */
  defaultTerms?: boolean;
  defaultAdult?: boolean;
  errors?: { date_of_birth?: string; terms?: string; adult?: string };
}) {
  return (
    <>
      {askDateOfBirth && (
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
      )}
      <CheckboxField id="adult" error={errors?.adult} defaultChecked={defaultAdult} required>
        I confirm I am 18 or over
      </CheckboxField>
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
