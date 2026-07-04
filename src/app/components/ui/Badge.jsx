"use client";

import React from "react";

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyle =
    "inline-flex items-center font-semibold uppercase tracking-wide border transition-colors duration-200";

  const sizes = {
    sm: "px-2 py-0.5 rounded-md text-[0.6rem]",
    md: "px-2.5 py-1 rounded-full text-xs",
  };

  const variants = {
    primary:
      "bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border-[var(--color-brand-100)]",
    success:
      "bg-[var(--color-success-50)] text-[var(--color-success-600)] border-[var(--color-success-100)]",
    warning:
      "bg-[var(--color-warning-50)] text-[var(--color-warning-600)] border-[var(--color-warning-100)]",
    danger:
      "bg-[var(--color-danger-50)] text-[var(--color-danger-600)] border-[var(--color-danger-100)]",
    neutral:
      "bg-[var(--color-gray-50)] text-[var(--color-gray-500)] border-[var(--color-gray-200)]",
    info:
      "bg-[var(--color-info-50)] text-[var(--color-info-600)] border-[var(--color-info-100)]",
  };

  return (
    <span
      className={`${baseStyle} ${sizes[size] || sizes.md} ${variants[variant] || variants.neutral} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
