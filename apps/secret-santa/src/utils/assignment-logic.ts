/**
 * Secret Santa assignment generation logic
 * Implements the algorithm to generate valid Secret Santa assignments
 * with support for group constraints
 */

import {
  Participant,
  Group,
  Assignment,
  GenerationConfig,
  GenerationResult,
  SecretSantaError,
  ErrorType,
} from '@/types';
import { generateId } from './validation';

/**
 * Default configuration for assignment generation
 */
const DEFAULT_CONFIG: GenerationConfig = {
  allowSelfAssignment: false,
  enforceGroupConstraints: true,
  maxAttempts: 1000,
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Checks if a participant is in any of the specified groups
 */
function getParticipantGroups(participantId: string, groups: Group[]): Group[] {
  return groups.filter((group) => group.participantIds.includes(participantId));
}

/**
 * Checks if two participants are in the same group
 */
function areInSameGroup(
  giverId: string,
  receiverId: string,
  groups: Group[]
): boolean {
  return groups.some(
    (group) =>
      group.participantIds.includes(giverId) &&
      group.participantIds.includes(receiverId)
  );
}

/**
 * Validates if an assignment is allowed based on constraints
 */
function isValidAssignment(
  giverId: string,
  receiverId: string,
  groups: Group[],
  config: GenerationConfig
): boolean {
  // Check self-assignment
  if (!config.allowSelfAssignment && giverId === receiverId) {
    return false;
  }

  // Check group constraints
  if (config.enforceGroupConstraints && areInSameGroup(giverId, receiverId, groups)) {
    return false;
  }

  return true;
}

/**
 * Attempts to generate valid Secret Santa assignments using a randomized approach
 * Prioritizes grouped participants first, then ungrouped participants
 */
function attemptGeneration(
  participants: Participant[],
  groups: Group[],
  config: GenerationConfig
): Assignment[] | null {
  // Separate participants into grouped and ungrouped
  const participantsInGroups = new Set<string>();
  groups.forEach((group) => {
    group.participantIds.forEach((id) => participantsInGroups.add(id));
  });

  const groupedParticipants = participants.filter((p) => participantsInGroups.has(p.id));
  const ungroupedParticipants = participants.filter((p) => !participantsInGroups.has(p.id));

  // Process grouped participants first, then ungrouped
  const orderedGivers = [...groupedParticipants, ...ungroupedParticipants];
  const receivers = shuffleArray([...participants]);

  const assignments: Assignment[] = [];
  const usedReceivers = new Set<string>();

  for (const giver of orderedGivers) {
    let assigned = false;

    // Try to find a valid receiver
    for (const receiver of receivers) {
      if (
        !usedReceivers.has(receiver.id) &&
        isValidAssignment(giver.id, receiver.id, groups, config)
      ) {
        assignments.push({
          id: generateId(),
          giverId: giver.id,
          receiverId: receiver.id,
          revealed: false,
        });
        usedReceivers.add(receiver.id);
        assigned = true;
        break;
      }
    }

    // If no valid receiver found, this attempt failed
    if (!assigned) {
      return null;
    }
  }

  return assignments;
}

/**
 * Generates Secret Santa assignments with group constraints
 *
 * @param participants - Array of all participants
 * @param groups - Array of groups (participants in same group can't draw each other)
 * @param config - Optional configuration for generation
 * @returns GenerationResult with assignments or error
 */
export function generateAssignments(
  participants: Participant[],
  groups: Group[] = [],
  config: Partial<GenerationConfig> = {}
): GenerationResult {
  const finalConfig: GenerationConfig = { ...DEFAULT_CONFIG, ...config };

  // Validate minimum participants
  if (participants.length < 2) {
    return {
      success: false,
      error: 'At least 2 participants are required for Secret Santa',
      attempts: 0,
    };
  }

  // Check for impossible configurations
  const impossibilityCheck = checkForImpossibleConfiguration(participants, groups);
  if (impossibilityCheck.impossible) {
    return {
      success: false,
      error: impossibilityCheck.reason,
      attempts: 0,
    };
  }

  // Attempt to generate valid assignments
  let attempts = 0;
  while (attempts < finalConfig.maxAttempts) {
    attempts++;

    const assignments = attemptGeneration(participants, groups, finalConfig);

    if (assignments !== null) {
      // Validate the generated assignments
      const isValid = validateAssignments(assignments, participants, groups);

      if (!isValid) {
        // This shouldn't happen, but if it does, try again
        console.error('Generated assignments failed validation, retrying...');
        continue;
      }

      return {
        success: true,
        assignments,
        attempts,
      };
    }
  }

  // Failed after max attempts
  return {
    success: false,
    error: `Could not generate valid assignments after ${finalConfig.maxAttempts} attempts. Try removing some group constraints.`,
    attempts,
  };
}

/**
 * Checks if the configuration makes it impossible to generate assignments
 */
function checkForImpossibleConfiguration(
  participants: Participant[],
  groups: Group[]
): { impossible: boolean; reason?: string } {
  // Check if any group contains all participants
  for (const group of groups) {
    if (group.participantIds.length === participants.length) {
      return {
        impossible: true,
        reason:
          'One group contains all participants. No valid assignments possible.',
      };
    }
  }

  // Check if any participant has no valid receivers
  for (const participant of participants) {
    const participantGroups = getParticipantGroups(participant.id, groups);

    // Collect all participant IDs in the same groups
    const groupMemberIds = new Set<string>();
    participantGroups.forEach((group) => {
      group.participantIds.forEach((id) => groupMemberIds.add(id));
    });

    // Count how many potential receivers exist
    // (excluding self and group members)
    const potentialReceivers = participants.filter(
      (p) => p.id !== participant.id && !groupMemberIds.has(p.id)
    );

    if (potentialReceivers.length === 0) {
      return {
        impossible: true,
        reason: `Participant "${participant.name}" has no valid receivers due to group constraints.`,
      };
    }
  }

  return { impossible: false };
}

/**
 * Validates if a set of assignments is valid
 */
export function validateAssignments(
  assignments: Assignment[],
  participants: Participant[],
  groups: Group[]
): boolean {
  // Check that everyone gives exactly once
  const giverIds = new Set(assignments.map((a) => a.giverId));
  if (giverIds.size !== participants.length) {
    return false;
  }

  // Check that everyone receives exactly once
  const receiverIds = new Set(assignments.map((a) => a.receiverId));
  if (receiverIds.size !== participants.length) {
    return false;
  }

  // Check that all assignments are valid
  for (const assignment of assignments) {
    if (!isValidAssignment(assignment.giverId, assignment.receiverId, groups, DEFAULT_CONFIG)) {
      return false;
    }
  }

  return true;
}

/**
 * Gets the receiver for a given giver
 */
export function getReceiverForGiver(
  giverId: string,
  assignments: Assignment[]
): Assignment | undefined {
  return assignments.find((a) => a.giverId === giverId);
}

/**
 * Gets the giver for a given receiver
 */
export function getGiverForReceiver(
  receiverId: string,
  assignments: Assignment[]
): Assignment | undefined {
  return assignments.find((a) => a.receiverId === receiverId);
}

/**
 * Gets statistics about the generated assignments
 */
export interface AssignmentStats {
  totalAssignments: number;
  revealedCount: number;
  unrevealedCount: number;
  participantsWithGroups: number;
  participantsWithoutGroups: number;
}

/**
 * Calculates statistics for a set of assignments
 */
export function getAssignmentStats(
  assignments: Assignment[],
  participants: Participant[],
  groups: Group[]
): AssignmentStats {
  const revealedCount = assignments.filter((a) => a.revealed).length;

  const participantsInGroups = new Set<string>();
  groups.forEach((group) => {
    group.participantIds.forEach((id) => participantsInGroups.add(id));
  });

  return {
    totalAssignments: assignments.length,
    revealedCount,
    unrevealedCount: assignments.length - revealedCount,
    participantsWithGroups: participantsInGroups.size,
    participantsWithoutGroups: participants.length - participantsInGroups.size,
  };
}
