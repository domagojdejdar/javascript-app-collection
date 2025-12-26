/**
 * Local storage utility functions for persisting application data
 */

import {
  StorageKeys,
  Participant,
  Group,
  GeneratedList,
  isParticipant,
  isGroup,
  isGeneratedList,
  SecretSantaError,
  ErrorType,
} from '@/types';

/**
 * Default maximum number of history items to keep
 */
const DEFAULT_MAX_HISTORY_ITEMS = 5;

/**
 * Get the current max history count from config
 */
function getMaxHistoryCount(): number {
  try {
    const configStore = (window as any).Alpine?.store?.('config');
    return configStore?.maxHistoryCount || DEFAULT_MAX_HISTORY_ITEMS;
  } catch {
    return DEFAULT_MAX_HISTORY_ITEMS;
  }
}

/**
 * Safely get an item from localStorage with error handling
 */
function getItem<T>(key: string, validator?: (value: unknown) => value is T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);

    if (validator && !validator(parsed)) {
      console.warn(`Invalid data in localStorage for key: ${key}`);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
}

/**
 * Safely set an item in localStorage with error handling
 */
function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    throw new SecretSantaError(
      ErrorType.STORAGE_ERROR,
      'Failed to save data. Your browser storage might be full.'
    );
  }
}

/**
 * Safely remove an item from localStorage
 */
function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

// ==================== Participants ====================

/**
 * Load participants from localStorage
 */
export function loadParticipants(): Participant[] {
  const participants = getItem<Participant[]>(StorageKeys.PARTICIPANTS);

  if (!participants) return [];

  // Validate each participant
  if (!Array.isArray(participants)) return [];

  return participants.filter((p) => isParticipant(p));
}

/**
 * Save participants to localStorage
 */
export function saveParticipants(participants: Participant[]): void {
  setItem(StorageKeys.PARTICIPANTS, participants);
}

/**
 * Clear all participants from localStorage
 */
export function clearParticipants(): void {
  removeItem(StorageKeys.PARTICIPANTS);
}

// ==================== Groups ====================

/**
 * Load groups from localStorage
 */
export function loadGroups(): Group[] {
  const groups = getItem<Group[]>(StorageKeys.GROUPS);

  if (!groups) return [];

  // Validate each group
  if (!Array.isArray(groups)) return [];

  return groups.filter((g) => isGroup(g));
}

/**
 * Save groups to localStorage
 */
export function saveGroups(groups: Group[]): void {
  setItem(StorageKeys.GROUPS, groups);
}

/**
 * Clear all groups from localStorage
 */
export function clearGroups(): void {
  removeItem(StorageKeys.GROUPS);
}

// ==================== History ====================

/**
 * Load history from localStorage
 */
export function loadHistory(): GeneratedList[] {
  const history = getItem<GeneratedList[]>(StorageKeys.HISTORY);

  if (!history) return [];

  // Validate each list
  if (!Array.isArray(history)) return [];

  const validHistory = history.filter((h) => isGeneratedList(h));

  // Sort by timestamp (newest first) and limit to max history items
  const maxCount = getMaxHistoryCount();
  return validHistory
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, maxCount);
}

/**
 * Save a new generated list to history
 * Automatically maintains the maximum history size
 */
export function saveToHistory(list: GeneratedList): void {
  const currentHistory = loadHistory();

  // Add new list to the beginning
  const updatedHistory = [list, ...currentHistory];

  // Keep only the latest max history items
  const maxCount = getMaxHistoryCount();
  const trimmedHistory = updatedHistory.slice(0, maxCount);

  setItem(StorageKeys.HISTORY, trimmedHistory);
}

/**
 * Update an existing entry in history
 * Used when assignments are revealed to keep history in sync
 */
export function updateHistoryEntry(list: GeneratedList): void {
  const currentHistory = loadHistory();

  // Find and update the matching entry by ID
  const index = currentHistory.findIndex((h) => h.id === list.id);

  if (index !== -1) {
    currentHistory[index] = list;
    setItem(StorageKeys.HISTORY, currentHistory);
  }
}

/**
 * Clear all history from localStorage
 */
export function clearHistory(): void {
  removeItem(StorageKeys.HISTORY);
}

/**
 * Remove a specific item from history
 */
export function removeFromHistory(listId: string): void {
  const history = loadHistory();
  const updatedHistory = history.filter((item) => item.id !== listId);
  setItem(StorageKeys.HISTORY, updatedHistory);
}

// ==================== Current List ====================

/**
 * Load the current generated list from localStorage
 */
export function loadCurrentList(): GeneratedList | null {
  const list = getItem<GeneratedList>(StorageKeys.CURRENT_LIST);

  if (!list) return null;

  return isGeneratedList(list) ? list : null;
}

/**
 * Save the current generated list to localStorage
 */
export function saveCurrentList(list: GeneratedList | null): void {
  if (list === null) {
    removeItem(StorageKeys.CURRENT_LIST);
  } else {
    setItem(StorageKeys.CURRENT_LIST, list);
  }
}

/**
 * Clear the current list from localStorage
 */
export function clearCurrentList(): void {
  removeItem(StorageKeys.CURRENT_LIST);
}

// ==================== Bulk Operations ====================

/**
 * Clear all application data from localStorage
 */
export function clearAllData(): void {
  clearParticipants();
  clearGroups();
  clearHistory();
  clearCurrentList();
}

/**
 * Export all data as a JSON string for backup
 */
export function exportData(): string {
  const data = {
    participants: loadParticipants(),
    groups: loadGroups(),
    history: loadHistory(),
    currentList: loadCurrentList(),
    exportedAt: Date.now(),
  };

  return JSON.stringify(data, null, 2);
}

/**
 * Import data from a JSON string
 */
export function importData(jsonString: string): void {
  try {
    const data = JSON.parse(jsonString);

    if (data.participants && Array.isArray(data.participants)) {
      saveParticipants(data.participants.filter((p: unknown) => isParticipant(p)));
    }

    if (data.groups && Array.isArray(data.groups)) {
      saveGroups(data.groups.filter((g: unknown) => isGroup(g)));
    }

    if (data.history && Array.isArray(data.history)) {
      const validHistory = data.history.filter((h: unknown) => isGeneratedList(h));
      setItem(StorageKeys.HISTORY, validHistory.slice(0, getMaxHistoryCount()));
    }

    if (data.currentList && isGeneratedList(data.currentList)) {
      saveCurrentList(data.currentList);
    }
  } catch (error) {
    throw new SecretSantaError(
      ErrorType.STORAGE_ERROR,
      'Failed to import data. The file might be corrupted.'
    );
  }
}
