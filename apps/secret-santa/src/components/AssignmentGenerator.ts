/**
 * Alpine component for generating Secret Santa assignments
 */

import { showConfirm } from '@/utils/modal';

export default () => ({
  /**
   * Get the history store
   */
  get historyStore() {
    return (window as any).Alpine?.store('history');
  },

  /**
   * Get the participants store
   */
  get participantsStore() {
    return (window as any).Alpine?.store('participants');
  },

  /**
   * Get the groups store
   */
  get groupsStore() {
    return (window as any).Alpine?.store('groups');
  },

  /**
   * Check if we can generate assignments
   */
  get canGenerate(): boolean {
    return this.historyStore?.canGenerate() || false;
  },

  /**
   * Check if currently generating
   */
  get isGenerating(): boolean {
    return this.historyStore?.isGenerating || false;
  },

  /**
   * Get error from history store
   */
  get error() {
    return this.historyStore?.error || null;
  },

  /**
   * Get participant count
   */
  get participantCount(): number {
    return this.participantsStore?.count() || 0;
  },

  /**
   * Get group count
   */
  get groupCount(): number {
    return this.groupsStore?.groups?.length || 0;
  },

  /**
   * Check if there's a current list
   */
  get hasCurrentList(): boolean {
    return this.historyStore?.currentList !== null;
  },

  /**
   * Check if any assignments have been revealed
   */
  get hasRevealedAssignments(): boolean {
    return (this.historyStore?.revealed()?.length || 0) > 0;
  },

  /**
   * Get the button label (Generate vs Regenerate)
   */
  get generateButtonLabel(): string {
    const i18nStore = (window as any).Alpine?.store('i18n');
    return this.hasCurrentList
      ? i18nStore?.t('assignments.regenerate') || 'Regenerate Assignments'
      : i18nStore?.t('assignments.generate') || 'Generate Assignments';
  },

  /**
   * Generate new assignments
   */
  generate() {
    // If there's a current list with revealed assignments, confirm first
    if (this.hasCurrentList && this.hasRevealedAssignments) {
      showConfirm('assignments.regeneratePrompt', () => {
        const success = this.historyStore?.generate();

        if (success) {
          // Scroll to assignments view
          (this as any).$nextTick(() => {
            const assignmentViewer = document.getElementById('assignment-viewer');
            assignmentViewer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });
      return;
    }

    const success = this.historyStore?.generate();

    if (success) {
      // Scroll to assignments view
      (this as any).$nextTick(() => {
        const assignmentViewer = document.getElementById('assignment-viewer');
        assignmentViewer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  },

  /**
   * Clear current assignments
   */
  clearCurrent() {
    showConfirm('assignments.clearPrompt', () => {
      this.historyStore?.clearCurrent();
    });
  },

  /**
   * Get minimum participants message
   */
  get minimumParticipantsMessage(): string {
    const i18nStore = (window as any).Alpine?.store('i18n');
    const count = this.participantCount;
    if (count === 0) return i18nStore?.t('assignments.minParticipants') || 'Add at least 2 participants to generate assignments';
    if (count === 1) return i18nStore?.t('assignments.oneMore') || 'Add 1 more participant to generate assignments';
    return '';
  },
});
