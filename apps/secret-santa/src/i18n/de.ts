/**
 * German translations
 */
export default {
  // Navigation
  nav: {
    home: 'Startseite',
    participants: 'Teilnehmer',
    groups: 'Gruppen',
    assignments: 'Zuweisungen',
    history: 'Verlauf',
    config: 'Einstellungen',
    howTo: 'Anleitung',
    getStarted: 'Los geht\'s',
    continue: 'Fortfahren',
    resetSession: 'Aktuelle Sitzung zurücksetzen',
  },

  navigation: {
    language: 'Sprache',
    toggleMenu: 'Menü umschalten',
  },

  // Home page
  home: {
    title: 'Wichteln',
    subtitle: 'Organisieren Sie Ihren Wichtel-Geschenkaustausch mit Leichtigkeit',
    welcome: 'Willkommen beim Wichteln!',
    description: 'Erstellen Sie einen lustigen und fairen Wichtel-Geschenkaustausch für Freunde, Familie oder Kollegen.',
    whatIs: {
      title: 'Was ist Wichteln?',
      description1: 'Wichteln ist eine lustige Weihnachtstradition, bei der jeder Person in einer Gruppe zufällig eine andere Person zugewiesen wird, der sie ein Geschenk machen soll. Die Identität des Schenkenden bleibt geheim, bis die Geschenke ausgetauscht werden.',
      description2: 'Diese App hilft Ihnen, Ihren Wichtel-Austausch zu organisieren, indem sie Teilnehmer zufällig zuweist und dabei alle von Ihnen festgelegten Einschränkungen respektiert (z.B. verhindert, dass Familienmitglieder sich gegenseitig ziehen).',
    },
    features: {
      title: 'Funktionen',
      manage: {
        title: 'Teilnehmer verwalten',
        description: 'Fügen Sie Personen einfach hinzu oder entfernen Sie sie von Ihrem Wichteln',
      },
      createGroups: {
        title: 'Gruppen erstellen',
        description: 'Legen Sie Ausschlussregeln fest, damit Paare oder Familienmitglieder sich nicht gegenseitig ziehen',
      },
      smartAssignment: {
        title: 'Intelligente Zuweisung',
        description: 'Generieren Sie zufällige Zuweisungen, die Ihre Gruppenbeschränkungen respektieren',
      },
      secureReveal: {
        title: 'Sichere Enthüllung',
        description: 'Namensüberprüfung stellt sicher, dass nur die richtige Person ihre Zuweisung sieht',
      },
      privacy: {
        title: 'Privatsphäre zuerst',
        description: 'Namensüberprüfung erforderlich, um Zuweisungen anzuzeigen',
      },
      groups: {
        title: 'Gruppenbeschränkungen',
        description: 'Verhindern Sie, dass Familienmitglieder oder Mitbewohner sich gegenseitig ziehen',
      },
      timing: {
        title: 'Zeitgesteuerte Anzeige',
        description: 'Zuweisungen werden 5 Sekunden lang angezeigt, um versehentliches Aufdecken zu verhindern',
      },
      history: {
        title: 'Verlaufsverfolgung',
        description: 'Speichern und überprüfen Sie Ihre letzten 5 generierten Listen',
      },
    },
    restore: {
      title: 'Vorherige Sitzung gefunden',
      description: 'Wir haben Daten aus Ihrer vorherigen Sitzung gefunden. Möchten Sie diese wiederherstellen?',
      restoreButton: 'Vorherige Sitzung wiederherstellen',
      startFreshButton: 'Neu beginnen',
    },
    getStartedButton: 'Los geht\'s',
    orCheckOut: 'oder schauen Sie sich die',
    howToGuideLink: 'Anleitung',
  },

  // Participants page
  participants: {
    title: 'Teilnehmer',
    manageTitle: 'Teilnehmer verwalten',
    addPlaceholder: 'Teilnehmername eingeben...',
    addButton: 'Teilnehmer hinzufügen',
    adding: 'Wird hinzugefügt...',
    noParticipants: 'Noch keine Teilnehmer',
    addFirst: 'Fügen Sie oben Teilnehmer hinzu, um zu beginnen',
    count: '{count} Teilnehmer',
    countSingular: 'Teilnehmer',
    countPlural: 'Teilnehmer',
    remove: 'Entfernen',
    clearAll: 'Alle löschen',
    groups: 'Gruppen',
    groupsLabel: 'Gruppen:',
    deleteConfirm: 'Löschen?',
    removeTitle: 'Teilnehmer entfernen',
    confirmTitle: 'Klicken Sie erneut zur Bestätigung',
    clearAllPrompt: 'Möchten Sie wirklich alle {count} Teilnehmer entfernen? Dies wird auch alle Gruppen löschen.',
    breadcrumb: {
      step1: '1. Teilnehmer',
      step2: '2. Gruppen (optional)',
      step3: '3. Zuweisungen generieren',
      current: 'Teilnehmer',
      groups: 'Gruppen (optional)',
      assignments: 'Zuweisungen generieren',
    },
    nextButton: 'Weiter: Gruppen (optional)',
  },

  // Groups page
  groups: {
    title: 'Gruppen',
    createTitle: 'Gruppen erstellen (optional)',
    description: 'Gruppieren Sie Teilnehmer, die sich nicht gegenseitig ziehen sollten (z.B. Paare, Familienmitglieder)',
    createButton: 'Gruppe erstellen',
    createNewButton: '+ Neue Gruppe erstellen',
    createButtonShort: 'Erstellen',
    enterGroupName: 'Gruppenname eingeben...',
    noGroups: 'Noch keine Gruppen erstellt',
    createFirst: 'Gruppen sind optional. Erstellen Sie Gruppen, um zu verhindern, dass bestimmte Personen sich gegenseitig ziehen.',
    groupName: 'Gruppenname',
    addParticipant: '+ Teilnehmer zur Gruppe hinzufügen',
    removeGroup: 'Gruppe entfernen',
    deleteButton: 'Löschen',
    removePrompt: 'Gruppe "{name}" entfernen? Teilnehmer werden nicht gelöscht.',
    unassigned: 'Nicht zugewiesene Teilnehmer',
    inGroup: 'in {count} Gruppe(n)',
    members: 'Mitglieder',
    minParticipants: 'Fügen Sie mindestens 2 Teilnehmer hinzu, um Gruppen zu erstellen',
    breadcrumb: {
      step1Done: '1. Teilnehmer ✓',
      step2: '2. Gruppen (optional)',
      step2Done: '2. Gruppen ✓',
      step3: '3. Zuweisungen generieren',
      participants: 'Teilnehmer',
      current: 'Gruppen (optional)',
      assignments: 'Zuweisungen generieren',
    },
    nextButton: 'Weiter: Zuweisungen generieren',
  },

  // Assignments page
  assignments: {
    title: 'Zuweisungen generieren',
    generate: 'Zuweisungen generieren',
    regenerate: 'Zuweisungen neu generieren',
    generating: 'Wird generiert...',
    clearCurrent: 'Aktuelle löschen',
    clearPrompt: 'Möchten Sie die aktuellen Zuweisungen wirklich löschen? Dies wird sie nicht aus dem Verlauf löschen.',
    regeneratePrompt: 'Das erneute Generieren löscht die aktuellen Zuweisungen, einschließlich derjenigen, die bereits aufgedeckt wurden. Fortfahren?',
    minParticipants: 'Fügen Sie mindestens 2 Teilnehmer hinzu, um Zuweisungen zu generieren',
    oneMore: 'Fügen Sie noch 1 Teilnehmer hinzu, um Zuweisungen zu generieren',
    summary: '{count} Teilnehmer',
    summaryWithGroups: '{count} Teilnehmer, {groups} Gruppen mit Ausschlüssen',
    groupsWithExclusions: 'Gruppen mit Ausschlüssen',
    revealed: 'aufgedeckt',
    secretSantaAssignments: 'Wichtel-Zuweisungen',
    clickToReveal: 'Klicken Sie auf einen Namen, um Ihre Wichtel-Zuweisung zu überprüfen und aufzudecken',
    revealedAt: 'Aufgedeckt',
    breadcrumb: {
      step1Done: '1. Teilnehmer ✓',
      step2Done: '2. Gruppen ✓',
      step3: '3. Zuweisungen generieren',
      participants: 'Teilnehmer',
      groups: 'Gruppen (optional)',
      current: 'Zuweisungen generieren',
    },
  },

  // Assignment viewer
  viewer: {
    title: 'Ihre Zuweisungen',
    verifyIdentity: '🎅 Identität überprüfen',
    clickToReveal: 'Klicken Sie auf Ihren Namen, um Ihre Wichtel-Zuweisung aufzudecken',
    verify: 'Überprüfen und aufdecken',
    enterName: 'Geben Sie Ihren Namen ein, um diese Zuweisung aus der Historie anzuzeigen',
    namePlaceholder: 'Geben Sie Ihren Namen ein...',
    yourName: 'Ihr Name',
    nameRequired: 'Bitte geben Sie Ihren Namen ein',
    nameError: 'Name stimmt nicht überein. Bitte versuchen Sie es erneut.',
    revealing: 'Zuweisung wird aufgedeckt...',
    revealAssignment: 'Zuweisung aufdecken',
    youAreSecretSantaFor: 'Sie waren Wichtel für:',
    closeIn: 'Schließt in {seconds} Sekunden',
    closeNow: 'Jetzt schließen',
    gives: '{giver} schenkt {receiver}',
    givesTo: 'schenkt',
    revealed: 'Aufgedeckt {date}',
  },

  // History
  history: {
    title: 'Zuweisungsverlauf',
    noHistory: 'Noch kein Verlauf',
    description: 'Generieren Sie Zuweisungen, um den Verlauf aufzubauen',
    lastGenerated: 'Letzte',
    generatedLists: 'generierte Listen',
    viewDetails: 'Details anzeigen',
    loadList: 'Liste laden',
    clearAll: 'Gesamten Verlauf löschen',
    clearPrompt: 'Möchten Sie wirklich alle {count} gespeicherten Listen löschen? Dies kann nicht rückgängig gemacht werden.',
    backToHistory: 'Zurück zum Verlauf',
    current: 'Aktuell',
    participants: 'Teilnehmer',
    revealed: 'aufgedeckt',
    groups: 'Gruppen',
    remake: 'Mit denselben Einstellungen wiederholen',
    remakePrompt: 'Dies startet eine neue Sitzung mit denselben Teilnehmern und Gruppen aus dieser historischen Liste. Fortfahren?',
    verificationDisabled: 'Das Anzeigen von Zuweisungen im Verlauf ist deaktiviert. Aktivieren Sie es in den Einstellungen, um diese Funktion zu nutzen.',
    revealedAt: 'Aufgedeckt',
  },

  // Config page
  config: {
    title: 'Einstellungen',
    historySettings: 'Verlaufseinstellungen',
    privacySettings: 'Datenschutzeinstellungen',
    sessionManagement: 'Sitzungsverwaltung',
    dangerZone: 'Gefahrenzone',
    maxHistory: {
      label: 'Maximale Verlaufsanzahl',
      description: 'Anzahl der Zuweisungslisten, die im Verlauf gespeichert werden sollen (1-50). Ältere Einträge werden automatisch entfernt.',
      currently: 'Aktuell:',
      inStorage: 'Im Speicher:',
      error: 'Maximale Verlaufsanzahl muss zwischen 1 und 50 liegen',
      trimmed: 'Verlauf gekürzt: {count} älteste {count, plural, one {Eintrag} other {Einträge}} entfernt',
    },
    allowHistoryView: {
      label: 'Anzeigen von Zuweisungen im Verlauf erlauben',
      description: 'Wenn aktiviert, können Sie Zuweisungen aus früheren Listen auf der Verlaufsseite aufdecken (gleiche Überprüfung wie bei aktuellen Zuweisungen).',
    },
    resetSession: {
      label: 'Aktuelle Sitzung zurücksetzen',
      description: 'Setzen Sie die aktuelle Sitzung zurück, um mit neuen Teilnehmern und Gruppen neu zu beginnen. Ihre abgeschlossenen Zuweisungslisten bleiben im Verlauf erhalten.',
      button: 'Aktuelle Sitzung zurücksetzen',
      prompt: 'Möchten Sie die aktuelle Sitzung wirklich zurücksetzen? Dies löscht alle Teilnehmer, Gruppen und die aktuelle Zuweisungsliste. Die aktuelle Liste wird im Verlauf gespeichert, wenn sie Zuweisungen hat.',
      success: 'Die aktuelle Sitzung wurde zurückgesetzt. Sie können mit neuen Teilnehmern und Gruppen von vorne beginnen.',
    },
    resetDefaults: {
      description: 'Alle Konfigurationseinstellungen auf ihre Standardwerte zurücksetzen.',
      button: 'Alle Einstellungen auf Standard zurücksetzen',
      prompt: 'Möchten Sie wirklich alle Einstellungen auf die Standardwerte zurücksetzen?',
    },
    save: 'Änderungen speichern',
    unsavedChanges: 'Sie haben nicht gespeicherte Änderungen',
  },

  // How To page
  howTo: {
    title: 'Anleitung',
    steps: {
      participants: {
        title: 'Teilnehmer hinzufügen',
        description: 'Gehen Sie zur Teilnehmer-Seite und fügen Sie alle hinzu, die am Wichteln teilnehmen werden.',
      },
      groups: {
        title: 'Gruppen erstellen (optional)',
        description: 'Wenn Sie verhindern möchten, dass bestimmte Personen sich gegenseitig ziehen (wie Familienmitglieder), erstellen Sie Gruppen auf der Gruppen-Seite.',
      },
      generate: {
        title: 'Zuweisungen generieren',
        description: 'Gehen Sie zur Zuweisungs-Seite und klicken Sie auf "Zuweisungen generieren", um Ihre Wichtel-Paare zu erstellen.',
      },
      reveal: {
        title: 'Zuweisungen aufdecken',
        description: 'Jeder Teilnehmer klickt auf seinen Namen und gibt ihn ein, um zu sehen, für wen er ein Geschenk kauft. Die Zuweisung wird 5 Sekunden lang angezeigt.',
      },
    },
    tips: {
      title: 'Tipps',
      privacy: 'Nach dem Anzeigen wird die Zuweisung als "aufgedeckt" markiert',
      history: 'Alle generierten Listen werden im Verlauf gespeichert',
      groups: 'Personen in derselben Gruppe können einander nicht zugewiesen werden',
      maxHistory: 'Sie können die maximale Verlaufsanzahl in den Einstellungen konfigurieren (Standard: 5)',
      remake: 'Verwenden Sie "Mit denselben Einstellungen wiederholen" im Verlauf, um Teilnehmerlisten wiederzuverwenden',
    },
  },

  // Common
  common: {
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    save: 'Speichern',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    close: 'Schließen',
    back: 'Zurück',
    next: 'Weiter',
    loading: 'Wird geladen...',
    error: 'Fehler',
    success: 'Erfolg',
    footer: 'Mit ❤️ gemacht, um Urlaubsfreude zu verbreiten',
  },
};
