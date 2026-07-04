import { ADMIN, BETA_ACCOUNTS, CAREGIVERS, FACILITY_ALPHA, FACILITY_BETA, GUARDIANS } from "../data/carelinkData";

export const AUTH_ACCOUNTS = [
  { ...ADMIN, role: "admin", institutionId: FACILITY_ALPHA, institutionName: "CareLink Facility Alpha" },
  ...CAREGIVERS.map((account) => ({ ...account, role: "caregiver", institutionId: FACILITY_ALPHA, institutionName: "CareLink Facility Alpha" })),
  ...GUARDIANS.map((account) => ({ ...account, role: "guardian", institutionId: FACILITY_ALPHA, institutionName: "CareLink Facility Alpha" })),
  ...BETA_ACCOUNTS.map((account) => ({ ...account, institutionId: FACILITY_BETA, institutionName: "CareLink Beta" })),
];

export function getAccountForLogin(identifier = "") {
  const normalized = identifier.trim().toLowerCase();
  return AUTH_ACCOUNTS.find((account) => account.username.toLowerCase() === normalized || account.email.toLowerCase() === normalized) || null;
}

export function validateCredentials(identifier = "", password = "", workspace = "") {
  const account = getAccountForLogin(identifier);
  if (!account || account.password !== password) return null;
  if (workspace === "beta") return account.institutionId === FACILITY_BETA ? account : null;
  if (account.institutionId === FACILITY_BETA) return null;
  return account.role === workspace ? account : null;
}

export function getRoleForEmail(identifier = "") {
  const account = getAccountForLogin(identifier);
  return account ? account.role : null;
}

export function getAccountForEmail(identifier = "") {
  return getAccountForLogin(identifier);
}

export function normalizeAuthUser(user) {
  const account = getAccountForLogin(user?.email || user?.username || "");
  if (!account) return null;

  return {
    id: account.id,
    name: account.name,
    username: account.username,
    email: account.email,
    role: account.role,
    institutionId: account.institutionId,
    institutionName: account.institutionName,
    guardianId: account.guardianId,
    caregiverId: account.caregiverId,
    adminId: account.adminId,
  };
}
