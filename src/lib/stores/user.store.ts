/**
 * User Store
 *
 * User state: role, authentication (stubbed)
 *
 * IMPORTANT:
 * - Auth is NOT implemented yet
 * - Role is read from URL query param (?role=user)
 * - Default role is 'guest'
 * - Will be replaced by real session later
 */

import { writable, get } from 'svelte/store';
import { type Role, isValidRole } from '$config/permissions.config';

export interface UserState {
  role: Role;
  isAuthenticated: boolean;
}

function createUserStore() {
  const { subscribe, set, update } = writable<UserState>({
    role: 'guest',
    isAuthenticated: false,
  });

  return {
    subscribe,

    /**
     * Set role directly
     */
    setRole: (role: Role) => {
      update(state => ({
        ...state,
        role,
        isAuthenticated: role !== 'guest',
      }));
    },

    /**
     * Get current role
     */
    getRole: (): Role => {
      return get({ subscribe }).role;
    },

    /**
     * Initialize role from URL query param
     * Usage: initRoleFromUrl(url) where url is from page load
     */
    initRoleFromUrl: (url: URL) => {
      const roleParam = url.searchParams.get('role');
      if (roleParam && isValidRole(roleParam)) {
        update(state => ({
          ...state,
          role: roleParam,
          isAuthenticated: roleParam !== 'guest',
        }));
      }
    },

    /**
     * Reset to guest
     */
    reset: () => {
      set({
        role: 'guest',
        isAuthenticated: false,
      });
    },
  };
}

export const userStore = createUserStore();
