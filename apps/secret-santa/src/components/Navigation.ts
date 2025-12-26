/**
 * Alpine component for hamburger menu navigation
 */

import { navigateTo, getCurrentPage, onPageChange, type PageName } from '@/utils/router';

export default () => ({
  isMenuOpen: false,
  currentPage: 'home' as PageName,

  init() {
    // Subscribe to page changes
    onPageChange((page) => {
      this.currentPage = page;
      this.isMenuOpen = false; // Close menu on navigation
    });

    // Set initial page
    this.currentPage = getCurrentPage();
  },

  /**
   * Get participants store
   */
  get participantsStore() {
    return (window as any).Alpine?.store('participants');
  },

  /**
   * Get groups store
   */
  get groupsStore() {
    return (window as any).Alpine?.store('groups');
  },

  /**
   * Get history store
   */
  get historyStore() {
    return (window as any).Alpine?.store('history');
  },

  /**
   * Get i18n store
   */
  get i18nStore() {
    return (window as any).Alpine?.store('i18n');
  },

  /**
   * Check if there's any session data (participants, groups, or current list)
   */
  get hasSessionData(): boolean {
    const hasParticipants = this.participantsStore?.count() > 0;
    const hasGroups = this.groupsStore?.groups?.length > 0;
    const hasCurrentList = this.historyStore?.currentList !== null;
    return hasParticipants || hasGroups || hasCurrentList;
  },

  /**
   * Translate a key
   */
  t(key: string, options?: any): string {
    return this.i18nStore?.t(key, options) || key;
  },

  /**
   * Get the label for the get started button
   */
  get getStartedLabel(): string {
    return this.hasSessionData ? this.t('nav.continue') : this.t('nav.getStarted');
  },

  /**
   * Get the icon for the get started button
   */
  get getStartedIcon(): string {
    return this.hasSessionData ? '▶️' : '🎁';
  },

  /**
   * Toggle menu open/close
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  },

  /**
   * Close menu
   */
  closeMenu() {
    this.isMenuOpen = false;
  },

  /**
   * Navigate to a page
   */
  goTo(page: PageName) {
    navigateTo(page);
  },

  /**
   * Start/continue action - goes to participants and resets assignments if starting fresh
   */
  handleGetStarted() {
    // If no session data, clear any lingering assignments
    if (!this.hasSessionData) {
      if (this.historyStore) {
        this.historyStore.clearCurrent();
      }
    }
    navigateTo('participants');
  },

  /**
   * Reset current session - clears participants, groups, and current list
   * Returns to homepage
   */
  resetCurrentSession() {
    const i18nStore = this.i18nStore;
    if (!confirm(i18nStore?.t('config.resetSession.prompt') || 'Are you sure you want to reset the current session? This will clear all participants, groups, and the current assignment list.')) {
      return;
    }

    // Save current list to history if it exists and has assignments
    if (this.historyStore?.currentList && this.historyStore.currentList.assignments.length > 0) {
      // The current list should already be in history from when it was generated
      // Just clear the current reference
      this.historyStore.clearCurrent();
    } else if (this.historyStore) {
      // No assignments or no current list, just clear
      this.historyStore.clearCurrent();
    }

    // Clear participants and groups
    if (this.participantsStore) {
      this.participantsStore.clear();
    }
    if (this.groupsStore) {
      this.groupsStore.clear();
    }

    // Close menu and navigate to home
    this.closeMenu();
    navigateTo('home');
  },

  /**
   * Check if on a specific page
   */
  isActive(page: PageName): boolean {
    return this.currentPage === page;
  },

  /**
   * Get menu items
   */
  get menuItems() {
    return [
      { name: 'home', label: this.t('nav.home'), icon: '🏠' },
      { name: 'participants', label: this.t('nav.participants'), icon: '👥' },
      { name: 'groups', label: this.t('nav.groups'), icon: '🎄' },
      { name: 'assignments', label: this.t('nav.assignments'), icon: '🎁' },
      { name: 'history', label: this.t('nav.history'), icon: '📜' },
      { name: 'config', label: this.t('nav.config'), icon: '⚙️' },
      { name: 'how-to', label: this.t('nav.howTo'), icon: '❓' },
    ];
  },

  /**
   * Handle Escape key to close menu
   */
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isMenuOpen) {
      this.closeMenu();
    }
  },

  /**
   * Get current language
   */
  get currentLanguage() {
    return this.i18nStore?.currentLanguage || 'en';
  },

  /**
   * Get language options
   */
  get languageOptions() {
    return this.i18nStore?.languages || {};
  },

  /**
   * Switch language
   */
  async switchLanguage(lang: string) {
    if (this.i18nStore) {
      await this.i18nStore.setLanguage(lang);
      // Reload the page to apply new language to all components
      window.location.reload();
    }
  },
});
