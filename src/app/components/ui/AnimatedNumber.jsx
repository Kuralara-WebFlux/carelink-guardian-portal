"use client";

import React, { useEffect, useState } from "react";

export default function AnimatedNumber({ value, duration = 600 }) {
  const [current, setCurrent] = useState(() => {
    const end = typeof value === "number" ? value : parseInt(value, 10);
    return isNaN(end) || end <= 0 ? value : 0;
  });

  useEffect(() => {
    const end = typeof value === "number" ? value : parseInt(value, 10);
    if (isNaN(end) || end <= 0) return;

    const steps = Math.min(end, 30);
    const stepDuration = duration / steps;
    const stepValue = end / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(timer);
        setCurrent(end);
      } else {
        setCurrent(Math.round(currentStep * stepValue));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration]);

  // If the value ends with a non-numeric symbol (like "%"), retain it
  const suffix = typeof value === "string" && value.endsWith("%") ? "%" : "";

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}
