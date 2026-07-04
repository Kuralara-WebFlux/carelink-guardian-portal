"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  CAREGIVERS,
  FACILITY_ALPHA,
  FACILITY_BETA,
  GUARDIANS,
  INITIAL_ACTIVITY,
  INITIAL_NOTIFICATIONS,
  RESIDENTS,
  SYSTEM_SETTINGS,
} from "../data/carelinkData";
import { normalizeAuthUser } from "../utils/auth";

const DashboardContext = createContext(null);

const STORAGE_KEY = "carelink_sprint_4_17_state";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function initialState() {
  return {
    residents: clone(RESIDENTS),
    caregivers: clone(CAREGIVERS),
    guardians: clone(GUARDIANS),
    notifications: clone(INITIAL_NOTIFICATIONS).map(normalizeNotification),
    activityHistory: clone(INITIAL_ACTIVITY),
    caregiverActivityHistory: [],
    welfareSyncEvents: [],
    alerts: [],
    systemSettings: clone(SYSTEM_SETTINGS),
  };
}

function nowIso() {
  return new Date().toISOString();
}

function priorityFrom(value) {
  if (value === "CRITICAL" || value === "HIGH") return "HIGH";
  if (value === "WARNING" || value === "MEDIUM") return "MEDIUM";
  return "LOW";
}

function normalizeNotification(notification) {
  const priority = notification.priority || priorityFrom(notification.severity);
  const timestamp = notification.timestamp || notification.createdAt || nowIso();
  const description = notification.description || notification.message || "";
  const resident = notification.resident || notification.residentName || "Facility";
  const status = notification.status || (notification.read ? "READ" : "UNREAD");

  return {
    ...notification,
    title: notification.title || "CareLink notification",
    description,
    message: description,
    timestamp,
    createdAt: timestamp,
    priority,
    severity: notification.severity || (priority === "HIGH" ? "CRITICAL" : priority === "MEDIUM" ? "WARNING" : "INFO"),
    resident,
    residentName: notification.residentName || resident,
    generatedBy: notification.generatedBy || "CareLink System",
    status,
    read: status === "READ",
  };
}

function readStoredState() {
  if (typeof window === "undefined") return initialState();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState();
    const parsed = JSON.parse(stored);
    return {
      ...initialState(),
      ...parsed,
      residents: Array.isArray(parsed.residents) ? parsed.residents : clone(RESIDENTS),
      caregivers: Array.isArray(parsed.caregivers) ? parsed.caregivers : clone(CAREGIVERS),
      guardians: Array.isArray(parsed.guardians) ? parsed.guardians : clone(GUARDIANS),
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications.map(normalizeNotification) : clone(INITIAL_NOTIFICATIONS).map(normalizeNotification),
      activityHistory: Array.isArray(parsed.activityHistory) ? parsed.activityHistory : clone(INITIAL_ACTIVITY),
      caregiverActivityHistory: Array.isArray(parsed.caregiverActivityHistory) ? parsed.caregiverActivityHistory : [],
      welfareSyncEvents: Array.isArray(parsed.welfareSyncEvents) ? parsed.welfareSyncEvents : [],
      alerts: Array.isArray(parsed.alerts) ? parsed.alerts : [],
    };
  } catch {
    return initialState();
  }
}

function visibleResidentsFor(user, residents, caregivers) {
  if (!user) return [];
  if (user.institutionId === FACILITY_BETA) return [];
  if (user.role === "admin") return residents.filter((resident) => resident.institutionId === FACILITY_ALPHA && !resident.archived);
  if (user.role === "guardian") {
    return residents.filter((resident) => resident.guardianId === user.guardianId && !resident.archived);
  }
  if (user.role === "caregiver") {
    const caregiver = caregivers.find((item) => item.id === user.caregiverId || item.caregiverId === user.caregiverId);
    const assigned = caregiver?.assignedResidentIds || [];
    return residents.filter((resident) => assigned.includes(resident.residentId) && !resident.archived);
  }
  return [];
}

