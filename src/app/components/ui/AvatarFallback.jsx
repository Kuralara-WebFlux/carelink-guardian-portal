"use client";

import React from "react";

export default function AvatarFallback({ resident, className = "w-12 h-12" }) {
  const getInitials = () => {
    let initials = "";
    if (resident.firstName) {
      initials += resident.firstName.trim().charAt(0);
    }
    if (resident.lastName) {
      initials += resident.lastName.trim().charAt(0);
    }
    if (!initials && resident.name) {
      const parts = resident.name.trim().split(" ");
      if (parts[0]) initials += parts[0].charAt(0);
      if (parts[1]) initials += parts[1].charAt(0);
    }
    return initials.toUpperCase() || "R";
  };

  const getBgColor = () => {
    const nameStr = resident.name || resident.firstName || resident.lastName || resident.id?.toString() || "";
    let hash = 0;
    for (let i = 0; i < nameStr.length; i++) {
      hash = nameStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "bg-pink-50 text-pink-700 border-pink-200",
      "bg-purple-50 text-purple-700 border-purple-200",
      "bg-indigo-50 text-indigo-700 border-indigo-200",
      "bg-blue-50 text-blue-700 border-blue-200",
      "bg-teal-50 text-teal-700 border-teal-200",
      "bg-emerald-50 text-emerald-700 border-emerald-200",
      "bg-rose-50 text-rose-700 border-rose-200",
      "bg-amber-50 text-amber-700 border-amber-200"
    ];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-sm border uppercase shadow-[var(--shadow-xxs)] tracking-wider select-none ${getBgColor()} ${className}`}
      role="img"
      aria-label={`Avatar for ${resident.name || resident.firstName || 'Resident'}`}
    >
      {getInitials()}
    </div>
  );
}
