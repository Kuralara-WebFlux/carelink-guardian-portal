# Component Documentation Reference Guide

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
| **Document Type** | Component Reference Guide |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Atomic UI Elements (`src/app/components/ui/`)](#41-atomic-ui-elements-srcappcomponentsui)
  - [4.2 Composite Layout Components (`src/app/components/`)](#42-composite-layout-components-srcappcomponents)
  - [4.3 Workspace Dashboards (`RoleWorkspace.jsx`)](#43-workspace-dashboards-roleworkspacejsx)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the Component Documentation Reference Guide for the CareLink Guardian Portal application. It outlines the atomic UI components, composite layout widgets, dynamic workspace boards, and their corresponding properties.

## 1.2 Scope
The scope of this guide covers React prop definitions, visual component purposes, workspace dashboard modules, and dynamic charting panels.

## 1.3 Intended Audience
This reference is prepared for frontend developers, component designers, quality assurance testers, and academic evaluators checking code structure.

## 1.4 Relationship to the Overall Project
The Component Documentation maps directly to the UI/UX Design Specification, detailing how visual design tokens are implemented as specific code-level widgets.

---

# 2. Objectives

The primary engineering objectives of this document are:
- Document the functional purpose of all atomic UI elements.
- Detail the prop types, parameters, and input rules for reusable buttons, badges, and cards.
- Specify the layout structure and navigation bounds of the main layout shell.
- Catalog the core component assets integrated into each user workspace.

---

# 3. Scope

This component guide is bounded by the client-side user interface library:
- **Included:** Custom React component files, state bindings, parameter requirements, and parent layouts.
- **Excluded:** External third-party libraries (e.g. baseline Framer Motion configuration files or standard npm packages).

---

# 4. Main Content

## 4.1 Atomic UI Elements (`src/app/components/ui/`)
These components are built as functional, reusable React blocks styled via Tailwind CSS v4 variables.

### 4.1.1 `AnimatedNumber.jsx`
*   **Purpose**: Smoothly animates numeric display values using spring-based interpolation.
*   **Props**:
    *   `value: number` - Target number to animate.
    *   `duration: number` - Animation length in milliseconds.

### 4.1.2 `AvatarFallback.jsx`
*   **Purpose**: Generates initials from a user's name and displays them on a styled background.
*   **Props**:
    *   `name: string` - User name (e.g., "Priya S.").
    *   `size: "sm" | "md" | "lg"` - Determines dimensions.

### 4.1.3 `Badge.jsx`
*   **Purpose**: Displays status pill indicators (e.g., "COMPLETED", "HIGH RISK").
*   **Props**:
    *   `variant: "primary" | "success" | "warning" | "danger" | "info" | "neutral"` - Sets theme color.
    *   `children: ReactNode` - Label text.

### 4.1.4 `Button.jsx`
*   **Purpose**: Unified component for user actions.
*   **Props**:
    *   `variant: "primary" | "secondary" | "outline" | "ghost" | "danger"` - Visual style.
    *   `size: "sm" | "md" | "lg"` - Padding size.
    *   `loading: boolean` - Disables button and displays a progress spinner.

### 4.1.5 `Card.jsx`
*   **Purpose**: Standard container matching MD3 elevation shadows.
*   **Props**:
    *   `children: ReactNode` - Nested components.
    *   `className: string` - Overriding class names.

### 4.1.6 `EmptyState.jsx`
*   **Purpose**: Displayed when lists are empty (e.g., empty search query, no notifications).
*   **Props**:
    *   `icon: ReactNode` - Visual icon element.
    *   `title: string` - Primary header text.
    *   `description: string` - Secondary detail string.

### 4.1.7 `LiveClock.jsx`
*   **Purpose**: Displays a real-time, ticking clock in the workspace header.

### 4.1.8 `PageTransition.jsx`
*   **Purpose**: Wraps sub-pages inside Framer Motion animated containers.

### 4.1.9 `SectionHeader.jsx`
*   **Purpose**: Title/subtitle block for sub-sections.
*   **Props**:
    *   `title: string` - Main header.
    *   `description: string` - Context subtitle.

### 4.1.10 `SkeletonLoader.jsx`
*   **Purpose**: Content skeleton displayed during state hydration or data loading.

### 4.1.11 `StatCard.jsx`
*   **Purpose**: Simplified card for numerical metrics.

## 4.2 Composite Layout Components (`src/app/components/`)
These components bind directly to `useDashboard` hooks and manage layout configurations.

### 4.2.1 `DashboardShell.jsx`
*   **Description**: The main layout wrapper for authenticated routes.
*   **Structure**:
    *   Desktop: Sidebar locked on the left margin, content area on the right.
    *   Mobile: Floating hamburger toggle menu that opens the Sidebar as an overlay drawer.
    *   Header: Displays logo, user details, live clock, and a logout button.

### 4.2.2 `Sidebar.jsx`
*   **Description**: Dynamic vertical navigation list.
*   **Internal Logic**: Reads `currentUser` role from context and renders links corresponding to their workspace scope:
    *   *Admin Links:* Dashboard, Residents, Caregiver Registry, Analytics, Reports, Settings.
    *   *Caregiver Links:* Tasks Board, Settings.
    *   *Guardian Links:* Wellness Tracking, Settings.

### 4.2.3 `VitalsChartTabbed.jsx`
*   **Description**: Renders historical vital signs using Chart.js graphs inside a tabbed card layout.
*   **Tabs**:
    *   *Blood Pressure:* Systolic/Diastolic double line trend line.
    *   *Blood Sugar:* Single line tracking glucose levels.
    *   *Oxygen Saturation (SpO2):* SpO2 percentage bar chart.

### 4.2.4 `CareUpdatePanel.jsx`
*   **Description**: A slide-out panel form caregivers use to record vitals and check off daily care checklists.
*   **Inputs**: Vitals (BP, SpO2, sugar, pulse, temp) and care notes (Incident, Shift Handover).

## 4.3 Workspace Dashboards (`RoleWorkspace.jsx`)
Contains the core visual assemblies rendered for each authenticated role.

### 4.3.1 `AdminWorkspace`
*   **Components**:
    *   Metric summary grid (admitted residents, active staff, alerts).
    *   Activity logs table showing recent caregiver actions.
    *   Quick action shortcuts (e.g., Export reports, add resident).

### 4.3.2 `CaregiverWorkspace`
*   **Components**:
    *   Task board filtering resident clinical checklists.
    *   Care checklist checklist.
    *   Care update triggers.

### 4.3.3 `GuardianWorkspace`
*   **Components**:
    *   Resident overview card (name, room, fall risk, wellness score).
    *   Vitals history trend charts.
    *   Care timeline entries showing chronologically sorted caregiver logs.

---

# 5. Summary

This Component Documentation Reference Guide reviews the reusable UI elements of the CareLink Guardian Portal. It catalogs functional components, lists active prop structures, and describes composite dashboard workspaces.

---

# 6. Conclusion

Standardizing component parameters and separation policies keeps the user interface uniform and scalable. Using functional React components styled with design tokens yields clean visual layouts and consistent behaviors.

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
