"use client";

import React from "react";

export default function SectionHeader({
  title,
  description,
  actions,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ${className}`}
    >
      <div>
        <h2 className="text-3xl font-bold text-[var(--color-gray-900)] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-base leading-relaxed text-[var(--color-gray-500)] mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 self-start sm:self-center">
          {actions}
        </div>
      )}
    </div>
  );
}
