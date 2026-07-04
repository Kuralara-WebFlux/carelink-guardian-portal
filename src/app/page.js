"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Logo from "./components/Logo";
import Button from "./components/ui/Button";
import Badge from "./components/ui/Badge";
import {
  LuActivity,
  LuBell,
  LuClipboardCheck,
  LuDatabase,
  LuHeartPulse,
  LuLock,
  LuShieldCheck,
  LuStethoscope,
  LuUsers,
} from "react-icons/lu";

const workspacePreviews = [
  {
    title: "Guardian",
    subtitle: "Family wellness view",
    icon: <LuHeartPulse />,
    stats: [["Wellness", "92%"], ["Updates", "4"], ["Mood", "Calm"]],
    accent: "text-[var(--color-brand-500)] bg-[var(--color-brand-50)]",
  },
  {
    title: "Caregiver",
    subtitle: "Assigned clinical tasks",
    icon: <LuStethoscope />,
    stats: [["Residents", "7"], ["Tasks", "21"], ["Due", "5"]],
    accent: "text-[var(--color-info-600)] bg-[var(--color-info-50)]",
  },
  {
    title: "Admin",
    subtitle: "Operations command",
    icon: <LuShieldCheck />,
    stats: [["Staff", "4"], ["Alerts", "2"], ["Coverage", "98%"]],
    accent: "text-[var(--color-success-600)] bg-[var(--color-success-50)]",
  },
];

const why = [
  ["Role-isolated care", "Guardians, caregivers, and admins see only the records and actions meant for their role."],
  ["Hospital dashboard clarity", "Dense operational data is grouped into readable cards, tables, status badges, and task boards."],
  ["Google Fit-inspired wellness", "Wellness, vitals, activity, and medication signals are surfaced with calm color and gentle hierarchy."],
];

const features = [
  ["Resident wellness", <LuHeartPulse key="heart" />, "Vitals, mood, medication, and family-ready care summaries."],
  ["Clinical task boards", <LuClipboardCheck key="tasks" />, "Medication, nutrition, and hygiene checklists for assigned residents."],
  ["Operational alerts", <LuBell key="bell" />, "Role-scoped notifications and escalation visibility."],
  ["Secure access", <LuLock key="lock" />, "Unique role credentials for guardians, caregivers, administrators, and Beta tenants."],
];

