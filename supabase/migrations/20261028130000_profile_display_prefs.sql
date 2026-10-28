-- Display and accessibility settings on the profile (issue #204), so a
-- signed in user's theme, text size and reading choices follow them to other
-- devices. The device copy (localStorage) still applies before first paint;
-- this column is only the account copy. Additive: a new column with a safe
-- default, no backfill, nothing reads it but the owner.
--
-- The check mirrors parseDisplayPrefs in src/lib/display/prefs.ts: an object
-- with only known keys, each one optional and of a known value, and small.

alter table public.profiles
  add column display_prefs jsonb not null default '{}'::jsonb
  constraint profiles_display_prefs_valid check (
    jsonb_typeof(display_prefs) = 'object'
    and pg_column_size(display_prefs) <= 1024
    and display_prefs - array['theme', 'textSize', 'motion', 'contrast', 'underlineLinks', 'spacing', 'font', 'updatedAt'] = '{}'::jsonb
    and (not display_prefs ? 'theme' or display_prefs->>'theme' in ('system', 'light', 'dark'))
    and (not display_prefs ? 'textSize' or display_prefs->'textSize' in ('100', '112', '125', '150'))
    and (not display_prefs ? 'motion' or display_prefs->>'motion' in ('system', 'reduce'))
    and (not display_prefs ? 'contrast' or display_prefs->>'contrast' in ('normal', 'more'))
    and (not display_prefs ? 'underlineLinks' or jsonb_typeof(display_prefs->'underlineLinks') = 'boolean')
    and (not display_prefs ? 'spacing' or display_prefs->>'spacing' in ('normal', 'wide'))
    and (not display_prefs ? 'font' or display_prefs->>'font' in ('brand', 'system'))
    and (not display_prefs ? 'updatedAt' or jsonb_typeof(display_prefs->'updatedAt') = 'number')
  );

comment on column public.profiles.display_prefs is
  'Display and accessibility choices (theme, text size, contrast, motion, links, spacing, font). Owner only via RLS.';

-- RLS already limits updates to the owner's row; this lets them write the field.
grant update (display_prefs) on public.profiles to authenticated;
