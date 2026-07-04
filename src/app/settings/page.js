"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardShell from "../components/DashboardShell";
import PageTransition from "../components/ui/PageTransition";
import { SettingsWorkspace } from "../components/RoleWorkspace";

export default function SettingsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardShell>
        <PageTransition>
          <SettingsWorkspace />
        </PageTransition>
      </DashboardShell>
    </ProtectedRoute>
  );
}
