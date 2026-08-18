const { supabase } = require('../config/supabase');

async function isInCohort(user, cohortId) {
  if (['platform_admin', 'super_admin'].includes(user.role)) return true;
  if (!cohortId) return false;
  const [{ data: enrollment }, { data: cohort }] = await Promise.all([
    supabase.from('enrollments').select('id').eq('cohort_id', cohortId).eq('mentee_id', user.id).maybeSingle(),
    supabase.from('cohorts').select('mentor_id').eq('id', cohortId).maybeSingle(),
  ]);
  return enrollment != null || cohort?.mentor_id === user.id;
}

module.exports = { isInCohort };
