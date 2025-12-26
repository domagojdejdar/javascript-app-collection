/**
 * Alpine component for How-To page
 */

import { navigateTo } from '@/utils/router';

export default () => ({
  /**
   * Navigate to a page
   */
  goTo(page: string) {
    navigateTo(page as any);
  },
});
