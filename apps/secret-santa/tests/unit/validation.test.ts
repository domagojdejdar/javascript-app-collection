import { describe, it, expect } from 'vitest';
import {
  generateId,
  validateParticipantName,
  validateGroupName,
  validateGroupConfiguration,
  validateMinimumParticipants,
  validateVerificationName,
  createParticipant,
  createGroup,
  formatTimestamp,
  formatRelativeTime,
  getParticipantById,
} from '@/utils/validation';
import type { Participant, Group } from '@/types';

describe('validation utilities', () => {
  describe('generateId', () => {
    it('should generate a unique ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with timestamp and random parts', () => {
      const id = generateId();
      expect(id).toMatch(/^\d+-[a-z0-9]+$/);
    });
  });

  describe('validateParticipantName', () => {
    const existingParticipants: Participant[] = [
      { id: '1', name: 'Alice', createdAt: Date.now() },
      { id: '2', name: 'Bob', createdAt: Date.now() },
    ];

    it('should accept valid names', () => {
      const result = validateParticipantName('Charlie', existingParticipants);
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should reject empty names', () => {
      const result = validateParticipantName('', existingParticipants);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Name cannot be empty');
    });

    it('should reject names that are too short', () => {
      const result = validateParticipantName('A', existingParticipants);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Name must be at least 2 characters long');
    });

    it('should reject names that are too long', () => {
      const longName = 'A'.repeat(51);
      const result = validateParticipantName(longName, existingParticipants);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Name cannot exceed 50 characters');
    });

    it('should reject duplicate names (case-insensitive)', () => {
      const result = validateParticipantName('alice', existingParticipants);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('A participant with this name already exists');
    });

    it('should trim whitespace', () => {
      const result = validateParticipantName('  Charlie  ', existingParticipants);
      expect(result.isValid).toBe(true);
    });

    it('should allow names with hyphens and apostrophes', () => {
      const result1 = validateParticipantName("O'Brien", existingParticipants);
      const result2 = validateParticipantName('Mary-Jane', existingParticipants);
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
    });
  });

  describe('validateGroupName', () => {
    const existingGroups: Group[] = [
      { id: '1', name: 'Family', participantIds: [], createdAt: Date.now() },
    ];

    it('should accept valid group names', () => {
      const result = validateGroupName('Friends', existingGroups);
      expect(result.isValid).toBe(true);
    });

    it('should reject empty group names', () => {
      const result = validateGroupName('', existingGroups);
      expect(result.isValid).toBe(false);
    });

    it('should reject duplicate group names', () => {
      const result = validateGroupName('family', existingGroups);
      expect(result.isValid).toBe(false);
    });

    it('should reject group names that are too long', () => {
      const longName = 'A'.repeat(31);
      const result = validateGroupName(longName, existingGroups);
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateGroupConfiguration', () => {
    const participants: Participant[] = [
      { id: '1', name: 'Alice', createdAt: Date.now() },
      { id: '2', name: 'Bob', createdAt: Date.now() },
      { id: '3', name: 'Charlie', createdAt: Date.now() },
    ];

    it('should accept valid group configuration', () => {
      const groups: Group[] = [
        { id: '1', name: 'Group1', participantIds: ['1', '2'], createdAt: Date.now() },
      ];
      const result = validateGroupConfiguration(groups, participants);
      expect(result.isValid).toBe(true);
    });

    it('should reject empty groups', () => {
      const groups: Group[] = [
        { id: '1', name: 'Empty', participantIds: [], createdAt: Date.now() },
      ];
      const result = validateGroupConfiguration(groups, participants);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('is empty');
    });

    it('should reject groups with only one member', () => {
      const groups: Group[] = [
        { id: '1', name: 'Single', participantIds: ['1'], createdAt: Date.now() },
      ];
      const result = validateGroupConfiguration(groups, participants);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('only one member');
    });

    it('should reject groups containing all participants', () => {
      const groups: Group[] = [
        { id: '1', name: 'All', participantIds: ['1', '2', '3'], createdAt: Date.now() },
      ];
      const result = validateGroupConfiguration(groups, participants);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('contains all participants');
    });
  });

  describe('validateMinimumParticipants', () => {
    it('should accept 2 or more participants', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
      ];
      const result = validateMinimumParticipants(participants);
      expect(result.isValid).toBe(true);
    });

    it('should reject fewer than 2 participants', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
      ];
      const result = validateMinimumParticipants(participants);
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateVerificationName', () => {
    it('should accept matching names', () => {
      const result = validateVerificationName('Alice', 'Alice');
      expect(result.isValid).toBe(true);
    });

    it('should accept matching names (case-insensitive)', () => {
      const result = validateVerificationName('alice', 'Alice');
      expect(result.isValid).toBe(true);
    });

    it('should reject non-matching names', () => {
      const result = validateVerificationName('Bob', 'Alice');
      expect(result.isValid).toBe(false);
    });

    it('should reject empty input', () => {
      const result = validateVerificationName('', 'Alice');
      expect(result.isValid).toBe(false);
    });
  });

  describe('createParticipant', () => {
    it('should create a participant with correct structure', () => {
      const participant = createParticipant('Alice');
      expect(participant).toHaveProperty('id');
      expect(participant).toHaveProperty('name', 'Alice');
      expect(participant).toHaveProperty('createdAt');
      expect(typeof participant.createdAt).toBe('number');
    });

    it('should trim whitespace from name', () => {
      const participant = createParticipant('  Bob  ');
      expect(participant.name).toBe('Bob');
    });
  });

  describe('createGroup', () => {
    it('should create a group with correct structure', () => {
      const group = createGroup('Family');
      expect(group).toHaveProperty('id');
      expect(group).toHaveProperty('name', 'Family');
      expect(group).toHaveProperty('participantIds');
      expect(group.participantIds).toEqual([]);
      expect(group).toHaveProperty('createdAt');
    });
  });

  describe('formatTimestamp', () => {
    it('should format timestamp to readable date', () => {
      const timestamp = new Date('2025-12-25T12:00:00').getTime();
      const formatted = formatTimestamp(timestamp);
      expect(formatted).toContain('Dec');
      expect(formatted).toContain('25');
      expect(formatted).toContain('2025');
    });
  });

  describe('formatRelativeTime', () => {
    it('should return "Just now" for recent timestamps', () => {
      const timestamp = Date.now() - 30000; // 30 seconds ago
      const result = formatRelativeTime(timestamp);
      expect(result).toBe('Just now');
    });

    it('should return minutes for timestamps within an hour', () => {
      const timestamp = Date.now() - 5 * 60 * 1000; // 5 minutes ago
      const result = formatRelativeTime(timestamp);
      expect(result).toContain('minute');
    });

    it('should return hours for timestamps within a day', () => {
      const timestamp = Date.now() - 2 * 60 * 60 * 1000; // 2 hours ago
      const result = formatRelativeTime(timestamp);
      expect(result).toContain('hour');
    });

    it('should return days for older timestamps', () => {
      const timestamp = Date.now() - 3 * 24 * 60 * 60 * 1000; // 3 days ago
      const result = formatRelativeTime(timestamp);
      expect(result).toContain('day');
    });
  });

  describe('getParticipantById', () => {
    const participants: Participant[] = [
      { id: '1', name: 'Alice', createdAt: Date.now() },
      { id: '2', name: 'Bob', createdAt: Date.now() },
    ];

    it('should find participant by ID', () => {
      const result = getParticipantById('1', participants);
      expect(result).toBeDefined();
      expect(result?.name).toBe('Alice');
    });

    it('should return undefined for non-existent ID', () => {
      const result = getParticipantById('999', participants);
      expect(result).toBeUndefined();
    });
  });
});
