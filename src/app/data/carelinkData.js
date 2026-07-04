export const FACILITY_ALPHA = "facility-alpha";
export const FACILITY_BETA = "facility-beta";

export const GUARDIANS = [
  { id: "g-arun", guardianId: "g-arun", name: "Arun Prakash", relationship: "Son", username: "arun.prakash", email: "arun.prakash@carelink.local", password: "Arun@2026", residentIds: ["RES001", "RES006"], phone: "+91 90000 0201" },
  { id: "g-divya", guardianId: "g-divya", name: "Divya Raman", relationship: "Daughter", username: "divya.raman", email: "divya.raman@carelink.local", password: "Divya@2026", residentIds: ["RES002", "RES007"], phone: "+91 90000 0202" },
  { id: "g-karthik", guardianId: "g-karthik", name: "Karthik Raj", relationship: "Nephew", username: "karthik.raj", email: "karthik.raj@carelink.local", password: "Karthik@2026", residentIds: ["RES003"], phone: "+91 90000 0203" },
  { id: "g-nisha", guardianId: "g-nisha", name: "Nisha Krishnan", relationship: "Daughter", username: "nisha.krishnan", email: "nisha.krishnan@carelink.local", password: "Nisha@2026", residentIds: ["RES004"], phone: "+91 90000 0204" },
  { id: "g-sanjay", guardianId: "g-sanjay", name: "Sanjay Kumar", relationship: "Brother", username: "sanjay.kumar", email: "sanjay.kumar@carelink.local", password: "Sanjay@2026", residentIds: ["RES005"], phone: "+91 90000 0205" },
];

export const CAREGIVERS = [
  { id: "c-priya", caregiverId: "c-priya", name: "Priya S.", username: "priya.s", email: "priya.s@carelink.local", password: "Priya@2026", employeeId: "EMP-101", designation: "Senior Caregiver", role: "Senior Caregiver", responsibilities: ["Medication Administration", "Daily Health Monitoring", "Resident Welfare Documentation"], assignedResidentIds: ["RES001", "RES002"], shiftType: "Morning", assignedUnit: "Unit A", phone: "+91 91000 0101", status: "Active", averageResponseTime: 8, caregiverPerformance: 96 },
  { id: "c-kavitha", caregiverId: "c-kavitha", name: "Kavitha R.", username: "kavitha.r", email: "kavitha.r@carelink.local", password: "Kavitha@2026", employeeId: "EMP-102", designation: "Staff Nurse", role: "Staff Nurse", responsibilities: ["Vitals Monitoring", "First Aid", "Medication Management", "Health Assessment"], assignedResidentIds: ["RES003", "RES004"], shiftType: "Morning", assignedUnit: "Unit B", phone: "+91 91000 0102", status: "Active", averageResponseTime: 7, caregiverPerformance: 94 },
  { id: "c-aravind", caregiverId: "c-aravind", name: "Aravind Kumar", username: "aravind.kumar", email: "aravind.kumar@carelink.local", password: "Aravind@2026", employeeId: "EMP-103", designation: "Care Assistant", role: "Care Assistant", responsibilities: ["Meal Supervision", "Daily Living Support", "Mobility", "Hygiene"], assignedResidentIds: ["RES005"], shiftType: "Afternoon", assignedUnit: "Unit C", phone: "+91 91000 0103", status: "Active", averageResponseTime: 10, caregiverPerformance: 91 },
  { id: "c-senthil", caregiverId: "c-senthil", name: "Senthil Kumar", username: "senthil.kumar", email: "senthil.kumar@carelink.local", password: "Senthil@2026", employeeId: "EMP-104", designation: "Welfare Coordinator", role: "Welfare Coordinator", responsibilities: ["Resident Activities", "Visitor Assistance", "Caregiver Coordination", "Welfare Verification"], assignedResidentIds: ["RES006", "RES007"], shiftType: "Evening", assignedUnit: "Unit D", phone: "+91 91000 0104", status: "Active", averageResponseTime: 12, caregiverPerformance: 93 },
];

export const ADMIN = {
  id: "a-lakshara",
  adminId: "a-lakshara",
  name: "Lakshara Anand",
  role: "Administrator",
  username: "lakshara.anand",
  email: "lakshara.anand@carelink.local",
  password: "Lakshara@2026",
};

