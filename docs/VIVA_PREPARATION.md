# Viva Voce Preparation Guide

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
| **Document Type** | Viva Voce Preparation Guide |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Next.js 15 \& React Framework Basics](#41-nextjs-15--react-framework-basics)
  - [4.2 Styling, Themes, and MD3 Principles](#42-styling-themes-and-md3-principles)
  - [4.3 State Management \& Offline Persistence](#43-state-management--offline-persistence)
  - [4.4 Routing, Guards, and PWA Integration](#44-routing-guards-and-pwa-integration)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the Viva Voce Preparation Guide for the CareLink Guardian Portal frontend application. It outlines potential defense examination questions, core terminology definitions, and technical summaries of the implementation.

## 1.2 Scope
The scope of this guide covers Next.js 15 routing, React 19 concurrent hydration, Material Design 3 guidelines, Context API states, IndexedDB schemas, and offline service workers.

## 1.3 Intended Audience
This preparation guide is designed for the student developer defending the project and academic supervisors reviewing core concepts.

## 1.4 Relationship to the Overall Project
The Viva Preparation Guide consolidates key concepts from the SRS, HLD, LLD, and architecture logs, presenting them in a review-friendly question-and-answer format.

---

# 2. Objectives

The primary academic objectives of this preparation guide are:
- Define the technical terminology and framework versions used in development.
- Clarify React's hydration mechanisms and page rendering loops.
- Explain database store functions and user role visibility filter controls.
- Map service worker cache boundaries and simulated API exception handling.

---

# 3. Scope

This guide is bounded by the client-side system implementation:
- **Included:** Technical Q&A blocks, framework details, styling rules, local caching answers, and route safeguard details.
- **Excluded:** General computer science theories or remote server deployment details.

---

# 4. Main Content

## 4.1 Next.js 15 & React Framework Basics

#### Q1: What version of Next.js does this project use, and what is its routing model?
**A**: The project uses **Next.js 15** with the **App Router** layout. Routing is folder-based, where directories inside `src/app/` map directly to URL paths, and `page.js` files render as route views.

#### Q2: Why is `"use client"` declared at the top of most dashboard pages?
**A**: Because the dashboards rely on client-side features like React hooks (`useState`, `useContext`, `useEffect`), browser APIs (LocalStorage, IndexedDB), dynamic charting (Chart.js), and animations (Framer Motion).

#### Q3: How is the global layout wrapped, and where is the state provider loaded?
**A**: The global layout is defined in `src/app/layout.js`, which imports CSS styles and wraps all children inside the `DashboardProvider` context to make state accessible across all routes.

#### Q4: What is React 19's hydration model, and how does the app prevent hydration mismatch errors?
**A**: Hydration is the process of mapping React event listeners to pre-rendered HTML. To prevent mismatch errors between server-rendered layouts and browser-rendered caches, the portal checks the `isHydrated` state flag and renders a `SkeletonLoader` until client-side hydration is complete.

## 4.2 Styling, Themes, and MD3 Principles

#### Q5: How is Material Design 3 (MD3) implemented in the portal's visuals?
**A**: The design incorporates MD3 principles like round component corners (`--radius-xl`), elevation elevations (`--surface-raised`), semantic status colors, outline focus highlights, and responsive layouts.

#### Q6: How does the Tailwind CSS v4 setup handle the color system?
**A**: Color variables are mapped to CSS custom properties under the `:root` pseudo-class in `src/app/globals.css`, then integrated into Tailwind's theme system using the `@theme inline` directive.

#### Q7: What are the primary brand and feedback colors used in this project?
**A**: The brand accent color is a rose/pink shade (`#EC4899`, `--color-brand-500`), while feedback states map to success green (`#10B981`), warning amber (`#F59E0B`), and danger red (`#EF4444`).

#### Q8: How is the responsive sidebar navigation menu designed?
**A**: The layout uses a responsive grid system:
*   Desktop: Left navigation sidebar locks in place.
*   Mobile: Sidebar is hidden and toggled as an overlay drawer using a hamburger menu icon.

## 4.3 State Management & Offline Persistence

#### Q9: What state management pattern does this application implement?
**A**: The application implements a centralized client-side state engine using React's **Context API** (`DashboardContext.jsx`). The provider exposes active states and mutator functions to child pages.

#### Q10: How does the application persist state changes across page reloads?
**A**: An effect hook serializes the centralized context state object into a JSON string and writes it to LocalStorage under the `carelink_sprint_4_17_state` key whenever the state updates.

#### Q11: What is the database schema defined in `indexedDb.js`?
**A**: It defines `carelink-db` version 4 with seven distinct object stores: `residents`, `notifications`, `activityHistory`, `settings`, `caregivers`, `caregiverActivityHistory`, and `careLinkSyncEvents`.

#### Q12: How are data access scopes filtered based on user roles?
**A**: The context uses helper functions (`visibleResidentsFor()`, etc.) to filter records in memory, ensuring users only see data they are authorized to view based on their role.

#### Q13: What is the purpose of the `careLinkSyncEvents` store?
**A**: It acts as a local outbox queue that caches events logged while offline until connectivity is restored and synchronization is triggered.

## 4.4 Routing, Guards, and PWA Integration

#### Q14: How does the `ProtectedRoute` component protect routes?
**A**: It intercepts navigation changes. If the user session is empty, it redirects them to `/login`. If the user's role does not match the page's criteria, it displays an "Access Denied" view.

#### Q15: How does the Service Worker (`sw.js`) support offline access?
**A**: During registration, it opens a cache store, saves static shell assets (e.g., manifest details, icons, landing paths), intercepts browser fetch requests, and serves files from the cache when offline.

#### Q16: What authentication headers are included in the simulated API layer?
**A**: Requests include:
*   `Content-Type: application/json`
*   `X-Institution-ID` (tenant ID)
*   `Authorization: Bearer local-carelink-portal-token`

---

# 5. Summary

This Viva Voce Preparation Guide compiles technical questions and answers covering Next.js App Router routing, MD3 CSS designs, Context state caches, IndexedDB databases, and Service Worker registration.

---

# 6. Conclusion

Reviewing these operational specifications prepares the developer for academic review and technical defense of the CareLink Guardian Portal. This ensures the design choices are explained logically and defended successfully.

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
