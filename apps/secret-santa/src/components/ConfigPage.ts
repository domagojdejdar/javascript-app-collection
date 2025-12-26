/**
 * Alpine component for Configuration page
 */

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
      const i18nStore = this.i18nStore;
      alert(i18nStore?.t('config.maxHistory.error') || 'Max history count must be between 1 and 50');
      return;
    }

    const oldCount = this.maxHistoryCount;
    this.configStore?.setMaxHistoryCount(this.tempMaxHistoryCount);
    this.hasUnsavedChanges = false;

    if (this.tempMaxHistoryCount < oldCount && this.currentHistoryCount > this.tempMaxHistoryCount) {
      const removed = this.currentHistoryCount - this.tempMaxHistoryCount;
      const i18nStore = this.i18nStore;
      alert(i18nStore?.t('config.maxHistory.trimmed', { count: removed }) || `History trimmed: ${removed} oldest ${removed === 1 ? 'entry' : 'entries'} removed`);
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
    const i18nStore = this.i18nStore;
    if (confirm(i18nStore?.t('config.resetDefaults.prompt') || 'Are you sure you want to reset all settings to default values?')) {
      this.configStore?.resetToDefaults();
      this.tempMaxHistoryCount = 5;
      this.hasUnsavedChanges = false;
    }
  },

  /**
   * Reset current session (clear participants, groups, and current list)
   * If current list has assignments, it will be kept in history
   */
  resetCurrentSession() {
    const i18nStore = this.i18nStore;
    if (!confirm(i18nStore?.t('config.resetSession.prompt') || 'Are you sure you want to reset the current session? This will clear all participants, groups, and the current assignment list. The current list will be saved to history if it has assignments.')) {
      return;
    }

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

    alert(i18nStore?.t('config.resetSession.success') || 'Current session has been reset. You can start fresh with new participants and groups.');
  },
});
