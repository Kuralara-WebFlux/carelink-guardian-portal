# End-User Operations Guide

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
| **Document Type** | End-User Operations Guide |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Welcome and System Overview](#41-welcome-and-system-overview)
  - [4.2 Login \& Navigation Guide](#42-login--navigation-guide)
  - [4.3 Workspace Operations](#43-workspace-operations)
  - [4.4 Offline Sync Procedures](#44-offline-sync-procedures)
  - [4.5 Frequently Asked Questions (FAQ)](#45-frequently-asked-questions-faq)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the End-User Operations Guide (User Manual) for the CareLink Guardian Portal application. It outlines user login credentials, dashboard navigation, role workspace activities, and offline outbox synchronization procedures.

## 1.2 Scope
The scope of this operations manual covers Administrator resident registries, Caregiver clinical checklists, Guardian wellness charts, and system settings configurations.

## 1.3 Intended Audience
This manual is prepared for facility operators, caregivers, family members (guardians), academic evaluators, and system auditors.

## 1.4 Relationship to the Overall Project
The User Manual translates technical system structures described in the SRS, HLD, LLD, and UI/UX documents into step-by-step instructions for end users.

---

# 2. Objectives

The primary operational objectives of this user manual are:
- Detail the login credentials and redirection paths for all workspace profiles.
- Guide administrators through admitting, editing, archiving, and deleting residents.
- Guide caregivers through vital sign logging and clinical checklists.
- Instruct guardians on tracking health trends and care history timelines.
- Walk users through testing offline outbox synchronization.

---

# 3. Scope

This guide is bounded by the client-side user operations:
- **Included:** Step-by-step instructions, credential lists, network simulation switches, and common troubleshooting FAQs.
- **Excluded:** Physical hardware configuration manuals or installation guides for system deployment.

---

# 4. Main Content

## 4.1 Welcome and System Overview
The CareLink Guardian Portal is a web-based dashboard designed to coordinate senior care. Users log in through role-specific workspaces to manage resident details, record daily vitals, track caregiver task compliance, and review health metrics.

## 4.2 Login & Navigation Guide

### 4.2.1 Logging In
1.  Open the portal home page.
2.  Click **Login** in the top navigation bar.
3.  Select your workspace: **Administrator**, **Caregiver**, **Guardian**, or **Beta**.
4.  To log in, choose one of the pre-populated test accounts from the dropdown or enter your credentials.
5.  Click **Sign In**.

```text
[Administrator Credentials]  --> Username: lakshara.anand  / Password: Lakshara@2026
[Caregiver Credentials]      --> Username: priya.s          / Password: Priya@2026
[Guardian Credentials]       --> Username: arun.prakash     / Password: Arun@2026
```

### 4.2.2 Navigation Interface
*   **Left Sidebar**: Provides direct access to features within your role's scope.
*   **Top Header**: Displays the application logo, the active workspace label, a live clock, and user profile details.
*   **Logout**: Click the **Sign Out** button in the top header to end your session.

## 4.3 Workspace Operations

### 4.3.1 Administrator Workspace
Admins manage facility operations, caregiver assignments, and resident profiles:
*   **Admitting Residents**:
    1.  Click **Residents** in the sidebar.
    2.  Click **Admit Resident** in the top right.
    3.  Fill out the demographics, select an assigned caregiver and guardian, and enter initial medical conditions.
    4.  Click **Admit Resident** to save.
*   **Editing Profiles**:
    1.  Click the edit icon on any resident card.
    2.  Update clinical details or care plans and save changes.
*   **Archiving & Deleting**:
    *   Click **Archive** to hide a resident from active listings, or click **Delete** to permanently remove the profile.

### 4.3.2 Caregiver Workspace
Caregivers record daily updates and track checklists on their task boards:
*   **Task Boards**: The task board lists assigned residents and displays checklist icons indicating completed (green) or pending (yellow) tasks.
*   **Vitals & Daily Updates**:
    1.  Find the target resident and click **Update Care**.
    2.  Enter vital readings (blood pressure, sugar, SpO2, pulse, respiration, temperature).
    3.  Update checklist options (e.g., set Medication to "COMPLETED").
    4.  Add shift notes or log daily observations.
    5.  Click **Save Updates** to save changes.

### 4.3.3 Guardian Workspace
Guardians monitor the wellness status and care history of their family members:
*   **Wellness Score**: Displays a real-time wellness status metric.
*   **Vitals History**:
    *   Scroll to the interactive chart section.
    *   Toggle between **Blood Pressure**, **Blood Sugar**, and **Oxygen Saturation** tabs to view historical trends.
*   **Care Timeline**: Review chronological logs detailing caregiver actions, recorded vitals, and physician updates.

## 4.4 Offline Sync Procedures
The portal is designed to operate seamlessly when disconnected from the internet:

```text
[Disconnected State] --> Vitals logged --> Queue in outbox (PENDING status)
[Online Restored]    --> Click "Trigger Sync" --> Event processes -> Status: SYNCED
```

1.  **Simulate Offline Mode**: Go to the **Settings** page. Toggle the Network Simulation switch to **Offline**. The status badge in the header updates to `"Offline"`.
2.  **Offline Logging**: Perform actions like updating checklists or logging vitals. The updates complete in the local view, and the system queues synchronization events.
3.  **Synchronization**: Return to **Settings** and switch the Network Simulation back to **Online**. Go to the Synchronization Panel, click **Trigger Sync**, and wait for the status to change to `"synced"`.

## 4.5 Frequently Asked Questions (FAQ)

#### Q1: Why do I see "No Records Available" inside the Beta Workspace?
**A**: The Beta workspace is intentionally configured as a clean, empty tenant environment (`facility-beta`). This workspace is used to test system configurations, verify layout setups, and test local sync outbox behaviors from a clean slate.

#### Q2: What happens if I perform updates while disconnected from the internet?
**A**: The application is designed to operate offline-first. Any vital entries or checklist updates recorded while disconnected are stored in local memory and queued in the outbound synchronization list (`careLinkSyncEvents`). When connectivity is restored, go to the Synchronization Panel and click **Trigger Sync** to upload the updates.

#### Q3: How do I reset the application state to the default pre-seeded records?
**A**: To clear your local cache and reload the default records, open the browser's developer tools console (F12), enter `localStorage.clear()`, and refresh the page.

#### Q4: Can family guardians modify vitals or check off daily checklists?
**A**: No. The Guardian workspace is restricted to read-only access to protect the integrity of residents' clinical records. Only authenticated caregivers are authorized to edit checklists and record vital readings.

---

# 5. Summary

This End-User Operations Guide details how users interact with the CareLink Guardian Portal. It provides step-by-step instructions for all role workspaces (Admin, Caregiver, Guardian), lists mock credentials, and outlines offline outbox sync methods.

---

# 6. Conclusion

By organizing user workflows into structured workspaces and providing clear steps for record management, checklist completion, trend tracking, and offline operation, this operations guide ensures user adoption and system compliance.

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
