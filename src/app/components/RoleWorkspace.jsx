"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDashboard } from "./DashboardContext";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import EmptyState from "./ui/EmptyState";
import SectionHeader from "./ui/SectionHeader";
import {
  LuActivity,
  LuArchive,
  LuBell,
  LuCalendarClock,
  LuClipboardCheck,
  LuDatabase,
  LuDownload,
  LuFileText,
  LuHeartPulse,
  LuPill,
  LuPlus,
  LuPrinter,
  LuSave,
  LuSettings,
  LuShieldCheck,
  LuStethoscope,
  LuTrash2,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";

const statusVariant = {
  COMPLETED: "success",
  PENDING: "warning",
  SKIPPED: "danger",
  MISSED: "danger",
  READ: "neutral",
  UNREAD: "primary",
  ARCHIVED: "neutral",
};

function EmptyBetaGrid() {
  const modules = ["Resident Records", "Care Tasks", "Notifications", "Reports", "Settings", "Sync Queue"];
  return (
    <div className="space-y-6">
      <SectionHeader title="Facility Beta Workspace" description="No Records Available across this empty tenant environment." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((label) => (
          <EmptyState key={label} icon={<LuDatabase />} title="No Records Available" description={`${label} has no records in the Beta workspace.`} className="my-0 min-h-56" />
        ))}
      </div>
    </div>
  );
}

