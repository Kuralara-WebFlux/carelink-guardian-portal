"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardShell from "../components/DashboardShell";
import PageTransition from "../components/ui/PageTransition";
import { ResidentsWorkspace } from "../components/RoleWorkspace";

export default function ResidentsPage() {
  return (
    <ProtectedRoute requiredRole={["admin", "caregiver", "guardian"]}>
      <DashboardShell>
        <PageTransition>
          <ResidentsWorkspace />
        </PageTransition>
      </DashboardShell>
    </ProtectedRoute>
  );
}
