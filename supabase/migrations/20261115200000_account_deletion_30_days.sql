-- Founder decision (13 Nov 2026): 30 days between "Delete my account" and the
-- deletion (the privacy policy's original promise), not 7. The daily cron
-- deletes requests whose time has come; members can cancel until then.
alter table public.deletion_requests alter column delete_after set default (now() + interval '30 days');

comment on column public.deletion_requests.delete_after is
  'When the account is deleted: 30 days after the request (founder decision 13 Nov 2026). Members can cancel until then; the daily cron deletes it.';
