/**
 * Alpine component for viewing and managing assignment history
 */

import type { GeneratedList } from '@/types';
import { formatTimestamp, formatRelativeTime } from '@/utils/validation';
import { saveParticipants, saveGroups } from '@/utils/local-storage';

export default () => ({
  isOpen: false,
  selectedList: null as GeneratedList | null,
  verificationModal: {
    isOpen: false,
    assignment: null as any,
    inputName: '',
    error: '',
    isRevealing: false,
    revealCountdown: 5,
  },

  /**
   * Get the history store
   */
  get historyStore() {
    return (window as any).Alpine?.store('history');
  },

  /**
   * Get the config store
   */
  get configStore() {
    return (window as any).Alpine?.store('config');
  },

  /**
   * Check if viewing assignments in history is allowed
   */
  get allowHistoryAssignmentView(): boolean {
    return this.configStore?.allowHistoryAssignmentView || false;
  },

  /**
   * Get history
   */
  get history(): GeneratedList[] {
    return this.historyStore?.history || [];
  },

  /**
   * Check if there's any history
   */
  get hasHistory(): boolean {
    return this.history.length > 0;
  },

  /**
   * Get current list ID
   */
  get currentListId(): string | null {
    return this.historyStore?.currentList?.id || null;
  },

  /**
   * Open the modal
   */
  open() {
    this.isOpen = true;
    this.selectedList = null;
  },

  /**
   * Close the modal
   */
  close() {
    this.isOpen = false;
    this.selectedList = null;
  },

  /**
   * Select a list for preview
   */
  selectList(list: GeneratedList) {
    this.selectedList = list;
  },

  /**
   * Deselect list
   */
  deselectList() {
    this.selectedList = null;
  },

  /**
   * Load a list from history
   */
  loadList(listId: string) {
    const success = this.historyStore?.loadFromHistory(listId);

    if (success) {
      this.close();

      // Scroll to assignment viewer
      this.$nextTick(() => {
        const assignmentViewer = document.getElementById('assignment-viewer');
        assignmentViewer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  },

  /**
   * Remake a list with the same participants and groups
   */
  remakeWithSameSettings(list: GeneratedList) {
    if (!confirm('This will start a new session with the same participants and groups from this historical list. Continue?')) {
      return;
    }

    // Get stores
    const participantsStore = (window as any).Alpine?.store('participants');
    const groupsStore = (window as any).Alpine?.store('groups');
    const historyStore = (window as any).Alpine?.store('history');

    // Clear current session
    if (historyStore) {
      historyStore.clearCurrent();
    }

    // Set participants and groups from the historical list
    if (participantsStore) {
      // Deep copy to avoid reference issues
      participantsStore.participants = JSON.parse(JSON.stringify(list.participants));
      // Save using the local-storage function
      saveParticipants(participantsStore.participants);
    }

    if (groupsStore) {
      // Deep copy to avoid reference issues
      groupsStore.groups = JSON.parse(JSON.stringify(list.groups));
      // Save using the local-storage function
      saveGroups(groupsStore.groups);
    }

    // Close modal and navigate to participants page
    this.close();

    // Navigate to participants page
    const navigation = (window as any).Alpine?.$data(document.querySelector('[x-data="navigation"]'));
    if (navigation) {
      navigation.goTo('participants');
    }
  },

  /**
   * Clear all history
   */
  clearHistory() {
    const confirmed = confirm(
      `Are you sure you want to delete all ${this.history.length} saved lists? This cannot be undone.`
    );

    if (confirmed) {
      this.historyStore?.clearHistory();
      this.close();
    }
  },

  /**
   * Check if this is the current list
   */
  isCurrentList(listId: string): boolean {
    return this.currentListId === listId;
  },

  /**
   * Format timestamp
   */
  formatTimestamp(timestamp: number): string {
    return formatTimestamp(timestamp);
  },

  /**
   * Format relative time
   */
  formatRelativeTime(timestamp: number): string {
    return formatRelativeTime(timestamp);
  },

  /**
   * Get assignment count for a list
   */
  getAssignmentCount(list: GeneratedList): number {
    return list.assignments.length;
  },

  /**
   * Get revealed count for a list
   */
  getRevealedCount(list: GeneratedList): number {
    return list.assignments.filter((a) => a.revealed).length;
  },

  /**
   * Get participant name by ID from a list
   */
  getParticipantName(list: GeneratedList, participantId: string): string {
    const participant = list.participants.find((p) => p.id === participantId);
    return participant?.name || 'Unknown';
  },

  /**
   * Get group names for a list
   */
  getGroupNames(list: GeneratedList): string[] {
    return list.groups.map((g) => g.name);
  },

  /**
   * Open verification modal for an assignment (history view)
   */
  openVerificationModal(assignment: any) {
    if (!this.allowHistoryAssignmentView) {
      alert('Viewing assignments in history is disabled. Enable it in Config to use this feature.');
      return;
    }

    this.verificationModal.assignment = assignment;
    this.verificationModal.inputName = '';
    this.verificationModal.error = '';
    this.verificationModal.isRevealing = false;
    this.verificationModal.isOpen = true;

    // Focus input after modal opens
    this.$nextTick(() => {
      const input = document.getElementById('history-verification-name-input');
      input?.focus();
    });
  },

  /**
   * Close verification modal
   */
  closeVerificationModal() {
    this.verificationModal.isOpen = false;
    this.verificationModal.assignment = null;
    this.verificationModal.inputName = '';
    this.verificationModal.error = '';
    this.verificationModal.isRevealing = false;
  },

  /**
   * Clear verification error
   */
  clearVerificationError() {
    this.verificationModal.error = '';
  },

  /**
   * Verify name and reveal assignment
   */
  verifyAndReveal() {
    if (!this.selectedList || !this.verificationModal.assignment) return;

    const inputName = this.verificationModal.inputName.trim();
    const giverName = this.getParticipantName(this.selectedList, this.verificationModal.assignment.giverId);

    if (!inputName) {
      this.verificationModal.error = 'Please enter your name';
      return;
    }

    if (inputName.toLowerCase() !== giverName.toLowerCase()) {
      this.verificationModal.error = 'Name does not match. Please try again.';
      return;
    }

    // Start reveal countdown
    this.verificationModal.isRevealing = true;
    this.verificationModal.revealCountdown = 5;

    const countdown = setInterval(() => {
      this.verificationModal.revealCountdown--;

      if (this.verificationModal.revealCountdown <= 0) {
        clearInterval(countdown);
        this.closeVerificationModal();
      }
    }, 1000);
  },

  /**
   * Get giver name from assignment
   */
  get giverName(): string {
    if (!this.selectedList || !this.verificationModal.assignment) return '';
    return this.getParticipantName(this.selectedList, this.verificationModal.assignment.giverId);
  },

  /**
   * Get receiver name from assignment
   */
  get receiverName(): string {
    if (!this.selectedList || !this.verificationModal.assignment) return '';
    return this.getParticipantName(this.selectedList, this.verificationModal.assignment.receiverId);
  },

  /**
   * Handle Escape key to close modal
   */
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.verificationModal.isOpen) {
        this.closeVerificationModal();
      } else if (this.selectedList) {
        this.deselectList();
      } else {
        this.close();
      }
    }
  },

  /**
   * Handle verification key press
   */
  handleVerificationKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.verificationModal.isRevealing) {
      this.verifyAndReveal();
    }
  },

  /**
   * Initialize event listeners
   */
  init() {
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (this.isOpen) {
        this.handleKeyPress(e);
      }
    });
  },
});
