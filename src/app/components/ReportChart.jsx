"use client";

import { LuFileText } from "react-icons/lu";

import React from "react";
import { useDashboard } from "./DashboardContext";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import EmptyState from "./ui/EmptyState";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ReportTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[var(--border-muted)] p-3 rounded-xl shadow-[var(--shadow-md)] text-xs">
        <p className="font-bold text-[var(--color-gray-900)]">{payload[0].payload.name}</p>
        <p className="font-semibold mt-1 text-[var(--color-brand-500)]">
          Wellness Index: {payload[0].value}%
        </p>
      </div>
    );
  }

  return null;
}

export default function ReportChart() {
  const { residents } = useDashboard();

  const data = residents.map((resident) => ({
    name: resident.name,
    score: resident.wellnessScore || 0,
  }));

  return (
    <Card className="p-6" premium={true}>
      <SectionHeader
        title="Wellness Distribution"
        description="Current wellness scores across all active care recipients."
      />

      <div className="h-[320px] w-full">
        {data.length === 0 ? (
          <EmptyState
            icon={<LuFileText />}
            title="No resident wellness data yet"
            description="Wellness score distributions will render once profiles are registered."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
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
              <Tooltip content={<ReportTooltip />} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#EC4899"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScore)"
                activeDot={{ r: 6, strokeWidth: 0, fill: "#EC4899" }}
                animationDuration={850}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
