/**
 * Alpine.js store for managing Secret Santa assignment history
 */

import type { GeneratedList, Assignment, Participant, Group } from '@/types';
import {
  loadHistory,
  saveToHistory,
  updateHistoryEntry,
  clearHistory as clearHistoryStorage,
  loadCurrentList,
  saveCurrentList,
  clearCurrentList as clearCurrentListStorage,
} from '@/utils/local-storage';
import {
  generateAssignments,
  validateAssignments,
} from '@/utils/assignment-logic';
import { validateMinimumParticipants } from '@/utils/validation';
import { generateId } from '@/utils/validation';

export interface HistoryStore {
  currentList: GeneratedList | null;
  history: GeneratedList[];
  error: string | null;
  isGenerating: boolean;

  // Actions
  init(): void;
  generate(): boolean;
  loadFromHistory(listId: string): boolean;
  clearHistory(): void;
  clearCurrent(): void;
  revealAssignment(assignmentId: string): void;
  unrevealed(): Assignment[];
  revealed(): Assignment[];
  getAssignmentForGiver(giverId: string): Assignment | undefined;
  canGenerate(): boolean;
  trimHistory(maxCount: number): void;
  getMaxHistoryCount(): number;
}

export default (): HistoryStore => ({
  currentList: null,
  history: [],
  error: null,
  isGenerating: false,

  /**
   * Initialize the store by loading from localStorage
   */
  init() {
    this.currentList = loadCurrentList();
    this.history = loadHistory();
  },

  /**
   * Generate new Secret Santa assignments
   * @returns true if successful
   */
  generate(): boolean {
    this.error = null;
    this.isGenerating = true;

    const participantsStore = (window as any).Alpine?.store('participants');
    const groupsStore = (window as any).Alpine?.store('groups');

    if (!participantsStore || !groupsStore) {
      this.error = 'Required stores not available';
      this.isGenerating = false;
      return false;
    }

    const participants: Participant[] = participantsStore.participants;
    const groups: Group[] = groupsStore.groups;

    // Validate minimum participants
    const minValidation = validateMinimumParticipants(participants);
    if (!minValidation.isValid) {
      this.error = minValidation.errorMessage || 'Not enough participants';
      this.isGenerating = false;
      return false;
    }

    // Validate group configuration if groups exist
    if (groups.length > 0) {
      const groupValidation = groupsStore.validate();
      if (!groupValidation) {
        this.error = groupsStore.error || 'Invalid group configuration';
        this.isGenerating = false;
        return false;
      }
    }

    // Generate assignments
    const result = generateAssignments(participants, groups);

    this.isGenerating = false;

    if (!result.success) {
      this.error = result.error || 'Failed to generate assignments';
      return false;
    }

    // Create new generated list
    const newList: GeneratedList = {
      id: generateId(),
      timestamp: Date.now(),
      assignments: result.assignments!,
      participants: JSON.parse(JSON.stringify(participants)), // Deep copy
      groups: JSON.parse(JSON.stringify(groups)), // Deep copy
    };

    // Set as current list
    this.currentList = newList;
    saveCurrentList(newList);

    // Add to history
    saveToHistory(newList);
    this.history = loadHistory();

    return true;
  },

  /**
   * Load a list from history
   * @param listId - ID of the list to load
   * @returns true if successful
   */
  loadFromHistory(listId: string): boolean {
    this.error = null;

    const list = this.history.find((l) => l.id === listId);

    if (!list) {
      this.error = 'List not found in history';
      return false;
    }

    // Validate the assignments are still valid
    const isValid = validateAssignments(
      list.assignments,
      list.participants,
      list.groups
    );

    if (!isValid) {
      this.error = 'This historical list contains invalid assignments';
      return false;
    }

    // Set as current list
    this.currentList = list;
    saveCurrentList(list);

    return true;
  },

  /**
   * Clear all history
   */
  clearHistory(): void {
    this.history = [];
    this.error = null;
    clearHistoryStorage();
  },

  /**
   * Clear the current list
   */
  clearCurrent(): void {
    this.currentList = null;
    this.error = null;
    clearCurrentListStorage();
  },

  /**
   * Reveal an assignment (mark it as revealed)
   * @param assignmentId - ID of the assignment to reveal
   */
  revealAssignment(assignmentId: string): void {
    if (!this.currentList) {
      this.error = 'No current list to reveal';
      return;
    }

    const assignment = this.currentList.assignments.find(
      (a) => a.id === assignmentId
    );

    if (!assignment) {
      this.error = 'Assignment not found';
      return;
    }

    // Mark as revealed
    assignment.revealed = true;
    assignment.revealedAt = Date.now();

    // Save to localStorage (both current list and history entry)
    saveCurrentList(this.currentList);
    updateHistoryEntry(this.currentList);

    // Update local history array to reflect the change
    const historyIndex = this.history.findIndex((h) => h.id === this.currentList!.id);
    if (historyIndex !== -1) {
      this.history[historyIndex] = { ...this.currentList };
    }
  },

  /**
   * Get unrevealed assignments
   */
  unrevealed(): Assignment[] {
    if (!this.currentList) return [];
    return this.currentList.assignments.filter((a) => !a.revealed);
  },

  /**
   * Get revealed assignments
   */
  revealed(): Assignment[] {
    if (!this.currentList) return [];
    return this.currentList.assignments.filter((a) => a.revealed);
  },

  /**
   * Get the assignment for a specific giver
   * @param giverId - ID of the giver
   */
  getAssignmentForGiver(giverId: string): Assignment | undefined {
    if (!this.currentList) return undefined;
    return this.currentList.assignments.find((a) => a.giverId === giverId);
  },

  /**
   * Check if assignments can be generated
   */
  canGenerate(): boolean {
    const participantsStore = (window as any).Alpine?.store('participants');
    if (!participantsStore) return false;

    return participantsStore.count() >= 2;
  },

  /**
   * Trim history to a specific maximum count
   * @param maxCount - Maximum number of history items to keep
   */
  trimHistory(maxCount: number): void {
    if (this.history.length <= maxCount) return;

    // Keep only the most recent maxCount items
    this.history = this.history.slice(0, maxCount);

    // Save to localStorage
    try {
      const StorageKeys = { HISTORY: 'secret-santa-history' };
      localStorage.setItem(StorageKeys.HISTORY, JSON.stringify(this.history));
    } catch (error) {
      console.error('Error trimming history:', error);
    }
  },

  /**
   * Get the maximum history count from config
   */
  getMaxHistoryCount(): number {
    const configStore = (window as any).Alpine?.store('config');
    return configStore?.maxHistoryCount || 5;
  },
});
