/**
 * CareLink CSV Export Utilities
 * Handles client-side generation and downloading of CSV sheets.
 */

// Helper to escape CSV cell values
function escapeCSV(val) {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Trigger a browser file download
function downloadCSV(filename, csvContent) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 1. Resident Compliance Summary CSV
export function exportResidentComplianceCSV(residents) {
  const headers = [
    "Resident Name",
    "Room",
    "Wellness Score",
    "Overall Risk Level",
    "Care Compliance Overall",
    "Medications Compliance",
    "Nutrition Compliance",
    "Hygiene Compliance",
    "Mobility Compliance",
    "Observations Compliance",
    "Completed Tasks Count",
    "Pending Tasks Count",
    "Missed Tasks Count",
    "Skipped Tasks Count"
  ];

  const rows = residents.map((r) => [
    r.name,
    r.room,
    r.wellnessScore,
    r.overallRiskLevel || "Low",
    r.careCompliance?.overall ?? 100,
    r.careCompliance?.medications ?? 100,
    r.careCompliance?.nutrition ?? 100,
    r.careCompliance?.hygiene ?? 100,
    r.careCompliance?.mobility ?? 100,
    r.careCompliance?.observations ?? 100,
    r.careCompliance?.completedCount ?? 0,
    r.careCompliance?.pendingCount ?? 0,
    r.careCompliance?.missedCount ?? 0,
    r.careCompliance?.skippedCount ?? 0
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(","))
  ].join("\n");

  downloadCSV(`CareLink_Resident_Compliance_Summary_${Date.now()}.csv`, csvContent);
}

// 2. Vitals History Logs CSV
export function exportVitalsHistoryCSV(residents) {
  const headers = [
    "Resident Name",
    "Room",
    "Timestamp",
    "Date",
    "Blood Pressure (Systolic)",
    "Blood Pressure (Diastolic)",
    "Blood Sugar (mg/dL)",
    "Pulse (bpm)",
    "SpO2 (%)",
    "Temperature (°F)",
    "Weight (kg)",
    "Record Type",
    "Source"
  ];

  const rows = [];
  residents.forEach((r) => {
    const history = r.vitalsHistory || [];
    history.forEach((v) => {
      rows.push([
        r.name,
        r.room,
        v.timestamp,
        v.date,
        v.bloodPressure?.systolic ?? "",
        v.bloodPressure?.diastolic ?? "",
        v.bloodSugar ?? "",
        v.pulse ?? "",
        v.spo2 ?? "",
        v.temperature ?? "",
        v.weight ?? "",
        v.recordType ?? "",
        v.source ?? ""
      ]);
    });
  });

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(","))
  ].join("\n");

  downloadCSV(`CareLink_Vitals_Log_History_${Date.now()}.csv`, csvContent);
}

// 3. Caregiver Performance & Workloads CSV
export function exportCaregiverPerformanceCSV(caregivers, residents) {
  const headers = [
    "Caregiver Name",
    "Employee ID",
    "Designation",
    "Shift Type",
    "Status",
    "Total Assigned Tasks",
    "Completed Tasks",
    "Missed Tasks",
    "Compliance Rate (%)"
  ];

  const rows = caregivers.map((c) => {
    let totalAssigned = 0;
    let completed = 0;
    let missed = 0;

    residents.forEach((res) => {
      const carePlan = res.carePlan || {};
      const categories = ["medications", "nutritionTasks", "hygieneTasks", "mobilityTasks", "observationTasks"];
      categories.forEach((cat) => {
        const tasks = carePlan[cat] || [];
        tasks.forEach((task) => {
          if (task.assignedCaregiverId === c.id) {
            totalAssigned++;
            if (task.status === "COMPLETED") completed++;
            if (task.status === "MISSED") missed++;
          }
        });
      });
    });

    const complianceRate = totalAssigned === 0 ? 100 : Math.round((completed / totalAssigned) * 100);

    return [
      c.name,
      c.employeeId,
      c.designation,
      c.shiftType,
      c.status,
      totalAssigned,
      completed,
      missed,
      complianceRate
    ];
  });

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(","))
  ].join("\n");

  downloadCSV(`CareLink_Caregiver_Workload_Performance_${Date.now()}.csv`, csvContent);
}

// 4. Audit & Accountability Logs CSV
export function exportAuditActivityCSV(activities) {
  const headers = [
    "Timestamp",
    "Caregiver Name",
    "Employee ID",
    "Action Type",
    "Details"
  ];

  const rows = activities.map((act) => [
    act.timestamp,
    act.caregiverName || "System",
    act.employeeId || "SYSTEM",
    act.actionType || "",
    act.details || ""
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(","))
  ].join("\n");

  downloadCSV(`CareLink_Audit_Accountability_Logs_${Date.now()}.csv`, csvContent);
}
