import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  loadParticipants,
  saveParticipants,
  clearParticipants,
  loadGroups,
  saveGroups,
  clearGroups,
  loadHistory,
  saveToHistory,
  clearHistory,
  loadCurrentList,
  saveCurrentList,
  clearCurrentList,
  clearAllData,
  exportData,
  importData,
} from '@/utils/local-storage';
import type { Participant, Group, GeneratedList } from '@/types';

describe('local storage utilities', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  // Clean up after each test
  afterEach(() => {
    localStorage.clear();
  });

  describe('participants', () => {
    const sampleParticipants: Participant[] = [
      { id: '1', name: 'Alice', createdAt: Date.now() },
      { id: '2', name: 'Bob', createdAt: Date.now() },
    ];

    it('should save and load participants', () => {
      saveParticipants(sampleParticipants);
      const loaded = loadParticipants();
      expect(loaded).toEqual(sampleParticipants);
    });

    it('should return empty array when no participants', () => {
      const loaded = loadParticipants();
      expect(loaded).toEqual([]);
    });

    it('should clear participants', () => {
      saveParticipants(sampleParticipants);
      clearParticipants();
      const loaded = loadParticipants();
      expect(loaded).toEqual([]);
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('secret-santa-participants', 'invalid json');
      const loaded = loadParticipants();
      expect(loaded).toEqual([]);
    });
  });

  describe('groups', () => {
    const sampleGroups: Group[] = [
      { id: '1', name: 'Family', participantIds: ['1', '2'], createdAt: Date.now() },
    ];

    it('should save and load groups', () => {
      saveGroups(sampleGroups);
      const loaded = loadGroups();
      expect(loaded).toEqual(sampleGroups);
    });

    it('should return empty array when no groups', () => {
      const loaded = loadGroups();
      expect(loaded).toEqual([]);
    });

    it('should clear groups', () => {
      saveGroups(sampleGroups);
      clearGroups();
      const loaded = loadGroups();
      expect(loaded).toEqual([]);
    });
  });

  describe('history', () => {
    const createSampleList = (id: string, timestamp: number): GeneratedList => ({
      id,
      timestamp,
      assignments: [
        { id: 'a1', giverId: '1', receiverId: '2', revealed: false },
      ],
      participants: [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
      ],
      groups: [],
    });

    it('should save and load history', () => {
      const list = createSampleList('list1', Date.now());
      saveToHistory(list);
      const loaded = loadHistory();
      expect(loaded).toHaveLength(1);
      expect(loaded[0]).toEqual(list);
    });

    it('should maintain maximum of 5 history items', () => {
      // Add 7 items
      for (let i = 0; i < 7; i++) {
        const list = createSampleList(`list${i}`, Date.now() + i);
        saveToHistory(list);
      }

      const loaded = loadHistory();
      expect(loaded).toHaveLength(5);
    });

    it('should keep newest items when exceeding limit', () => {
      const timestamps = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

      timestamps.forEach((timestamp, i) => {
        const list = createSampleList(`list${i}`, timestamp);
        saveToHistory(list);
      });

      const loaded = loadHistory();
      expect(loaded).toHaveLength(5);

      // Should keep the 5 newest (highest timestamps)
      expect(loaded[0].timestamp).toBe(7000);
      expect(loaded[4].timestamp).toBe(3000);
    });

    it('should clear history', () => {
      const list = createSampleList('list1', Date.now());
      saveToHistory(list);
      clearHistory();
      const loaded = loadHistory();
      expect(loaded).toEqual([]);
    });
  });

  describe('current list', () => {
    const sampleList: GeneratedList = {
      id: 'current',
      timestamp: Date.now(),
      assignments: [
        { id: 'a1', giverId: '1', receiverId: '2', revealed: false },
      ],
      participants: [
        { id: '1', name: 'Alice', createdAt: Date.now() },
        { id: '2', name: 'Bob', createdAt: Date.now() },
      ],
      groups: [],
    };

    it('should save and load current list', () => {
      saveCurrentList(sampleList);
      const loaded = loadCurrentList();
      expect(loaded).toEqual(sampleList);
    });

    it('should return null when no current list', () => {
      const loaded = loadCurrentList();
      expect(loaded).toBeNull();
    });

    it('should clear current list', () => {
      saveCurrentList(sampleList);
      clearCurrentList();
      const loaded = loadCurrentList();
      expect(loaded).toBeNull();
    });

    it('should handle null when saving', () => {
      saveCurrentList(sampleList);
      saveCurrentList(null);
      const loaded = loadCurrentList();
      expect(loaded).toBeNull();
    });
  });

  describe('bulk operations', () => {
    it('should clear all data', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
      ];
      const groups: Group[] = [
        { id: '1', name: 'Family', participantIds: [], createdAt: Date.now() },
      ];
      const list: GeneratedList = {
        id: 'list1',
        timestamp: Date.now(),
        assignments: [],
        participants: [],
        groups: [],
      };

      saveParticipants(participants);
      saveGroups(groups);
      saveToHistory(list);
      saveCurrentList(list);

      clearAllData();

      expect(loadParticipants()).toEqual([]);
      expect(loadGroups()).toEqual([]);
      expect(loadHistory()).toEqual([]);
      expect(loadCurrentList()).toBeNull();
    });

    it('should export and import data', () => {
      const participants: Participant[] = [
        { id: '1', name: 'Alice', createdAt: Date.now() },
      ];
      const groups: Group[] = [
        { id: '1', name: 'Family', participantIds: ['1'], createdAt: Date.now() },
      ];

      saveParticipants(participants);
      saveGroups(groups);

      const exported = exportData();
      expect(typeof exported).toBe('string');

      clearAllData();

      importData(exported);

      expect(loadParticipants()).toEqual(participants);
      expect(loadGroups()).toEqual(groups);
    });

    it('should handle import of corrupted data', () => {
      expect(() => {
        importData('invalid json');
      }).toThrow();
    });
  });
});
