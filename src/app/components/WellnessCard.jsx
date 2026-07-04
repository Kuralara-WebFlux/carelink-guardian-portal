"use client";

import { useDashboard } from "./DashboardContext";

export default function WellnessCard() {
  const { residents } = useDashboard();

  const score =
    residents.length === 0
      ? 0
      : Math.round(
          residents.reduce(
            (total, resident) => total + resident.wellnessScore,
            0
          ) / residents.length
        );

  return (
    <div className="bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-50)] rounded-3xl p-8 shadow-[var(--shadow-sm)]">

      <h3 className="text-2xl font-bold text-[var(--color-brand-600)] mb-6">
        Overall Wellness Score
      </h3>

      <div className="flex justify-center">

        <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center shadow-inner">

          <span className="text-5xl font-bold text-[var(--color-brand-500)]">
            {score}%
          </span>

        </div>

      </div>

      <div className="text-center mt-6">

        <span className="bg-[var(--color-success-100)] text-[var(--color-success-700)] px-5 py-2 rounded-xl">
          Excellent Status
        </span>

      </div>

    </div>
  );
}
