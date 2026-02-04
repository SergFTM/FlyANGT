/**
 * Publish Store
 *
 * LocalStorage-based store for publish packets.
 */

import { browser } from '$app/environment';
import { publishConfig } from '$config/publish.config';
import type {
  PublishPacket,
  SavedPacketRef,
  PublishStoreState,
  ChecklistItemState,
  DeploymentStep,
} from './types';
import { extractPacketRef } from './types';

/**
 * Subscriber callback type
 */
type Subscriber = (state: PublishStoreState) => void;

/**
 * Create publish store
 */
function createPublishStore() {
  let state: PublishStoreState = {
    packets: [],
    selectedPacketId: null,
    currentPacket: null,
  };

  const subscribers: Set<Subscriber> = new Set();

  /**
   * Notify all subscribers
   */
  function notify() {
    for (const subscriber of subscribers) {
      subscriber(state);
    }
  }

  /**
   * Load packets list from localStorage
   */
  function loadPacketsList(): void {
    if (!browser) return;

    try {
      const stored = localStorage.getItem(publishConfig.storage.packetsKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          state = { ...state, packets: parsed };
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  /**
   * Save packets list to localStorage
   */
  function savePacketsList(): void {
    if (!browser) return;

    try {
      localStorage.setItem(
        publishConfig.storage.packetsKey,
        JSON.stringify(state.packets)
      );
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Load selected packet ID from localStorage
   */
  function loadSelectedPacketId(): void {
    if (!browser) return;

    try {
      const stored = localStorage.getItem(publishConfig.storage.selectedPacketKey);
      if (stored) {
        state = { ...state, selectedPacketId: stored };
      }
    } catch {
      // Ignore errors
    }
  }

  /**
   * Save selected packet ID to localStorage
   */
  function saveSelectedPacketId(): void {
    if (!browser) return;

    try {
      if (state.selectedPacketId) {
        localStorage.setItem(
          publishConfig.storage.selectedPacketKey,
          state.selectedPacketId
        );
      } else {
        localStorage.removeItem(publishConfig.storage.selectedPacketKey);
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Get packet storage key
   */
  function getPacketKey(id: string): string {
    return `${publishConfig.storage.checklistKeyPrefix}${id}`;
  }

  /**
   * Load full packet from localStorage
   */
  function loadPacket(id: string): PublishPacket | null {
    if (!browser) return null;

    try {
      const stored = localStorage.getItem(getPacketKey(id));
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  }

  /**
   * Save full packet to localStorage
   */
  function savePacket(packet: PublishPacket): void {
    if (!browser) return;

    try {
      localStorage.setItem(getPacketKey(packet.id), JSON.stringify(packet));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Delete packet from localStorage
   */
  function deletePacketStorage(id: string): void {
    if (!browser) return;

    try {
      localStorage.removeItem(getPacketKey(id));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Subscribe to store changes
   */
  function subscribe(callback: Subscriber): () => void {
    subscribers.add(callback);
    callback(state);
    return () => subscribers.delete(callback);
  }

  /**
   * Create and save a new packet
   */
  function createPacket(packet: PublishPacket): boolean {
    // Save full packet
    savePacket(packet);

    // Add to packets list
    const ref = extractPacketRef(packet);
    state = {
      ...state,
      packets: [...state.packets, ref],
      selectedPacketId: packet.id,
      currentPacket: packet,
    };

    savePacketsList();
    saveSelectedPacketId();
    notify();
    return true;
  }

  /**
   * Update an existing packet
   */
  function updatePacket(packet: PublishPacket): boolean {
    const index = state.packets.findIndex(p => p.id === packet.id);
    if (index === -1) {
      return false;
    }

    // Update timestamps
    const updated: PublishPacket = {
      ...packet,
      updatedAt: new Date().toISOString(),
    };

    // Save full packet
    savePacket(updated);

    // Update packets list
    const ref = extractPacketRef(updated);
    const newPackets = [...state.packets];
    newPackets[index] = ref;

    state = {
      ...state,
      packets: newPackets,
      currentPacket: state.selectedPacketId === packet.id ? updated : state.currentPacket,
    };

    savePacketsList();
    notify();
    return true;
  }

  /**
   * Select a packet
   */
  function selectPacket(id: string | null): boolean {
    if (id === null) {
      state = {
        ...state,
        selectedPacketId: null,
        currentPacket: null,
      };
      saveSelectedPacketId();
      notify();
      return true;
    }

    const ref = state.packets.find(p => p.id === id);
    if (!ref) {
      return false;
    }

    const packet = loadPacket(id);
    state = {
      ...state,
      selectedPacketId: id,
      currentPacket: packet,
    };

    saveSelectedPacketId();
    notify();
    return true;
  }

  /**
   * Delete a packet
   */
  function deletePacket(id: string): boolean {
    const index = state.packets.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }

    // Delete storage
    deletePacketStorage(id);

    // Update state
    const newPackets = state.packets.filter(p => p.id !== id);
    const newSelectedId = state.selectedPacketId === id ? null : state.selectedPacketId;
    const newCurrentPacket = state.selectedPacketId === id ? null : state.currentPacket;

    state = {
      ...state,
      packets: newPackets,
      selectedPacketId: newSelectedId,
      currentPacket: newCurrentPacket,
    };

    savePacketsList();
    saveSelectedPacketId();
    notify();
    return true;
  }

  /**
   * Update checklist item
   */
  function updateChecklistItem(
    packetId: string,
    itemId: string,
    checked: boolean
  ): boolean {
    if (state.currentPacket?.id !== packetId) {
      return false;
    }

    const packet = state.currentPacket;
    const itemIndex = packet.checklist.findIndex(i => i.id === itemId);

    let newChecklist: ChecklistItemState[];
    if (itemIndex === -1) {
      // Add new item
      newChecklist = [
        ...packet.checklist,
        {
          id: itemId,
          checked,
          checkedAt: checked ? new Date().toISOString() : undefined,
        },
      ];
    } else {
      // Update existing item
      newChecklist = [...packet.checklist];
      newChecklist[itemIndex] = {
        ...newChecklist[itemIndex],
        checked,
        checkedAt: checked ? new Date().toISOString() : undefined,
      };
    }

    const updated: PublishPacket = {
      ...packet,
      checklist: newChecklist,
      updatedAt: new Date().toISOString(),
    };

    // Update manifest checklist counts
    const checklistComplete = newChecklist.filter(i => i.checked).length;
    updated.manifest = {
      ...updated.manifest,
      checklistComplete,
      checklistTotal: publishConfig.checklistItems.length,
    };

    // Check if all P0 items are complete
    const p0Items = publishConfig.checklistItems.filter(i => i.priority === 'p0');
    const p0Complete = p0Items.every(item =>
      newChecklist.find(c => c.id === item.id)?.checked
    );

    // Update status based on checklist completion
    if (p0Complete && updated.manifest.gateStatus === 'green') {
      updated.status = 'ready';
    }

    return updatePacket(updated);
  }

  /**
   * Update deployment step
   */
  function updateDeploymentStep(
    packetId: string,
    stepNumber: number,
    completed: boolean
  ): boolean {
    if (state.currentPacket?.id !== packetId) {
      return false;
    }

    const packet = state.currentPacket;
    const stepIndex = packet.deploymentSteps.findIndex(s => s.step === stepNumber);

    if (stepIndex === -1) {
      return false;
    }

    const newSteps: DeploymentStep[] = [...packet.deploymentSteps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      completed,
      completedAt: completed ? new Date().toISOString() : undefined,
    };

    const updated: PublishPacket = {
      ...packet,
      deploymentSteps: newSteps,
      updatedAt: new Date().toISOString(),
    };

    return updatePacket(updated);
  }

  /**
   * Update packet status
   */
  function updatePacketStatus(
    packetId: string,
    status: PublishPacket['status']
  ): boolean {
    if (state.currentPacket?.id !== packetId) {
      return false;
    }

    const updated: PublishPacket = {
      ...state.currentPacket,
      status,
      updatedAt: new Date().toISOString(),
    };

    return updatePacket(updated);
  }

  /**
   * Get current packet
   */
  function getCurrentPacket(): PublishPacket | null {
    return state.currentPacket;
  }

  /**
   * Get packets list
   */
  function getPackets(): SavedPacketRef[] {
    return [...state.packets];
  }

  /**
   * Reload from localStorage
   */
  function reload(): void {
    loadPacketsList();
    loadSelectedPacketId();

    if (state.selectedPacketId) {
      const packet = loadPacket(state.selectedPacketId);
      state = { ...state, currentPacket: packet };
    }

    notify();
  }

  /**
   * Reset all packets
   */
  function resetAll(): void {
    // Delete all packet storage
    for (const packet of state.packets) {
      deletePacketStorage(packet.id);
    }

    state = {
      packets: [],
      selectedPacketId: null,
      currentPacket: null,
    };

    savePacketsList();
    saveSelectedPacketId();
    notify();
  }

  // Initial load
  if (browser) {
    loadPacketsList();
    loadSelectedPacketId();

    if (state.selectedPacketId) {
      const packet = loadPacket(state.selectedPacketId);
      state = { ...state, currentPacket: packet };
    }
  }

  return {
    subscribe,
    createPacket,
    updatePacket,
    selectPacket,
    deletePacket,
    updateChecklistItem,
    updateDeploymentStep,
    updatePacketStatus,
    getCurrentPacket,
    getPackets,
    reload,
    resetAll,
  };
}

/**
 * Publish store singleton
 */
export const publishStore = createPublishStore();
