"use client";

import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Area 
} from "recharts";

export default function VitalsChartTabbed({ history = [] }) {
  const [activeTab, setActiveTab] = useState("bp");

  if (history.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl sm:col-span-2 text-center text-xs text-gray-400 italic font-sans">
        No historical records to render charts.
      </div>
    );
  }

  const chartData = [...history]
    .reverse()
    .map(record => ({
      date: record.date || new Date(record.timestamp).toLocaleDateString([], { month: "short", day: "numeric" }),
      systolic: record.bloodPressure?.systolic || 0,
      diastolic: record.bloodPressure?.diastolic || 0,
      bloodSugar: record.bloodSugar || 0,
      pulse: record.pulse || 0,
      spo2: record.spo2 || 0,
      temperature: record.temperature || 0,
      weight: record.weight || 0
    }));

  const tabs = [
    { id: "bp", label: "BP", color: "#EC4899" },
    { id: "sugar", label: "Sugar", color: "#A855F7" },
    { id: "pulse", label: "Pulse", color: "#3B82F6" },
    { id: "spo2", label: "Oxygen", color: "#10B981" },
    { id: "temp", label: "Temp", color: "#F59E0B" },
    { id: "weight", label: "Weight", color: "#6366F1" }
  ];

  const renderActiveChart = () => {
    switch (activeTab) {
      case "bp":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="bpSystolic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="bpDiastolic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} tickLine={false} />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="#94A3B8" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: 9 }} />
              <Area type="monotone" dataKey="systolic" name="Systolic" stroke="#EC4899" strokeWidth={2.5} fillOpacity={1} fill="url(#bpSystolic)" activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="diastolic" name="Diastolic" stroke="#64748B" strokeWidth={2.5} fillOpacity={1} fill="url(#bpDiastolic)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "sugar":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} tickLine={false} />
              <YAxis domain={['dataMin - 20', 'dataMax + 20']} stroke="#94A3B8" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="bloodSugar" name="Blood Sugar (mg/dL)" stroke="#A855F7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSugar)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "pulse":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} tickLine={false} />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="#94A3B8" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="pulse" name="Pulse Rate (bpm)" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPulse)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "spo2":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} tickLine={false} />
              <YAxis domain={[80, 100]} stroke="#94A3B8" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="spo2" name="Oxygen Saturation (%)" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSpo2)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "temp":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} tickLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94A3B8" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="temperature" name="Body Temperature (°F)" stroke="#F59E0B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTemp)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "weight":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={9} tickLine={false} />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#94A3B8" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="weight" name="Weight (kg)" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWeight)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl sm:col-span-2 space-y-3 font-sans">
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase transition border duration-150 ${
              activeTab === tab.id
                ? "bg-pink-500 text-white border-pink-500 shadow-xxs"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white p-3 rounded-xl border border-gray-100">
        {renderActiveChart()}
      </div>
    </div>
  );
}
