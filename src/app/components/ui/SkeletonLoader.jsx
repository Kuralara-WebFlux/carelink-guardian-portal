"use client";

import React from "react";
import Image from "next/image";

export function SkeletonLine({ className = "" }) {
  return (
    <div
      className={`animate-shimmer rounded-lg h-4 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[var(--color-gray-100)] p-6 shadow-[var(--shadow-xs)] space-y-4 flex flex-col items-center justify-center text-center ${className}`}
      role="status"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-1.5 animate-pulse mb-2">
        <Image src="/logo/logo-mark.png" alt="CareLink loading" width={40} height={40} className="h-10 w-10 object-contain" />
        <span className="text-[10px] font-black uppercase tracking-wider text-[var(--color-gray-400)]">Loading</span>
      </div>
      <div className="w-full space-y-2 flex flex-col items-center">
        <SkeletonLine className="h-3 w-1/3" />
        <SkeletonLine className="h-6 w-1/2" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonStatCard({ className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[var(--color-gray-100)] p-6 shadow-[var(--shadow-xs)] flex items-start justify-between ${className}`}
      role="status"
      aria-label="Loading statistic"
    >
      <div className="space-y-3 flex-1">
        <SkeletonLine className="h-3 w-24" />
        <SkeletonLine className="h-8 w-16" />
        <SkeletonLine className="h-3 w-32" />
      </div>
      <div className="w-12 h-12 rounded-xl animate-shimmer" />
    </div>
  );
}

export function SkeletonTableRow({ columns = 4, className = "" }) {
  return (
    <div className={`flex gap-4 py-3 ${className}`} role="status" aria-label="Loading row">
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonLine key={i} className="flex-1 h-5" />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-[var(--color-gray-100)] p-6 shadow-[var(--shadow-xs)] space-y-4 ${className}`} role="status" aria-label="Loading table">
      <div className="flex flex-col items-center justify-center border-b border-[var(--color-gray-100)] pb-4">
        <Image src="/logo/logo-mark.png" alt="CareLink loading" width={40} height={40} className="h-10 w-10 object-contain animate-pulse mb-1.5" />
        <SkeletonLine className="h-4 w-40" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonTableRow key={i} columns={columns} />
        ))}
      </div>
    </div>
  );
}
