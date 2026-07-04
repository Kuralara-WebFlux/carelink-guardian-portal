"use client";

import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

  const sizes = {
    sm: "h-9 px-4 rounded-xl text-sm",
    md: "h-11 px-6 rounded-xl text-base",
    lg: "h-13 px-8 rounded-xl text-base",
  };

  const variants = {
    primary:
      "bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] text-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-brand)] border border-transparent",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-transparent",
    outline:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xxs",
    danger:
      "bg-[var(--color-danger-500)] hover:bg-[var(--color-danger-600)] text-white border border-transparent shadow-[var(--shadow-sm)]",
    neutral:
      "bg-white hover:bg-[var(--color-gray-50)] text-[var(--color-gray-600)] border border-[var(--color-gray-200)] shadow-[var(--shadow-xs)]",
    ghost:
      "bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-transparent",
    icon:
      "h-10 w-10 p-0 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 shadow-xxs justify-center",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} btn-premium ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
