-- The server's secret key (service_role) on the epic #320 tables. Their
-- migrations revoked every grant from public, anon and authenticated and
-- regranted to members only, but never granted service_role, so server code
-- with the secret key (crons, data export, e2e seeding) was refused (42501).
-- Same pattern as public.profiles and public.follows.

grant select, insert, update, delete on public.profile_first_touch to service_role;
grant select, insert, update, delete on public.learner_profiles to service_role;
grant select, insert, update, delete on public.learner_attributes to service_role;
