# API Integration Layer Documentation

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
| **Document Type** | API Integration Layer Documentation |

---

# Table of Contents
- [1. Introduction](#1-introduction)
- [2. Objectives](#2-objectives)
- [3. Scope](#3-scope)
- [4. Main Content](#4-main-content)
  - [4.1 Frontend Integration Client (`careLinkApi.js`)](#41-frontend-integration-client-carelinkapijs)
  - [4.2 Request Headers](#42-request-headers)
  - [4.3 Loading \& Queue States](#43-loading--queue-states)
  - [4.4 Error Handling \& Retry Fallbacks](#44-error-handling--retry-fallbacks)
- [5. Summary](#5-summary)
- [6. Conclusion](#6-conclusion)
- [Author](#author)
- [Project Supervisor](#project-supervisor)

---

# 1. Introduction

## 1.1 Purpose
This document provides the API Integration Layer Documentation for the CareLink Guardian Portal. It specifies the frontend API client functions, HTTP request/response payloads, simulated header fields, loading indicators, and local error handling logic.

## 1.2 Scope
The scope of this document covers the integration services client (`careLinkApi.js`), request headers, workspace synchronizer queues, and offline-to-online retry routines.

## 1.3 Intended Audience
This integration specification is prepared for backend engineering teams, interface developers, academic reviewers, and QA testers.

## 1.4 Relationship to the Overall Project
The API Integration Layer details the boundary connecting the client-side database cache (IndexedDB outbox) to remote service endpoints, serving as the bridge to eventual backend server integration.

---

# 2. Objectives

The primary engineering objectives of this integration layer are:
- Define the dispatcher signature for outbound event logs.
- Specify the custom HTTP headers (such as tenant IDs and bearer tokens) used to secure payloads.
- Detail the state indicators (`syncQueueStatus`) tracking background sweeps.
- Map the event-driven sequence for catch and retry flows during network dropouts.

---

# 3. Scope

This integration documentation is bounded by the client-side API simulation layer:
- **Included:** Method signatures, simulated latency variables, authorization headers, loading states, and error handling loops.
- **Excluded:** Remote cloud endpoints routing, database triggers, or active backend event consumers.

---

# 4. Main Content

## 4.1 Frontend Integration Client (`careLinkApi.js`)
The application isolates outbound communication inside a simulated client layer (`careLinkApi.js`). This client is designed to mimic standard HTTP requests, handle network latency, manage authentication headers, and throw network exceptions for the local state engine to process.

> [!NOTE]
> The source file name `welfareSyncApi.js` (documented here as `careLinkApi.js`), the method `postWelfareSyncEvent` (documented here as `postCareLinkSyncEvent`), the IndexedDB object store `welfareSyncEvents` (documented here as `careLinkSyncEvents`), and the authorization header `"local-welfaresync-engine-token"` (documented here as `"local-carelink-portal-token"`) are legacy internal implementation names retained strictly for compatibility with the existing codebase and do not represent a separate project.

### 4.1.1 Core API Method
The client exposes a dispatcher for outbound event logs:

```javascript
export async function postCareLinkSyncEvent(event, institutionId)
```

*   **Execution Flow**:
    1.  **Latency Simulation**: Delays execution for 1000ms using a `Promise` timeout to simulate realistic network round-trip times.
    2.  **Offline Detection**: Verifies the network simulator mode. If set to offline, it throws an error: `"Connectivity Error: Device is offline. Event queued in local outbox."`
    3.  **Server Failure Simulation**: Evaluates the simulated failure flag. If active, it throws an error: `"HTTP 500: Sync backend is currently unavailable. Retrying..."`
    4.  **Success Response**: If checks pass, it returns a success object containing headers and payload metadata.

## 4.2 Request Headers
On successful events dispatch, the integration client simulates the inclusion of security and tenant identification headers:

```json
{
  "Content-Type": "application/json",
  "X-Institution-ID": "[institutionId]",
  "Authorization": "Bearer local-carelink-portal-token"
}
```

*   **`X-Institution-ID`**: Tenant identifier to scope data access (e.g., `facility-alpha`).
*   **`Authorization`**: Simulated bearer token used to authenticate client requests.

## 4.3 Loading & Queue States
The UI uses state variables to track synchronization progress:

*   **`syncQueueStatus`**:
    *   `idle`: Default state; no active sync operations.
    *   `synced`: Indicates a successful synchronization sweep.
    *   `failed`: Indicates a sync failure due to offline status or simulated server issues.
*   **`syncQueueError`**: Holds the error string thrown by the API client, rendering it in the synchronization panel.
*   **`lastSyncedTimestamp`**: Tracks the completion time of the last successful sync sweep.

## 4.4 Error Handling & Retry Fallbacks
When the API client throws a network exception, the context handles the failure gracefully:

```mermaid
graph TD
    A[Trigger Sync] --> B{Call postCareLinkSyncEvent}
    B -->|Offline Error Thrown| C[Set syncQueueStatus = 'failed', error = 'Network is offline']
    B -->|HTTP 500 Error Thrown| D[Set syncQueueStatus = 'failed', error = 'Simulated API failure']
    B -->|Success| E[Mark events as SYNCED, set status = 'synced']
```

*   **Connectivity Interruptions**: If the client is offline, the exception is caught, the sync status is set to `failed`, and events remain cached in the outbox queue (`careLinkSyncEvents` object store).
*   **Simulated Server Downtime**: If the simulated server failure flag is active, the UI displays the error message alongside a warning, prompting the user to resolve the issue and retry.

---

# 5. Summary

This API Integration Layer Documentation defines the integration interface of the CareLink Guardian Portal. It details the core client method `postCareLinkSyncEvent`, specifies headers, tracks queue statuses, and maps fallback flows for network outages.

---

# 6. Conclusion

Encapsulating network communication in a dedicated client layer simplifies backend integration. Simulating latency and connectivity dropouts enables testing local database outboxes, confirming the robustness of the system.

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
