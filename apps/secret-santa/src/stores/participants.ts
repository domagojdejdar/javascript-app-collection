/**
 * Alpine.js store for managing participants
 */

import type { Participant } from '@/types';
import {
  loadParticipants,
  saveParticipants,
  clearParticipants,
} from '@/utils/local-storage';
import {
  validateParticipantName,
  createParticipant,
  getParticipantById,
} from '@/utils/validation';

export interface ParticipantsStore {
  participants: Participant[];
  error: string | null;

  // Actions
  init(): void;
  add(name: string): boolean;
  remove(id: string): void;
  clear(): void;
  getById(id: string): Participant | undefined;
  exists(name: string): boolean;
  count(): number;
}

export default (): ParticipantsStore => ({
  participants: [],
  error: null,

  /**
   * Initialize the store by loading from localStorage
   */
  init() {
    this.participants = loadParticipants();
  },

  /**
   * Add a new participant
   * @param name - Name of the participant to add
   * @returns true if successful, false if validation fails
   */
  add(name: string): boolean {
    this.error = null;

    // Validate the name
    const validation = validateParticipantName(name, this.participants);

    if (!validation.isValid) {
      this.error = validation.errorMessage || 'Invalid participant name';
      return false;
    }

    // Create and add the participant
    const newParticipant = createParticipant(name);
    this.participants.push(newParticipant);

    // Save to localStorage
    saveParticipants(this.participants);

    return true;
  },

  /**
   * Remove a participant by ID
   * @param id - ID of the participant to remove
   */
  remove(id: string): void {
    this.error = null;

    const index = this.participants.findIndex((p) => p.id === id);

    if (index === -1) {
      this.error = 'Participant not found';
      return;
    }

    this.participants.splice(index, 1);

    // Save to localStorage
    saveParticipants(this.participants);

    // Also need to remove from groups
    const groupsStore = (window as any).Alpine?.store('groups');
    if (groupsStore) {
      groupsStore.removeParticipantFromAllGroups(id);
    }
  },

  /**
   * Clear all participants
   */
  clear(): void {
    this.participants = [];
    this.error = null;
    clearParticipants();

    // Also clear all groups
    const groupsStore = (window as any).Alpine?.store('groups');
    if (groupsStore) {
      groupsStore.clear();
    }
  },

  /**
   * Get a participant by ID
   * @param id - Participant ID
   */
  getById(id: string): Participant | undefined {
    return getParticipantById(id, this.participants);
  },

  /**
   * Check if a participant with the given name exists (case-insensitive)
   * @param name - Name to check
   */
  exists(name: string): boolean {
    return this.participants.some(
      (p) => p.name.toLowerCase() === name.trim().toLowerCase()
    );
  },

  /**
   * Get the count of participants
   */
  count(): number {
    return this.participants.length;
  },
});
