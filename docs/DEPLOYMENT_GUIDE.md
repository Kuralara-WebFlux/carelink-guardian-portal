# Deployment and Development Operations Guide

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
| **Document Type** | Deployment & DevOps Guide |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Prerequisites](#41-prerequisites)
  - [4.2 Installation and Setup](#42-installation-and-setup)
  - [4.3 Local Development](#43-local-development)
  - [4.4 Build and Compilation](#44-build-and-compilation)
  - [4.5 Deployment Options](#45-deployment-options)
  - [4.6 Troubleshooting and Operations](#46-troubleshooting-and-operations)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the Deployment and Development Operations Guide for the CareLink Guardian Portal application. It outlines system prerequisites, installation steps, local development commands, and production build pipelines.

## 1.2 Scope
The scope of this deployment guide covers npm commands, package builds, Vercel/Netlify cloud configurations, HTTPS static server setups, and browser cache debugging steps.

## 1.3 Intended Audience
This manual is prepared for DevOps engineers, frontend builders, academic evaluators, and system administrators.

## 1.4 Relationship to the Overall Project
The Deployment Guide outlines the process of compiling and running the files and components described in the HLD, LLD, and Frontend Architecture documents.

---

# 2. Objectives

The primary engineering objectives of this deployment manual are:
- Catalog software dependencies and node runtime prerequisites.
- Define commands to initialize, run, and compile the application.
- Specify deployment variables for static cloud hosting.
- Provide operators with troubleshooting routines for cache clearing and service worker verification.

---

# 3. Scope

This deployment guide is bounded by the compilation and hosting configuration of the frontend code:
- **Included:** Node requirements, npm script commands, static site generation builds, and browser console debugging commands.
- **Excluded:** Domain purchasing, web application firewall (WAF) setups, or virtual private server (VPS) OS installations.

---

# 4. Main Content

## 4.1 Prerequisites
Before installing the portal, ensure your environment meets the following requirements:
*   **Node.js**: Version 18.0.0 or higher (v20+ recommended).
*   **Package Manager**: npm (v9+ recommended) or yarn.
*   **Client Browser**: A modern web browser (Chrome, Safari, Edge, Firefox) with support for Service Workers, LocalStorage, and IndexedDB.

## 4.2 Installation and Setup
1.  **Clone the Repository**: Navigate to your local project directory.
2.  **Install Dependencies**: Run the following command to download all project dependencies:
    ```bash
    npm install
    ```
    This installs the core packages:
    *   `next` (v15 App Router framework)
    *   `react` / `react-dom` (v19)
    *   `tailwindcss` (v4 framework)
    *   `framer-motion` (animations library)
    *   `chart.js` / `react-chartjs-2` (interactive canvas charting)
    *   `idb` (IndexedDB wrapper)
    *   `react-icons` (Lucide-based icons)

## 4.3 Local Development
Start the local development server with:
```bash
npm run dev
```
*   **Local Address**: The server launches at [http://localhost:3000](http://localhost:3000).
*   **Fast Refresh**: Code modifications automatically hot-reload in the browser without losing active component state.

## 4.4 Build and Compilation
To compile a production-ready build, run:
```bash
npm run build
```
*   **Output**: The compiled production build is generated in the `.next` directory.
*   **Static Optimization**: Next.js automatically analyzes routes and pre-renders static shells where possible.
*   **Run Production Locally**: Verify the production build locally with:
  ```bash
  npm run start
  ```

## 4.5 Deployment Options
As a standalone Next.js frontend application, the portal can be deployed to modern cloud hosting platforms:

### 4.5.1 Cloud Platforms (Vercel, Netlify)
*   **Settings**:
    *   Build Command: `npm run build`
    *   Output Directory: `.next` or default settings.
*   **Deployment Process**: Connect the repository branch to trigger automated CI/CD builds on push.

### 4.5.2 Static Hosting (PWA Requirements)
*   **HTTPS Enforce**: Because the portal registers a Service Worker (`sw.js`) to support offline capabilities, the hosting environment must enforce HTTPS. Service Workers will not register on unencrypted HTTP connections (except for `localhost`).

## 4.6 Troubleshooting and Operations

### 4.6.1 Resetting the Application Cache
If the local cache becomes corrupted or you need to reset the system to its seed data state:
1.  Open the browser's Developer Tools (F12).
2.  Go to the **Console** tab.
3.  Run the following command to clear LocalStorage:
    ```javascript
    localStorage.clear();
    ```
4.  Refresh the page. The application will re-initialize with the default seed data from `carelinkData.js`.

### 4.6.2 Service Worker Verification
If offline capabilities fail to initialize:
1.  Open Developer Tools and navigate to the **Application** tab.
2.  Select **Service Workers** in the left menu.
3.  Verify that `/sw.js` is registered, active, and running.
4.  Check **Offline** to test offline-first page loading.

---

# 5. Summary

This Deployment and Development Operations Guide provides instructions for compiling, deploying, and debugging the CareLink Guardian Portal. It details node dependencies, npm scripts, cloud settings, and troubleshooting tools.

---

# 6. Conclusion

Following these installation and build guidelines guarantees a clean deployment of the CareLink Guardian Portal. Enforcing HTTPS and caching checks ensures that service workers remain active, preserving the offline capabilities of the PWA.

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
