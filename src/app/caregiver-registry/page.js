"use client";

import React from "react";
import DashboardShell from "../components/DashboardShell";
import { AdminWorkspace } from "../components/RoleWorkspace";
import PageTransition from "../components/ui/PageTransition";
import ProtectedRoute from "../components/ProtectedRoute";

export default function CaregiverRegistryPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardShell>
        <PageTransition>
          <AdminWorkspace />
        </PageTransition>
      </DashboardShell>
    </ProtectedRoute>
  );
}
