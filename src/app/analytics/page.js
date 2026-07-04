"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardShell from "../components/DashboardShell";
import PageTransition from "../components/ui/PageTransition";
import { AdminWorkspace } from "../components/RoleWorkspace";

export default function AnalyticsPage() {
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