function PageHero({ eyebrow, title, description, icon }) {
  return (
    <div className="rounded-[1.25rem] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge variant="primary" className="mb-4">{eyebrow}</Badge>
          <h1 className="font-page-title text-[var(--color-gray-900)]">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-gray-600)]">{description}</p>
        </div>
        <div className="hidden h-16 w-16 items-center justify-center rounded-[1.25rem] bg-[var(--color-brand-50)] text-3xl text-[var(--color-brand-500)] md:flex">
          {icon}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, tone = "primary", caption }) {
  const tones = {
    primary: "bg-[var(--color-brand-50)] text-[var(--color-brand-600)]",
    indigo: "bg-[var(--color-info-50)] text-[var(--color-info-600)]",
    success: "bg-[var(--color-success-50)] text-[var(--color-success-600)]",
    warning: "bg-[var(--color-warning-50)] text-[var(--color-warning-600)]",
    danger: "bg-[var(--color-danger-50)] text-[var(--color-danger-600)]",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[var(--color-gray-900)]">{value}</p>
          {caption && <p className="mt-1 text-xs text-[var(--color-gray-600)]">{caption}</p>}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tones[tone]}`}>{icon}</div>
      </div>
    </Card>
  );
}

function ResidentClinicalCard({ resident, readonly = true, onOpen }) {
  const vitals = resident.baselineVitals || {};
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black text-[var(--color-gray-900)]">{resident.name}</h3>
            <Badge variant="primary">{resident.residentId}</Badge>
            <Badge variant={resident.fallRisk === "High" ? "danger" : "warning"}>{resident.fallRisk} fall risk</Badge>
          </div>
          <p className="mt-1 text-sm text-[var(--color-gray-600)]">Room {resident.room} - {resident.age} yrs - {resident.bloodGroup} - {resident.mobilityStatus}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-gray-600)]">{resident.doctorNotes}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">{resident.wellnessScore}% Wellness</Badge>
          {!readonly && <Button size="sm" variant="outline" onClick={() => onOpen?.(resident)}>Update Care</Button>}
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Mini label="BP" value={`${vitals.bloodPressure?.systolic || 120}/${vitals.bloodPressure?.diastolic || 80}`} />
        <Mini label="SpO2" value={`${vitals.spo2 || 98}%`} />
        <Mini label="Sugar" value={`${vitals.bloodSugar || 110} mg/dL`} />
        <Mini label="Pulse" value={`${vitals.pulse || resident.pulse || 72} bpm`} />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Mini label="Hydration" value={resident.hydrationIntake || resident.hydration} />
        <Mini label="Nutrition" value={resident.dietType} />
        <Mini label="Mood" value={resident.mood} />
        <Mini label="Sleep" value={`${resident.sleepHours} hrs`} />
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <InfoBlock title="Medical Records" items={[resident.medicalHistory, `Diagnosis: ${resident.diagnosis}`, `Allergies: ${(resident.allergies || []).join(", ")}`, `Surgeries: ${(resident.pastSurgeries || []).join(", ")}`, `Vaccinations: ${(resident.vaccinations || []).join(", ")}`]} />
        <InfoBlock title="Care Plan" items={[`Medication: ${resident.medication}`, `Hygiene: ${resident.hygiene}`, `Mobility: ${resident.mobility || "PENDING"}`, `Pain scale: ${resident.painScale}/10`, `Appointment: ${resident.nextDoctorAppointment}`]} />
      </div>
    </Card>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--color-gray-50)] p-3">
      <p className="text-xs font-bold text-[var(--color-gray-600)]">{label}</p>
      <p className="mt-1 truncate font-black text-[var(--color-gray-900)]">{value}</p>
    </div>
  );
}

function InfoBlock({ title, items }) {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] p-6">
      <h3 className="mb-3 text-xl font-bold text-[var(--color-gray-900)]">{title}</h3>
      <ul className="space-y-2 text-base leading-relaxed text-[var(--color-gray-600)]">
        {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
      </ul>
    </div>
  );
}

function CareUpdatePanel({ resident, onClose }) {
  const { updateResidentStatus, recordVitals, addCareNote, raiseEmergencyFlag } = useDashboard();
  const [bpSystolic, setBpSystolic] = useState(resident?.baselineVitals?.bloodPressure?.systolic || 120);
  const [bpDiastolic, setBpDiastolic] = useState(resident?.baselineVitals?.bloodPressure?.diastolic || 80);
  const [spo2, setSpo2] = useState(resident?.baselineVitals?.spo2 || 98);
  const [sugar, setSugar] = useState(resident?.baselineVitals?.bloodSugar || 110);
  const [pulse, setPulse] = useState(resident?.baselineVitals?.pulse || 72);
  const [respiration, setRespiration] = useState(resident?.baselineVitals?.respiration || 16);
  const [temperature, setTemperature] = useState(resident?.baselineVitals?.temperature || 98.4);
  const [hydration, setHydration] = useState(resident?.hydration || "1.6L / 1.8L");
  const [sleep, setSleep] = useState(resident?.sleepHours || "7.0");
  const [meal, setMeal] = useState("Breakfast completed with 80% intake");
  const [note, setNote] = useState("");
  const [incident, setIncident] = useState("");
  const [handover, setHandover] = useState("");

  if (!resident) return null;

  const saveVitals = () => {
    recordVitals(resident.id, {
      bloodPressure: { systolic: Number(bpSystolic), diastolic: Number(bpDiastolic) },
      spo2,
      bloodSugar: sugar,
      pulse,
      respiration,
      temperature,
    });
  };

  const saveDaily = () => {
    updateResidentStatus(resident.id, "hydration", hydration);
    updateResidentStatus(resident.id, "sleep", sleep);
    updateResidentStatus(resident.id, "nutrition", "COMPLETED");
    addCareNote(resident.id, meal, "Meal Record");
    if (note.trim()) addCareNote(resident.id, note.trim(), "Daily Note");
    if (incident.trim()) addCareNote(resident.id, incident.trim(), "Incident Note");
    if (handover.trim()) addCareNote(resident.id, handover.trim(), "Shift Handover");
    onClose?.();
  };

  return (
    <Card className="p-5">
      <SectionHeader title={`Update ${resident.name}`} description="Daily care workflow updates are visible to admin and assigned guardian immediately." />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="BP Systolic" value={bpSystolic} setValue={setBpSystolic} type="number" />
            <Field label="BP Diastolic" value={bpDiastolic} setValue={setBpDiastolic} type="number" />
            <Field label="SPO2" value={spo2} setValue={setSpo2} type="number" />
            <Field label="Sugar" value={sugar} setValue={setSugar} type="number" />
            <Field label="Pulse" value={pulse} setValue={setPulse} type="number" />
            <Field label="Respiration" value={respiration} setValue={setRespiration} type="number" />
            <Field label="Temperature" value={temperature} setValue={setTemperature} type="number" />
          </div>
          <Button onClick={saveVitals}><LuHeartPulse /> Save Vitals</Button>
        </div>
        <div className="space-y-3">
          <Field label="Water Intake" value={hydration} setValue={setHydration} />
          <Field label="Sleep Hours" value={sleep} setValue={setSleep} />
          <Field label="Meal Record" value={meal} setValue={setMeal} />
          <Textarea label="Daily Notes" value={note} setValue={setNote} />
          <Textarea label="Incident Notes" value={incident} setValue={setIncident} />
          <Textarea label="Shift Handover" value={handover} setValue={setHandover} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => updateResidentStatus(resident.id, "medication", "COMPLETED")}><LuPill /> Medication Given</Button>
            <Button variant="outline" onClick={() => updateResidentStatus(resident.id, "hygiene", "COMPLETED")}>Hygiene Done</Button>
            <Button variant="outline" onClick={() => updateResidentStatus(resident.id, "mobility", "COMPLETED")}>Mobility Done</Button>
            <Button variant="danger" onClick={() => raiseEmergencyFlag(resident.id, incident.trim() || "Emergency flag raised by caregiver")}>Emergency Flag</Button>
            <Button variant="secondary" onClick={saveDaily}><LuSave /> Save Daily Care</Button>
            <Button variant="neutral" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Field({ label, value, setValue, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">{label}</span>
      <input className="md3-field" type={type} value={value} onChange={(event) => setValue(event.target.value)} />
    </label>
  );
}

function Textarea({ label, value, setValue }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">{label}</span>
      <textarea className="md3-field min-h-20" value={value} onChange={(event) => setValue(event.target.value)} />
    </label>
  );
}

export function AdminWorkspace() {
  const { residents, caregivers, guardians, notifications, activityHistory, currentUser, addResident, updateResident, archiveResident, deleteResident, addCaregiver, updateCaregiver, deleteCaregiver, addGuardian, updateGuardian, deleteGuardian, assignGuardian, assignCaregiver, addAppointment, raiseEmergencyFlag } = useDashboard();
  const [tab, setTab] = useState("registry");
  const [residentName, setResidentName] = useState("");
  const [residentAge, setResidentAge] = useState("70");
  const [room, setRoom] = useState("");
  const [caregiverId, setCaregiverId] = useState(caregivers[0]?.id || "");
  const [guardianId, setGuardianId] = useState(guardians[0]?.id || "");
  const [staffName, setStaffName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [assignResident, setAssignResident] = useState(residents[0]?.residentId || "");

  if (currentUser?.institutionId === "facility-beta") return <EmptyBetaGrid />;

  const pendingTasks = residents.reduce((total, resident) => total + ["medication", "nutrition", "hygiene", "mobility"].filter((field) => resident[field] !== "COMPLETED").length, 0);

  const submitResident = (event) => {
    event.preventDefault();
    addResident({ name: residentName, age: residentAge, room, assignedCaregiverId: caregiverId, guardianId });
    setResidentName("");
    setRoom("");
  };

  return (
    <div className="space-y-6">
      <PageHero eyebrow="Admin Operations" title="Facility Operations Command" description="Administrator-only resident registry, caregiver registry, guardian registry, assignments, analytics, reports, notifications and settings." icon={<LuShieldCheck />} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Residents" value={residents.length} icon={<LuUsers />} />
        <MetricCard label="Caregivers" value={caregivers.length} icon={<LuUserCheck />} tone="indigo" />
        <MetricCard label="Guardians" value={guardians.length} icon={<LuShieldCheck />} tone="success" />
        <MetricCard label="Open Tasks" value={pendingTasks} icon={<LuClipboardCheck />} tone={pendingTasks ? "warning" : "success"} />
      </div>
      <div className="flex flex-wrap gap-2">
        {["registry", "assignments", "staff", "guardians", "analytics"].map((item) => <Button key={item} variant={tab === item ? "primary" : "neutral"} onClick={() => setTab(item)}>{item}</Button>)}
        <Link href="/reports"><Button variant="outline">Reports</Button></Link>
        <Link href="/notifications"><Button variant="outline">Notifications</Button></Link>
        <Link href="/settings"><Button variant="outline">Settings</Button></Link>
      </div>

      {tab === "registry" && (
        <div className="space-y-6">
          <Card>
            <SectionHeader title="Add Resident" description="Only administrators can create resident records." />
            <form onSubmit={submitResident} className="grid gap-3 md:grid-cols-5">
              <Field label="Name" value={residentName} setValue={setResidentName} />
              <Field label="Age" value={residentAge} setValue={setResidentAge} type="number" />
              <Field label="Room" value={room} setValue={setRoom} />
              <Select label="Caregiver" value={caregiverId} setValue={setCaregiverId} options={caregivers.map((item) => [item.id, item.name])} />
              <Select label="Guardian" value={guardianId} setValue={setGuardianId} options={guardians.map((item) => [item.id, item.name])} />
              <Button type="submit"><LuPlus /> Add Resident</Button>
            </form>
          </Card>
          <div className="grid gap-4">
            {residents.map((resident) => (
              <ResidentClinicalCard key={resident.id} resident={resident} />
            ))}
          </div>
          <Card>
            <SectionHeader title="Registry Actions" description="Archive, delete, and edit resident records." />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead><tr className="border-b border-[var(--border-default)] text-xs uppercase text-[var(--color-gray-600)]"><th className="py-3">Resident</th><th>Caregiver</th><th>Guardian</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-[var(--color-gray-100)]">
                  {residents.map((resident) => (
                    <tr key={resident.id}>
                      <td className="py-3 font-bold">{resident.name}<span className="block text-xs font-normal text-[var(--color-gray-600)]">{resident.residentId}</span></td>
                      <td>{resident.caregiverName}</td>
                      <td>{resident.guardianName}</td>
                      <td><Badge variant={resident.archived ? "warning" : "success"}>{resident.archived ? "Archived" : "Active"}</Badge></td>
                      <td className="space-x-2 text-right">
                        <Button size="sm" variant="outline" onClick={() => updateResident({ ...resident, wellnessScore: Math.min(100, (resident.wellnessScore || 80) + 1) })}>Edit</Button>
                        <Button size="sm" variant="outline" onClick={() => addAppointment(resident.id, { title: "Doctor review", date: new Date().toISOString().slice(0, 10), doctor: resident.primaryPhysician || "Duty Doctor" })}>Appointment</Button>
                        <Button size="sm" variant="danger" onClick={() => raiseEmergencyFlag(resident.id, "Emergency flag raised by administrator")}>Emergency</Button>
                        <Button size="sm" variant="neutral" onClick={() => archiveResident(resident.id)}><LuArchive /> Archive</Button>
                        <Button size="sm" variant="danger" onClick={() => deleteResident(resident.id)}><LuTrash2 /> Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === "assignments" && (
        <Card>
          <SectionHeader title="Assignment Center" description="Assign caregivers and guardians to residents." />
          <div className="grid gap-4 md:grid-cols-4">
            <Select label="Resident" value={assignResident} setValue={setAssignResident} options={residents.map((item) => [item.residentId, `${item.residentId} ${item.name}`])} />
            <Select label="Caregiver" value={caregiverId} setValue={setCaregiverId} options={caregivers.map((item) => [item.id, item.name])} />
            <Select label="Guardian" value={guardianId} setValue={setGuardianId} options={guardians.map((item) => [item.id, item.name])} />
            <div className="flex items-end gap-2">
              <Button onClick={() => assignCaregiver(assignResident, caregiverId)}>Assign Caregiver</Button>
              <Button variant="outline" onClick={() => assignGuardian(assignResident, guardianId)}>Assign Guardian</Button>
            </div>
          </div>
        </Card>
      )}

      {tab === "staff" && (
        <Card>
          <SectionHeader title="Caregiver Registry" description="Add and edit caregiver records." />
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            <Field label="Caregiver Name" value={staffName} setValue={setStaffName} />
            <Button onClick={() => { if (staffName) { addCaregiver({ name: staffName, designation: "Care Assistant", responsibilities: ["Daily Living Support"], email: `${staffName.toLowerCase().replaceAll(" ", ".")}@carelink.local` }); setStaffName(""); } }}><LuPlus /> Add Caregiver</Button>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {caregivers.map((caregiver) => <StaffCard key={caregiver.id} caregiver={caregiver} onEdit={() => updateCaregiver({ ...caregiver, caregiverPerformance: Math.min(100, (caregiver.caregiverPerformance || 90) + 1) })} onRemove={() => deleteCaregiver(caregiver.id)} />)}
          </div>
        </Card>
      )}

      {tab === "guardians" && (
        <Card>
          <SectionHeader title="Guardian Registry" description="Add and edit guardian records." />
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            <Field label="Guardian Name" value={guardianName} setValue={setGuardianName} />
            <Button onClick={() => { if (guardianName) { addGuardian({ name: guardianName, relationship: "Family", email: `${guardianName.toLowerCase().replaceAll(" ", ".")}@carelink.local`, phone: "+91 90000 0999" }); setGuardianName(""); } }}><LuPlus /> Add Guardian</Button>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {guardians.map((guardian) => (
              <Card key={guardian.id} className="p-4">
                <p className="font-black">{guardian.name}</p>
                <p className="text-sm text-[var(--color-gray-600)]">{guardian.relationship} - {guardian.residentIds?.join(", ") || "No assigned residents"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateGuardian({ ...guardian, phone: guardian.phone })}>Edit Guardian</Button>
                  <Button size="sm" variant="danger" onClick={() => deleteGuardian(guardian.id)}><LuTrash2 /> Remove Guardian</Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {tab === "analytics" && <AnalyticsPanel residents={residents} notifications={notifications} activityHistory={activityHistory} />}
    </div>
  );
}

function Select({ label, value, setValue, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--color-gray-600)]">{label}</span>
      <select className="md3-field" value={value} onChange={(event) => setValue(event.target.value)}>
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}

function StaffCard({ caregiver, onEdit, onRemove }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black">{caregiver.name}</p>
          <p className="text-sm text-[var(--color-gray-600)]">{caregiver.designation} - {caregiver.employeeId}</p>
        </div>
        <Badge variant="success">{caregiver.status}</Badge>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-[var(--color-gray-600)]">
        {(caregiver.responsibilities || []).map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={onEdit}>Edit Caregiver</Button>
        <Button size="sm" variant="danger" onClick={onRemove}><LuTrash2 /> Remove Caregiver</Button>
      </div>
    </Card>
  );
}

function AnalyticsPanel({ residents, notifications, activityHistory }) {
  const avgWellness = residents.length ? Math.round(residents.reduce((sum, item) => sum + (item.wellnessScore || 0), 0) / residents.length) : 0;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard label="Average Wellness" value={`${avgWellness}%`} icon={<LuHeartPulse />} tone="success" />
      <MetricCard label="Notifications" value={notifications.length} icon={<LuBell />} tone="warning" />
      <MetricCard label="Audit Events" value={activityHistory.length} icon={<LuActivity />} tone="indigo" />
    </div>
  );
}

export function CaregiverWorkspace() {
  const { residents, caregivers, currentUser } = useDashboard();
  const [activeResident, setActiveResident] = useState(null);
  if (currentUser?.institutionId === "facility-beta") return <EmptyBetaGrid />;
  const caregiver = caregivers.find((item) => item.id === currentUser?.caregiverId);
  const completed = residents.reduce((sum, resident) => sum + ["medication", "nutrition", "hygiene", "mobility"].filter((field) => resident[field] === "COMPLETED").length, 0);
  const total = residents.length * 4;

  return (
    <div className="space-y-6">
      <PageHero eyebrow="Caregiver Workspace" title="Assigned Residents & Clinical Tasks" description="Caregivers can update only healthcare records for assigned residents. Assignments and registries are read-only." icon={<LuStethoscope />} />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Assigned Residents" value={residents.length} icon={<LuUsers />} />
        <MetricCard label="Task Completion" value={total ? `${Math.round((completed / total) * 100)}%` : "0%"} icon={<LuClipboardCheck />} tone="success" />
        <MetricCard label="Shift" value={caregiver?.shiftType || "Active"} icon={<LuCalendarClock />} tone="indigo" caption={caregiver?.designation} />
      </div>
      {activeResident && <CareUpdatePanel resident={activeResident} onClose={() => setActiveResident(null)} />}
      <div className="grid gap-4">
        {residents.map((resident) => <ResidentClinicalCard key={resident.id} resident={resident} readonly={false} onOpen={setActiveResident} />)}
      </div>
      {!residents.length && <EmptyState icon={<LuUsers />} title="No Records Available" description="No residents are assigned to this caregiver." />}
    </div>
  );
}

export function GuardianWorkspace() {
  const { residents, caregivers, notifications, currentUser } = useDashboard();
  if (currentUser?.institutionId === "facility-beta") return <EmptyBetaGrid />;
  const averageWellness = residents.length ? Math.round(residents.reduce((sum, resident) => sum + (resident.wellnessScore || 0), 0) / residents.length) : 0;
  return (
    <div className="space-y-6">
      <PageHero eyebrow="Guardian Workspace" title="Family Wellness Overview" description="Assigned residents, assigned caregiver, vitals, medical records, daily updates, doctor notes, appointments, wellness, mood, sleep, hydration, nutrition, emergency contact, and timeline." icon={<LuHeartPulse />} />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Assigned Residents" value={residents.length} icon={<LuUsers />} />
        <MetricCard label="Wellness Average" value={`${averageWellness}%`} icon={<LuHeartPulse />} tone="success" />
        <MetricCard label="Unread Updates" value={notifications.filter((item) => item.status === "UNREAD").length} icon={<LuBell />} tone="warning" />
      </div>
      <div className="grid gap-4">
        {residents.map((resident) => {
          const caregiver = caregivers.find((item) => item.id === resident.assignedCaregiverId);
          return (
            <div key={resident.id} className="space-y-4">
              <ResidentClinicalCard resident={resident} />
              <Card className="p-5">
                <SectionHeader title="Guardian Timeline & Care Team" description={`Assigned caregiver: ${caregiver?.name || resident.caregiverName}`} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <InfoBlock title="Emergency Contact" items={[`${resident.emergencyContact?.name} (${resident.emergencyContact?.relationship})`, resident.emergencyContact?.phone]} />
                  <InfoBlock title="Timeline" items={(resident.timeline || []).slice(0, 4).map((item) => `${item.date}: ${item.title} - ${item.details}`)} />
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      {!residents.length && <EmptyState icon={<LuUsers />} title="No Records Available" description="No residents are assigned to this guardian." />}
    </div>
  );
}

export function NotificationsWorkspace() {
  const { notifications, currentUser, markNotificationRead, markNotificationUnread, archiveNotification, markAllNotificationsRead, archiveAllReadNotifications, clearNotifications } = useDashboard();
  const [filter, setFilter] = useState("all");
  if (currentUser?.institutionId === "facility-beta") return <EmptyBetaGrid />;
  const filtered = notifications.filter((notification) => filter === "all" ? notification.status !== "ARCHIVED" : notification.status === filter);
  return (
    <div className="space-y-6">
      <PageHero eyebrow="Notification Center" title="Care Alerts & Updates" description="Medication completed, vitals updated, resident admitted, resident archived, guardian messages, and assignment updates." icon={<LuBell />} />
      <div className="flex flex-wrap gap-2">
        {["all", "UNREAD", "READ", "ARCHIVED"].map((item) => <Button key={item} variant={filter === item ? "primary" : "neutral"} onClick={() => setFilter(item)}>{item === "all" ? "Active" : item}</Button>)}
        {currentUser?.role === "admin" && <Button variant="outline" onClick={markAllNotificationsRead}>Mark All Read</Button>}
        {currentUser?.role === "admin" && <Button variant="outline" onClick={archiveAllReadNotifications}>Archive Read</Button>}
        {currentUser?.role === "admin" && <Button variant="danger" onClick={clearNotifications}>Clear</Button>}
      </div>
      <Card>
        <div className="space-y-3">
          {filtered.map((notification) => (
            <div key={notification.id} className="rounded-2xl border border-[var(--border-default)] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-[var(--color-gray-900)]">{notification.title}</p>
                    <Badge variant={notification.severity === "CRITICAL" ? "danger" : notification.severity === "WARNING" ? "warning" : "neutral"}>{notification.severity}</Badge>
                    <Badge variant={statusVariant[notification.status] || "neutral"}>{notification.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-gray-600)]">{notification.description || notification.message}</p>
                  <div className="mt-2 grid gap-1 text-xs text-[var(--color-gray-500)] sm:grid-cols-2 lg:grid-cols-4">
                    <span>Resident: {notification.resident || notification.residentName || "Facility"}</span>
                    <span>Generated by: {notification.generatedBy || "CareLink System"}</span>
                    <span>Priority: {notification.priority || "LOW"}</span>
                    <span>{notification.timestamp ? new Date(notification.timestamp).toLocaleString() : "Recently"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {notification.status === "UNREAD" && <Button size="sm" variant="outline" onClick={() => markNotificationRead(notification.id)}>Mark Read</Button>}
                  {notification.status === "READ" && <Button size="sm" variant="outline" onClick={() => markNotificationUnread(notification.id)}>Mark Unread</Button>}
                  {notification.status !== "ARCHIVED" && <Button size="sm" variant="neutral" onClick={() => archiveNotification(notification.id)}>Archive</Button>}
                </div>
              </div>
            </div>
          ))}
          {!filtered.length && <EmptyState icon={<LuBell />} title="No Records Available" description="No notifications match this view." />}
        </div>
      </Card>
    </div>
  );
}

export function ReportsWorkspace() {
  const { residents, caregivers, guardians, activityHistory, currentUser } = useDashboard();
  const [activeReport, setActiveReport] = useState("Resident Health Report");
  const [residentFilter, setResidentFilter] = useState("all");
  const [caregiverFilter, setCaregiverFilter] = useState("all");
  const [guardianFilter, setGuardianFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30d");
  const [search, setSearch] = useState("");
  if (currentUser?.institutionId === "facility-beta") return <EmptyBetaGrid />;
  const reports = currentUser?.role === "admin"
    ? ["Resident Health Report", "Caregiver Activity Report", "Guardian Report", "Facility Report"]
    : currentUser?.role === "caregiver"
      ? ["Resident Health Report", "Caregiver Activity Report"]
      : ["Resident Health Report", "Guardian Report"];
  const filteredResidents = residents.filter((resident) => {
    const matchesResident = residentFilter === "all" || resident.residentId === residentFilter;
    const matchesCaregiver = caregiverFilter === "all" || resident.assignedCaregiverId === caregiverFilter;
    const matchesGuardian = guardianFilter === "all" || resident.guardianId === guardianFilter;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [resident.name, resident.residentId, resident.diagnosis, resident.caregiverName, resident.guardianName].join(" ").toLowerCase().includes(query);
    return matchesResident && matchesCaregiver && matchesGuardian && matchesSearch;
  });
  const filteredCaregivers = caregivers.filter((caregiver) => caregiverFilter === "all" || caregiver.id === caregiverFilter);
  const filteredGuardians = guardians.filter((guardian) => guardianFilter === "all" || guardian.id === guardianFilter);
  const printReport = () => window.print();
  const payloadFor = (report) => ({ report, generatedFor: currentUser?.name || "CareLink", generatedAt: new Date().toISOString(), residents: filteredResidents, caregivers: filteredCaregivers, guardians: filteredGuardians, activityHistory, dateRange });
  const downloadReport = (format, report = activeReport) => {
    const payload = payloadFor(report);
    const content = format === "json" ? JSON.stringify(payload, null, 2) : buildReportText(payload);
    const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${report.toLowerCase().replaceAll(" ", "-")}.${format === "json" ? "json" : "txt"}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const downloadPdfReport = (report = activeReport) => {
    const payload = payloadFor(report);
    const pdf = buildClinicalPdf(payload);
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${report.toLowerCase().replaceAll(" ", "-")}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const actionReports = currentUser?.role === "admin"
    ? ["Facility Report", "Resident Health Report", "Caregiver Activity Report", "Guardian Report", "Compliance Report"]
    : currentUser?.role === "caregiver"
      ? ["Caregiver Activity Report"]
      : ["Guardian Report"];
  return (
    <div className="space-y-6">
      <PageHero eyebrow="Reports" title={currentUser?.role === "guardian" ? "Family Health Reports" : "Healthcare Reports"} description="Professional healthcare reports with charts, tables, progress indicators, print layout, PDF preview, export, and download actions." icon={<LuFileText />} />
      <Card className="print:hidden">
        <SectionHeader title="Reporting Console" description="Filter clinical documentation by resident, caregiver, guardian, date range, and search term." />
        <div className="grid gap-3 lg:grid-cols-5">
          <Select label="Resident" value={residentFilter} setValue={setResidentFilter} options={[["all", "All residents"], ...residents.map((item) => [item.residentId, `${item.residentId} ${item.name}`])]} />
          <Select label="Caregiver" value={caregiverFilter} setValue={setCaregiverFilter} options={[["all", "All caregivers"], ...caregivers.map((item) => [item.id, item.name])]} />
          <Select label="Guardian" value={guardianFilter} setValue={setGuardianFilter} options={[["all", "All guardians"], ...guardians.map((item) => [item.id, item.name])]} />
          <Select label="Date Range" value={dateRange} setValue={setDateRange} options={[["7d", "Last 7 days"], ["30d", "Last 30 days"], ["90d", "Last 90 days"], ["all", "All records"]]} />
          <Field label="Search" value={search} setValue={setSearch} />
        </div>
      </Card>
      <div className="flex flex-wrap gap-2 print:hidden">
        {reports.map((report) => <Button key={report} variant={activeReport === report ? "primary" : "neutral"} onClick={() => setActiveReport(report)}>{report}</Button>)}
        <Button variant="outline" onClick={printReport}>Preview</Button>
        <Button variant="outline" onClick={printReport}><LuPrinter /> Print</Button>
        <Button variant="outline" onClick={() => downloadPdfReport(activeReport)}><LuDownload /> Download PDF</Button>
        <Button variant="outline" onClick={() => downloadReport("json", "All Reports")}><LuDownload /> Export All</Button>
      </div>
      <div className="flex flex-wrap gap-2 print:hidden">
        {actionReports.map((report) => (
          <Button key={report} variant="neutral" onClick={() => downloadPdfReport(report)}>
            <LuDownload /> {currentUser?.role === "admin" ? `Download ${report}` : report === "Caregiver Activity Report" ? "Download Activity Report" : "Download Assigned Resident Report"}
          </Button>
        ))}
        {currentUser?.role === "admin" && <Button variant="outline" onClick={printReport}>Print All</Button>}
      </div>
      <Card className="print-report-container">
        <div className="mb-6 flex flex-col gap-4 border-b border-[var(--border-default)] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-[48px] w-auto flex items-center flex-shrink-0">
            <Image src="/logo/report-logo.png" alt="CareLink Report Logo" width={220} height={72} className="h-full w-auto object-contain" />
          </div>
          <div className="text-sm text-[var(--color-gray-600)] sm:text-right">
            <p className="font-black text-[var(--color-gray-900)]">Generated by {currentUser?.name || "CareLink"}</p>
            <p>{new Date().toLocaleString()} - Designed & Developed by Kuralara WebFlux</p>
          </div>
        </div>
        <SectionHeader title={activeReport} description={`Generated for ${currentUser?.name || "CareLink"} on ${new Date().toLocaleString()}`} />
        <ReportBody activeReport={activeReport} residents={filteredResidents} caregivers={filteredCaregivers} guardians={filteredGuardians} activityHistory={activityHistory} />
        <footer className="mt-6 border-t border-[var(--border-default)] pt-4 text-xs font-semibold text-[var(--color-gray-600)]">
          CareLink Guardian Portal clinical documentation. Designed & Developed by Kuralara WebFlux. Page 1
        </footer>
      </Card>
      <style jsx global>{`@media print{@page{size:A4;margin:16mm}body *{visibility:hidden}.print-report-container,.print-report-container *{visibility:visible}.print-report-container{position:absolute;left:0;top:0;width:100%;box-shadow:none!important;border:0!important}.no-print{display:none!important}}`}</style>
    </div>
  );
}

function ReportBody({ activeReport, residents, caregivers, guardians, activityHistory }) {
  if (activeReport === "Caregiver Activity Report") return <CaregiverActivityReport residents={residents} caregivers={caregivers} activityHistory={activityHistory} />;
  if (activeReport === "Guardian Report") return <GuardianReport residents={residents} guardians={guardians} />;
  if (activeReport === "Facility Report") return <FacilityReport residents={residents} caregivers={caregivers} guardians={guardians} activityHistory={activityHistory} />;
  return <ResidentHealthReport residents={residents} activityHistory={activityHistory} />;
}

function buildReportText({ report, generatedFor, generatedAt, residents, caregivers, guardians, activityHistory }) {
  return [
    report,
    `Generated for: ${generatedFor}`,
    `Generated at: ${generatedAt}`,
    "",
    "Residents",
    ...residents.map((resident) => `${resident.residentId} ${resident.name}: ${resident.diagnosis}; BP ${resident.baselineVitals?.bloodPressure?.systolic}/${resident.baselineVitals?.bloodPressure?.diastolic}; Sugar ${resident.baselineVitals?.bloodSugar}; SpO2 ${resident.baselineVitals?.spo2}; Wellness ${resident.wellnessScore}%`),
    "",
    "Caregivers",
    ...caregivers.map((caregiver) => `${caregiver.name}: ${(caregiver.assignedResidentIds || []).join(", ") || "No assigned residents"}; ${caregiver.caregiverPerformance || 0}% performance`),
    "",
    "Guardians",
    ...guardians.map((guardian) => `${guardian.name}: ${(guardian.residentIds || []).join(", ") || "No assigned residents"}`),
    "",
    "Activity Timeline",
    ...activityHistory.slice(0, 12).map((item) => `${item.timestamp}: ${item.action} - ${item.details}`),
  ].join("\n");
}

function pdfEscape(value = "") {
  return String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function buildClinicalPdf({ report, generatedFor, generatedAt, residents, caregivers, guardians, activityHistory, dateRange }) {
  const linesPage1 = [
    "CareLink Guardian Portal | [Logo: public/logo/report-logo.png]",
    "==========================================================================================",
    report,
    "==========================================================================================",
    `Generated date & time: ${new Date(generatedAt).toLocaleString()}`,
    `Generated by: ${generatedFor} | Date range: ${dateRange}`,
    "------------------------------------------------------------------------------------------",
    "",
    "Patient Overview",
    ...residents.slice(0, 12).map((resident) => ` - [${resident.residentId}] ${resident.name} (${resident.age} yrs) | Blood: ${resident.bloodGroup} | Dx: ${resident.diagnosis}`),
    "",
    "Medical Summary",
    ...residents.slice(0, 12).map((resident) => ` - ${resident.name}: History: ${resident.medicalHistory}; Fall risk: ${resident.fallRisk}; BMI: ${resident.bmi}`),
    "",
    "Footer: Designed & Developed by Kuralara WebFlux | Page 1 of 2",
  ];

  const linesPage2 = [
    "CareLink Guardian Portal | [Logo: public/logo/report-logo.png] (Page 2)",
    "==========================================================================================",
    "Vitals & Compliance Matrix",
    "==========================================================================================",
    "",
    "Vitals & Charts",
    ...residents.slice(0, 12).map((resident) => ` - ${resident.name}: BP ${resident.baselineVitals?.bloodPressure?.systolic}/${resident.baselineVitals?.bloodPressure?.diastolic}, SpO2 ${resident.baselineVitals?.spo2}%, Sugar ${resident.baselineVitals?.bloodSugar}, Pulse ${resident.baselineVitals?.pulse}, Temp ${resident.baselineVitals?.temperature}`),
    "",
    "Medication Compliance",
    ...residents.slice(0, 12).map((resident) => ` - ${resident.name}: Scheduled: ${resident.medication}; Rx: ${(resident.currentMedications || []).map((med) => `${med[0] || med.name} (${med[1] || med.dosage})`).join(", ")}`),
    "",
    "Care Team & Administration",
    ...caregivers.map((caregiver) => ` - Caregiver: ${caregiver.name} | Assigned: ${(caregiver.assignedResidentIds || []).join(", ") || "None"}`),
    ...guardians.map((guardian) => ` - Guardian: ${guardian.name} | Assigned: ${(guardian.residentIds || []).join(", ") || "None"}`),
    "",
    "Activity Timeline",
    ...activityHistory.slice(0, 10).map((item) => ` - ${item.action}: ${item.details}`),
    "",
    "------------------------------------------------------------------------------------------",
    "Footer: Designed & Developed by Kuralara WebFlux | Page 2 of 2",
  ];

  const content1 = ["BT", "/F1 16 Tf", "50 790 Td", `(${pdfEscape(linesPage1[0])}) Tj`, "/F1 9 Tf", "0 -18 Td"]
    .concat(linesPage1.slice(1).flatMap((line) => [`(${pdfEscape(line).slice(0, 105)}) Tj`, "0 -13 Td"]))
    .concat(["ET"])
    .join("\n");

  const content2 = ["BT", "/F1 16 Tf", "50 790 Td", `(${pdfEscape(linesPage2[0])}) Tj`, "/F1 9 Tf", "0 -18 Td"]
    .concat(linesPage2.slice(1).flatMap((line) => [`(${pdfEscape(line).slice(0, 105)}) Tj`, "0 -13 Td"]))
    .concat(["ET"])
    .join("\n");

  const objects = [
    // 1: Catalog
    "<< /Type /Catalog /Pages 2 0 R >>",
    // 2: Pages list
    "<< /Type /Pages /Kids [3 0 R 6 0 R] /Count 2 >>",
    // 3: Page 1
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    // 4: Font F1
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    // 5: Content Page 1
    `<< /Length ${content1.length} >>\nstream\n${content1}\nendstream`,
    // 6: Page 2
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 7 0 R >>",
    // 7: Content Page 2
    `<< /Length ${content2.length} >>\nstream\n${content2}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

function ReportSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-[var(--border-default)] p-4">
      <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-[var(--color-gray-700)]">{title}</h3>
      {children}
    </section>
  );
}

