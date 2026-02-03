/**
 * Permissions Configuration
 *
 * Role-based access control definitions.
 *
 * IMPORTANT NOTES:
 * - Auth is NOT implemented yet
 * - Role is currently stubbed from query param (?role=user)
 * - Will be replaced by real session/JWT later
 * - This is UI gating only, not security
 */

export type Role = 'guest' | 'user' | 'partner' | 'admin';

export interface RoleConfig {
  id: Role;
  name: string;
  description: string;
}

/**
 * Permission rule: which route IDs a role can access
 */
export interface PermissionRule {
  role: Role;
  allowRouteIds: string[];
}

/**
 * Role definitions
 */
export const rolesConfig: RoleConfig[] = [
  {
    id: 'guest',
    name: 'Guest',
    description: 'Unauthenticated visitor',
  },
  {
    id: 'user',
    name: 'User',
    description: 'Authenticated platform user',
  },
  {
    id: 'partner',
    name: 'Partner',
    description: 'Partner organization user',
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access administrator',
  },
];

/**
 * Permission rules: defines which route IDs each role can access
 * Uses route IDs (not paths) for flexibility
 */
export const permissionRules: PermissionRule[] = [
  {
    role: 'guest',
    allowRouteIds: [
      'home',
      'ecosystem',
      'token',
      'platform',
      'partners',
      'investors',
      'customers',
    ],
  },
  {
    role: 'user',
    allowRouteIds: [
      'home',
      'ecosystem',
      'token',
      'platform',
      'partners',
      'investors',
      'customers',
      'dash.overview',
      'dash.documents',
      'dash.requests',
      'dash.workflow',
      'dash.support',
      // Note: user cannot access dash.settings
    ],
  },
  {
    role: 'partner',
    allowRouteIds: [
      'home',
      'ecosystem',
      'token',
      'platform',
      'partners',
      'investors',
      'customers',
      'dash.overview',
      'dash.documents',
      'dash.requests',
      'dash.workflow',
      'dash.support',
      // Note: partner cannot access dash.settings (same as user for now)
    ],
  },
  {
    role: 'admin',
    allowRouteIds: ['*'], // Admin can access everything
  },
];

/**
 * Get role config by ID
 */
export function getRoleConfig(roleId: Role): RoleConfig | undefined {
  return rolesConfig.find(r => r.id === roleId);
}

/**
 * Get permission rule for a role
 */
export function getPermissionRule(roleId: Role): PermissionRule | undefined {
  return permissionRules.find(r => r.role === roleId);
}

/**
 * Check if role can access a route by route ID
 * Note: This is UI gating only, not security
 */
export function canAccessRouteId(roleId: Role, routeId: string): boolean {
  const rule = getPermissionRule(roleId);
  if (!rule) return false;
  if (rule.allowRouteIds.includes('*')) return true;
  return rule.allowRouteIds.includes(routeId);
}

/**
 * Check if a role string is valid
 */
export function isValidRole(role: string): role is Role {
  return ['guest', 'user', 'partner', 'admin'].includes(role);
}
