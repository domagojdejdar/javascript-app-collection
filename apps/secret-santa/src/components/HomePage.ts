/**
 * Alpine component for Home page
 */

import { navigateTo } from '@/utils/router';
import { isLocalStorageAvailable } from '@/utils/validation';
import {
  loadParticipants,
  loadGroups,
  loadCurrentList,
  clearParticipants,
  clearGroups,
  clearCurrentList,
} from '@/utils/local-storage';

export default () => ({
  showRestorePrompt: false,
  hasRestoredState: false,

  init() {
    // Check if there's saved state and prompt user
    this.checkForSavedState();
  },

  /**
   * Check if there's saved state in localStorage
   */
  checkForSavedState() {
    if (!isLocalStorageAvailable()) return;

    const participants = loadParticipants();
    const groups = loadGroups();
    const currentList = loadCurrentList();

    // Only show restore prompt if there's data AND no current assignments
    // (if assignments exist, user likely completed a session)
    if ((participants.length > 0 || groups.length > 0) && !currentList) {
      this.showRestorePrompt = true;
    }
  },

  /**
   * Restore previous state
   */
  restoreState() {
    const participantsStore = (window as any).Alpine?.store('participants');
    const groupsStore = (window as any).Alpine?.store('groups');
    const historyStore = (window as any).Alpine?.store('history');

    if (participantsStore) participantsStore.init();
    if (groupsStore) groupsStore.init();
    if (historyStore) historyStore.init();

    this.hasRestoredState = true;
    this.showRestorePrompt = false;

    // Show success message and navigate to participants
    console.log('✅ Previous state restored');
    this.goTo('participants');
  },

  /**
   * Start fresh (clear participants, groups, and current list but preserve history)
   */
  startFresh() {
    // Clear localStorage data (but preserve history)
    clearParticipants();
    clearGroups();
    clearCurrentList();

    // Reset stores to empty state (but preserve history)
    const participantsStore = (window as any).Alpine?.store('participants');
    const groupsStore = (window as any).Alpine?.store('groups');
    const historyStore = (window as any).Alpine?.store('history');

    if (participantsStore) {
      participantsStore.participants = [];
    }
    if (groupsStore) {
      groupsStore.groups = [];
    }
    if (historyStore) {
      historyStore.currentList = null;
      // Keep history intact - don't clear it
    }

    this.showRestorePrompt = false;
    console.log('🆕 Starting fresh - participants, groups, and current list cleared (history preserved)');
  },

  /**
   * Navigate to a page
   */
  goTo(page: string) {
    navigateTo(page as any);
  },

  /**
   * Get participant count from store
   */
  get participantCount(): number {
    const store = (window as any).Alpine?.store('participants');
    return store?.count() || 0;
  },
});
