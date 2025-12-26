/**
 * Alpine component for managing page visibility
 */

import { getCurrentPage, onPageChange, type PageName } from '@/utils/router';

export default () => ({
  currentPage: 'home' as PageName,

  init() {
    // Subscribe to page changes
    onPageChange((page) => {
      this.currentPage = page;
    });

    // Set initial page
    this.currentPage = getCurrentPage();
  },

  /**
   * Check if a specific page is active
   */
  isPage(page: PageName): boolean {
    return this.currentPage === page;
  },
});
