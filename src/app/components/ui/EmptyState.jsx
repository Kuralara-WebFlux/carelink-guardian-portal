"use client";

import React from "react";
import Image from "next/image";

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-[var(--color-brand-100)] rounded-2xl bg-gradient-to-b from-white to-[var(--color-brand-50)] shadow-[var(--shadow-xxs)] transition-all duration-200 hover:border-[var(--color-brand-200)] my-4 ${className}`}
    >
      <Image src="/logo/logo-mark.png" alt="CareLink" width={64} height={64} className="mb-4 h-16 w-16 object-contain" />
      {icon && (
        <div className="text-4xl md:text-5xl mb-4 p-4 rounded-2xl bg-gradient-to-tr from-[var(--color-brand-500)]/10 to-[var(--color-brand-500)]/5 text-[var(--color-brand-500)] shadow-[var(--shadow-xxs)] border border-[var(--color-brand-100)]/20 animate-float">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-black text-[var(--color-gray-950)] mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-sm font-semibold text-[var(--color-gray-500)] max-w-xs mb-5 leading-relaxed">
        {description}
      </p>
      {action && <div className="w-full flex justify-center">{action}</div>}
    </div>
  );
}
