import { useEffect, useState } from "react";
import { api, ApiError } from "../../lib/api.js";
import { Input, Select, Button, Badge, RoleBadge, Modal, Alert, PageLoader, Avatar } from "../../components/ui/index.js";

const ROLE_OPTIONS = [
  { value: "", label: "All roles" },
  { value: "mentee", label: "Mentee" },
  { value: "mentor", label: "Mentor" },
  { value: "cohort_admin", label: "Cohort Admin" },
  { value: "platform_admin", label: "Platform Admin" },
  { value: "super_admin", label: "Super Admin" },
];

export default function UsersTab({ isSuperAdmin }) {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(null);

  const load = () => {
    const params = new URLSearchParams({ limit: "50" });
    if (search) params.set("search", search);
    if (role) params.set("role", role);
    return api.get(`/api/admin/users?${params}`).then(({ users }) => setUsers(users));
  };

  useEffect(() => {
    const t = setTimeout(() => {
      load().catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load users."));
    }, 300);
    return () => clearTimeout(t);
  }, [search, role]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Input placeholder="Search by name…" value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1" />
        <Select value={role} onChange={(e) => setRole(e.target.value)} options={ROLE_OPTIONS} className="w-48" />
      </div>

      {error && <Alert tone="danger" onDismiss={() => setError("")}>{error}</Alert>}

      {users === null ? (
        <PageLoader message="Loading users…" />
      ) : (
        <div className="flex flex-col divide-y divide-line border border-line rounded-lg overflow-hidden">
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-3 px-4 py-3 bg-surface">
              <Avatar name={u.full_name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-content truncate">{u.full_name}</p>
                <p className="text-xs text-content-3 truncate">{u.email}</p>
              </div>
              <RoleBadge role={u.role} />
              <Badge tone={u.is_active ? "success" : "danger"}>{u.is_active ? "Active" : "Deactivated"}</Badge>
              <Button size="sm" variant="secondary" onClick={() => setEditing(u)}>Edit</Button>
            </div>
          ))}
          {users.length === 0 && <p className="px-4 py-6 text-sm text-content-2 text-center">No users match.</p>}
        </div>
      )}

      <EditUserModal user={editing} isSuperAdmin={isSuperAdmin} onClose={() => setEditing(null)} onSaved={load} />
    </div>
  );
}

function EditUserModal({ user, isSuperAdmin, onClose, onSaved }) {
  const [isActive, setIsActive] = useState(true);
  const [role, setRole] = useState("mentee");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) { setIsActive(user.is_active); setRole(user.role); setError(""); }
  }, [user]);

  const handleSave = async () => {
    setSubmitting(true);
    setError("");
    try {
      const body = { is_active: isActive };
      if (isSuperAdmin) body.role = role;
      await api.patch(`/api/admin/users/${user.id}`, body);
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={!!user}
      onClose={onClose}
      title={user?.full_name}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} loading={submitting}>Save</Button>
        </>
      }
    >
      {error && <Alert tone="danger" className="mb-3">{error}</Alert>}
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2 text-sm text-content">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Account active
        </label>
        {isSuperAdmin ? (
          <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)} options={ROLE_OPTIONS.slice(1)} />
        ) : (
          <p className="text-xs text-content-3">Only a super_admin can change roles.</p>
        )}
      </div>
    </Modal>
  );
}
