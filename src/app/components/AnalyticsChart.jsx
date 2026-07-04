"use client";

import { LuChartBar } from "react-icons/lu";

import React from "react";
import { useDashboard } from "./DashboardContext";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import EmptyState from "./ui/EmptyState";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function AnalyticsTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[var(--border-muted)] p-3 rounded-xl shadow-[var(--shadow-md)] text-xs">
        <p className="font-bold text-gray-900">{payload[0].name}</p>
        <p className="font-semibold mt-1 text-[var(--color-brand-500)]">
          {payload[0].value}% Completed
        </p>
      </div>
    );
  }

  return null;
}

export default function AnalyticsChart() {
  const { residents } = useDashboard();

  const totalResidents = residents.length;

  if (totalResidents === 0) {
    return (
      <Card className="p-6">
        <SectionHeader
          title="Care Completion Rates"
          description="Aggregate statistics of care activities completed today."
        />
        <EmptyState
          icon={<LuChartBar />}
          title="No data available"
          description="Register residents to see care completion analytics."
        />
      </Card>
    );
  }

  // Calculate percentages
  const medCompleted = residents.filter((r) => r.medication === "COMPLETED").length;
  const nutrCompleted = residents.filter((r) => r.nutrition === "COMPLETED").length;
  const hygCompleted = residents.filter((r) => r.hygiene === "COMPLETED").length;

  const medPct = Math.round((medCompleted / totalResidents) * 100);
  const nutrPct = Math.round((nutrCompleted / totalResidents) * 100);
  const hygPct = Math.round((hygCompleted / totalResidents) * 100);

  const data = [
    { name: "Medication", percentage: medPct, color: "url(#gradMed)" },
    { name: "Nutrition", percentage: nutrPct, color: "url(#gradNutr)" },
    { name: "Hygiene", percentage: hygPct, color: "url(#gradHyg)" },
  ];

  return (
    <Card className="p-6" premium={true}>
      <SectionHeader
        title="Care Completion Rates"
        description="Aggregate percentage of daily task completions across all residents."
      />

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradMed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-400)" />
                <stop offset="100%" stopColor="var(--color-brand-600)" />
              </linearGradient>
              <linearGradient id="gradNutr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
              <linearGradient id="gradHyg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-success-500)" />
                <stop offset="100%" stopColor="var(--color-success-700)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#94A3B8"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#94A3B8"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<AnalyticsTooltip />} cursor={{ fill: "var(--color-brand-50)", opacity: 0.2, radius: 8 }} />
            <Bar dataKey="percentage" radius={[8, 8, 0, 0]} barSize={48} animationDuration={800} animationEasing="ease-out">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--color-gray-50)] flex items-center justify-between text-xxs text-gray-400 font-bold uppercase tracking-wider">
        <span>Updates in Real-Time</span>
        <span>Target: 100% Care</span>
      </div>
    </Card>
  );
}
