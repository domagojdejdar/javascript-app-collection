/**
 * Alpine component for displaying and managing the list of participants
 */

import type { Participant } from '@/types';

export default () => ({
  confirmingDelete: null as string | null,

  /**
   * Get the participants store
   */
  get participantsStore() {
    return (window as any).Alpine?.store('participants');
  },

  /**
   * Get the list of participants
   */
  get participants(): Participant[] {
    return this.participantsStore?.participants || [];
  },

  /**
   * Check if there are any participants
   */
  get hasParticipants(): boolean {
    return this.participants.length > 0;
  },

  /**
   * Get participant count
   */
  get count(): number {
    return this.participants.length;
  },

  /**
   * Get groups store
   */
  get groupsStore() {
    return (window as any).Alpine?.store('groups');
  },

  /**
   * Get groups for a specific participant
   */
  getGroupsForParticipant(participantId: string): string[] {
    const groups = this.groupsStore?.getGroupsForParticipant(participantId) || [];
    return groups.map((g: any) => g.name);
  },

  /**
   * Check if participant has groups
   */
  hasGroups(participantId: string): boolean {
    return this.getGroupsForParticipant(participantId).length > 0;
  },

  /**
   * Handle remove participant
   */
  remove(id: string) {
    // Check if we're in confirmation mode for this participant
    if (this.confirmingDelete === id) {
      // Actually delete
      this.participantsStore?.remove(id);
      this.confirmingDelete = null;
    } else {
      // Set confirmation mode
      this.confirmingDelete = id;

      // Auto-cancel after 3 seconds
      setTimeout(() => {
        if (this.confirmingDelete === id) {
          this.confirmingDelete = null;
        }
      }, 3000);
    }
  },

  /**
   * Cancel delete confirmation
   */
  cancelDelete() {
    this.confirmingDelete = null;
  },

  /**
   * Check if this participant is being confirmed for deletion
   */
  isConfirmingDelete(id: string): boolean {
    return this.confirmingDelete === id;
  },

  /**
   * Clear all participants (with confirmation)
   */
  clearAll() {
    if (this.participants.length === 0) return;

    const confirmed = confirm(
      `Are you sure you want to remove all ${this.participants.length} participants? This will also clear all groups.`
    );

    if (confirmed) {
      this.participantsStore?.clear();
      this.confirmingDelete = null;
    }
  },

  /**
   * Get formatted groups text for a participant
   */
  getGroupsText(participantId: string): string {
    const groups = this.getGroupsForParticipant(participantId);
    if (groups.length === 0) return '';
    if (groups.length === 1) return groups[0];
    if (groups.length === 2) return groups.join(' & ');
    return `${groups.slice(0, -1).join(', ')} & ${groups[groups.length - 1]}`;
  },
});
