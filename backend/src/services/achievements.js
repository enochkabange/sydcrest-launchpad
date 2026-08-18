/**
 * mintAchievement — PLATFORM_SPEC.md §8. Idempotent by construction, not
 * by pre-checking: two trigger points (application accept, project
 * approval) are re-callable, so this relies on the DB's
 * unique(mentee_id, type, scope_key) constraint and swallows the
 * resulting 23505 (unique_violation) as a no-op rather than racing a
 * SELECT-then-INSERT.
 */
const { supabase } = require('../config/supabase');

async function mintAchievement({ mentee_id, type, program_id = null, cohort_id = null, scope_key, label, is_minor = false, nudge_worthy = false }) {
  const { error } = await supabase.from('achievements').insert({
    mentee_id, type, program_id, cohort_id, scope_key, label, is_minor, nudge_worthy,
  });
  if (error && error.code !== '23505') throw new Error(error.message);
}

module.exports = { mintAchievement };
