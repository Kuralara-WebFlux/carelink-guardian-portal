# Low-Level Design (LLD)

**Project:** CareLink Guardian Portal  
**Subtitle:** Healthcare Operations & Family Care Management Platform  
**Version:** 1.0  
**Prepared By:** Lakshara Anand V V  
**Register Number:** RA2411003050128  
**Project Supervisor:** Dr. Rahmath Nisha  
**Academic Year:** 2026–2027  

---

# Document Metadata

| Field | Value |
| :--- | :--- |
| **Document Version** | 1.0 |
| **Last Updated** | 2026-07-04 |
| **Prepared By** | Lakshara Anand V V |
| **Reviewed By** | Dr. Rahmath Nisha |
| **Project** | CareLink Guardian Portal |
| **Document Type** | Low-Level Design Document |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Context Engine (`DashboardContext.jsx`)](#41-context-engine-dashboardcontextjsx)
  - [4.2 Risk Analytics Engine (`riskAnalytics.js`)](#42-risk-analytics-engine-riskanalyticsjs)
  - [4.3 Exporter Engine (`csvExport.js`)](#43-exporter-engine-csvexportjs)
  - [4.4 Authentication Utility (`auth.js`)](#44-authentication-utility-authjs)
  - [4.5 Transition Animation Configuration (`PageTransition.jsx`)](#45-transition-animation-configuration-pagetransitionjsx)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the Low-Level Design (LLD) for the CareLink Guardian Portal application. It outlines detailed function interfaces, class variables, database schemas, utility files, and algorithm specifications.

## 1.2 Scope
The scope of this LLD details the code implementation rules for the React Context Provider, risk analysis utilities, CSV export handlers, authentication functions, and Framer Motion animation configurations.

## 1.3 Intended Audience
This document is prepared for programmers, testers, code evaluators, and system maintainers who require a detailed view of the functional code blocks and algorithms.

## 1.4 Relationship to the Overall Project
The LLD implements the architectural layout specified in the High-Level Design (HLD), mapping design details directly to Next.js components and JavaScript routines.

---

# 2. Objectives

The primary engineering objectives of this Low-Level Design are:
- Formulate precise method signatures, parameters, and state operators for the Dashboard State Provider.
- Document the logical thresholds and scoring math of the Risk Analytics Engine.
- Outline the memory allocation and escaping mechanisms of the Exporter Engine.
- Specify the credential validation and session hydration flow.

---

# 3. Scope

This low-level design document is bounded by the client-side development codebase:
- **Included:** Method signature parameters, array filter criteria, mathematical formulas, and animation properties.
- **Excluded:** Back-end API database migrations, cloud hosting environment structures, and hardware-level network protocols.

---

# 4. Main Content

## 4.1 Context Engine (`DashboardContext.jsx`)
The React Context API acts as the in-memory central engine, orchestrating operations and tracking client parameters.

### 4.1.1 Core Helper Functions (Pure Functions)

#### `initialState()`
*   **Purpose**: Creates the base JSON structure for a clean state environment.
*   **Returns**: `ApplicationState` initialized with static records from `carelinkData.js`.

#### `readStoredState()`
*   **Purpose**: De-serializes state from LocalStorage at runtime.
*   **Logic**: Reads `carelink_sprint_4_17_state`. If parsing fails, fallbacks to `initialState()`.

#### `visibleResidentsFor(user, residents, caregivers)`
*   **Purpose**: Filters the active resident array according to user authorization boundaries.
*   **Filtering Logic**:
    *   `admin`: Returns active (non-archived) residents assigned to `FACILITY_ALPHA`.
    *   `guardian`: Returns active residents matching `resident.guardianId === user.guardianId`.
    *   `caregiver`: Returns active residents whose IDs are in the caregiver's `assignedResidentIds` list.
    *   `beta`: Returns an empty array.

#### `visibleCaregiversFor(user, caregivers, residents)`
*   **Purpose**: Scopes caregiver listings to secure matching filters.
*   **Filtering Logic**:
    *   `admin`: Full caregivers array.
    *   `caregiver`: Filters array containing only the current user's profile.
    *   `guardian`: Caregivers assigned to the guardian's resident subset.

#### `scopeNotifications(user, notifications, residents, caregivers)`
*   **Purpose**: Limits alerts to those matching the user's scope.

### 4.1.2 Context Mutators (`DashboardProvider`)
The context layer exposes React state values and the following callbacks:

| Method Signatures | Parameters | State Operations |
| :--- | :--- | :--- |
| `setCurrentUser(user)` | `user: User \| null` | Updates active user state, syncs key `carelinkUser` in LocalStorage, or deletes it if null. |
| `pushNotification(payload)` | `payload: Partial<Notification>` | Appends a formatted notification to the array, updates state, and sets default fields. |
| `logActivity(action, details, extra)` | `action: string, details: string, extra: object` | Inserts an activity log node to the beginning of the `activityHistory` stack. |
| `updateResident(resident)` | `resident: Resident` | Matches resident ID, overrides fields, generates notification, and logs action. |
| `addResident(resident)` | `resident: Partial<Resident>` | Generates a new ID (`RES###`), links matching caregiver/guardian profiles, and pushes to state. |
| `archiveResident(residentId)` | `residentId: string` | Toggles `archived: true` and appends `archivedAt` timestamp. |
| `deleteResident(residentId)` | `residentId: string` | Removes the resident entry matching the target ID from the state arrays. |
| `updateResidentStatus(residentId, field, status)` | `residentId: string, field: string, status: string` | Modifies checklist item (`medication`, `nutrition`, `hygiene`, `mobility`, `sleep`, `hydration`), updates daily logs, care notes, and caregiver logs. |
| `recordVitals(residentId, vitals)` | `residentId: string, vitals: Vitals` | Pushes a new vitals node to the resident's historical trend array, recalculates baseline vitals, and computes risk changes. |
| `triggerQueueSync()` | *None* | Loops through outbound sync events. Simulates network validation, updates status indicators, and handles error states. |

## 4.2 Risk Analytics Engine (`riskAnalytics.js`)
This client utility evaluates health states and provides explainable contributors.

### 4.2.1 `calculateRiskAndFactors(vitals, conditions, medications, settings)`
*   **Input**: Vitals object, chronic conditions array, medications array, configuration object.
*   **Logic**:
    *   Evaluates SpO2 against configured limits (`Critical <= 90`, `High < 94`, `Medium < 96`).
    *   Evaluates Pulse against range checks (`Critical < 50` or `> 120`).
    *   Checks Temperature boundaries, Blood Sugar, and Systolic/Diastolic blood pressures.
    *   Sums chronic condition counts and checks for polypharmacy (`medications >= 5`).
*   **Output**: Returns an object containing the highest resolved priority level (`Low`, `Medium`, `High`, `Critical`) and an array of text factors.

### 4.2.2 `calculateResidentRiskAnalytics(resident, settings)`
*   **Input**: Resident record, system config.
*   **Logic**: Combines clinical calculations with compliance trends (medication doses missed, SpO2 counts) to assign a final score out of 100 points, classifying contributions.

## 4.3 Exporter Engine (`csvExport.js`)
Uses client-side data serialization to structure downloads as clean CSV formats.

### 4.3.1 Core Methods
*   `escapeCSV(val)`: Escapes cells containing quotes or commas to prevent parsing errors.
*   `downloadCSV(filename, csvContent)`: Programmatically creates a virtual `Blob`, generates a mock link node, fires a click event to prompt saving, and cleans up memory allocation.
*   `exportResidentComplianceCSV(residents)`: Compiles resident compliance percentages (Medications, Nutrition, Hygiene, Mobility) and task statuses into a CSV table.
*   `exportVitalsHistoryCSV(residents)`: Formats historical vitals entries (dates, blood pressure, sugar, oxygen, pulse) for selected residents into tabular data rows.

## 4.4 Authentication Utility (`auth.js`)
Validates client sessions against static configurations in the frontend layer.

### 4.4.1 Core Methods
*   `getAccountForLogin(identifier)`: Resolves an account from `AUTH_ACCOUNTS` matching username or email.
*   `validateCredentials(identifier, password, workspace)`:
    *   Finds matching account.
    *   Matches password.
    *   Validates role matches selected workspace.
    *   Separates `facility-alpha` accounts from `facility-beta` (Beta workspace restriction).
*   `normalizeAuthUser(user)`: Validates the cached session structure and returns formatted properties.

## 4.5 Transition Animation Configuration (`PageTransition.jsx`)
Uses Framer Motion to define animations that replace browser transition jumps.

### 4.5.1 Framer Variables
```javascript
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};
```
Wraps target components with `motion.div` blocks to render transitions on router events.

---

# 5. Summary

This Low-Level Design document specifies the code parameters and functional details of the CareLink Guardian Portal. It details the state mutator methods of the Context Provider, logical parameters of the Risk Analytics Engine, CSV serialization methods, and credentials checking routines.

---

# 6. Conclusion

The method definitions, array filters, and clinical thresholds detailed in this LLD document provide the exact specifications required for code compliance. Adhering to these design principles yields a consistent, secure, and robust frontend implementation.

---

## Author

**Lakshara Anand V V**  
Bachelor of Technology  
Computer Science and Engineering  
SRM Institute of Science and Technology  
Tiruchirappalli Campus  
Academic Year: 2026–2027  

---

## Project Supervisor

**Dr. Rahmath Nisha**  
Assistant Professor  
Department of Computer Science and Engineering  
SRM Institute of Science and Technology  
Tiruchirappalli Campus  

---

CareLink Guardian Portal  
Healthcare Operations & Family Care Management Platform  
© 2026 Lakshara Anand V V  
SRM Institute of Science and Technology  
Tiruchirappalli Campus  
