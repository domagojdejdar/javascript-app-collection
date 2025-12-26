/**
 * Simple client-side router for page navigation
 */

export type PageName = 'home' | 'participants' | 'groups' | 'assignments' | 'history' | 'how-to' | 'config';

interface RouterState {
  currentPage: PageName;
  listeners: Set<(page: PageName) => void>;
}

const state: RouterState = {
  currentPage: 'home',
  listeners: new Set(),
};

/**
 * Navigate to a specific page
 */
export function navigateTo(page: PageName): void {
  state.currentPage = page;

  // Notify all listeners
  state.listeners.forEach((listener) => listener(page));

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Get current page
 */
export function getCurrentPage(): PageName {
  return state.currentPage;
}

/**
 * Subscribe to page changes
 */
export function onPageChange(callback: (page: PageName) => void): () => void {
  state.listeners.add(callback);

  // Return unsubscribe function
  return () => {
    state.listeners.delete(callback);
  };
}

/**
 * Reset to home page (used on page refresh)
 */
export function resetToHome(): void {
  navigateTo('home');
}

/**
 * Check if on a specific page
 */
export function isOnPage(page: PageName): boolean {
  return state.currentPage === page;
}
