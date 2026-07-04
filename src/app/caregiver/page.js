"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardShell from "../components/DashboardShell";
import PageTransition from "../components/ui/PageTransition";
import { CaregiverWorkspace } from "../components/RoleWorkspace";

export default function CaregiverPage() {
  return (
    <ProtectedRoute requiredRole="caregiver">
      <DashboardShell>
        <PageTransition>
          <CaregiverWorkspace />
        </PageTransition>
      </DashboardShell>
    </ProtectedRoute>
  );
}
