/**
 * Alpine.js store for managing groups
 */

import type { Group } from '@/types';
import { loadGroups, saveGroups, clearGroups } from '@/utils/local-storage';
import {
  validateGroupName,
  validateGroupConfiguration,
  createGroup,
  getGroupById,
} from '@/utils/validation';

export interface GroupsStore {
  groups: Group[];
  error: string | null;

  // Actions
  init(): void;
  create(name: string): boolean;
  remove(id: string): void;
  clear(): void;
  addParticipant(groupId: string, participantId: string): boolean;
  removeParticipant(groupId: string, participantId: string): void;
  removeParticipantFromAllGroups(participantId: string): void;
  getById(id: string): Group | undefined;
  getGroupsForParticipant(participantId: string): Group[];
  isInSameGroup(participantId1: string, participantId2: string): boolean;
  validate(): boolean;
}

export default (): GroupsStore => ({
  groups: [],
  error: null,

  /**
   * Initialize the store by loading from localStorage
   */
  init() {
    this.groups = loadGroups();
  },

  /**
   * Create a new group
   * @param name - Name of the group to create
   * @returns true if successful, false if validation fails
   */
  create(name: string): boolean {
    this.error = null;

    // Validate the name
    const validation = validateGroupName(name, this.groups);

    if (!validation.isValid) {
      this.error = validation.errorMessage || 'Invalid group name';
      return false;
    }

    // Create and add the group
    const newGroup = createGroup(name);
    this.groups.push(newGroup);

    // Save to localStorage
    saveGroups(this.groups);

    return true;
  },

  /**
   * Remove a group by ID
   * @param id - ID of the group to remove
   */
  remove(id: string): void {
    this.error = null;

    const index = this.groups.findIndex((g) => g.id === id);

    if (index === -1) {
      this.error = 'Group not found';
      return;
    }

    this.groups.splice(index, 1);

    // Save to localStorage
    saveGroups(this.groups);
  },

  /**
   * Clear all groups
   */
  clear(): void {
    this.groups = [];
    this.error = null;
    clearGroups();
  },

  /**
   * Add a participant to a group
   * @param groupId - ID of the group
   * @param participantId - ID of the participant to add
   * @returns true if successful
   */
  addParticipant(groupId: string, participantId: string): boolean {
    this.error = null;

    const group = this.groups.find((g) => g.id === groupId);

    if (!group) {
      this.error = 'Group not found';
      return false;
    }

    // Check if participant is already in the group
    if (group.participantIds.includes(participantId)) {
      this.error = 'Participant is already in this group';
      return false;
    }

    // Add the participant
    group.participantIds.push(participantId);

    // Save to localStorage
    saveGroups(this.groups);

    return true;
  },

  /**
   * Remove a participant from a group
   * @param groupId - ID of the group
   * @param participantId - ID of the participant to remove
   */
  removeParticipant(groupId: string, participantId: string): void {
    this.error = null;

    const group = this.groups.find((g) => g.id === groupId);

    if (!group) {
      this.error = 'Group not found';
      return;
    }

    const index = group.participantIds.indexOf(participantId);

    if (index === -1) {
      this.error = 'Participant not in this group';
      return;
    }

    group.participantIds.splice(index, 1);

    // If group is now empty, remove it
    if (group.participantIds.length === 0) {
      this.remove(groupId);
    } else {
      // Save to localStorage
      saveGroups(this.groups);
    }
  },

  /**
   * Remove a participant from all groups
   * @param participantId - ID of the participant to remove
   */
  removeParticipantFromAllGroups(participantId: string): void {
    let modified = false;

    this.groups.forEach((group) => {
      const index = group.participantIds.indexOf(participantId);
      if (index !== -1) {
        group.participantIds.splice(index, 1);
        modified = true;
      }
    });

    // Remove empty groups
    this.groups = this.groups.filter((group) => group.participantIds.length > 0);

    if (modified) {
      saveGroups(this.groups);
    }
  },

  /**
   * Get a group by ID
   * @param id - Group ID
   */
  getById(id: string): Group | undefined {
    return getGroupById(id, this.groups);
  },

  /**
   * Get all groups that contain a specific participant
   * @param participantId - ID of the participant
   */
  getGroupsForParticipant(participantId: string): Group[] {
    return this.groups.filter((group) =>
      group.participantIds.includes(participantId)
    );
  },

  /**
   * Check if two participants are in the same group
   * @param participantId1 - First participant ID
   * @param participantId2 - Second participant ID
   */
  isInSameGroup(participantId1: string, participantId2: string): boolean {
    return this.groups.some(
      (group) =>
        group.participantIds.includes(participantId1) &&
        group.participantIds.includes(participantId2)
    );
  },

  /**
   * Validate the current group configuration
   * @returns true if valid
   */
  validate(): boolean {
    this.error = null;

    const participantsStore = (window as any).Alpine?.store('participants');
    if (!participantsStore) {
      this.error = 'Participants store not available';
      return false;
    }

    const validation = validateGroupConfiguration(
      this.groups,
      participantsStore.participants
    );

    if (!validation.isValid) {
      this.error = validation.errorMessage || 'Invalid group configuration';
      return false;
    }

    return true;
  },
});
