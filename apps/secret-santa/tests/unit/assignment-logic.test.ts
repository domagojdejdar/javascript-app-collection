import { describe, it, expect } from 'vitest';
import {
  generateAssignments,
  validateAssignments,
  getReceiverForGiver,
  getGiverForReceiver,
  getAssignmentStats,
} from '@/utils/assignment-logic';
import type { Participant, Group, Assignment } from '@/types';

describe('assignment logic', () => {
  describe('generateAssignments', () => {
    it('should generate valid assignments for simple case', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
        { id: '3', name: 'Charlie', createdAt: Date.now() },
      ];

      const result = generateAssignments(participants);

      expect(result.success).toBe(true);
      expect(result.assignments).toBeDefined();
      expect(result.assignments?.length).toBe(3);

      // Check that everyone gives and receives exactly once
      const giverIds = new Set(result.assignments?.map((a) => a.giverId));
      const receiverIds = new Set(result.assignments?.map((a) => a.receiverId));
      expect(giverIds.size).toBe(3);
      expect(receiverIds.size).toBe(3);
    });

    it('should reject fewer than 2 participants', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
      ];

      const result = generateAssignments(participants);

      expect(result.success).toBe(false);
      expect(result.error).toContain('At least 2 participants');
    });

    it('should respect group constraints', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
        { id: '3', name: 'Charlie', createdAt: Date.now() },
        { id: '4', name: 'Diana', createdAt: Date.now() },
      ];

      const groups: Group[] = [
        {
          id: 'g1',
          name: 'Couple1',
          participantIds: ['1', '2'],
          createdAt: Date.now(),
        },
      ];

      const result = generateAssignments(participants, groups);

      expect(result.success).toBe(true);
      expect(result.assignments).toBeDefined();

      // Verify that Alice and Bob don't draw each other
      const aliceAssignment = result.assignments?.find((a) => a.giverId === '1');
      const bobAssignment = result.assignments?.find((a) => a.giverId === '2');

      expect(aliceAssignment?.receiverId).not.toBe('2');
      expect(bobAssignment?.receiverId).not.toBe('1');
    });

    it('should detect impossible configurations', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
      ];

      const groups: Group[] = [
        {
          id: 'g1',
          name: 'AllInOne',
          participantIds: ['1', '2'],
          createdAt: Date.now(),
        },
      ];

      const result = generateAssignments(participants, groups);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should not allow self-assignment', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
        { id: '3', name: 'Charlie', createdAt: Date.now() },
      ];

      const result = generateAssignments(participants);

      expect(result.success).toBe(true);

      // Verify no one draws themselves
      result.assignments?.forEach((assignment) => {
        expect(assignment.giverId).not.toBe(assignment.receiverId);
      });
    });

    it('should handle multiple groups correctly', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
        { id: '3', name: 'Charlie', createdAt: Date.now() },
        { id: '4', name: 'Diana', createdAt: Date.now() },
        { id: '5', name: 'Eve', createdAt: Date.now() },
        { id: '6', name: 'Frank', createdAt: Date.now() },
      ];

      const groups: Group[] = [
        {
          id: 'g1',
          name: 'Couple1',
          participantIds: ['1', '2'],
          createdAt: Date.now(),
        },
        {
          id: 'g2',
          name: 'Couple2',
          participantIds: ['3', '4'],
          createdAt: Date.now(),
        },
      ];

      const result = generateAssignments(participants, groups);

      expect(result.success).toBe(true);
      expect(result.assignments?.length).toBe(6);

      // Verify group constraints
      const assignments = result.assignments!;
      assignments.forEach((assignment) => {
        groups.forEach((group) => {
          const bothInGroup =
            group.participantIds.includes(assignment.giverId) &&
            group.participantIds.includes(assignment.receiverId);
          expect(bothInGroup).toBe(false);
        });
      });
    });
  });

  describe('validateAssignments', () => {
    const participants: Participant[] = [
      { id: '1', name: 'Alice', createdAt: Date.now() },
      { id: '2', name: 'Bob', createdAt: Date.now() },
      { id: '3', name: 'Charlie', createdAt: Date.now() },
    ];

    it('should validate correct assignments', () => {
      const assignments: Assignment[] = [
        { id: 'a1', giverId: '1', receiverId: '2', revealed: false },
        { id: 'a2', giverId: '2', receiverId: '3', revealed: false },
        { id: 'a3', giverId: '3', receiverId: '1', revealed: false },
      ];

      const isValid = validateAssignments(assignments, participants, []);
      expect(isValid).toBe(true);
    });

    it('should reject assignments with duplicate givers', () => {
      const assignments: Assignment[] = [
        { id: 'a1', giverId: '1', receiverId: '2', revealed: false },
        { id: 'a2', giverId: '1', receiverId: '3', revealed: false },
      ];

      const isValid = validateAssignments(assignments, participants, []);
      expect(isValid).toBe(false);
    });

    it('should reject assignments with duplicate receivers', () => {
      const assignments: Assignment[] = [
        { id: 'a1', giverId: '1', receiverId: '2', revealed: false },
        { id: 'a2', giverId: '2', receiverId: '2', revealed: false },
        { id: 'a3', giverId: '3', receiverId: '1', revealed: false },
      ];

      const isValid = validateAssignments(assignments, participants, []);
      expect(isValid).toBe(false);
    });

    it('should reject self-assignments', () => {
      const assignments: Assignment[] = [
        { id: 'a1', giverId: '1', receiverId: '1', revealed: false },
        { id: 'a2', giverId: '2', receiverId: '3', revealed: false },
        { id: 'a3', giverId: '3', receiverId: '2', revealed: false },
      ];

      const isValid = validateAssignments(assignments, participants, []);
      expect(isValid).toBe(false);
    });
  });

  describe('getReceiverForGiver', () => {
    const assignments: Assignment[] = [
      { id: 'a1', giverId: '1', receiverId: '2', revealed: false },
      { id: 'a2', giverId: '2', receiverId: '3', revealed: false },
    ];

    it('should find receiver for a giver', () => {
      const result = getReceiverForGiver('1', assignments);
      expect(result).toBeDefined();
      expect(result?.receiverId).toBe('2');
    });

    it('should return undefined for non-existent giver', () => {
      const result = getReceiverForGiver('999', assignments);
      expect(result).toBeUndefined();
    });
  });

  describe('getGiverForReceiver', () => {
    const assignments: Assignment[] = [
      { id: 'a1', giverId: '1', receiverId: '2', revealed: false },
      { id: 'a2', giverId: '2', receiverId: '3', revealed: false },
    ];

    it('should find giver for a receiver', () => {
      const result = getGiverForReceiver('2', assignments);
      expect(result).toBeDefined();
      expect(result?.giverId).toBe('1');
    });

    it('should return undefined for non-existent receiver', () => {
      const result = getGiverForReceiver('999', assignments);
      expect(result).toBeUndefined();
    });
  });

  describe('getAssignmentStats', () => {
    const participants: Participant[] = [
      { id: '1', name: 'Alice', createdAt: Date.now() },
      { id: '2', name: 'Bob', createdAt: Date.now() },
      { id: '3', name: 'Charlie', createdAt: Date.now() },
      { id: '4', name: 'Diana', createdAt: Date.now() },
    ];

    const assignments: Assignment[] = [
      { id: 'a1', giverId: '1', receiverId: '2', revealed: true },
      { id: 'a2', giverId: '2', receiverId: '3', revealed: false },
      { id: 'a3', giverId: '3', receiverId: '4', revealed: false },
      { id: 'a4', giverId: '4', receiverId: '1', revealed: true },
    ];

    const groups: Group[] = [
      {
        id: 'g1',
        name: 'Group1',
        participantIds: ['1', '2'],
        createdAt: Date.now(),
      },
    ];

    it('should calculate correct statistics', () => {
      const stats = getAssignmentStats(assignments, participants, groups);

      expect(stats.totalAssignments).toBe(4);
      expect(stats.revealedCount).toBe(2);
      expect(stats.unrevealedCount).toBe(2);
      expect(stats.participantsWithGroups).toBe(2);
      expect(stats.participantsWithoutGroups).toBe(2);
    });
  });
});
