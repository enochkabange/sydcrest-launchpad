import { describe, expect, it } from "vitest";
import { destructiveStatements, shippedMigrationEdits } from "./migration-guard";

describe("shippedMigrationEdits", () => {
  it("allows new migrations and rejects edits or deletes of shipped ones", () => {
    expect(shippedMigrationEdits([{ status: "A", path: "supabase/migrations/2_new.sql" }])).toEqual([]);
    expect(shippedMigrationEdits([{ status: "M", path: "supabase/migrations/1_old.sql" }])).toHaveLength(1);
    expect(shippedMigrationEdits([{ status: "D", path: "supabase/migrations/1_old.sql" }])).toHaveLength(1);
    expect(shippedMigrationEdits([{ status: "R100", path: "supabase/migrations/1_old.sql" }])).toHaveLength(1);
  });
});

describe("destructiveStatements", () => {
  it("accepts expand only changes", () => {
    const sql = "create table public.x (id uuid primary key);\nalter table public.x add column name text;\ncreate index on public.x (name);";
    expect(destructiveStatements("m.sql", sql)).toEqual([]);
  });

  it.each([
    "drop table public.x;",
    "alter table public.x drop column name;",
    "alter table public.x rename column a to b;",
    "alter table public.x rename to y;",
    "alter table public.x alter column n type bigint;",
    "truncate public.events;",
    "delete from public.events where true;",
    "drop policy \"p\" on public.x;",
  ])("flags %s", (sql) => {
    expect(destructiveStatements("m.sql", sql)).toHaveLength(1);
  });

  it("honours an explicit override with a reason", () => {
    expect(destructiveStatements("m.sql", "drop policy \"old\" on public.x; -- allow-destructive: replaced below")).toEqual([]);
    expect(destructiveStatements("m.sql", "drop table x; -- allow-destructive:")).toHaveLength(1);
  });

  it("ignores destructive words inside ordinary comments", () => {
    expect(destructiveStatements("m.sql", "-- we never drop table data here\ncreate table y (id int);")).toEqual([]);
  });
});
