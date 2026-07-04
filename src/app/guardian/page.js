"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardShell from "../components/DashboardShell";
import PageTransition from "../components/ui/PageTransition";
import { GuardianWorkspace } from "../components/RoleWorkspace";

export default function GuardianPage() {
  return (
    <ProtectedRoute requiredRole="guardian">
      <DashboardShell>
        <PageTransition>
          <GuardianWorkspace />
        </PageTransition>
      </DashboardShell>
    </ProtectedRoute>
  );
}
