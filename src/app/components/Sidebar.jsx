"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "./DashboardContext";
import {
  LuBell,
  LuClipboardCheck,
  LuFileText,
  LuHeartPulse,
  LuLayoutDashboard,
  LuSettings,
  LuShieldCheck,
  LuUsers,
} from "react-icons/lu";
import Logo from "./Logo";

export function getWorkspaceLinks(role) {
  if (role === "admin") {
    return [
      { name: "Admin", href: "/admin", icon: <LuShieldCheck /> },
      { name: "Residents", href: "/residents", icon: <LuUsers /> },
      { name: "Notifications", href: "/notifications", icon: <LuBell /> },
      { name: "Reports", href: "/reports", icon: <LuFileText /> },
      { name: "Settings", href: "/settings", icon: <LuSettings /> },
    ];
  }

  if (role === "caregiver") {
    return [
      { name: "Caregiver", href: "/caregiver", icon: <LuClipboardCheck /> },
      { name: "Residents", href: "/residents", icon: <LuUsers /> },
      { name: "Notifications", href: "/notifications", icon: <LuBell /> },
      { name: "Reports", href: "/reports", icon: <LuFileText /> },
    ];
  }

  return [
    { name: "Guardian", href: "/guardian", icon: <LuHeartPulse /> },
    { name: "Residents", href: "/residents", icon: <LuUsers /> },
    { name: "Notifications", href: "/notifications", icon: <LuBell /> },
    { name: "Reports", href: "/reports", icon: <LuFileText /> },
  ];
}

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser } = useDashboard();
  const links = getWorkspaceLinks(currentUser?.role);

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[var(--border-default)] bg-white p-5 md:flex md:flex-col md:justify-between">
      <div>
        <div className="mb-4 px-3 border-b border-[var(--border-default)] pb-3 flex items-center justify-start h-[120px] w-auto">
          <Logo variant="primary" size="md" />
        </div>
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">
          Workspace
        </p>
        <nav className="space-y-1" aria-label="Workspace navigation">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-lg font-semibold transition ${
                  isActive
                    ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                    : "text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)] hover:text-[var(--color-gray-900)]"
                }`}
              >
                <span className={`text-xl flex items-center justify-center ${isActive ? "text-[var(--color-brand-500)]" : "text-[var(--color-gray-500)]"}`}>
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-[1.25rem] border border-[var(--border-default)] bg-[var(--color-gray-50)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-50)] text-[var(--color-brand-500)]">
            <LuLayoutDashboard />
          </div>
          <div>
            <p className="text-sm font-black text-[var(--color-gray-900)]">MD3 Portal</p>
            <p className="text-xs text-[var(--color-gray-600)]">Role-scoped care UI</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