function visibleCaregiversFor(user, caregivers, residents = []) {
  if (!user || user.institutionId === FACILITY_BETA) return [];
  if (user.role === "admin") return caregivers;
  if (user.role === "caregiver") return caregivers.filter((caregiver) => caregiver.id === user.caregiverId);
  if (user.role === "guardian") {
    const assignedCaregiverIds = new Set(
      residents
        .filter((resident) => resident.guardianId === user.guardianId && !resident.archived)
        .map((resident) => resident.assignedCaregiverId)
    );
    return caregivers.filter((caregiver) => assignedCaregiverIds.has(caregiver.id));
  }
  return [];
}

function visibleGuardiansFor(user, guardians) {
  if (!user || user.institutionId === FACILITY_BETA) return [];
  if (user.role === "admin") return guardians;
  if (user.role === "guardian") return guardians.filter((guardian) => guardian.id === user.guardianId);
  return [];
}

function scopeNotifications(user, notifications, residents, caregivers) {
  if (!user || user.institutionId === FACILITY_BETA) return [];
  if (user.role === "admin") return notifications.filter((item) => item.institutionId === FACILITY_ALPHA);
  const visibleIds = visibleResidentsFor(user, residents, caregivers).map((resident) => resident.id);
  return notifications.filter((item) => !item.residentId || visibleIds.includes(Number(item.residentId)));
}

function nextResidentId(residents) {
  const max = residents.reduce((result, resident) => Math.max(result, Number(String(resident.residentId).replace("RES", "")) || 0), 0);
  return `RES${String(max + 1).padStart(3, "0")}`;
}

