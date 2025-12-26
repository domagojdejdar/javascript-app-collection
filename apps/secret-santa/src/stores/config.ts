/**
 * Alpine.js store for managing application configuration
 */

import type { AppConfig } from '@/types';
import { StorageKeys } from '@/types';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: AppConfig = {
  maxHistoryCount: 5,
  allowHistoryAssignmentView: false,
};

/**
 * Load config from localStorage
 */
function loadConfig(): AppConfig {
  try {
    const stored = localStorage.getItem(StorageKeys.CONFIG);
    if (!stored) return { ...DEFAULT_CONFIG };

    const parsed = JSON.parse(stored);
    return {
      maxHistoryCount: typeof parsed.maxHistoryCount === 'number' ? parsed.maxHistoryCount : DEFAULT_CONFIG.maxHistoryCount,
      allowHistoryAssignmentView: typeof parsed.allowHistoryAssignmentView === 'boolean' ? parsed.allowHistoryAssignmentView : DEFAULT_CONFIG.allowHistoryAssignmentView,
    };
  } catch (error) {
    console.error('Error loading config:', error);
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * Save config to localStorage
 */
function saveConfig(config: AppConfig): void {
  try {
    localStorage.setItem(StorageKeys.CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

export interface ConfigStore extends AppConfig {
  // Actions
  init(): void;
  setMaxHistoryCount(count: number): void;
  setAllowHistoryAssignmentView(allow: boolean): void;
  resetToDefaults(): void;
}

export default (): ConfigStore => ({
  ...DEFAULT_CONFIG,

  /**
   * Initialize the store by loading from localStorage
   */
  init() {
    const config = loadConfig();
    this.maxHistoryCount = config.maxHistoryCount;
    this.allowHistoryAssignmentView = config.allowHistoryAssignmentView;
  },

  /**
   * Set maximum history count
   */
  setMaxHistoryCount(count: number) {
    if (count < 1 || count > 50) {
      console.error('Max history count must be between 1 and 50');
      return;
    }

    const oldCount = this.maxHistoryCount;
    this.maxHistoryCount = count;
    saveConfig({
      maxHistoryCount: this.maxHistoryCount,
      allowHistoryAssignmentView: this.allowHistoryAssignmentView,
    });

    // If reduced, trigger history cleanup
    if (count < oldCount) {
      const historyStore = (window as any).Alpine?.store('history');
      if (historyStore) {
        historyStore.trimHistory(count);
      }
    }
  },

  /**
   * Set whether to allow viewing assignments in history
   */
  setAllowHistoryAssignmentView(allow: boolean) {
    this.allowHistoryAssignmentView = allow;
    saveConfig({
      maxHistoryCount: this.maxHistoryCount,
      allowHistoryAssignmentView: this.allowHistoryAssignmentView,
    });
  },

  /**
   * Reset all settings to defaults
   */
  resetToDefaults() {
    this.maxHistoryCount = DEFAULT_CONFIG.maxHistoryCount;
    this.allowHistoryAssignmentView = DEFAULT_CONFIG.allowHistoryAssignmentView;
    saveConfig({ ...DEFAULT_CONFIG });
  },
});
