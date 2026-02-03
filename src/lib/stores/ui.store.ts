/**
 * UI Store
 * 
 * UI state: navigation, modals, notifications
 * Minimal state for UI interactions.
 */

import { writable } from 'svelte/store';

export interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  notification?: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
}

function createUIStore() {
  const { subscribe, set, update } = writable<UIState>({
    sidebarOpen: false,
    modalOpen: false,
  });

  return {
    subscribe,
    
    toggleSidebar: () => {
      update(state => ({ ...state, sidebarOpen: !state.sidebarOpen }));
    },
    
    setSidebarOpen: (open: boolean) => {
      update(state => ({ ...state, sidebarOpen: open }));
    },
    
    openModal: () => {
      update(state => ({ ...state, modalOpen: true }));
    },
    
    closeModal: () => {
      update(state => ({ ...state, modalOpen: false }));
    },
    
    showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
      update(state => ({
        ...state,
        notification: { message, type },
      }));
    },
    
    clearNotification: () => {
      update(state => ({
        ...state,
        notification: undefined,
      }));
    },
    
    reset: () => {
      set({
        sidebarOpen: false,
        modalOpen: false,
      });
    },
  };
}

export const uiStore = createUIStore();
