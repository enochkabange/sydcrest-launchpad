-- Optional contact number on the profile, stored in E.164 (+233241234567).
-- The app normalises Ghana formats (024 123 4567) before saving. Messaging on
-- this number needs its own consent record; that arrives with the nudges work.

alter table public.profiles
  add column phone text check (phone ~ '^\+[1-9][0-9]{7,14}$');

comment on column public.profiles.phone is
  'Optional, E.164. Owner-only via RLS. Not used for sign in.';

grant update (phone) on public.profiles to authenticated;
