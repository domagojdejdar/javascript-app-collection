/**
 * Alpine component for Configuration page
 */

import { showAlert, showConfirm } from '@/utils/modal';

export default () => ({
  tempMaxHistoryCount: 5,
  hasUnsavedChanges: false,

  /**
   * Get i18n store
   */
  get i18nStore() {
    return (window as any).Alpine?.store('i18n');
  },

  /**
   * Get config store
   */
  get configStore() {
    return (window as any).Alpine?.store('config');
  },

  /**
   * Get history store
   */
  get historyStore() {
    return (window as any).Alpine?.store('history');
  },

  /**
   * Initialize component
   */
  init() {
    this.tempMaxHistoryCount = this.configStore?.maxHistoryCount || 5;
  },

  /**
   * Get current max history count
   */
  get maxHistoryCount(): number {
    return this.configStore?.maxHistoryCount || 5;
  },

  /**
   * Get current allow history assignment view setting
   */
  get allowHistoryAssignmentView(): boolean {
    return this.configStore?.allowHistoryAssignmentView || false;
  },

  /**
   * Get current history count
   */
  get currentHistoryCount(): number {
    return this.historyStore?.history?.length || 0;
  },

  /**
   * Update max history count input
   */
  updateMaxHistoryInput(value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      this.tempMaxHistoryCount = num;
      this.hasUnsavedChanges = num !== this.maxHistoryCount;
    }
  },

  /**
   * Save max history count
   */
  saveMaxHistoryCount() {
    if (this.tempMaxHistoryCount < 1 || this.tempMaxHistoryCount > 50) {
      showAlert('config.maxHistory.error');
      return;
    }

    const oldCount = this.maxHistoryCount;
    this.configStore?.setMaxHistoryCount(this.tempMaxHistoryCount);
    this.hasUnsavedChanges = false;

    if (this.tempMaxHistoryCount < oldCount && this.currentHistoryCount > this.tempMaxHistoryCount) {
      const removed = this.currentHistoryCount - this.tempMaxHistoryCount;
      showAlert('config.maxHistory.trimmed', { count: removed });
    }
  },

  /**
   * Cancel max history count changes
   */
  cancelMaxHistoryCount() {
    this.tempMaxHistoryCount = this.maxHistoryCount;
    this.hasUnsavedChanges = false;
  },

  /**
   * Toggle allow history assignment view
   */
  toggleAllowHistoryAssignmentView() {
    this.configStore?.setAllowHistoryAssignmentView(!this.allowHistoryAssignmentView);
  },

  /**
   * Reset all settings to defaults
   */
  resetToDefaults() {
    showConfirm('config.resetDefaults.prompt', () => {
      this.configStore?.resetToDefaults();
      this.tempMaxHistoryCount = 5;
      this.hasUnsavedChanges = false;
    });
  },

  /**
   * Reset current session (clear participants, groups, and current list)
   * If current list has assignments, it will be kept in history
   */
  resetCurrentSession() {
    showConfirm('config.resetSession.prompt', () => {
      // Get stores
      const participantsStore = (window as any).Alpine?.store('participants');
      const groupsStore = (window as any).Alpine?.store('groups');
      const historyStore = (window as any).Alpine?.store('history');

      // Save current list to history if it exists and has assignments
      if (historyStore?.currentList && historyStore.currentList.assignments.length > 0) {
        // The current list should already be in history from when it was generated
        // Just clear the current reference
        historyStore.clearCurrent();
      } else if (historyStore) {
        // No assignments or no current list, just clear
        historyStore.clearCurrent();
      }

      // Clear participants and groups
      if (participantsStore) {
        participantsStore.clear();
      }
      if (groupsStore) {
        groupsStore.clear();
      }

      showAlert('config.resetSession.success');
    });
  },
});
