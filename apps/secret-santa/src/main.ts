import Alpine from 'alpinejs';
import './styles/main.css';
import { resetToHome } from '@/utils/router';
import { initI18n } from '@/i18n';

// Import stores
import participantsStore from '@/stores/participants';
import groupsStore from '@/stores/groups';
import historyStore from '@/stores/history';
import configStore from '@/stores/config';
import i18nStore from '@/stores/i18n';

// Import components
import Navigation from '@/components/Navigation';
import PageContainer from '@/components/PageContainer';
import HomePage from '@/components/HomePage';
import HowToPage from '@/components/HowToPage';
import NameInput from '@/components/NameInput';
import ParticipantList from '@/components/ParticipantList';
import GroupManager from '@/components/GroupManager';
import AssignmentGenerator from '@/components/AssignmentGenerator';
import AssignmentViewer from '@/components/AssignmentViewer';
import HistoryModal from '@/components/HistoryModal';
import ConfigPage from '@/components/ConfigPage';

// Initialize i18n before Alpine
await initI18n();

// Register Alpine stores
Alpine.store('i18n', i18nStore());
Alpine.store('config', configStore());
Alpine.store('participants', participantsStore());
Alpine.store('groups', groupsStore());
Alpine.store('history', historyStore());

// Initialize config store immediately (needed for other stores)
document.addEventListener('alpine:init', () => {
  const config = Alpine.store('config');
  if (config) config.init();

  console.log('✅ Stores created (config initialized, others waiting for user choice)');
});

// Register Alpine components
Alpine.data('navigation', Navigation);
Alpine.data('pageContainer', PageContainer);
Alpine.data('homePage', HomePage);
Alpine.data('howToPage', HowToPage);
Alpine.data('nameInput', NameInput);
Alpine.data('participantList', ParticipantList);
Alpine.data('groupManager', GroupManager);
Alpine.data('assignmentGenerator', AssignmentGenerator);
Alpine.data('assignmentViewer', AssignmentViewer);
Alpine.data('historyModal', HistoryModal);
Alpine.data('configPage', ConfigPage);

// Make Alpine available globally for debugging
window.Alpine = Alpine;

// Add global translation magic property
Alpine.magic('t', () => {
  return (key: string, options?: any) => {
    const i18nStore = Alpine.store('i18n') as any;
    return i18nStore?.t(key, options) || key;
  };
});

// Reset to home page on page load/refresh
resetToHome();

// Start Alpine
Alpine.start();

console.log('🎅 Secret Santa app initialized!');
