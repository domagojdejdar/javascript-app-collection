/**
 * Core type definitions for the Secret Santa application
 */

/**
 * Represents a participant in the Secret Santa exchange
 */
export interface Participant {
  /** Unique identifier for the participant */
  id: string;
  /** Display name of the participant */
  name: string;
  /** Timestamp when the participant was added */
  createdAt: number;
}

/**
 * Represents a group of participants who cannot draw each other
 * (e.g., couples, family members)
 */
export interface Group {
  /** Unique identifier for the group */
  id: string;
  /** Display name of the group */
  name: string;
  /** Array of participant IDs belonging to this group */
  participantIds: string[];
  /** Timestamp when the group was created */
  createdAt: number;
}

/**
 * Represents a Secret Santa assignment
 */
export interface Assignment {
  /** Unique identifier for the assignment */
  id: string;
  /** ID of the participant who gives the gift (giver) */
  giverId: string;
  /** ID of the participant who receives the gift (receiver) */
  receiverId: string;
  /** Whether this assignment has been revealed to the giver */
  revealed: boolean;
  /** Timestamp when the assignment was revealed (if revealed) */
  revealedAt?: number;
}

/**
 * Represents a complete generated list of Secret Santa assignments
 */
export interface GeneratedList {
  /** Unique identifier for this generated list */
  id: string;
  /** Timestamp when the list was generated */
  timestamp: number;
  /** Array of all assignments in this list */
  assignments: Assignment[];
  /** Snapshot of participants at generation time */
  participants: Participant[];
  /** Snapshot of groups at generation time */
  groups: Group[];
}

/**
 * Represents the complete application state
 */
export interface AppState {
  /** All participants in the system */
  participants: Participant[];
  /** All groups in the system */
  groups: Group[];
  /** Currently active/displayed assignment list */
  currentList: GeneratedList | null;
  /** History of generated lists (max 5) */
  history: GeneratedList[];
  /** Loading state for async operations */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
}

/**
 * Configuration options for assignment generation
 */
export interface GenerationConfig {
  /** Whether to allow a participant to draw themselves (should be false) */
  allowSelfAssignment: boolean;
  /** Whether to enforce group constraints */
  enforceGroupConstraints: boolean;
  /** Maximum attempts to generate valid assignments */
  maxAttempts: number;
}

/**
 * Result of an assignment generation attempt
 */
export interface GenerationResult {
  /** Whether the generation was successful */
  success: boolean;
  /** Generated assignments if successful */
  assignments?: Assignment[];
  /** Error message if failed */
  error?: string;
  /** Number of attempts taken */
  attempts: number;
}

/**
 * Validation result for participant input
 */
export interface ValidationResult {
  /** Whether the input is valid */
  isValid: boolean;
  /** Error message if invalid */
  errorMessage?: string;
}

/**
 * Modal state for name verification
 */
export interface VerificationModalState {
  /** Whether the modal is open */
  isOpen: boolean;
  /** The assignment being verified */
  assignment: Assignment | null;
  /** Input value for name verification */
  inputName: string;
  /** Error message for verification */
  error: string | null;
}

/**
 * Modal state for history viewer
 */
export interface HistoryModalState {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Selected list from history for preview */
  selectedList: GeneratedList | null;
}

/**
 * Toast notification data
 */
export interface ToastNotification {
  /** Unique identifier for the toast */
  id: string;
  /** Notification message */
  message: string;
  /** Type of notification */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Duration in milliseconds (0 = manual dismiss) */
  duration: number;
}

/**
 * Application configuration settings
 */
export interface AppConfig {
  /** Maximum number of history items to keep (default: 5) */
  maxHistoryCount: number;
  /** Whether to allow viewing assignments in history (default: false) */
  allowHistoryAssignmentView: boolean;
}

/**
 * Local storage keys used by the application
 */
export enum StorageKeys {
  PARTICIPANTS = 'secret-santa-participants',
  GROUPS = 'secret-santa-groups',
  HISTORY = 'secret-santa-history',
  CURRENT_LIST = 'secret-santa-current-list',
  CONFIG = 'secret-santa-config',
}

/**
 * Error types for better error handling
 */
export enum ErrorType {
  INSUFFICIENT_PARTICIPANTS = 'INSUFFICIENT_PARTICIPANTS',
  INVALID_GROUP_CONFIGURATION = 'INVALID_GROUP_CONFIGURATION',
  GENERATION_FAILED = 'GENERATION_FAILED',
  STORAGE_ERROR = 'STORAGE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

/**
 * Custom error class for application errors
 */
export class SecretSantaError extends Error {
  constructor(
    public type: ErrorType,
    message: string
  ) {
    super(message);
    this.name = 'SecretSantaError';
  }
}

/**
 * Type guard to check if a value is a Participant
 */
export function isParticipant(value: unknown): value is Participant {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'createdAt' in value &&
    typeof (value as Participant).id === 'string' &&
    typeof (value as Participant).name === 'string' &&
    typeof (value as Participant).createdAt === 'number'
  );
}

/**
 * Type guard to check if a value is a Group
 */
export function isGroup(value: unknown): value is Group {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'participantIds' in value &&
    'createdAt' in value &&
    typeof (value as Group).id === 'string' &&
    typeof (value as Group).name === 'string' &&
    Array.isArray((value as Group).participantIds) &&
    typeof (value as Group).createdAt === 'number'
  );
}

/**
 * Type guard to check if a value is an Assignment
 */
export function isAssignment(value: unknown): value is Assignment {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'giverId' in value &&
    'receiverId' in value &&
    'revealed' in value &&
    typeof (value as Assignment).id === 'string' &&
    typeof (value as Assignment).giverId === 'string' &&
    typeof (value as Assignment).receiverId === 'string' &&
    typeof (value as Assignment).revealed === 'boolean'
  );
}

/**
 * Type guard to check if a value is a GeneratedList
 */
export function isGeneratedList(value: unknown): value is GeneratedList {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'timestamp' in value &&
    'assignments' in value &&
    'participants' in value &&
    'groups' in value &&
    typeof (value as GeneratedList).id === 'string' &&
    typeof (value as GeneratedList).timestamp === 'number' &&
    Array.isArray((value as GeneratedList).assignments) &&
    Array.isArray((value as GeneratedList).participants) &&
    Array.isArray((value as GeneratedList).groups)
  );
}
