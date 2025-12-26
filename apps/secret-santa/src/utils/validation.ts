/**
 * Validation utilities for user input and data integrity
 */

import {
  Participant,
  Group,
  ValidationResult,
  SecretSantaError,
  ErrorType,
} from '@/types';

/**
 * Generates a unique ID using timestamp and random string
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Validates a participant name
 */
export function validateParticipantName(
  name: string,
  existingParticipants: Participant[] = []
): ValidationResult {
  // Trim whitespace
  const trimmedName = name.trim();

  // Check if empty
  if (trimmedName.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Name cannot be empty',
    };
  }

  // Check minimum length
  if (trimmedName.length < 2) {
    return {
      isValid: false,
      errorMessage: 'Name must be at least 2 characters long',
    };
  }

  // Check maximum length
  if (trimmedName.length > 50) {
    return {
      isValid: false,
      errorMessage: 'Name cannot exceed 50 characters',
    };
  }

  // Check for special characters (allow letters, numbers, spaces, hyphens, apostrophes)
  const validNamePattern = /^[a-zA-Z0-9\s\-']+$/;
  if (!validNamePattern.test(trimmedName)) {
    return {
      isValid: false,
      errorMessage: 'Name contains invalid characters',
    };
  }

  // Check for duplicates (case-insensitive)
  const isDuplicate = existingParticipants.some(
    (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (isDuplicate) {
    return {
      isValid: false,
      errorMessage: 'A participant with this name already exists',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Validates a group name
 */
export function validateGroupName(
  name: string,
  existingGroups: Group[] = []
): ValidationResult {
  // Trim whitespace
  const trimmedName = name.trim();

  // Check if empty
  if (trimmedName.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Group name cannot be empty',
    };
  }

  // Check minimum length
  if (trimmedName.length < 2) {
    return {
      isValid: false,
      errorMessage: 'Group name must be at least 2 characters long',
    };
  }

  // Check maximum length
  if (trimmedName.length > 30) {
    return {
      isValid: false,
      errorMessage: 'Group name cannot exceed 30 characters',
    };
  }

  // Check for duplicates (case-insensitive)
  const isDuplicate = existingGroups.some(
    (g) => g.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (isDuplicate) {
    return {
      isValid: false,
      errorMessage: 'A group with this name already exists',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Validates group configuration before generating assignments
 */
export function validateGroupConfiguration(
  groups: Group[],
  participants: Participant[]
): ValidationResult {
  // Check if any group is empty
  const emptyGroup = groups.find((g) => g.participantIds.length === 0);
  if (emptyGroup) {
    return {
      isValid: false,
      errorMessage: `Group "${emptyGroup.name}" is empty. Please add participants or remove the group.`,
    };
  }

  // Check if any group has only one member
  const singleMemberGroup = groups.find((g) => g.participantIds.length === 1);
  if (singleMemberGroup) {
    return {
      isValid: false,
      errorMessage: `Group "${singleMemberGroup.name}" has only one member. Groups should have at least 2 members or be removed.`,
    };
  }

  // Check if any group contains all participants
  const fullGroup = groups.find(
    (g) => g.participantIds.length === participants.length
  );
  if (fullGroup) {
    return {
      isValid: false,
      errorMessage: `Group "${fullGroup.name}" contains all participants. This makes it impossible to generate assignments.`,
    };
  }

  // Check if any group contains invalid participant IDs
  const participantIds = new Set(participants.map((p) => p.id));
  for (const group of groups) {
    const invalidIds = group.participantIds.filter(
      (id) => !participantIds.has(id)
    );
    if (invalidIds.length > 0) {
      return {
        isValid: false,
        errorMessage: `Group "${group.name}" contains participants that no longer exist.`,
      };
    }
  }

  return {
    isValid: true,
  };
}

/**
 * Validates that there are enough participants for Secret Santa
 */
export function validateMinimumParticipants(
  participants: Participant[]
): ValidationResult {
  if (participants.length < 2) {
    return {
      isValid: false,
      errorMessage: 'At least 2 participants are required for Secret Santa',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Validates name input for verification modal
 */
export function validateVerificationName(
  inputName: string,
  expectedName: string
): ValidationResult {
  const trimmedInput = inputName.trim();
  const trimmedExpected = expectedName.trim();

  if (trimmedInput.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Please enter your name',
    };
  }

  // Case-insensitive comparison
  if (trimmedInput.toLowerCase() !== trimmedExpected.toLowerCase()) {
    return {
      isValid: false,
      errorMessage: 'Name does not match. Please try again.',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Sanitizes a string for safe display (prevents XSS)
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Formats a timestamp to a readable date string
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleDateString(undefined, options);
}

/**
 * Formats a timestamp to a relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

/**
 * Checks if localStorage is available and functional
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Creates a participant object from a name
 */
export function createParticipant(name: string): Participant {
  return {
    id: generateId(),
    name: name.trim(),
    createdAt: Date.now(),
  };
}

/**
 * Creates a group object from a name
 */
export function createGroup(name: string): Group {
  return {
    id: generateId(),
    name: name.trim(),
    participantIds: [],
    createdAt: Date.now(),
  };
}

/**
 * Debounce function for input handlers
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Gets a participant by ID
 */
export function getParticipantById(
  id: string,
  participants: Participant[]
): Participant | undefined {
  return participants.find((p) => p.id === id);
}

/**
 * Gets a group by ID
 */
export function getGroupById(id: string, groups: Group[]): Group | undefined {
  return groups.find((g) => g.id === id);
}