export const BETA_ACCOUNTS = [
  { id: "beta-admin", name: "Beta Administrator", role: "admin", username: "beta.admin", email: "beta.admin@carelink.local", password: "BetaAdmin@2026" },
  { id: "beta-caregiver", name: "Beta Caregiver", role: "caregiver", username: "beta.caregiver", email: "beta.caregiver@carelink.local", password: "BetaCare@2026", caregiverId: "beta-caregiver" },
  { id: "beta-guardian", name: "Beta Guardian", role: "guardian", username: "beta.guardian", email: "beta.guardian@carelink.local", password: "BetaGuardian@2026", guardianId: "beta-guardian" },
];

const residentBlueprints = [
  ["RES001", "R. Ramasamy", 74, "Male", "A-101", "Unit A", "c-priya", "g-arun", "B+", 168, 66, "Type 2 Diabetes", ["Hypertension", "Type 2 Diabetes"], ["Penicillin"], ["Cataract surgery - 2019"], ["Influenza 2025", "COVID-19 booster 2025", "Pneumococcal 2024"], "Moderate fall risk; monitor post-breakfast glucose and encourage supervised walks.", "Moderate", "Walker assisted", 2, "1.6L / 1.8L", "Diabetic soft diet", "Calm", "2026-07-08 Cardiology review"],
  ["RES002", "Meenakshi Ammal", 69, "Female", "A-102", "Unit A", "c-priya", "g-divya", "O+", 154, 58, "Osteoarthritis", ["Osteoarthritis", "Hypothyroidism"], ["Sulfa drugs"], ["Knee arthroscopy - 2018"], ["Influenza 2025", "COVID-19 booster 2025"], "Pain controlled with physiotherapy; track mobility tolerance.", "Low", "Cane support", 3, "1.4L / 1.7L", "High fiber vegetarian", "Happy", "2026-07-12 Orthopedic follow-up"],
  ["RES003", "K. Lakshmi", 76, "Female", "B-201", "Unit B", "c-kavitha", "g-karthik", "A+", 160, 61, "COPD", ["COPD", "Hypertension"], ["Dust exposure sensitivity"], ["Appendectomy - 1978"], ["Influenza 2025", "COVID-19 booster 2025", "Pneumococcal 2025"], "Encourage breathing exercises; report SpO2 below 94%.", "High", "Wheelchair for distance", 1, "1.5L / 1.8L", "Low sodium diet", "Calm", "2026-07-05 Pulmonology consult"],
  ["RES004", "S. Natarajan", 81, "Male", "B-202", "Unit B", "c-kavitha", "g-nisha", "AB+", 172, 70, "Parkinsonism", ["Parkinsonism", "Chronic constipation"], ["Aspirin sensitivity"], ["Hernia repair - 2015"], ["Influenza 2025", "COVID-19 booster 2025"], "Watch tremor progression and swallowing safety during meals.", "High", "Assisted transfer", 2, "1.3L / 1.8L", "Pureed soft diet", "Stable", "2026-07-15 Neurology review"],
  ["RES005", "V. Kamalam", 72, "Female", "C-301", "Unit C", "c-aravind", "g-sanjay", "O-", 156, 55, "Post-stroke care", ["Post-stroke weakness", "Dyslipidemia"], ["No known allergies"], ["Stroke rehabilitation - 2023"], ["Influenza 2025", "COVID-19 booster 2025"], "Assist with left-side mobility and speech therapy practice.", "Moderate", "One-person assist", 1, "1.7L / 1.8L", "Protein enriched diet", "Motivated", "2026-07-18 Rehab physician"],
  ["RES006", "G. Subramanian", 78, "Male", "D-401", "Unit D", "c-senthil", "g-arun", "A-", 170, 74, "Coronary artery disease", ["Coronary artery disease", "Hypertension"], ["Shellfish"], ["Angioplasty - 2020"], ["Influenza 2025", "COVID-19 booster 2025"], "Monitor chest discomfort, edema, and evening BP.", "Moderate", "Independent with supervision", 2, "1.5L / 1.8L", "Cardiac low salt diet", "Reflective", "2026-07-10 Cardiology visit"],
  ["RES007", "P. Saraswathi", 67, "Female", "D-402", "Unit D", "c-senthil", "g-divya", "B-", 158, 60, "Early dementia", ["Mild cognitive impairment", "Anxiety"], ["Latex"], ["Hysterectomy - 2006"], ["Influenza 2025", "COVID-19 booster 2025"], "Use orientation board; document agitation triggers and sleep quality.", "Moderate", "Independent with cueing", 0, "1.6L / 1.8L", "Regular diet", "Content", "2026-07-22 Memory clinic"],
];

