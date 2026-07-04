# Project Structure and Module Map

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
| **Document Type** | Project Structure Outline |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Repository Directory Tree](#41-repository-directory-tree)
  - [4.2 Core Modules Rationale](#42-core-modules-rationale)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the Project Structure and Module Map for the CareLink Guardian Portal codebase. It outlines the directories, subfolders, individual code files, and module dependencies within the repository.

## 1.2 Scope
The scope of this document covers all files located inside `src/`, `public/`, and `docs/` directories, describing layout components, seed data files, utilities, and configuration scripts.

## 1.3 Intended Audience
This structural index is prepared for development staff, software maintainers, academic reviewers, and system quality evaluators.

## 1.4 Relationship to the Overall Project
The Project Structure outlines the physical layout of all files and pages, serving as the map for frontend architecture, component documentation, and deployment guides.

---

# 2. Objectives

The primary engineering objectives of this structural layout document are:
- Provide an ASCII directory tree mapping all code files, assets, and documentation.
- Highlight the roles and responsibilities of the core source directories.
- Explain module rationales for state context, data utilities, and simulated APIs.
- Detail the path configurations for static PWA assets.

---

# 3. Scope

This specification is bounded by the physical folder structure of the repository:
- **Included:** Source folder maps, component file locations, static assets, configuration scripts, and documentation files.
- **Excluded:** Directory layouts of external node packages or local editor directories.

---

# 4. Main Content

## 4.1 Repository Directory Tree
The directory tree below maps the current repository structure:

```text
carelink-guardian-portal/
├── docs/                             # Academic documentation files
│   ├── certificates/                 # Certificate reference directory
│   │   ├── README.md                 # Community Connect Certificate explanation
│   │   └── community_connect_certificate.png # Reserved for official certificate image
│   ├── screenshots/                  # Image assets showing application views
│   │   └── *.png                     # Panel captures for layout verification
│   └── *.md                          # Specialized design, architecture, and testing logs
├── public/                           # Static assets & PWA configuration files
│   ├── app-icons/                    # PWA launcher icons
│   ├── logo/                         # Branding images
│   ├── manifest.json                 # Web app manifest
│   ├── sw.js                         # Offline cache service worker
│   └── favicon.ico                   # Browser favicon
├── src/                              # Source directory
│   ├── app/                          # Next.js App Router Root
│   │   ├── admin/                    # Admin wrapper route
│   │   │   └── page.js               # Admin workspace container page
│   │   ├── analytics/                # Analytics wrapper route
│   │   │   └── page.js               # Analytics dashboard page
│   │   ├── caregiver/                # Caregiver wrapper route
│   │   │   └── page.js               # Caregiver dashboard page
│   │   ├── caregiver-registry/       # Caregiver registry wrapper route
│   │   │   └── page.js               # Caregiver registry directory page
│   │   ├── components/               # Composite UI Modules
│   │   │   ├── ui/                   # Reusable UI widgets
│   │   │   │   ├── AnimatedNumber.jsx
│   │   │   │   ├── AvatarFallback.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── LiveClock.jsx
│   │   │   │   ├── PageTransition.jsx
│   │   │   │   ├── SectionHeader.jsx
│   │   │   │   ├── SkeletonLoader.jsx
│   │   │   │   └── StatCard.jsx
│   │   │   ├── AnalyticsChart.jsx    # Chart.js analytical views
│   │   │   ├── DashboardContext.jsx  # Main state provider context
│   │   │   ├── DashboardShell.jsx    # Sidebar/Navbar wrapper container
│   │   │   ├── Logo.jsx              # Application logo component
│   │   │   ├── ProtectedRoute.jsx    # Auth route interceptor guard
│   │   │   ├── ReportChart.jsx       # Chart.js compliance reporting views
│   │   │   ├── RoleWorkspace.jsx     # Workspace component renderers
│   │   │   ├── ServiceWorkerRegistration.jsx
│   │   │   ├── Sidebar.jsx           # Sidebar navigation panel
│   │   │   ├── VitalsChartTabbed.jsx # Interactive vitals charts
│   │   │   └── WellnessCard.jsx      # Summary wellness card
│   │   ├── data/
│   │   │   └── carelinkData.js       # Pre-seeded system mock database
│   │   ├── guardian/                 # Guardian wrapper route
│   │   │   └── page.js               # Guardian dashboard page
│   │   ├── login/                    # Login page and selector route
│   │   │   └── page.js               # Secure login form page
│   │   ├── notifications/            # Alerts page route
│   │   │   └── page.js               # System notifications page
│   │   ├── reports/                  # Reports page route
│   │   │   └── page.js               # CSV exports page
│   │   ├── residents/                # Residents registry page route
│   │   │   └── page.js               # Resident registry list page
│   │   ├── settings/                 # Settings panel page route
│   │   │   └── page.js               # App settings config page
│   │   ├── utils/                    # Core utilities
│   │   │   ├── auth.js               # Auth configuration and checks
│   │   │   ├── csvExport.js          # Tabular CSV export utility
│   │   │   └── riskAnalytics.js      # Risk calculations engine
│   │   ├── globals.css               # Main Tailwind v4 stylesheet
│   │   ├── layout.js                 # Global route wrapper shell
│   │   └── page.js                   # Application public landing page
│   └── services/                     # Integration and services layer
│       ├── indexedDb.js              # Database helper class
│       └── careLinkApi.js            # Simulated CareLink API layer (implemented as welfareSyncApi.js for compatibility)
├── eslint.config.mjs                 # JS styling validator config
├── jsconfig.json                     # JS module import configuration
├── next.config.mjs                   # Next.js configuration settings
├── postcss.config.mjs                # PostCSS styles parser config
├── package.json                      # NPM package manifest
└── README.md                         # Main repository readme
```

## 4.2 Core Modules Rationale
*   **`src/app/components/ui/`**: Isolates styling and UI rendering rules. Changes here affect component visual styling without altering business logic.
*   **`src/app/components/DashboardContext.jsx`**: Coordinates state updates, loading indicators, and local cache synchronization.
*   **`src/app/utils/riskAnalytics.js`**: Contains clinical threshold math and status rules to evaluate raw vital values in the client.
*   **`src/services/indexedDb.js`**: Defines the database name, object stores (including `careLinkSyncEvents` store, named `welfareSyncEvents` in legacy code), and database versioning configurations, preparing the client layer for local structured queries.
*   **`src/services/careLinkApi.js`**: Simulates the network layer, managing authentication headers and throwing network exception failures. (Retained as `welfareSyncApi.js` in the legacy implementation).

---

# 5. Summary

This Project Structure and Module Map documents the workspace configuration of the CareLink Guardian Portal. It contains the complete repository directory tree and outlines the rationales of the core source components.

---

# 6. Conclusion

Organizing the CareLink Guardian Portal directory structure into isolated folders for public static files, React components, state contexts, data utility scripts, and simulated API services ensures that developers can easily navigate, scale, and inspect the codebase.

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
