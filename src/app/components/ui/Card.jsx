"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Card({ children, className = "", variant = "default", premium = false, layout = false, ...props }) {
  const variants = {
    default: "bg-white border border-[var(--border-default)] shadow-[var(--shadow-sm)]",
    elevated: "bg-white border border-[var(--border-default)] shadow-[var(--shadow-md)]",
    outlined: "bg-white border border-[var(--border-default)] shadow-none",
    glass: "bg-white/80 backdrop-blur-md border border-white/50 shadow-[var(--shadow-md)]",
    premium: "bg-white border border-[var(--border-default)] shadow-[var(--shadow-sm)]",
  };

  const selectedVariant = variant === "premium" || premium ? (variants.premium || variants.default) : (variants[variant] || variants.default);

  const Component = layout ? motion.div : "div";

  return (
    <Component
      layout={layout ? "position" : undefined}
      transition={layout ? { type: "spring", stiffness: 300, damping: 30 } : undefined}
      className={`rounded-[1.25rem] p-6 transition-all duration-200 animate-fadeIn ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