const medicineByDiagnosis = {
  "Type 2 Diabetes": [["Metformin", "500 mg after breakfast"], ["Amlodipine", "5 mg nightly"]],
  Osteoarthritis: [["Levothyroxine", "50 mcg morning"], ["Calcium + D3", "1 tablet after lunch"]],
  COPD: [["Tiotropium inhaler", "1 puff morning"], ["Losartan", "50 mg nightly"]],
  Parkinsonism: [["Levodopa/Carbidopa", "100/25 mg three times daily"], ["Lactulose", "15 ml bedtime"]],
  "Post-stroke care": [["Atorvastatin", "20 mg nightly"], ["Clopidogrel", "75 mg morning"]],
  "Coronary artery disease": [["Aspirin EC", "75 mg morning"], ["Metoprolol", "25 mg twice daily"]],
  "Early dementia": [["Donepezil", "5 mg bedtime"], ["Melatonin", "3 mg bedtime if needed"]],
};

function vitals(seed) {
  return Array.from({ length: 7 }, (_, idx) => {
    const day = idx + 1;
    return {
      id: `vh-${seed}-${day}`,
      date: `2026-06-${String(23 + idx).padStart(2, "0")}`,
      timestamp: `2026-06-${String(23 + idx).padStart(2, "0")}T09:00:00+05:30`,
      bloodPressure: { systolic: 118 + seed + idx, diastolic: 74 + (idx % 4) },
      bloodSugar: 96 + seed * 4 + idx * 3,
      spo2: 96 - (seed % 3) + (idx % 2),
      pulse: 70 + seed + idx,
      respiration: 16 + (idx % 3),
      temperature: Number((98.2 + (idx % 3) * 0.2).toFixed(1)),
    };
  });
}

export const RESIDENTS = residentBlueprints.map((row, index) => {
  const [residentId, name, age, gender, room, careUnit, caregiverId, guardianId, bloodGroup, height, weight, diagnosis, chronicConditions, allergies, pastSurgeries, vaccinations, doctorNotes, fallRisk, mobilityStatus, painScale, hydration, nutrition, mood, nextDoctorAppointment] = row;
  const guardian = GUARDIANS.find((item) => item.id === guardianId);
  const caregiver = CAREGIVERS.find((item) => item.id === caregiverId);
  const bmi = Number((weight / ((height / 100) ** 2)).toFixed(1));
  const vitalHistory = vitals(index + 1);
  const latestVitals = vitalHistory[vitalHistory.length - 1];

  return {
    id: index + 1,
    residentId,
    name,
    firstName: name.split(" ")[0],
    lastName: name.split(" ").slice(1).join(" "),
    age,
    gender,
    room,
    careUnit,
    careLevel: fallRisk === "High" ? "High Care" : "Assisted Care",
    institutionId: FACILITY_ALPHA,
    assignedCaregiverId: caregiverId,
    caregiverId,
    caregiverName: caregiver?.name,
    guardianId,
    guardianName: guardian?.name,
    guardianRelationship: guardian?.relationship,
    guardianEmail: guardian?.email,
    emergencyContact: { name: guardian?.name, relationship: guardian?.relationship, phone: guardian?.phone },
    bloodGroup,
    height,
    weight,
    bmi,
    diagnosis,
    medicalHistory: `${diagnosis}; ongoing geriatric care plan with weekly clinical review.`,
    chronicConditions,
    allergies,
    pastSurgeries,
    vaccinations,
    currentMedications: medicineByDiagnosis[diagnosis],
    medicationSchedule: medicineByDiagnosis[diagnosis].map(([name, dosage], medIndex) => ({ id: `${residentId}-med-${medIndex + 1}`, name, dosage, time: medIndex === 0 ? "08:00" : "20:00", status: "PENDING" })),
    primaryDoctor: ["Dr. A. K. Rangan", "Dr. Priya Menon", "Dr. Joseph Mathew"][index % 3],
    doctorNotes,
    clinicalNotes: doctorNotes,
    fallRisk,
    mobilityStatus,
    painScale,
    hydration,
    hydrationIntake: hydration,
    nutrition,
    dietType: nutrition,
    mood,
    sleepHours: index % 2 ? "6.8" : "7.4",
    appointments: [{ id: `${residentId}-appt-1`, title: nextDoctorAppointment, date: "2026-07-" + String(8 + index).padStart(2, "0"), status: "Scheduled" }],
    nextDoctorAppointment,
    lastDoctorVisit: "2026-06-18",
    baselineVitals: latestVitals,
    vitalsHistory: vitalHistory,
    weeklyBP: vitalHistory.map((item) => ({ date: item.date, value: `${item.bloodPressure.systolic}/${item.bloodPressure.diastolic}` })),
    weeklySugar: vitalHistory.map((item) => ({ date: item.date, value: item.bloodSugar })),
    weeklySPO2: vitalHistory.map((item) => ({ date: item.date, value: item.spo2 })),
    pulse: latestVitals.pulse,
    respiration: latestVitals.respiration,
    temperature: latestVitals.temperature,
    medication: "PENDING",
    nutritionStatus: "PENDING",
    hygiene: "PENDING",
    nutritionTask: "PENDING",
    nutrition: "PENDING",
    mobility: "PENDING",
    wellnessScore: 88 - index,
    overallRiskLevel: fallRisk === "High" ? "High" : "Medium",
    riskLevel: fallRisk === "High" ? "High" : "Medium",
    riskAssessment: `${fallRisk} fall risk with ${diagnosis.toLowerCase()} monitoring needs.`,
    incidentReports: index === 2 ? [{ id: `${residentId}-inc-1`, date: "2026-06-26", note: "Shortness of breath after activity; resolved with rest and breathing exercise.", severity: "WARNING" }] : [],
    observations: [{ id: `${residentId}-obs-1`, date: "2026-06-29", note: "Resident cooperative during morning care and meals." }],
    careNotes: [{ id: `${residentId}-note-1`, date: "2026-06-29", note: doctorNotes, author: caregiver?.name }],
    timeline: [
      { id: `${residentId}-tl-1`, date: "2026-06-29 08:30", title: "Morning vitals recorded", details: `BP ${latestVitals.bloodPressure.systolic}/${latestVitals.bloodPressure.diastolic}, SpO2 ${latestVitals.spo2}%` },
      { id: `${residentId}-tl-2`, date: "2026-06-29 09:00", title: "Medication pending", details: "Awaiting caregiver confirmation." },
    ],
    dailyLogs: [],
  };
});

