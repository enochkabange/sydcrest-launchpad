function isMinor(dateOfBirth) {
  if (!dateOfBirth) return false;
  const dob = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) age--;
  return age < 18;
}

/* No date_of_birth on profiles itself — it only ever lands on the
   admissions application, then gets carried forward as
   enrollments.guardian_consent_required at enroll time (see admin.js).
   A mentee flagged on ANY enrollment is treated as a minor everywhere
   video-safeguarding cares — same "err toward safety" reasoning as the
   guardian-consent flow itself. */
async function isMinorMentee(supabase, menteeId) {
  const { data } = await supabase
    .from('enrollments')
    .select('id')
    .eq('mentee_id', menteeId)
    .eq('guardian_consent_required', true)
    .limit(1)
    .maybeSingle();
  return data != null;
}

module.exports = { isMinor, isMinorMentee };
