/**
 * Alpine component for viewing Secret Santa assignments
 * Shows givers with hidden receivers that can be revealed via verification modal
 */

import type { Assignment, Participant } from '@/types';

export default () => ({
  verificationModal: {
    isOpen: false,
    assignment: null as Assignment | null,
    inputName: '',
    error: null as string | null,
    revealTimer: null as number | null,
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
   * Get current list
   */
  get currentList() {
    return this.historyStore?.currentList;
  },

  /**
   * Check if there's a current list
   */
  get hasCurrentList(): boolean {
    return this.currentList !== null;
  },

  /**
   * Get all assignments
   */
  get assignments(): Assignment[] {
    return this.currentList?.assignments || [];
  },

  /**
   * Get participants from current list
   */
  get participants(): Participant[] {
    return this.currentList?.participants || [];
  },

  /**
   * Get unrevealed assignments count
   */
  get unrevealedCount(): number {
    return this.historyStore?.unrevealed()?.length || 0;
  },

  /**
   * Get revealed assignments count
   */
  get revealedCount(): number {
    return this.historyStore?.revealed()?.length || 0;
  },

  /**
   * Get participant name by ID
   */
  getParticipantName(participantId: string): string {
    const participant = this.participants.find((p) => p.id === participantId);
    return participant?.name || 'Unknown';
  },

  /**
   * Open verification modal for an assignment
   */
  openVerificationModal(assignment: Assignment) {
    const giver = this.participants.find((p) => p.id === assignment.giverId);
    if (!giver) return;

    this.verificationModal.isOpen = true;
    this.verificationModal.assignment = assignment;
    this.verificationModal.inputName = '';
    this.verificationModal.error = null;
    this.verificationModal.isRevealing = false;

    // Focus input after modal opens
    this.$nextTick(() => {
      const input = document.getElementById('verification-name-input') as HTMLInputElement;
      input?.focus();
    });
  },

  /**
   * Close verification modal
   */
  closeVerificationModal() {
    // Clear any active reveal timer
    if (this.verificationModal.revealTimer) {
      clearInterval(this.verificationModal.revealTimer);
      this.verificationModal.revealTimer = null;
    }

    this.verificationModal.isOpen = false;
    this.verificationModal.assignment = null;
    this.verificationModal.inputName = '';
    this.verificationModal.error = null;
    this.verificationModal.isRevealing = false;
    this.verificationModal.revealCountdown = 5;
  },

  /**
   * Verify name and reveal receiver
   */
  verifyAndReveal() {
    const { assignment, inputName } = this.verificationModal;
    if (!assignment) return;

    const giver = this.participants.find((p) => p.id === assignment.giverId);
    if (!giver) return;

    // Validate name (case-insensitive)
    if (inputName.trim().toLowerCase() !== giver.name.toLowerCase()) {
      this.verificationModal.error = 'Name does not match. Please try again.';
      return;
    }

    // Clear error and start reveal
    this.verificationModal.error = null;
    this.verificationModal.isRevealing = true;
    this.verificationModal.revealCountdown = 5;

    // Mark as revealed in store
    this.historyStore?.revealAssignment(assignment.id);

    // Start countdown timer
    this.verificationModal.revealTimer = window.setInterval(() => {
      this.verificationModal.revealCountdown--;

      if (this.verificationModal.revealCountdown <= 0) {
        // Time's up - close modal
        this.closeVerificationModal();
      }
    }, 1000);
  },

  /**
   * Handle Enter key in verification input
   */
  handleVerificationKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.verifyAndReveal();
    } else if (event.key === 'Escape') {
      this.closeVerificationModal();
    }
  },

  /**
   * Clear verification error when typing
   */
  clearVerificationError() {
    this.verificationModal.error = null;
  },

  /**
   * Get receiver name for modal
   */
  get receiverName(): string {
    const { assignment } = this.verificationModal;
    if (!assignment) return '';
    return this.getParticipantName(assignment.receiverId);
  },

  /**
   * Get giver name for modal
   */
  get giverName(): string {
    const { assignment } = this.verificationModal;
    if (!assignment) return '';
    return this.getParticipantName(assignment.giverId);
  },

  /**
   * Check if assignment is revealed
   */
  isRevealed(assignment: Assignment): boolean {
    return assignment.revealed;
  },

  /**
   * Format timestamp for display
   */
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
});