export const SYSTEM_SETTINGS = {
  [FACILITY_ALPHA]: {
    institution: { name: "CareLink Facility Alpha", address: "123 Care Street, Chennai", phone: "+91 98765 43210", email: "alpha@carelink.local" },
    notifications: { enableSystemAlerts: true, minSeverityToAlert: "INFO" },
    reports: { defaultPeriod: "7d", showExecutiveSummary: true },
    featureToggles: { enableWelfareSync: true, enableVitalsAlerting: true, enablePerformanceTracking: true },
  },
  [FACILITY_BETA]: {
    institution: { name: "CareLink Beta", address: "Empty tenant environment", phone: "+91 80000 00000", email: "beta@carelink.local" },
    notifications: { enableSystemAlerts: true, minSeverityToAlert: "INFO" },
    reports: { defaultPeriod: "7d", showExecutiveSummary: true },
    featureToggles: { enableWelfareSync: true, enableVitalsAlerting: true, enablePerformanceTracking: true },
  },
};

export const INITIAL_NOTIFICATIONS = [
  { id: "n-1", title: "Medication review pending", message: "Medication rounds are pending for the morning shift.", severity: "WARNING", status: "UNREAD", category: "medication", residentId: 1, residentName: "R. Ramasamy", createdAt: "2026-06-29T09:00:00+05:30", institutionId: FACILITY_ALPHA },
  { id: "n-2", title: "Vitals updated", message: "Weekly vitals were updated for K. Lakshmi.", severity: "INFO", status: "READ", category: "vitals", residentId: 3, residentName: "K. Lakshmi", createdAt: "2026-06-29T10:30:00+05:30", institutionId: FACILITY_ALPHA },
];

export const INITIAL_ACTIVITY = [
  { id: "a-1", timestamp: "2026-06-29T08:15:00+05:30", action: "Resident admitted", details: "Seven resident profiles loaded into the registry.", institutionId: FACILITY_ALPHA },
  { id: "a-2", timestamp: "2026-06-29T09:00:00+05:30", action: "Assignment updated", details: "Caregiver and guardian assignments verified.", institutionId: FACILITY_ALPHA },
];
