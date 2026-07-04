"use client";

import React, { useState, useEffect } from "react";
import { LuClock } from "react-icons/lu";

export default function LiveClock() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
      const day = now.toLocaleDateString("en-US", { day: "numeric" });
      const month = now.toLocaleDateString("en-US", { month: "long" });
      const year = now.toLocaleDateString("en-US", { year: "numeric" });
      
      // Get time string
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const time = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
      
      setTimeStr(`${weekday}, ${day} ${month} ${year}, ${time}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) {
    return <div className="h-7 w-52 bg-slate-100/80 animate-pulse rounded-full" />;
  }

  return (
    <span className="text-xxs font-bold text-[var(--color-gray-500)] bg-white/80 border border-[var(--border-muted)] px-3.5 py-2 rounded-full inline-flex items-center gap-2 shadow-xxs">
      <LuClock className="w-3.5 h-3.5 text-[var(--color-brand-500)] shrink-0" />
      <span>{timeStr}</span>
    </span>
  );
}
