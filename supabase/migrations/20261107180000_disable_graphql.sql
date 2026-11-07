-- Switch off pg_graphql (launch hardening, #288).
--
-- The app reads and writes through PostgREST (supabase-js) and RPCs only;
-- nothing calls /graphql/v1. With the extension on, the GraphQL schema lists
-- every table, view and column that anon or authenticated can select, which
-- the security advisor flags 126 times. Row level security already protects
-- the rows; this removes the extra map of names. Re-enable with
-- `create extension pg_graphql` if a GraphQL client is ever wanted.

drop extension if exists pg_graphql; -- allow-destructive: unused API surface; no data lives in the extension
