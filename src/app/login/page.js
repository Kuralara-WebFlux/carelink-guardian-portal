"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { LuFlaskConical, LuHeartPulse, LuShieldCheck, LuStethoscope } from "react-icons/lu";
import { useDashboard } from "../components/DashboardContext";
import Logo from "../components/Logo";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { AUTH_ACCOUNTS, validateCredentials } from "../utils/auth";

const workspaces = [
  { id: "admin", title: "Administrator", subtitle: "Operations, registries, analytics and settings", icon: <LuShieldCheck /> },
  { id: "caregiver", title: "Caregiver", subtitle: "Assigned resident clinical workflows", icon: <LuStethoscope /> },
  { id: "guardian", title: "Guardian", subtitle: "Family wellness and medical records", icon: <LuHeartPulse /> },
  { id: "beta", title: "Beta", subtitle: "Empty tenant validation workspace", icon: <LuFlaskConical /> },
];

function LoginFormContent() {
  const router = useRouter();
  const { currentUser, isHydrated, setCurrentUser } = useDashboard();
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const visibleAccounts = AUTH_ACCOUNTS.filter((account) => {
    if (!activeWorkspace) return false;
    if (activeWorkspace === "beta") return account.institutionId === "facility-beta";
    return account.role === activeWorkspace && account.institutionId !== "facility-beta";
  });

  useEffect(() => {
    if (!isHydrated || !currentUser) return;
    router.replace(currentUser.role === "admin" ? "/admin" : currentUser.role === "caregiver" ? "/caregiver" : "/guardian");
  }, [currentUser, isHydrated, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const account = validateCredentials(identifier, password, activeWorkspace);
    if (!account) {
      setError("Invalid workspace, username, or password.");
      return;
    }
    const user = {
      id: account.id,
      name: account.name,
      username: account.username,
      email: account.email,
      role: account.role,
      institutionId: account.institutionId,
      institutionName: account.institutionName,
      guardianId: account.guardianId,
      caregiverId: account.caregiverId,
      adminId: account.adminId,
    };
    setCurrentUser(user);
    router.replace(account.role === "admin" ? "/admin" : account.role === "caregiver" ? "/caregiver" : "/guardian");
  };

  if (isHydrated && currentUser) {
    return <main className="min-h-screen bg-[var(--surface-base)]" />;
  }

  return (
    <main className="min-h-screen bg-[var(--surface-base)] px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-[var(--color-gray-600)] hover:bg-white">
        <FaArrowLeft className="text-xs" /> Back to Home
      </Link>

      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section>
          <Badge variant="primary" className="mb-5">Secure Role Access</Badge>
          <h1 className="font-page-title max-w-xl">Select a workspace, then sign in with unique credentials.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-gray-600)]">
            Administrator, caregiver, guardian, and Beta accounts each use separate usernames and passwords with strict role isolation.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                type="button"
                onClick={() => {
                  setActiveWorkspace(workspace.id);
                  setIdentifier("");
                  setPassword("");
                  setError("");
                }}
                className={`rounded-[1.25rem] border p-5 text-left shadow-[var(--shadow-sm)] transition ${
                  activeWorkspace === workspace.id ? "border-[var(--color-brand-500)] bg-[var(--color-brand-50)]" : "border-[var(--border-default)] bg-white hover:border-[var(--color-brand-300)]"
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl text-[var(--color-brand-500)]">{workspace.icon}</div>
                <h2 className="text-lg font-black text-[var(--color-gray-900)]">{workspace.title}</h2>
                <p className="mt-1 text-sm text-[var(--color-gray-600)]">{workspace.subtitle}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-md)] md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="h-[52px] w-auto flex items-center flex-shrink-0">
              <Logo size="md" />
            </div>
            <Badge variant={activeWorkspace === "beta" ? "warning" : "primary"}>{activeWorkspace || "Select Workspace"}</Badge>
          </div>

          {!activeWorkspace ? (
            <div className="rounded-[1.25rem] border border-dashed border-[var(--border-default)] bg-[var(--color-gray-50)] p-8 text-center">
              <p className="font-black text-[var(--color-gray-900)]">Select a workspace to continue.</p>
              <p className="mt-2 text-sm text-[var(--color-gray-600)]">Unique credentials appear after workspace selection.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="rounded-2xl border border-[var(--color-danger-100)] bg-[var(--color-danger-50)] p-4 text-sm font-bold text-[var(--color-danger-700)]">{error}</div>}
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">Username or Email</span>
                <input className="md3-field" value={identifier} onChange={(event) => { setIdentifier(event.target.value); setError(""); }} required />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">Password</span>
                <input type="password" className="md3-field" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>
              <Button type="submit" size="lg" className="w-full">Access Workspace</Button>
              <div className="border-t border-[var(--border-default)] pt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">Credential Directory</p>
                <div className="space-y-2">
                  {visibleAccounts.map((account) => (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => {
                        setIdentifier(account.username);
                        setPassword(account.password);
                        setError("");
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--color-gray-50)] p-3 text-left transition hover:border-[var(--color-brand-300)] hover:bg-white"
                    >
                      <span>
                        <span className="block text-sm font-bold text-[var(--color-gray-900)]">{account.name}</span>
                        <span className="block text-xs text-[var(--color-gray-600)]">{account.username} / {account.password}</span>
                      </span>
                      <Badge variant="primary">Use</Badge>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--surface-base)]" />}>
      <LoginFormContent />
    </Suspense>
  );
}
