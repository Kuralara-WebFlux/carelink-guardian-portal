"use client";

import React from "react";
import AnimatedNumber from "./AnimatedNumber";

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  trendType = "success",
  className = "",
}) {
  const trendColors = {
    success: "text-[var(--color-success-600)] bg-[var(--color-success-50)] border-[var(--color-success-100)]",
    warning: "text-[var(--color-warning-600)] bg-[var(--color-warning-50)] border-[var(--color-warning-100)]",
    danger: "text-[var(--color-danger-600)] bg-[var(--color-danger-50)] border-[var(--color-danger-100)]",
  };

  return (
    <div
      className={`premium-card bg-white rounded-2xl border border-[var(--border-muted)] p-6 shadow-[var(--shadow-sm)] flex items-start justify-between animate-fadeIn ${className}`}
    >
      <div className="space-y-2 flex-1">
        <p className="text-xl font-bold text-[var(--color-gray-900)]">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black text-[var(--color-gray-950)] tracking-tight">
            <AnimatedNumber value={value} />
          </span>
          {trend && (
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold border ${trendColors[trendType] || trendColors.success}`}
            >
              {trend}
            </span>
          )}
        </div>
        {description && (
          <p className="text-base leading-relaxed text-[var(--color-gray-500)]">
            {description}
          </p>
        )}
      </div>
      {icon && (
        <div className="premium-icon-glow p-3.5 rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-500)] text-xl flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  );
}