function ProgressLine({ label, value, tone = "primary" }) {
  const toneClass = tone === "success" ? "bg-[var(--color-success-500)]" : tone === "warning" ? "bg-[var(--color-warning-500)]" : tone === "danger" ? "bg-[var(--color-danger-500)]" : "bg-[var(--color-brand-500)]";
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-bold text-[var(--color-gray-600)]"><span>{label}</span><span>{value}%</span></div>
      <div className="h-2 rounded-full bg-[var(--color-gray-100)]"><div className={`h-2 rounded-full ${toneClass}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>
    </div>
  );
}

function TrendStrip({ label, values, suffix = "" }) {
  const cleanValues = values.filter((value) => Number.isFinite(Number(value))).slice(0, 7).reverse();
  const max = Math.max(1, ...cleanValues.map(Number));
  return (
    <div className="rounded-2xl bg-[var(--color-gray-50)] p-3">
      <p className="mb-3 text-xs font-black uppercase tracking-wide text-[var(--color-gray-600)]">{label}</p>
      <div className="flex h-24 items-end gap-2">
        {cleanValues.map((value, index) => (
          <div key={`${label}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <div className="w-full rounded-t-lg bg-[var(--color-brand-500)]" style={{ height: `${Math.max(12, (Number(value) / max) * 88)}px` }} />
            <span className="text-[10px] font-bold text-[var(--color-gray-600)]">{value}{suffix}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportSummaryGrid({ resident }) {
  const vitals = resident?.baselineVitals || {};
  const items = [
    ["Patient Overview", resident ? `${resident.residentId} - ${resident.name}` : "No records"],
    ["Medical Summary", resident?.diagnosis || "No diagnosis"],
    ["Vitals Summary", resident ? `BP ${vitals.bloodPressure?.systolic}/${vitals.bloodPressure?.diastolic}, SpO2 ${vitals.spo2}%` : "No vitals"],
    ["Medication Compliance", resident?.medication === "COMPLETED" ? "100%" : "Pending"],
    ["Wellness Score", resident ? `${resident.wellnessScore}%` : "0%"],
    ["Nutrition", resident?.dietType || "No record"],
    ["Hydration", resident?.hydrationIntake || resident?.hydration || "No record"],
    ["Mood", resident?.mood || "No record"],
    ["Sleep", resident ? `${resident.sleepHours} hrs` : "No record"],
    ["Risk Assessment", resident ? `${resident.fallRisk} fall risk` : "No record"],
    ["Upcoming Appointments", resident?.nextDoctorAppointment || "No appointment"],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--color-brand-50)] p-4 text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-black text-[var(--color-brand-600)] shadow-[var(--shadow-sm)]">
          {resident?.name?.split(" ").map((part) => part[0]).slice(0, 2).join("") || "CL"}
        </div>
        <p className="text-xs font-black uppercase tracking-wide text-[var(--color-gray-600)]">Resident Photo</p>
        <p className="text-sm font-black text-[var(--color-gray-900)]">{resident?.residentId || "CareLink"}</p>
      </div>
      {items.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-[var(--border-default)] bg-white p-4 shadow-[var(--shadow-xxs)]">
          <p className="text-[10px] font-black uppercase tracking-wide text-[var(--color-gray-500)]">{label}</p>
          <p className="mt-2 text-sm font-black leading-5 text-[var(--color-gray-900)]">{value}</p>
        </div>
      ))}
    </div>
  );
}

