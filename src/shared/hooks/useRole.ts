import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export type UserRole = "pjl" | "sqc" | "superadmin";

interface UseRoleReturn {
  role: UserRole | null;
  actualRole: UserRole | null;
  isRole: (roleToCheck: UserRole | UserRole[]) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasAllRoles: (roles: UserRole[]) => boolean;
  isPjl: boolean;
  isSqc: boolean;
  isSuperAdmin: boolean;
  isExactRole: (roleToCheck: UserRole) => boolean;
}

export function useRole(): UseRoleReturn {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useRole must be used within an AuthProvider");
  }

  const { user, isAuthenticated } = context;

  const actualRole: UserRole | null =
    isAuthenticated && user?.role ? (user.role as UserRole) : null;

  const role = actualRole;

  const isRole = (roleToCheck: UserRole | UserRole[]): boolean => {
    if (!actualRole || !isAuthenticated) return false;

    if (Array.isArray(roleToCheck)) {
      return roleToCheck.some((r) => hasRoleAccess(actualRole, r));
    }

    return hasRoleAccess(actualRole, roleToCheck);
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!actualRole || !isAuthenticated || !roles.length) return false;
    return roles.some((r) => hasRoleAccess(actualRole, r));
  };

  const hasAllRoles = (roles: UserRole[]): boolean => {
    if (!actualRole || !isAuthenticated || !roles.length) return false;
    return roles.every((r) => hasRoleAccess(actualRole, r));
  };

  const isExactRole = (roleToCheck: UserRole): boolean => {
    if (!actualRole || !isAuthenticated) return false;
    return actualRole === roleToCheck;
  };

  function hasRoleAccess(userRole: UserRole, targetRole: UserRole): boolean {
    if (userRole === "superadmin") return true;

    if (userRole === targetRole) return true;

    if (userRole === "sqc" && targetRole === "pjl") return true;

    return false;
  }

  const isPjl = isRole("pjl");
  const isSqc = isRole("sqc");
  const isSuperAdmin = isRole("superadmin");

  return {
    role,
    actualRole,
    isRole,
    hasAnyRole,
    hasAllRoles,
    isPjl,
    isSqc,
    isSuperAdmin,
    isExactRole,
  };
}
