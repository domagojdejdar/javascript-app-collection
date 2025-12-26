/**
 * English translations
 */
export default {
  // Navigation
  nav: {
    home: 'Home',
    participants: 'Participants',
    groups: 'Groups',
    assignments: 'Assignments',
    history: 'History',
    config: 'Config',
    howTo: 'How To',
    getStarted: 'Get Started',
    continue: 'Continue',
    resetSession: 'Reset Current Session',
  },

  // Home page
  home: {
    title: 'Secret Santa',
    subtitle: 'Organize your Secret Santa gift exchange with ease',
    welcome: 'Welcome to Secret Santa!',
    description: 'Create a fun and fair Secret Santa gift exchange for your friends, family, or colleagues.',
    features: {
      privacy: {
        title: 'Privacy First',
        description: 'Name verification required to view assignments',
      },
      groups: {
        title: 'Group Constraints',
        description: 'Prevent family members or roommates from drawing each other',
      },
      timing: {
        title: 'Timed Viewing',
        description: 'Assignments display for 5 seconds to prevent accidental reveals',
      },
      history: {
        title: 'History Tracking',
        description: 'Save and review your last 5 generated lists',
      },
    },
    restore: {
      title: 'Previous Session Found',
      description: 'We found data from your previous session. Would you like to restore it?',
      restoreButton: 'Restore Previous Session',
      startFreshButton: 'Start Fresh',
    },
  },

  // Participants page
  participants: {
    title: 'Participants',
    addPlaceholder: 'Enter participant name',
    addButton: 'Add',
    noParticipants: 'No participants yet',
    addFirst: 'Add participants to get started',
    count: '{count} participant(s)',
    remove: 'Remove',
    breadcrumb: {
      current: 'Participants',
      groups: 'Groups (Optional)',
      assignments: 'Generate Assignments',
    },
    nextButton: 'Next: Groups (Optional)',
  },

  // Groups page
  groups: {
    title: 'Groups',
    description: 'Create groups of people who should not be assigned to each other (e.g., family members, roommates)',
    createButton: 'Create Group',
    noGroups: 'No groups yet',
    createFirst: 'Groups are optional. Create groups to prevent certain people from drawing each other.',
    groupName: 'Group name',
    addParticipant: 'Add participant to group',
    removeGroup: 'Remove group',
    removePrompt: 'Remove group "{name}"? Participants will not be deleted.',
    unassigned: 'Unassigned Participants',
    inGroup: 'in {count} group(s)',
    breadcrumb: {
      participants: 'Participants',
      current: 'Groups (Optional)',
      assignments: 'Generate Assignments',
    },
    nextButton: 'Next: Generate Assignments',
  },

  // Assignments page
  assignments: {
    title: 'Generate Assignments',
    generate: 'Generate Assignments',
    regenerate: 'Regenerate Assignments',
    generating: 'Generating...',
    clearCurrent: 'Clear Current',
    clearPrompt: 'Are you sure you want to clear the current assignments? This will not delete them from history.',
    regeneratePrompt: 'Regenerating will clear the current assignments, including any that have been revealed. Continue?',
    minParticipants: 'Add at least 2 participants to generate assignments',
    oneMore: 'Add 1 more participant to generate assignments',
    summary: '{count} participants, {groups} groups',
    revealed: '{count} revealed',
    breadcrumb: {
      participants: 'Participants',
      groups: 'Groups (Optional)',
      current: 'Generate Assignments',
    },
  },

  // Assignment viewer
  viewer: {
    title: 'Your Assignments',
    clickToReveal: 'Click on your name to reveal your Secret Santa assignment',
    verify: 'Verify and Reveal',
    enterName: 'Enter your name to reveal assignment',
    namePlaceholder: 'Your name',
    nameError: 'Name does not match. Please try again.',
    revealing: 'Revealing assignment...',
    timeRemaining: 'Time remaining: {seconds}s',
    gives: '{giver} gives to {receiver}',
    revealed: 'Revealed {date}',
  },

  // History
  history: {
    title: 'Assignment History',
    noHistory: 'No history yet',
    description: 'Generate assignments to see them in history',
    viewDetails: 'View Details',
    loadList: 'Load List',
    clearAll: 'Clear All History',
    clearPrompt: 'Are you sure you want to delete all {count} saved lists? This cannot be undone.',
    backToHistory: 'Back to History',
    remake: 'Remake with Same Settings',
    remakePrompt: 'This will start a new session with the same participants and groups from this historical list. Continue?',
    verificationDisabled: 'Viewing assignments in history is disabled. Enable it in Config to use this feature.',
  },

  // Config page
  config: {
    title: 'Configuration',
    maxHistory: {
      label: 'Maximum History Count',
      description: 'Number of assignment lists to keep in history (1-50)',
    },
    allowHistoryView: {
      label: 'Allow Viewing Assignments in History',
      description: 'When enabled, you can view receiver names in historical lists through name verification',
    },
    resetSession: {
      label: 'Reset Current Session',
      description: 'Clear all participants, groups, and current assignments',
      button: 'Reset Current Session',
      prompt: 'Are you sure you want to reset the current session? This will clear all participants, groups, and the current assignment list. The current list will be saved to history if it has assignments.',
      success: 'Current session has been reset. You can start fresh with new participants and groups.',
    },
    resetDefaults: {
      button: 'Reset All Settings to Defaults',
      prompt: 'Are you sure you want to reset all settings to default values?',
    },
    save: 'Save Changes',
    unsavedChanges: 'You have unsaved changes',
  },

  // How To page
  howTo: {
    title: 'How to Use',
    steps: {
      participants: {
        title: 'Add Participants',
        description: 'Go to the Participants page and add everyone who will participate in Secret Santa.',
      },
      groups: {
        title: 'Create Groups (Optional)',
        description: 'If you want to prevent certain people from drawing each other (like family members), create groups on the Groups page.',
      },
      generate: {
        title: 'Generate Assignments',
        description: 'Go to the Assignments page and click "Generate Assignments" to create your Secret Santa pairings.',
      },
      reveal: {
        title: 'Reveal Assignments',
        description: 'Each participant clicks their name and enters it to see who they\'re buying a gift for. The assignment displays for 5 seconds.',
      },
    },
    tips: {
      title: 'Tips',
      privacy: 'After viewing, the assignment is marked as "revealed"',
      history: 'All generated lists are saved in History',
      groups: 'People in the same group cannot be assigned to each other',
      maxHistory: 'You can configure max history count in Config (default: 5)',
      remake: 'Use "Remake with Same Settings" in history to reuse participant lists',
    },
  },

  // Common
  common: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
};
