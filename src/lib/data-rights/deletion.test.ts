import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { runAccountDeletions } = await import("./deletion");
type Admin = Parameters<typeof runAccountDeletions>[0];

/** Stand in for the service role client: due requests, file rows, Auth and Storage. */
function fakeAdmin({ due, authStatus }: { due: { id: string; profile_id: string }[]; authStatus?: Record<string, number> }) {
  const calls = { rpc: [] as [string, unknown][], deleted: [] as string[], removed: [] as [string, string[]][] };
  const admin = {
    rpc: async (name: string, args: unknown) => {
      calls.rpc.push([name, args]);
      return name === "due_deletion_requests" ? { data: due, error: null } : { data: null, error: null };
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          not: async () => ({ data: table === "submissions" ? [{ file_path: "u/week-1.pdf" }] : [], error: null }),
        }),
      }),
    }),
    storage: { from: (bucket: string) => ({ remove: async (paths: string[]) => (calls.removed.push([bucket, paths]), { error: null }) }) },
    auth: {
      admin: {
        deleteUser: async (id: string) => {
          calls.deleted.push(id);
          const status = authStatus?.[id];
          return { error: status ? { status, message: `failed ${status}` } : null };
        },
      },
    },
  };
  return { admin: admin as unknown as Admin, calls };
}

describe("runAccountDeletions", () => {
  it("removes files, deletes the Auth user and stamps each due request", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { admin, calls } = fakeAdmin({ due: [{ id: "r1", profile_id: "p1" }] });
    expect(await runAccountDeletions(admin)).toEqual({ ok: true, due: 1, deleted: 1, failed: 0 });
    expect(calls.removed).toEqual([["submissions", ["u/week-1.pdf"]]]);
    expect(calls.deleted).toEqual(["p1"]);
    expect(calls.rpc).toContainEqual(["complete_deletion_request", { p_id: "r1", p_error: undefined }]);
  });

  it("keeps a failed deletion pending with the error, and treats an already deleted user as done", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { admin, calls } = fakeAdmin({
      due: [
        { id: "r1", profile_id: "p1" },
        { id: "r2", profile_id: "p2" },
      ],
      authStatus: { p1: 500, p2: 404 },
    });
    expect(await runAccountDeletions(admin)).toEqual({ ok: true, due: 2, deleted: 1, failed: 1 });
    expect(calls.rpc).toContainEqual(["complete_deletion_request", { p_id: "r1", p_error: "failed 500" }]);
    expect(calls.rpc).toContainEqual(["complete_deletion_request", { p_id: "r2", p_error: undefined }]);
  });
});
