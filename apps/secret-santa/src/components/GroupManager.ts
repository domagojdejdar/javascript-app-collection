/**
 * Alpine component for managing participant groups
 */

import type { Group, Participant } from '@/types';

export default () => ({
  newGroupName: '',
  isCreatingGroup: false,
  expandedGroups: [] as string[],
  selectedParticipants: {} as Record<string, string[]>, // groupId -> participantIds

  /**
   * Get i18n store
   */
  get i18nStore() {
    return (window as any).Alpine?.store('i18n');
  },

  /**
   * Get the groups store
   */
  get groupsStore() {
    return (window as any).Alpine?.store('groups');
  },

  /**
   * Get the participants store
   */
  get participantsStore() {
    return (window as any).Alpine?.store('participants');
  },

  /**
   * Get all groups
   */
  get groups(): Group[] {
    return this.groupsStore?.groups || [];
  },

  /**
   * Get all participants
   */
  get participants(): Participant[] {
    return this.participantsStore?.participants || [];
  },

  /**
   * Get participants not in any group
   */
  get unassignedParticipants(): Participant[] {
    const participantsInGroups = new Set<string>();

    this.groups.forEach((group: Group) => {
      group.participantIds.forEach((id) => participantsInGroups.add(id));
    });

    return this.participants.filter((p) => !participantsInGroups.has(p.id));
  },

  /**
   * Get available participants for a specific group (not in any group)
   * Each participant can only be in one group max
   */
  getAvailableParticipants(groupId: string): Participant[] {
    const group = this.groups.find((g: Group) => g.id === groupId);
    if (!group) return [];

    // Get all participants already in any group
    const participantsInGroups = new Set<string>();
    this.groups.forEach((g: Group) => {
      g.participantIds.forEach((id) => participantsInGroups.add(id));
    });

    // Return only participants not in any group
    return this.participants.filter(
      (p) => !participantsInGroups.has(p.id)
    );
  },

  /**
   * Get participants in a specific group
   */
  getGroupParticipants(groupId: string): Participant[] {
    const group = this.groups.find((g: Group) => g.id === groupId);
    if (!group) return [];

    return this.participants.filter((p) =>
      group.participantIds.includes(p.id)
    );
  },

  /**
   * Check if there are any groups
   */
  get hasGroups(): boolean {
    return this.groups.length > 0;
  },

  /**
   * Check if there are participants to group
   */
  get canCreateGroups(): boolean {
    return this.participants.length >= 2;
  },

  /**
   * Create a new group
   */
  createGroup() {
    if (!this.newGroupName.trim()) return;

    const success = this.groupsStore?.create(this.newGroupName);

    if (success) {
      this.newGroupName = '';
      this.isCreatingGroup = false;
    }
  },

  /**
   * Delete a group
   */
  deleteGroup(groupId: string) {
    const group = this.groups.find((g: Group) => g.id === groupId);
    if (!group) return;

    const confirmed = confirm(
      this.i18nStore?.t('groups.removePrompt', { name: group.name }) || `Remove group "${group.name}"? Participants will not be deleted.`
    );

    if (confirmed) {
      this.groupsStore?.remove(groupId);
      this.collapseGroup(groupId);
    }
  },

  /**
   * Add participant to group
   */
  addToGroup(groupId: string, participantId: string) {
    this.groupsStore?.addParticipant(groupId, participantId);
  },

  /**
   * Remove participant from group
   */
  removeFromGroup(groupId: string, participantId: string) {
    this.groupsStore?.removeParticipant(groupId, participantId);
  },

  /**
   * Toggle group expansion
   */
  toggleGroup(groupId: string) {
    const index = this.expandedGroups.indexOf(groupId);
    if (index > -1) {
      this.expandedGroups.splice(index, 1);
    } else {
      this.expandedGroups.push(groupId);
    }
  },

  /**
   * Check if group is expanded
   */
  isExpanded(groupId: string): boolean {
    return this.expandedGroups.includes(groupId);
  },

  /**
   * Collapse a group
   */
  collapseGroup(groupId: string) {
    const index = this.expandedGroups.indexOf(groupId);
    if (index > -1) {
      this.expandedGroups.splice(index, 1);
    }
  },

  /**
   * Show create group form
   */
  showCreateForm() {
    this.isCreatingGroup = true;
    // Focus the input after render
    this.$nextTick(() => {
      const input = document.querySelector(
        '#new-group-input'
      ) as HTMLInputElement;
      input?.focus();
    });
  },

  /**
   * Hide create group form
   */
  hideCreateForm() {
    this.isCreatingGroup = false;
    this.newGroupName = '';
  },

  /**
   * Get group error
   */
  get groupError() {
    return this.groupsStore?.error || null;
  },

  /**
   * Clear group error
   */
  clearGroupError() {
    if (this.groupsStore?.error) {
      this.groupsStore.error = null;
    }
  },

  /**
   * Handle Enter key on group name input
   */
  handleGroupNameKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.createGroup();
    } else if (event.key === 'Escape') {
      this.hideCreateForm();
    }
  },

  /**
   * Get participant name by ID
   */
  getParticipantName(participantId: string): string {
    const participant = this.participants.find((p) => p.id === participantId);
    return participant?.name || 'Unknown';
  },

  /**
   * Quick add multiple participants to group (for dropdown/multiselect)
   */
  quickAddToGroup(groupId: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    const participantId = select.value;

    if (participantId) {
      this.addToGroup(groupId, participantId);
      select.value = ''; // Reset selection
    }
  },
});