export function DashboardProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentUser, setCurrentUserState] = useState(null);
  const [data, setData] = useState(initialState);
  const [networkMode, setNetworkMode] = useState("online");
  const [simulateApiFailure, setSimulateApiFailure] = useState(false);
  const [syncQueueStatus, setSyncQueueStatus] = useState("idle");
  const [syncQueueError, setSyncQueueError] = useState("");
  const [lastSyncedTimestamp, setLastSyncedTimestamp] = useState("");
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    queueMicrotask(() => {
      setData(readStoredState());
      const storedUser = localStorage.getItem("carelinkUser");
      if (storedUser) {
        try {
          setCurrentUserState(normalizeAuthUser(JSON.parse(storedUser)));
        } catch {
          localStorage.removeItem("carelinkUser");
        }
      }
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, isHydrated]);

  const setCurrentUser = useCallback((user) => {
    setCurrentUserState(user);
    if (typeof window !== "undefined") {
      if (user) localStorage.setItem("carelinkUser", JSON.stringify(user));
      else localStorage.removeItem("carelinkUser");
    }
  }, []);

  const showToast = useCallback((message, type = "success") => {
    const toast = { id: `toast-${Date.now()}`, message, type };
    setToasts((items) => [toast, ...items].slice(0, 4));
  }, []);

  const pushNotification = useCallback((payload) => {
    const residentLabel = payload.resident || payload.residentName || "Facility";
    const priority = payload.priority || priorityFrom(payload.severity);
    const timestamp = nowIso();
    const notification = normalizeNotification({
      id: `n-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: payload.title,
      description: payload.description || payload.message,
      severity: payload.severity || "INFO",
      priority,
      status: "UNREAD",
      read: false,
      category: payload.category || "system",
      residentId: payload.residentId,
      resident: residentLabel,
      residentName: residentLabel,
      generatedBy: payload.generatedBy || currentUser?.name || "CareLink System",
      timestamp,
      createdAt: timestamp,
      institutionId: FACILITY_ALPHA,
    });
    setData((state) => ({ ...state, notifications: [notification, ...state.notifications] }));
    return notification;
  }, [currentUser]);

  const logActivity = useCallback((action, details, extra = {}) => {
    const entry = { id: `a-${Date.now()}-${Math.random().toString(16).slice(2)}`, timestamp: nowIso(), action, details, institutionId: FACILITY_ALPHA, ...extra };
    setData((state) => ({ ...state, activityHistory: [entry, ...state.activityHistory] }));
    return entry;
  }, []);

  const updateResident = useCallback((resident) => {
    setData((state) => ({
      ...state,
      residents: state.residents.map((item) => item.id === resident.id || item.residentId === resident.residentId ? { ...item, ...resident } : item),
    }));
    pushNotification({ title: "Resident edited", description: `${resident.name} record was updated.`, residentId: resident.id, residentName: resident.name, category: "resident", priority: "MEDIUM" });
    logActivity("Resident updated", `${resident.name} record updated.`);
  }, [logActivity, pushNotification]);

  const addResident = useCallback((resident = {}) => {
    const residentId = resident.residentId || nextResidentId(data.residents);
    const caregiver = data.caregivers.find((item) => item.id === resident.assignedCaregiverId) || data.caregivers[0];
    const guardian = data.guardians.find((item) => item.id === resident.guardianId) || data.guardians[0];
    const record = {
      ...clone(RESIDENTS[0]),
      ...resident,
      id: Math.max(0, ...data.residents.map((item) => Number(item.id) || 0)) + 1,
      residentId,
      name: resident.name || "New Resident",
      age: Number(resident.age) || 70,
      room: resident.room || "New Room",
      institutionId: FACILITY_ALPHA,
      assignedCaregiverId: caregiver?.id,
      caregiverId: caregiver?.id,
      caregiverName: caregiver?.name,
      guardianId: guardian?.id,
      guardianName: guardian?.name,
      guardianRelationship: guardian?.relationship,
      guardianEmail: guardian?.email,
      emergencyContact: { name: guardian?.name, relationship: guardian?.relationship, phone: guardian?.phone },
      archived: false,
    };
    setData((state) => ({ ...state, residents: [record, ...state.residents] }));
    pushNotification({ title: "Resident added", description: `${record.name} was admitted to the resident registry.`, residentId: record.id, residentName: record.name, category: "resident", priority: "MEDIUM" });
    logActivity("Resident admitted", `${record.name} added to registry.`);
    return record;
  }, [data.caregivers, data.guardians, data.residents, logActivity, pushNotification]);

  const archiveResident = useCallback((residentId) => {
    const target = data.residents.find((item) => item.id === residentId || item.residentId === residentId);
    if (!target) return;
    setData((state) => ({ ...state, residents: state.residents.map((item) => item.id === target.id ? { ...item, archived: true, archivedAt: nowIso() } : item) }));
    pushNotification({ title: "Resident archived", description: `${target.name} was archived.`, residentId: target.id, residentName: target.name, category: "resident", priority: "HIGH" });
    logActivity("Resident archived", `${target.name} archived.`);
  }, [data.residents, logActivity, pushNotification]);

  const deleteResident = useCallback((residentId) => {
    const target = data.residents.find((item) => item.id === residentId || item.residentId === residentId);
    setData((state) => ({ ...state, residents: state.residents.filter((item) => item.id !== residentId && item.residentId !== residentId) }));
    if (target) {
      pushNotification({ title: "Resident deleted", description: `${target.name} was deleted from the registry.`, resident: target.name, category: "resident", priority: "HIGH" });
      logActivity("Resident deleted", `${target.name} deleted.`);
    }
  }, [data.residents, logActivity, pushNotification]);

  const updateResidentStatus = useCallback((residentId, field, status) => {
    const allowed = ["medication", "nutrition", "hygiene", "mobility", "sleep", "hydration", "painScale", "mood"];
    if (!allowed.includes(field)) return;
    let target;
    setData((state) => ({
      ...state,
      residents: state.residents.map((resident) => {
        if (resident.id !== residentId && resident.residentId !== residentId) return resident;
        target = resident;
        const note = { id: `note-${Date.now()}`, date: nowIso(), author: currentUser?.name || "Caregiver", note: `${field} updated to ${status}.` };
        return {
          ...resident,
          [field]: status,
          dailyLogs: [{ id: `log-${Date.now()}`, timestamp: nowIso(), field, status, caregiverId: currentUser?.caregiverId }, ...(resident.dailyLogs || [])],
          careNotes: [note, ...(resident.careNotes || [])],
          timeline: [{ id: `tl-${Date.now()}`, date: nowIso(), title: `${field} updated`, details: `${field} set to ${status}` }, ...(resident.timeline || [])],
        };
      }),
      caregiverActivityHistory: [{ id: `ca-${Date.now()}`, timestamp: nowIso(), caregiverId: currentUser?.caregiverId, caregiverName: currentUser?.name, actionType: "TASK_COMPLETED", details: `${field} updated to ${status}` }, ...state.caregiverActivityHistory],
    }));
    if (target) {
      pushNotification({ title: field === "medication" && status === "COMPLETED" ? "Medication completed" : `${field} updated`, description: `${target.name}: ${field} updated to ${status}.`, residentId: target.id, residentName: target.name, category: field === "medication" ? "medication" : "care", priority: field === "medication" ? "MEDIUM" : "LOW" });
      logActivity("Care task updated", `${target.name}: ${field} updated to ${status}.`);
    }
  }, [currentUser, logActivity, pushNotification]);

  const recordVitals = useCallback((residentId, vitals = {}) => {
    let target;
    setData((state) => ({
      ...state,
      residents: state.residents.map((resident) => {
        if (resident.id !== residentId && resident.residentId !== residentId) return resident;
        target = resident;
        const entry = {
          id: `vh-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          timestamp: nowIso(),
          bloodPressure: vitals.bloodPressure || resident.baselineVitals?.bloodPressure,
          bloodSugar: Number(vitals.bloodSugar ?? resident.baselineVitals?.bloodSugar ?? 110),
          spo2: Number(vitals.spo2 ?? resident.baselineVitals?.spo2 ?? 98),
          pulse: Number(vitals.pulse ?? resident.baselineVitals?.pulse ?? 72),
          respiration: Number(vitals.respiration ?? resident.baselineVitals?.respiration ?? 16),
          temperature: Number(vitals.temperature ?? resident.baselineVitals?.temperature ?? 98.4),
        };
        return {
          ...resident,
          baselineVitals: entry,
          vitalsHistory: [entry, ...(resident.vitalsHistory || [])].slice(0, 30),
          pulse: entry.pulse,
          respiration: entry.respiration,
          temperature: entry.temperature,
          timeline: [{ id: `tl-${Date.now()}`, date: entry.timestamp, title: "Vitals updated", details: `BP ${entry.bloodPressure?.systolic}/${entry.bloodPressure?.diastolic}, SpO2 ${entry.spo2}%, Sugar ${entry.bloodSugar}` }, ...(resident.timeline || [])],
        };
      }),
    }));
    if (target) {
      [
        [vitals.bloodPressure, "BP updated", "Blood pressure"],
        [vitals.bloodSugar !== undefined, "Sugar updated", "Blood sugar"],
        [vitals.spo2 !== undefined, "SPO2 updated", "SPO2"],
        [vitals.pulse !== undefined, "Pulse updated", "Pulse"],
        [vitals.temperature !== undefined, "Temperature updated", "Temperature"],
      ].filter(([changed]) => changed).forEach(([, title, label]) => {
        pushNotification({ title, description: `${target.name}: ${label} values were updated.`, residentId: target.id, residentName: target.name, category: "vitals", priority: "MEDIUM" });
      });
      logActivity("Vitals updated", `${target.name} vitals updated.`);
    }
  }, [logActivity, pushNotification]);

  const addCareNote = useCallback((residentId, note, type = "Daily Note") => {
    let target;
    setData((state) => ({
      ...state,
      residents: state.residents.map((resident) => {
        if (resident.id !== residentId && resident.residentId !== residentId) return resident;
        target = resident;
        const entry = { id: `note-${Date.now()}`, date: nowIso(), author: currentUser?.name || "Care Team", type, note };
        return {
          ...resident,
          careNotes: [entry, ...(resident.careNotes || [])],
          incidentReports: type === "Incident Note" ? [entry, ...(resident.incidentReports || [])] : resident.incidentReports,
          observations: type === "Observation" ? [entry, ...(resident.observations || [])] : resident.observations,
          timeline: [{ id: `tl-${Date.now()}`, date: entry.date, title: type, details: note }, ...(resident.timeline || [])],
        };
      }),
    }));
    if (target) {
      pushNotification({ title: type === "Daily Note" ? "Daily notes submitted" : type, description: `${target.name}: ${note}`, residentId: target.id, residentName: target.name, category: "care", priority: type === "Incident Note" ? "HIGH" : "LOW" });
      logActivity(type, `${target.name}: ${note}`);
    }
  }, [currentUser, logActivity, pushNotification]);

  const addCaregiver = useCallback((caregiver) => {
    const record = { ...caregiver, id: caregiver.id || `c-${Date.now()}`, caregiverId: caregiver.caregiverId || caregiver.id || `c-${Date.now()}`, assignedResidentIds: caregiver.assignedResidentIds || [], status: "Active" };
    setData((state) => ({ ...state, caregivers: [record, ...state.caregivers] }));
    pushNotification({ title: "Caregiver added", description: `${record.name} was added to the caregiver registry.`, category: "assignment", priority: "MEDIUM" });
    logActivity("Caregiver added", `${record.name} added.`);
  }, [logActivity, pushNotification]);

  const updateCaregiver = useCallback((caregiver) => {
    setData((state) => ({ ...state, caregivers: state.caregivers.map((item) => item.id === caregiver.id ? { ...item, ...caregiver } : item) }));
    pushNotification({ title: "Caregiver edited", description: `${caregiver.name} caregiver record updated.`, category: "assignment", priority: "MEDIUM" });
    logActivity("Caregiver updated", `${caregiver.name} updated.`);
  }, [logActivity, pushNotification]);

  const deleteCaregiver = useCallback((caregiverId) => {
    const target = data.caregivers.find((item) => item.id === caregiverId);
    setData((state) => ({
      ...state,
      caregivers: state.caregivers.filter((item) => item.id !== caregiverId),
      residents: state.residents.map((resident) => resident.assignedCaregiverId === caregiverId ? { ...resident, assignedCaregiverId: "", caregiverId: "", caregiverName: "Unassigned" } : resident),
    }));
    if (target) {
      pushNotification({ title: "Caregiver removed", description: `${target.name} was removed from the caregiver registry.`, category: "assignment", priority: "HIGH" });
      logActivity("Caregiver deleted", `${target.name} deleted.`);
    }
  }, [data.caregivers, logActivity, pushNotification]);

  const addGuardian = useCallback((guardian) => {
    const record = { ...guardian, id: guardian.id || `g-${Date.now()}`, guardianId: guardian.guardianId || guardian.id || `g-${Date.now()}`, residentIds: guardian.residentIds || [] };
    setData((state) => ({ ...state, guardians: [record, ...state.guardians] }));
    pushNotification({ title: "Guardian added", description: `${record.name} was added to the guardian registry.`, category: "assignment", priority: "MEDIUM" });
    logActivity("Guardian added", `${record.name} added.`);
  }, [logActivity, pushNotification]);

  const updateGuardian = useCallback((guardian) => {
    setData((state) => ({ ...state, guardians: state.guardians.map((item) => item.id === guardian.id ? { ...item, ...guardian } : item) }));
    pushNotification({ title: "Guardian edited", description: `${guardian.name} guardian record updated.`, category: "assignment", priority: "MEDIUM" });
    logActivity("Guardian updated", `${guardian.name} updated.`);
  }, [logActivity, pushNotification]);

  const deleteGuardian = useCallback((guardianId) => {
    const target = data.guardians.find((item) => item.id === guardianId);
    setData((state) => ({
      ...state,
      guardians: state.guardians.filter((item) => item.id !== guardianId),
      residents: state.residents.map((resident) => resident.guardianId === guardianId ? { ...resident, guardianId: "", guardianName: "Unassigned", guardianRelationship: "", guardianEmail: "", emergencyContact: { name: "Unassigned", relationship: "", phone: "" } } : resident),
    }));
    if (target) {
      pushNotification({ title: "Guardian removed", description: `${target.name} was removed from the guardian registry.`, category: "assignment", priority: "HIGH" });
      logActivity("Guardian deleted", `${target.name} deleted.`);
    }
  }, [data.guardians, logActivity, pushNotification]);

  const assignGuardian = useCallback((residentId, guardianId) => {
    const guardian = data.guardians.find((item) => item.id === guardianId);
    const resident = data.residents.find((item) => item.residentId === residentId || item.id === residentId);
    if (!guardian || !resident) return;
    updateResident({ ...resident, guardianId: guardian.id, guardianName: guardian.name, guardianRelationship: guardian.relationship, guardianEmail: guardian.email, emergencyContact: { name: guardian.name, relationship: guardian.relationship, phone: guardian.phone } });
    setData((state) => ({
      ...state,
      guardians: state.guardians.map((item) => {
        const withoutResident = (item.residentIds || []).filter((id) => id !== resident.residentId);
        return item.id === guardian.id ? { ...item, residentIds: Array.from(new Set([...withoutResident, resident.residentId])) } : { ...item, residentIds: withoutResident };
      }),
    }));
    pushNotification({ title: "Guardian assigned", description: `${guardian.name} assigned to ${resident.name}.`, residentId: resident.id, residentName: resident.name, category: "assignment", priority: "MEDIUM" });
  }, [data.guardians, data.residents, pushNotification, updateResident]);

  const assignCaregiver = useCallback((residentId, caregiverId) => {
    const caregiver = data.caregivers.find((item) => item.id === caregiverId);
    const resident = data.residents.find((item) => item.residentId === residentId || item.id === residentId);
    if (!caregiver || !resident) return;
    updateResident({ ...resident, assignedCaregiverId: caregiver.id, caregiverId: caregiver.id, caregiverName: caregiver.name });
    setData((state) => ({
      ...state,
      caregivers: state.caregivers.map((item) => {
        const withoutResident = (item.assignedResidentIds || []).filter((id) => id !== resident.residentId);
        return item.id === caregiver.id ? { ...item, assignedResidentIds: Array.from(new Set([...withoutResident, resident.residentId])) } : { ...item, assignedResidentIds: withoutResident };
      }),
    }));
    pushNotification({ title: "Caregiver assigned", description: `${caregiver.name} assigned to ${resident.name}.`, residentId: resident.id, residentName: resident.name, category: "assignment", priority: "MEDIUM" });
  }, [data.caregivers, data.residents, pushNotification, updateResident]);

  const addAppointment = useCallback((residentId, appointment) => {
    let target;
    setData((state) => ({
      ...state,
      residents: state.residents.map((resident) => {
        if (resident.id !== residentId && resident.residentId !== residentId) return resident;
        target = resident;
        const entry = { id: `appt-${Date.now()}`, status: "Scheduled", ...appointment };
        return {
          ...resident,
          appointments: [entry, ...(resident.appointments || [])],
          nextDoctorAppointment: `${entry.date} ${entry.title}`,
          timeline: [{ id: `tl-${Date.now()}`, date: nowIso(), title: "Appointment added", details: `${entry.title} on ${entry.date}` }, ...(resident.timeline || [])],
        };
      }),
    }));
    if (target) {
      pushNotification({ title: "Appointment added", description: `${appointment.title} added for ${target.name}.`, residentId: target.id, residentName: target.name, category: "appointment", priority: "MEDIUM" });
      logActivity("Appointment added", `${appointment.title} added for ${target.name}.`);
    }
  }, [logActivity, pushNotification]);

  const raiseEmergencyFlag = useCallback((residentId, note = "Emergency flag raised") => {
    let target;
    setData((state) => ({
      ...state,
      residents: state.residents.map((resident) => {
        if (resident.id !== residentId && resident.residentId !== residentId) return resident;
        target = resident;
        const entry = { id: `inc-${Date.now()}`, date: nowIso(), note, severity: "CRITICAL", author: currentUser?.name || "Care Team" };
        return {
          ...resident,
          emergencyFlag: true,
          incidentReports: [entry, ...(resident.incidentReports || [])],
          timeline: [{ id: `tl-${Date.now()}`, date: entry.date, title: "Emergency flag raised", details: note }, ...(resident.timeline || [])],
        };
      }),
    }));
    if (target) {
      pushNotification({ title: "Emergency flag raised", description: `${target.name}: ${note}`, residentId: target.id, residentName: target.name, category: "emergency", priority: "HIGH", severity: "CRITICAL" });
      logActivity("Emergency flag raised", `${target.name}: ${note}`);
    }
  }, [currentUser, logActivity, pushNotification]);

  const markNotificationRead = useCallback((id) => {
    setData((state) => ({ ...state, notifications: state.notifications.map((item) => item.id === id ? { ...item, status: "READ", read: true, acknowledgedAt: nowIso(), acknowledgedBy: currentUser?.name } : item) }));
  }, [currentUser]);

  const markNotificationUnread = useCallback((id) => {
    setData((state) => ({ ...state, notifications: state.notifications.map((item) => item.id === id ? { ...item, status: "UNREAD", read: false } : item) }));
  }, []);

  const archiveNotification = useCallback((id) => {
    setData((state) => ({ ...state, notifications: state.notifications.map((item) => item.id === id ? { ...item, status: "ARCHIVED" } : item) }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setData((state) => ({ ...state, notifications: state.notifications.map((item) => ({ ...item, status: item.status === "ARCHIVED" ? item.status : "READ", read: item.status === "ARCHIVED" ? item.read : true })) }));
  }, []);

  const archiveAllReadNotifications = useCallback(() => {
    setData((state) => ({ ...state, notifications: state.notifications.map((item) => item.status === "READ" ? { ...item, status: "ARCHIVED" } : item) }));
  }, []);

  const clearNotifications = useCallback(() => {
    setData((state) => ({ ...state, notifications: [] }));
  }, []);

  const resetResidents = useCallback(() => {
    setData(initialState());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const triggerQueueSync = useCallback(() => {
    if (networkMode === "offline") {
      setSyncQueueStatus("failed");
      setSyncQueueError("Network is offline.");
      return;
    }
    if (simulateApiFailure) {
      setSyncQueueStatus("failed");
      setSyncQueueError("Simulated API failure.");
      return;
    }
    setSyncQueueStatus("synced");
    setSyncQueueError("");
    setLastSyncedTimestamp(nowIso());
    setData((state) => ({ ...state, welfareSyncEvents: state.welfareSyncEvents.map((item) => ({ ...item, syncState: "SYNCED" })) }));
  }, [networkMode, simulateApiFailure]);

  const residents = useMemo(() => visibleResidentsFor(currentUser, data.residents, data.caregivers), [currentUser, data.residents, data.caregivers]);
  const caregivers = useMemo(() => visibleCaregiversFor(currentUser, data.caregivers, data.residents), [currentUser, data.caregivers, data.residents]);
  const guardians = useMemo(() => visibleGuardiansFor(currentUser, data.guardians), [currentUser, data.guardians]);
  const notifications = useMemo(() => scopeNotifications(currentUser, data.notifications, data.residents, data.caregivers), [currentUser, data.notifications, data.residents, data.caregivers]);

  const value = {
    isHydrated,
    currentUser,
    setCurrentUser,
    residents,
    caregivers,
    guardians,
    notifications,
    activityHistory: data.activityHistory,
    caregiverActivityHistory: data.caregiverActivityHistory,
    welfareSyncEvents: data.welfareSyncEvents,
    alerts: data.alerts,
    systemSettings: data.systemSettings,
    rawResidents: data.residents,
    rawCaregivers: data.caregivers,
    rawGuardians: data.guardians,
    rawNotifications: data.notifications,
    rawActivityHistory: data.activityHistory,
    rawCaregiverActivityHistory: data.caregiverActivityHistory,
    rawWelfareSyncEvents: data.welfareSyncEvents,
    networkMode,
    setNetworkMode,
    simulateApiFailure,
    setSimulateApiFailure,
    syncQueueStatus,
    syncQueueError,
    lastSyncedTimestamp,
    triggerQueueSync,
    toasts,
    showToast,
    addResident,
    updateResident,
    archiveResident,
    deleteResident,
    addCaregiver,
    updateCaregiver,
    deleteCaregiver,
    addGuardian,
    updateGuardian,
    deleteGuardian,
    assignGuardian,
    assignCaregiver,
    addAppointment,
    raiseEmergencyFlag,
    updateResidentStatus,
    recordVitals,
    addCareNote,
    pushNotification,
    markNotificationRead,
    markNotificationUnread,
    archiveNotification,
    markAllNotificationsRead,
    archiveAllReadNotifications,
    clearNotifications,
    resetResidents,
    setSystemSettings: (settings) => setData((state) => ({ ...state, systemSettings: settings })),
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}
