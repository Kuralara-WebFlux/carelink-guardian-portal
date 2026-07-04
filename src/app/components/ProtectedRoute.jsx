"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "./DashboardContext";
import { normalizeAuthUser } from "../utils/auth";

export default function ProtectedRoute({ children, requiredRole }) {
  const router = useRouter();
  const { currentUser, isHydrated, setCurrentUser } = useDashboard();
  
  const allowedRolesString = Array.isArray(requiredRole) ? requiredRole.join(",") : requiredRole;
  const allowedRoles = useMemo(() => {
    return Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedRolesString]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!currentUser) {
      const storedUser = localStorage.getItem("carelinkUser");

      if (storedUser) {
        const parsedUser = normalizeAuthUser(JSON.parse(storedUser));

        if (parsedUser && allowedRoles.includes(parsedUser.role)) {
          setCurrentUser(parsedUser);
          return;
        }
      }
    }

    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
      router.replace("/login");
    }
  }, [allowedRoles, currentUser, isHydrated, router, setCurrentUser]);

  if (!isHydrated || !currentUser) {
    return null;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return null;
  }

  return children;
}
