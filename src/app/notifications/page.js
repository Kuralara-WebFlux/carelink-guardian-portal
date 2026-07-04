"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardShell from "../components/DashboardShell";
import PageTransition from "../components/ui/PageTransition";
import { NotificationsWorkspace } from "../components/RoleWorkspace";

export default function NotificationsPage() {
  return (
    <ProtectedRoute requiredRole={["guardian", "caregiver", "admin"]}>
      <DashboardShell>
        <PageTransition>
          <NotificationsWorkspace />
        </PageTransition>
      </DashboardShell>
    </ProtectedRoute>
  );
}
