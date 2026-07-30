"use client";

import { useEffect, useState } from "react";
import { Trash2, ShieldCheck, User as UserIcon } from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";
import { SkeletonRows } from "@/components/admin/AdminUI";

type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: "CUSTOMER" | "ADMIN";
  createdAt: string;
  _count: { requests: number };
};

export default function UsersManager({ currentUserId }: { currentUserId: string }) {
  const { success, error } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    try {
      const { users } = await adminReq<{ users: AdminUser[] }>("GET", "/api/admin/users");
      setUsers(users);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setRole(u: AdminUser, role: AdminUser["role"]) {
    setBusyId(u.id);
    try {
      await adminReq("PATCH", `/api/admin/users/${u.id}`, { role });
      await load();
      success(`${u.name || u.email} is now ${role === "ADMIN" ? "an admin" : "a customer"}`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to change role");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(u: AdminUser) {
    if (!confirm(`Delete ${u.name || u.email}? This can't be undone.`)) return;
    setBusyId(u.id);
    try {
      await adminReq("DELETE", `/api/admin/users/${u.id}`);
      await load();
      success(`Deleted ${u.name || u.email}`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setBusyId(null);
    }
  }

  const admins = users.filter((u) => u.role === "ADMIN").length;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight">Users</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {loading ? "Loading accounts…" : `${users.length} accounts · ${admins} admin${admins === 1 ? "" : "s"}`}
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <div className="hidden grid-cols-[1.4fr_1fr_auto_auto_auto] items-center gap-4 border-b border-ink/10 bg-paper-dim px-4 py-2.5 font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft sm:grid">
          <span>User</span>
          <span>Phone</span>
          <span className="w-20 text-center">Bookings</span>
          <span className="w-32 text-center">Role</span>
          <span className="w-10" />
        </div>

        {loading ? (
          <SkeletonRows rows={6} cols={4} />
        ) : users.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-soft">No users yet.</p>
        ) : (
          users.map((u) => {
            const self = u.id === currentUserId;
            return (
              <div
                key={u.id}
                className={`grid grid-cols-1 gap-3 border-b border-ink/8 px-4 py-3 last:border-0 sm:grid-cols-[1.4fr_1fr_auto_auto_auto] sm:items-center sm:gap-4 ${
                  busyId === u.id ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      u.role === "ADMIN" ? "bg-brand" : "bg-ink/40"
                    }`}
                  >
                    {(u.name || u.email).slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {u.name || "—"} {self && <span className="text-xs text-ink-soft">(you)</span>}
                    </p>
                    <p className="truncate text-xs text-ink-soft">{u.email}</p>
                  </div>
                </div>

                <span className="truncate text-sm text-ink-soft">{u.phone || "—"}</span>
                <span className="text-sm text-ink-soft sm:w-20 sm:text-center">
                  <span className="sm:hidden">Bookings: </span>
                  {u._count.requests}
                </span>

                <div className="sm:flex sm:w-32 sm:justify-center">
                  <select
                    value={u.role}
                    disabled={self}
                    onChange={(e) => setRole(u, e.target.value as AdminUser["role"])}
                    className="focus-ring rounded-lg border border-ink/15 bg-paper px-2.5 py-1.5 text-xs font-semibold text-ink focus:border-brand focus:outline-none disabled:opacity-50"
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => remove(u)}
                  disabled={self}
                  className="flex text-ink-soft transition hover:text-red-600 disabled:opacity-30 sm:w-10 sm:justify-center"
                  aria-label={`Delete ${u.email}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-soft">
        <ShieldCheck className="h-3.5 w-3.5 text-brand" /> Admins can manage the catalog, bookings and users.
        <span className="mx-1">·</span>
        <UserIcon className="h-3.5 w-3.5" /> You can&apos;t change or delete your own account here.
      </p>
    </div>
  );
}