const tech = ["Next.js", "React", "Tailwind CSS", "IndexedDB", "Framer Motion", "Chart.js"];

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="min-h-screen bg-[var(--surface-base)] text-[var(--color-gray-900)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border-default)] bg-white/95 backdrop-blur">
        <div className="md3-container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center h-[52px] w-auto flex-shrink-0">
            <Logo size="md" />
          </Link>
          <nav className="hidden items-center gap-10 text-lg font-semibold text-[var(--color-gray-600)] md:flex">
            <a href="#why" className="hover:text-[var(--color-brand-500)] transition-colors">Why CareLink</a>
            <a href="#workspaces" className="hover:text-[var(--color-brand-500)] transition-colors">Workspaces</a>
            <a href="#features" className="hover:text-[var(--color-brand-500)] transition-colors">Features</a>
          </nav>
          <div className="flex items-center">
            <Link href="/login">
              <Button size="md" className="text-base font-semibold">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="medical-grid">
        <div className="md3-container grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <Badge variant="primary" className="mb-5">Healthcare Operations Platform</Badge>
            <h1 className="font-hero max-w-4xl">
              CareLink Guardian Portal for connected senior care.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-gray-600)]">
              Real-time senior care coordination for resident health records, caregiver updates, family visibility, and facility operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link href="/login" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto px-8">Open Workspace</Button></Link>
              <a href="#workspaces" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto px-8">View Roles</Button></a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {["HIPAA-aware", "Offline-first", "Role-scoped"].map((label) => (
                <div key={label} className="rounded-2xl border border-[var(--border-default)] bg-white p-4 shadow-[var(--shadow-sm)]">
                  <p className="text-sm font-black text-[var(--color-gray-900)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {workspacePreviews.map((workspace) => (
              <div key={workspace.title} className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-5 shadow-[var(--shadow-md)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${workspace.accent}`}>
                      {workspace.icon}
                    </div>
                    <h2 className="text-xl font-black">{workspace.title}</h2>
                    <p className="text-sm text-[var(--color-gray-600)]">{workspace.subtitle}</p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-success-500)]" />
                </div>
                <svg className="mt-5 h-16 w-full text-[var(--color-brand-500)]" viewBox="0 0 240 64" fill="none" aria-hidden="true">
                  <path className="care-pulse-line" d="M4 36H54L64 18L77 52L91 34H134L146 12L160 50L175 34H236" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {workspace.stats.map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-[var(--color-gray-50)] p-3">
                      <p className="text-[10px] font-bold uppercase text-[var(--color-gray-600)]">{label}</p>
                      <p className="mt-1 font-black">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="bg-white py-14">
        <div className="md3-container">
          <SectionTitle eyebrow="Why CareLink" title="Healthcare clarity without role confusion." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {why.map(([title, description]) => (
              <article key={title} className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-gray-600)]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workspaces" className="py-14">
        <div className="md3-container">
          <SectionTitle eyebrow="Role Workspaces" title="Purpose-built surfaces for every care role." />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {workspacePreviews.map((workspace) => (
              <article key={workspace.title} className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${workspace.accent}`}>
                  {workspace.icon}
                </div>
                <h3 className="text-xl font-black">{workspace.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-gray-600)]">{workspace.subtitle}</p>
                <Link href="/login" className="mt-5 inline-flex text-sm font-bold text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]">
                  Launch {workspace.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-14">
        <div className="md3-container">
          <SectionTitle eyebrow="Core Features" title="The essential care modules, redesigned." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map(([title, icon, description]) => (
              <article key={title} className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand-50)] text-xl text-[var(--color-brand-500)]">
                  {icon}
                </div>
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-gray-600)]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="md3-container">
          <SectionTitle eyebrow="Technology Stack" title="Modern client-first healthcare tooling." />
          <div className="mt-8 flex flex-wrap gap-3">
            {tech.map((item) => (
              <span key={item} className="rounded-full border border-[var(--border-default)] bg-white px-5 py-3 text-sm font-bold text-[var(--color-gray-700)] shadow-[var(--shadow-sm)]">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <LuActivity className="text-2xl text-[var(--color-brand-500)]" />
              <h3 className="mt-4 font-black">Responsive App Router UI</h3>
              <p className="mt-2 text-sm text-[var(--color-gray-600)]">Fast client-side pages with reusable role workspaces.</p>
            </article>
            <article className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <LuDatabase className="text-2xl text-[var(--color-info-600)]" />
              <h3 className="mt-4 font-black">IndexedDB Persistence</h3>
              <p className="mt-2 text-sm text-[var(--color-gray-600)]">Local tenant-aware data storage for healthcare workflows.</p>
            </article>
            <article className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <LuUsers className="text-2xl text-[var(--color-success-600)]" />
              <h3 className="mt-4 font-black">Role Isolation</h3>
              <p className="mt-2 text-sm text-[var(--color-gray-600)]">Admin, caregiver, guardian, and Beta workspaces render distinct data surfaces.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border-default)] bg-white py-6">
        <div className="md3-container flex flex-col gap-4 text-base text-[var(--color-gray-600)] md:flex-row md:items-baseline md:justify-between">
          <div className="flex items-center h-[44px] w-auto flex-shrink-0">
            <Logo size="sm" />
          </div>
          <p className="self-baseline text-base font-semibold text-[var(--color-gray-600)]">© {year} CareLink Guardian Portal. Designed and Developed by Kuralara WebFlux.</p>
        </div>
      </footer>
    </main>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="max-w-3xl">
      <Badge variant="primary" className="mb-4">{eyebrow}</Badge>
      <h2 className="font-section-title text-[var(--color-gray-900)]">{title}</h2>
    </div>
  );
}
