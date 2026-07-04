"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardShell from "../components/DashboardShell";
import PageTransition from "../components/ui/PageTransition";
import { ReportsWorkspace } from "../components/RoleWorkspace";

export default function ReportsPage() {
  return (
    <ProtectedRoute requiredRole={["admin", "caregiver", "guardian"]}>
      <DashboardShell>
        <PageTransition>
          <ReportsWorkspace />
        </PageTransition>
      </DashboardShell>
    </ProtectedRoute>
  );
}
