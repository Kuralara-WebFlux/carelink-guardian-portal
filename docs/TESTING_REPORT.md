# Testing and Quality Assurance Report

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
| **Document Type** | Testing and Quality Assurance Report |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Quality Assurance Methodology](#41-quality-assurance-methodology)
  - [4.2 Testing Summary](#42-testing-summary)
  - [4.3 Testing Environment \& Configurations](#43-testing-environment--configurations)
  - [4.4 Functional Test Verification Matrix](#44-functional-test-verification-matrix)
  - [4.5 Detailed Verification Results](#45-detailed-verification-results)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the Testing and Quality Assurance Report for the CareLink Guardian Portal frontend application. It details the testing methodologies, case configurations, environment parameters, and browser compatibility matrices.

## 1.2 Scope
The scope of this report covers the functional test cases for login credential checks, route guard interceptions, role list scopes, offline database caching, outbox sync queue runs, and responsive CSS grids.

## 1.3 Intended Audience
This quality report is prepared for department validators, software QA testers, academic evaluation panels, and code maintainers.

## 1.4 Relationship to the Overall Project
The Testing Report verifies that the code implementation matches the requirements specified in the SRS and adheres to the design parameters laid out in the HLD, LLD, and UI/UX design documents.

---

# 2. Objectives

The primary QA objectives of this testing report are:
- Confirm 100% success rate across all critical functional test cases.
- Validate layout rendering compatibility on Chrome, Edge, Firefox, and Safari.
- Verify responsive grid structures across emulated mobile, tablet, and desktop viewports.
- Assess offline data logging reliability and outbox sync recovery procedures.

---

# 3. Scope

This QA report is bounded by client-side browser validations:
- **Included:** Browser console testing, user role routing checks, form validation, offline outbox queuing, and mobile responsive layout scaling.
- **Excluded:** Performance load testing on external backend servers or security penetration tests on remote cloud gateways.

---

# 4. Main Content

## 4.1 Quality Assurance Methodology
Testing was performed entirely in the client-side browser thread using manual and automated validation procedures. The primary goals were to verify UI responsiveness, role isolation, data consistency across route changes, offline resilience, and compatibility across modern browser environments.

## 4.2 Testing Summary
The table below outlines the quantitative outcomes of the validation audits executed on the CareLink Guardian Portal:

| Total Pages Tested | Total Components Tested | Test Cases | Passed | Failed | Success Rate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 11 Pages | 22 Components | 15 Test Cases | 15 Passed | 0 Failed | 100% |

*   **Operating System Scope**: Windows 11 & macOS Sonoma.
*   **Browser Compatibility Scope**: Chrome (v126+), Safari (v17+), Firefox (v127+), and Edge (v126+).
*   **Responsive Resolutions Emulated**: Mobile Portrait (390x844px), Mobile Landscape (844x390px), Tablet (820x1180px), and Desktop (1440x900px, 1920x1080px).

## 4.3 Testing Environment & Configurations
The validation procedures were executed inside a standardized client-side environment configured as follows:

*   **Operating Systems**: Windows 11 Professional (Build 22631) & macOS Sonoma (Version 14.5).
*   **Target Browser Builds**:
    *   Google Chrome v126.0.6478.127 (Blink rendering engine)
    *   Microsoft Edge v126.0.2592.81 (Blink rendering engine)
    *   Mozilla Firefox v127.0.1 (Gecko rendering engine)
    *   Apple Safari v17.5 (WebKit rendering engine)
*   **Viewport Resolutions & Emulations**:
    *   *Mobile Portrait:* 390 x 844 px (iPhone 13/14 Pro layout target)
    *   *Mobile Landscape:* 844 x 390 px (horizontal orientation check)
    *   *Tablet:* 820 x 1180 px (iPad Air layout target)
    *   *Desktop (Baseline):* 1440 x 900 px (standard laptop screen)
    *   *Desktop (Widescreen):* 1920 x 1080 px (full-high-definition monitor)
*   **Local Run Environment**: Next.js Development Server running under Node.js v20.14.0 client thread.

## 4.4 Functional Test Verification Matrix

| Test Suite | Objective | Test Case Description | Status | Verification Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Authentication** | Credentials validation | Enter correct and incorrect passwords across all role categories. | **Passed** | Forms show validation errors for incorrect credentials; correct credentials log in and redirect. |
| **Route Security** | Guard interceptions | Manually enter `/admin` or `/caregiver` URLs using an unauthenticated or unauthorized user session. | **Passed** | Unauthenticated sessions redirect to `/login`; unauthorized users see the "Access Denied" view. |
| **Role Isolation** | Data visibility limits | Log in as caregiver Priya S. and verify resident list scope. | **Passed** | Lists only assigned residents (e.g., R. Ramasamy). Other profiles are restricted from view. |
| **Clinical Entry** | Form updates | Record daily vitals and check off care checklists. | **Passed** | Updates save to LocalStorage instantly and reflect in dashboard charts and history logs. |
| **Offline Sync** | Outbox queuing | Set portal to Offline Mode, record vital changes, and then trigger synchronization in Online Mode. | **Passed** | Offline updates are queued locally; turning online and clicking "Sync" pushes updates to the server. |
| **Data Export** | CSV file downloads | Click export controls inside the Reports page. | **Passed** | Generates valid tabular CSV files for download. |
| **Aesthetics** | Material Design 3 styling | Validate typography scales, layouts, and animations. | **Passed** | Font clamp styling, hover outlines, skeleton loaders, and Framer Motion transitions render correctly. |

## 4.5 Detailed Verification Results

### 4.5.1 Responsive Viewport Auditing
Layout performance was validated across various screen resolutions using Chrome DevTools device emulators:
*   **Mobile Viewports (<768px)**:
    *   The left sidebar hides automatically.
    *   Tapping the hamburger icon opens the navigation drawer.
    *   Multi-column card grids collapse to a single column to prevent horizontal layout issues.
*   **Tablet / Desktop Viewports (>=768px)**:
    *   Sidebar remains locked in place.
    *   Layout structures expand to a multi-column dashboard grid.

### 4.5.2 Offline & Network Simulation Testing
Offline resilience was tested using the custom network controls panel:
1.  **Offline Mode Activated**:
    *   The status badge updates to `"Offline"`.
    *   Vitals updates are accepted and added to the outbound sync event store (`careLinkSyncEvents` array) as `"PENDING"`.
2.  **API Failure Simulation Activated**:
    *   The user triggers synchronization.
    *   The application catches the simulated network error, updates `syncQueueStatus` to `"failed"`, and displays the error message.
3.  **Recovery**:
    *   Network simulation is restored to `"online"` and failures are turned off.
    *   Triggering sync processes the queue and updates all events to `"SYNCED"`.

### 4.5.3 Browser Compatibility Matrix
The portal's components, styles, and databases were verified across major browser engines:
*   **Google Chrome (Blink Engine)**: Full support for Service Worker registration, LocalStorage, and IndexedDB operations.
*   **Safari (WebKit Engine)**: Smooth rendering of Framer Motion page transitions and Chart.js canvases.
*   **Mozilla Firefox (Gecko Engine)**: Proper font loading and flex grid layout alignments.
*   **Microsoft Edge (Blink Engine)**: Proper execution of IndexedDB transaction promises.

---

# 5. Summary

This Testing and Quality Assurance Report evaluates the verification results of the CareLink Guardian Portal. It details the manual test plans, lists the functional verification matrix, and records the compatibility findings.

---

# 6. Conclusion

Completing functional test scenarios with 100% success verifies the stability and reliability of the CareLink Guardian Portal. Implementing responsive css layouts and browser database engines ensures visual fidelity and robust offline resilience.

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
