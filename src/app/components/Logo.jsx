"use client";

import React from "react";
import Image from "next/image";

export default function Logo({ className = "", size = "md", variant = "horizontal" }) {
  const sizes = {
    sm: { width: 132, height: 38, mark: 38 },
    md: { width: 176, height: 50, mark: 48 },
    lg: { width: 232, height: 66, mark: 64 },
  };

  const currentSize = sizes[size] || sizes.md;
  const isMark = variant === "mark";
  const src = variant === "white"
    ? "/logo/logo-white.png"
    : variant === "primary"
      ? "/logo/logo-primary.png"
      : isMark
        ? "/logo/logo-mark.png"
        : "/logo/logo-horizontal.png";

  return (
    <Image
      src={src}
      alt="CareLink Guardian Portal"
      width={isMark ? currentSize.mark : currentSize.width}
      height={isMark ? currentSize.mark : currentSize.height}
      className={`h-full w-auto object-contain flex-shrink-0 ${className}`}
      priority={size !== "sm"}
    />
  );
}