function ResidentReportDashboard({ resident, activityHistory }) {
  const [activeTab, setActiveTab] = React.useState("doctor");
  const [showFullTimeline, setShowFullTimeline] = React.useState(false);

  const vitals = resident.baselineVitals || {};
  const history = resident.vitalsHistory || [];
  const timelineItems = resident.timeline || [];
  const displayedTimeline = showFullTimeline ? timelineItems : timelineItems.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. Header & Summary Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
          <p className="text-[10px] font-black uppercase tracking-wide text-[var(--color-gray-500)]">Patient Overview</p>
          <p className="mt-2 text-xl font-bold text-[var(--color-gray-900)]">{resident.residentId} - {resident.name}</p>
          <p className="text-base text-[var(--color-gray-500)] mt-1">Room: {resident.room} | Age: {resident.age} | Blood: {resident.bloodGroup}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
          <p className="text-[10px] font-black uppercase tracking-wide text-[var(--color-gray-500)]">Wellness Score</p>
          <p className="mt-2 text-5xl font-black text-[var(--color-brand-600)]">{resident.wellnessScore}%</p>
          <div className="mt-2.5 h-2 w-full rounded-full bg-[var(--color-gray-100)]">
            <div className="h-2 rounded-full bg-[var(--color-brand-500)]" style={{ width: `${resident.wellnessScore}%` }} />
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
          <p className="text-[10px] font-black uppercase tracking-wide text-[var(--color-gray-500)]">Risk Status</p>
          <p className="mt-2 text-xl font-bold text-[var(--color-gray-900)]">Fall Risk: {resident.fallRisk}</p>
          <p className="text-base text-[var(--color-gray-500)] mt-1">Mobility: {resident.mobilityStatus}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)]">
          <p className="text-[10px] font-black uppercase tracking-wide text-[var(--color-gray-500)]">Medication Compliance</p>
          <p className="mt-2 text-xl font-bold text-[var(--color-gray-900)]">{resident.medication === "COMPLETED" ? "100% Completed" : "Pending Action"}</p>
          <p className="text-base text-[var(--color-gray-500)] mt-1">Diet: {resident.dietType || "Standard Diet"}</p>
        </div>
      </div>

      {/* 2. Two-Column Layout */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Vitals, Nutrition, Hydration */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-4">
            <h4 className="text-xl font-bold text-[var(--color-gray-900)] border-b border-[var(--border-default)] pb-3">Vitals & Health Metrics</h4>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">Blood Pressure</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block">{vitals.bloodPressure?.systolic}/{vitals.bloodPressure?.diastolic} <span className="text-xs font-normal text-[var(--color-gray-500)]">mmHg</span></span>
              </div>
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">SPO2</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block">{vitals.spo2}%</span>
              </div>
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">Blood Sugar</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block">{vitals.bloodSugar} <span className="text-xs font-normal text-[var(--color-gray-500)]">mg/dL</span></span>
              </div>
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">Pulse Rate</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block">{vitals.pulse} <span className="text-xs font-normal text-[var(--color-gray-500)]">bpm</span></span>
              </div>
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">Temperature</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block">{vitals.temperature}°F</span>
              </div>
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">BMI Assessment</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block">{resident.bmi} <span className="text-xs font-normal text-[var(--color-gray-500)]">({resident.weightKg}kg)</span></span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-4">
            <h4 className="text-xl font-bold text-[var(--color-gray-900)] border-b border-[var(--border-default)] pb-3">Nutrition & Hydration</h4>
            <div className="space-y-4">
              <ProgressLine label="Medication Compliance" value={resident.medication === "COMPLETED" ? 100 : 68} tone={resident.medication === "COMPLETED" ? "success" : "warning"} />
              <ProgressLine label="Hydration Intake" value={resident.hydration === "COMPLETED" ? 100 : 78} tone="success" />
              <ProgressLine label="Nutrition Balance" value={resident.nutrition === "COMPLETED" ? 100 : 82} tone="success" />
            </div>
          </div>
        </div>

        {/* Right Column: Mood, Sleep, Activity, Clinical Information */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-4">
            <h4 className="text-xl font-bold text-[var(--color-gray-900)] border-b border-[var(--border-default)] pb-3">Mood, Sleep & Wellness</h4>
            <div className="grid gap-4 grid-cols-2">
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">Daily Mood</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block capitalize">{resident.mood || "Calm"}</span>
              </div>
              <div className="rounded-xl bg-[var(--color-gray-50)] p-4">
                <span className="text-xs font-bold text-[var(--color-gray-500)] uppercase block">Sleep Duration</span>
                <span className="text-base font-bold text-[var(--color-gray-900)] mt-1 block">{resident.sleepHours || 8} <span className="text-xs font-normal">hours</span></span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-4">
            <h4 className="text-xl font-bold text-[var(--color-gray-900)] border-b border-[var(--border-default)] pb-3">Clinical Profile</h4>
            <div className="grid gap-3 text-base leading-relaxed text-[var(--color-gray-600)] grid-cols-2">
              <p><span className="font-bold text-[var(--color-gray-900)]">Age:</span> {resident.age} years</p>
              <p><span className="font-bold text-[var(--color-gray-900)]">Blood Group:</span> {resident.bloodGroup}</p>
              <p><span className="font-bold text-[var(--color-gray-900)]">Height:</span> {resident.heightCm} cm</p>
              <p><span className="font-bold text-[var(--color-gray-900)]">Weight:</span> {resident.weightKg} kg</p>
              <p className="col-span-2"><span className="font-bold text-[var(--color-gray-900)]">Diagnosis:</span> {resident.diagnosis}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Cards Grid: Medications, Allergies, Care Plan, Timeline */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-3">
          <h4 className="text-xl font-bold text-[var(--color-gray-900)] border-b border-[var(--border-default)] pb-3">Active Medications</h4>
          <ul className="space-y-2 text-base leading-relaxed text-[var(--color-gray-600)] list-disc pl-5">
            {(resident.currentMedications || []).map((med, idx) => (
              <li key={idx}><span className="font-bold text-[var(--color-gray-900)]">{med[0] || med.name}</span> - {med[1] || med.dosage}</li>
            ))}
            {!(resident.currentMedications || []).length && <li>No active medications.</li>}
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-3">
          <h4 className="text-xl font-bold text-[var(--color-gray-900)] border-b border-[var(--border-default)] pb-3">Allergies & Medical Profiles</h4>
          <div className="text-base leading-relaxed text-[var(--color-gray-600)] space-y-2">
            <p><span className="font-bold text-[var(--color-gray-900)]">Allergies:</span> {(resident.allergies || []).join(", ") || "None recorded"}</p>
            <p><span className="font-bold text-[var(--color-gray-900)]">Past Surgeries:</span> {(resident.pastSurgeries || []).join(", ") || "None recorded"}</p>
            <p><span className="font-bold text-[var(--color-gray-900)]">Vaccinations:</span> {(resident.vaccinations || []).join(", ") || "None recorded"}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-4 md:col-span-2">
          <h4 className="text-xl font-bold text-[var(--color-gray-900)] border-b border-[var(--border-default)] pb-3">Care Timeline</h4>
          <div className="space-y-4 pl-3 border-l-2 border-[var(--color-brand-100)] ml-2">
            {displayedTimeline.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[17px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-brand-500)]" />
                <p className="text-xs font-bold text-[var(--color-gray-400)]">{item.date}</p>
                <p className="text-base font-bold text-[var(--color-gray-900)]">{item.title}</p>
                <p className="text-sm text-[var(--color-gray-600)] mt-0.5">{item.details || item.description}</p>
              </div>
            ))}
          </div>
          {timelineItems.length > 3 && (
            <Button variant="neutral" size="sm" onClick={() => setShowFullTimeline(!showFullTimeline)} className="mt-4 w-full text-base font-semibold">
              {showFullTimeline ? "Collapse Timeline" : "View Full Timeline"}
            </Button>
          )}
        </div>
      </div>

      {/* 4. Tabbed Panel (Notes & Charts) */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] space-y-4">
        <div className="flex border-b border-[var(--border-default)] pb-3 gap-3 overflow-x-auto">
          {[
            { id: "doctor", label: "Doctor Notes" },
            { id: "caregiver", label: "Caregiver Notes" },
            { id: "guardian", label: "Guardian Notes" },
            { id: "charts", label: "Clinical Charts" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-base font-semibold rounded-xl transition ${
                activeTab === tab.id
                  ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                  : "text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "doctor" && (
            <div className="p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--border-default)]">
              <h5 className="text-base font-bold text-[var(--color-gray-900)] mb-1">Clinical Doctor Instructions</h5>
              <p className="text-base leading-relaxed text-[var(--color-gray-600)]">{resident.doctorNotes || "No active notes from primary physician."}</p>
            </div>
          )}

          {activeTab === "caregiver" && (
            <div className="space-y-3">
              {(resident.careNotes || []).slice(0, 5).map((item, idx) => (
                <div key={idx} className="p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--border-default)] text-base leading-relaxed text-[var(--color-gray-600)]">
                  <span className="font-bold text-[var(--color-brand-600)] block mb-1">{item.type || "Daily update"}</span>
                  <p className="text-[var(--color-gray-600)]">{item.note}</p>
                </div>
              ))}
              {!(resident.careNotes || []).length && (
                <p className="text-base text-[var(--color-gray-500)] p-4 text-center">No caregiver notes recorded yet.</p>
              )}
            </div>
          )}

          {activeTab === "guardian" && (
            <div className="p-4 bg-[var(--color-gray-50)] rounded-xl border border-[var(--border-default)]">
              <h5 className="text-base font-bold text-[var(--color-gray-900)] mb-1">Guardian Communications</h5>
              <p className="text-base leading-relaxed text-[var(--color-gray-600)]">
                Contact: {resident.emergencyContact?.name} ({resident.emergencyContact?.relationship}) - {resident.emergencyContact?.phone}
              </p>
            </div>
          )}

          {activeTab === "charts" && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <TrendStrip label="Weekly BP" values={history.map((item) => item.bloodPressure?.systolic || vitals.bloodPressure?.systolic)} />
              <TrendStrip label="Weekly Sugar" values={history.map((item) => item.bloodSugar || vitals.bloodSugar)} />
              <TrendStrip label="Weekly SPO2" values={history.map((item) => item.spo2 || vitals.spo2)} suffix="%" />
              <TrendStrip label="Pulse" values={history.map((item) => item.pulse || vitals.pulse)} />
              <TrendStrip label="Temperature" values={history.map((item) => item.temperature || vitals.temperature)} />
              <TrendStrip label="Weight" values={[resident.weightKg - 1, resident.weightKg - 0.6, resident.weightKg - 0.3, resident.weightKg]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResidentHealthReport({ residents, activityHistory }) {
  return (
    <div className="space-y-8">
      {residents.map((resident) => (
        <div key={resident.id} className="border-b border-[var(--border-default)] pb-8 last:border-b-0 space-y-3">
          <div>
            <h3 className="text-xl font-extrabold text-[var(--color-gray-900)]">{resident.residentId} - {resident.name}</h3>
            <p className="text-xs font-semibold text-[var(--color-gray-500)]">Comprehensive Health & Wellness Diagnostic Sheet</p>
          </div>
          <ResidentReportDashboard resident={resident} activityHistory={activityHistory} />
        </div>
      ))}
    </div>
  );
}


function CaregiverActivityReport({ residents, caregivers, activityHistory }) {
  return (
    <div className="space-y-4">
      {caregivers.map((caregiver) => {
        const assigned = residents.filter((resident) => (caregiver.assignedResidentIds || []).includes(resident.residentId));
        const completedTasks = assigned.reduce((sum, resident) => sum + ["medication", "nutrition", "hygiene", "mobility"].filter((field) => resident[field] === "COMPLETED").length, 0);
        const totalTasks = Math.max(1, assigned.length * 4);
        return (
          <ReportSection key={caregiver.id} title={caregiver.name}>
            <div className="grid gap-4 lg:grid-cols-3">
              <InfoBlock title="Assigned Residents" items={assigned.map((resident) => `${resident.residentId} ${resident.name}`)} />
              <InfoBlock title="Shift Notes" items={[`Attendance: ${caregiver.attendance || "Present"}`, `Vitals updated: ${assigned.length}`, `Pending work: ${totalTasks - completedTasks}`, `Shift: ${caregiver.shiftType || "Day"}`]} />
              <div className="space-y-3">
                <ProgressLine label="Tasks Completed" value={Math.round((completedTasks / totalTasks) * 100)} tone="success" />
                <ProgressLine label="Medication Compliance" value={Math.round((assigned.filter((resident) => resident.medication === "COMPLETED").length / Math.max(1, assigned.length)) * 100)} tone="primary" />
                <ProgressLine label="Weekly Performance" value={caregiver.caregiverPerformance || 90} tone="success" />
              </div>
            </div>
          </ReportSection>
        );
      })}
      <ReportSection title="Caregiver Activity Timeline">
        <InfoBlock title="Recent Updates" items={activityHistory.slice(0, 10).map((item) => `${item.action}: ${item.details}`)} />
      </ReportSection>
    </div>
  );
}

function GuardianReport({ residents, guardians }) {
  return (
    <div className="space-y-4">
      {guardians.map((guardian) => {
        const assigned = residents.filter((resident) => (guardian.residentIds || []).includes(resident.residentId) || resident.guardianId === guardian.id);
        return (
          <ReportSection key={guardian.id} title={`${guardian.name} - ${guardian.relationship}`}>
            <div className="grid gap-4 lg:grid-cols-3">
              <InfoBlock title="Residents" items={assigned.map((resident) => `${resident.residentId} ${resident.name}`)} />
              <InfoBlock title="Latest Vitals" items={assigned.map((resident) => `${resident.name}: BP ${resident.baselineVitals?.bloodPressure?.systolic}/${resident.baselineVitals?.bloodPressure?.diastolic}, SpO2 ${resident.baselineVitals?.spo2}%, Sugar ${resident.baselineVitals?.bloodSugar}`)} />
              <InfoBlock title="Recent Updates" items={assigned.flatMap((resident) => (resident.timeline || []).slice(0, 2).map((item) => `${resident.name}: ${item.title}`))} />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <InfoBlock title="Doctor Notes" items={assigned.map((resident) => `${resident.name}: ${resident.doctorNotes}`)} />
              <InfoBlock title="Appointments" items={assigned.flatMap((resident) => (resident.appointments || []).slice(0, 2).map((item) => `${resident.name}: ${item.date} ${item.title}`))} />
              <div className="space-y-3">
                {assigned.map((resident) => <ProgressLine key={resident.id} label={`${resident.name} Wellness`} value={resident.wellnessScore || 80} tone="success" />)}
              </div>
            </div>
          </ReportSection>
        );
      })}
    </div>
  );
}

function FacilityReport({ residents, caregivers, guardians, activityHistory }) {
  const pendingTasks = residents.reduce((total, resident) => total + ["medication", "nutrition", "hygiene", "mobility"].filter((field) => resident[field] !== "COMPLETED").length, 0);
  const healthScore = residents.length ? Math.round(residents.reduce((sum, resident) => sum + (resident.wellnessScore || 80), 0) / residents.length) : 0;
  const medicationCompliance = Math.round((residents.filter((resident) => resident.medication === "COMPLETED").length / Math.max(1, residents.length)) * 100);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Residents" value={residents.length} icon={<LuUsers />} />
        <MetricCard label="Caregivers" value={caregivers.length} icon={<LuUserCheck />} tone="indigo" />
        <MetricCard label="Guardians" value={guardians.length} icon={<LuShieldCheck />} tone="success" />
        <MetricCard label="Alerts" value={residents.filter((resident) => resident.emergencyFlag).length} icon={<LuBell />} tone="danger" />
      </div>
      <ReportSection title="Facility Performance">
        <div className="grid gap-4 lg:grid-cols-4">
          <ProgressLine label="Occupancy" value={Math.min(100, Math.round((residents.length / 10) * 100))} />
          <ProgressLine label="Health Score" value={healthScore} tone="success" />
          <ProgressLine label="Medication Compliance" value={medicationCompliance} tone={medicationCompliance > 85 ? "success" : "warning"} />
          <ProgressLine label="Pending Tasks" value={Math.max(0, 100 - pendingTasks * 5)} tone={pendingTasks ? "warning" : "success"} />
        </div>
      </ReportSection>
      <ReportSection title="Admissions, Alerts & Activity Timeline">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b border-[var(--border-default)] text-xs uppercase text-[var(--color-gray-600)]"><th className="py-3">Resident</th><th>Caregiver</th><th>Guardian</th><th>Status</th><th>Risk</th></tr></thead>
            <tbody className="divide-y divide-[var(--color-gray-100)]">
              {residents.map((resident) => (
                <tr key={resident.id}><td className="py-3 font-bold">{resident.name}</td><td>{resident.caregiverName}</td><td>{resident.guardianName}</td><td><Badge variant={resident.emergencyFlag ? "danger" : "success"}>{resident.emergencyFlag ? "Alert" : "Stable"}</Badge></td><td>{resident.fallRisk}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <InfoBlock title="Activity Timeline" items={activityHistory.slice(0, 10).map((item) => `${item.action}: ${item.details}`)} />
      </ReportSection>
    </div>
  );
}

export function SettingsWorkspace() {
  const { currentUser, networkMode, setNetworkMode, systemSettings, resetResidents, triggerQueueSync } = useDashboard();
  if (currentUser?.institutionId === "facility-beta") return <EmptyBetaGrid />;
  const settings = systemSettings?.[currentUser?.institutionId] || {};
  return (
    <div className="space-y-6">
      <PageHero eyebrow="Settings" title="System Settings" description="Administrator configuration for institution profile, notifications, reporting, sync mode, and data reset." icon={<LuSettings />} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card><SectionHeader title="Institution Profile" /><InfoBlock title={settings.institution?.name} items={[settings.institution?.address, settings.institution?.phone, settings.institution?.email]} /></Card>
        <Card>
          <SectionHeader title="System Controls" />
          <div className="flex flex-wrap gap-2">
            <Button variant={networkMode === "online" ? "primary" : "neutral"} onClick={() => setNetworkMode("online")}>Online</Button>
            <Button variant={networkMode === "offline" ? "primary" : "neutral"} onClick={() => setNetworkMode("offline")}>Offline</Button>
            <Button variant="outline" onClick={triggerQueueSync}>Sync Queue</Button>
            <Button variant="danger" onClick={resetResidents}>Restore Source Dataset</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function ResidentsWorkspace() {
  const { residents, currentUser } = useDashboard();
  if (currentUser?.institutionId === "facility-beta") return <EmptyBetaGrid />;
  return (
    <div className="space-y-6">
      <PageHero eyebrow="Resident Management" title={currentUser?.role === "guardian" ? "Family Member Records" : "Resident Registry"} description="Healthcare EHR, vitals, care notes, incident reports, observations, appointments and risk assessment." icon={<LuUsers />} />
      <div className="grid gap-4">
        {residents.map((resident) => <ResidentClinicalCard key={resident.id} resident={resident} />)}
      </div>
      {!residents.length && <EmptyState icon={<LuUsers />} title="No Records Available" description="No resident records are available for this role." />}
    </div>
  );
}

export function WorkspaceHomeLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/login"><Button>Open Workspace</Button></Link>
      <Link href="/reports"><Button variant="outline">View Reports</Button></Link>
    </div>
  );
}
