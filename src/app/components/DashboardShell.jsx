"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LuLogOut, LuMenu, LuX } from "react-icons/lu";
import { useDashboard } from "./DashboardContext";
import Logo from "./Logo";
import Sidebar, { getWorkspaceLinks } from "./Sidebar";

export default function DashboardShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, setCurrentUser } = useDashboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = getWorkspaceLinks(currentUser?.role);

  const handleLogout = () => {
    localStorage.removeItem("carelinkUser");
    setCurrentUser(null);
    router.replace("/login");
  };

  const roleLabel = currentUser?.institutionId === "facility-beta"
    ? "Beta Workspace"
    : currentUser?.role === "admin"
      ? "Admin Operations"
      : currentUser?.role === "caregiver"
        ? "Caregiver Tasks"
        : "Guardian Wellness";

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--color-gray-900)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border-default)] bg-white/95 px-4 py-3 shadow-[var(--shadow-xs)] backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-2xl border border-[var(--border-default)] bg-white p-2 text-[var(--color-gray-700)] md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <LuX /> : <LuMenu />}
            </button>
            <Link href="/" className="rounded-2xl flex items-center h-[48px] w-auto flex-shrink-0">
              <Logo size="sm" />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-base font-black text-[var(--color-gray-900)]">{roleLabel}</p>
              <p className="text-sm font-semibold text-[var(--color-gray-600)]">{currentUser?.email || "CareLink account"}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand-50)] text-base font-black text-[var(--color-brand-600)]">
              {(currentUser?.role || "u").slice(0, 1).toUpperCase()}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-[var(--border-default)] bg-white p-2.5 text-[var(--color-gray-600)] transition hover:bg-[var(--color-danger-50)] hover:text-[var(--color-danger-600)]"
              aria-label="Log out"
            >
              <LuLogOut />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-[var(--surface-backdrop)] md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-0 left-0 top-[65px] z-50 w-80 border-r border-[var(--border-default)] bg-white p-5 shadow-[var(--shadow-xl)] md:hidden"
              >
                <div className="mb-5 border-b border-[var(--border-default)] pb-4 flex items-center gap-3">
                  <Logo variant="mark" size="sm" className="h-8 w-8 object-contain" />
                  <span className="text-lg font-black tracking-tight text-[var(--color-gray-900)]">CareLink Portal</span>
                </div>
                <nav className="space-y-1" aria-label="Mobile workspace navigation">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-bold ${
                          isActive
                            ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                            : "text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]"
                        }`}
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
