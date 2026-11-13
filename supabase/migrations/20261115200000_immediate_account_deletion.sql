-- Founder decision (13 Nov 2026): no grace period. "Delete my account" deletes
-- straight away (the action runs the deletion with the secret key at once);
-- a request is due as soon as it is made, so the daily step picks up any
-- deletion the action could not finish.
alter table public.deletion_requests alter column delete_after set default now();

comment on column public.deletion_requests.delete_after is
  'When the account is deleted: at once (founder decision 13 Nov 2026, no grace period). The daily cron finishes any the request action could not.';
