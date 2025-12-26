/**
 * Croatian translations
 */
export default {
  // Navigation
  nav: {
    home: 'Početna',
    participants: 'Sudionici',
    groups: 'Grupe',
    assignments: 'Dodjele',
    history: 'Povijest',
    config: 'Postavke',
    howTo: 'Upute',
    getStarted: 'Počni',
    continue: 'Nastavi',
    resetSession: 'Resetiraj trenutnu sesiju',
  },

  navigation: {
    language: 'Jezik',
    toggleMenu: 'Prebaci izbornik',
  },

  // Home page
  home: {
    title: 'Tajni Djed Mraz',
    subtitle: 'Organizirajte razmjenu darova s lakoćom',
    welcome: 'Dobrodošli u Tajni Djed Mraz!',
    description: 'Stvorite zabavnu i poštenu razmjenu darova za prijatelje, obitelj ili kolege.',
    whatIs: {
      title: 'Što je Tajni Djed Mraz?',
      description1: 'Tajni Djed Mraz je zabavna božićna tradicija gdje se svakoj osobi u grupi nasumično dodjeljuje druga osoba kojoj treba dati dar. Identitet darivatelja ostaje tajna dok se darovi ne razmijene.',
      description2: 'Ova aplikacija vam pomaže organizirati razmjenu darova nasumičnim dodjeljivanjem sudionika uz poštivanje svih ograničenja koja postavite (poput sprječavanja članova obitelji da izvlače jedni druge).',
    },
    features: {
      title: 'Značajke',
      manage: {
        title: 'Upravljanje sudionicima',
        description: 'Lako dodajte i uklonite ljude koji se pridružuju vašem Tajnom Djed Mrazu',
      },
      createGroups: {
        title: 'Stvaranje grupa',
        description: 'Postavite pravila isključenja kako parovi ili članovi obitelji ne bi izvlačili jedni druge',
      },
      smartAssignment: {
        title: 'Pametna dodjela',
        description: 'Generirajte nasumične dodjele koje poštuju vaša grupna ograničenja',
      },
      secureReveal: {
        title: 'Sigurno otkrivanje',
        description: 'Provjera imena osigurava da samo prava osoba vidi svoju dodjelu',
      },
      privacy: {
        title: 'Privatnost na prvom mjestu',
        description: 'Potrebna provjera imena za pregled dodjela',
      },
      groups: {
        title: 'Grupna ograničenja',
        description: 'Spriječite članove obitelji ili cimere da izvlače jedni druge',
      },
      timing: {
        title: 'Vremenirani prikaz',
        description: 'Dodjele se prikazuju 5 sekundi kako bi se spriječilo slučajno otkrivanje',
      },
      history: {
        title: 'Praćenje povijesti',
        description: 'Spremite i pregledajte zadnjih 5 generiranih lista',
      },
    },
    restore: {
      title: 'Pronađena prethodna sesija',
      description: 'Pronašli smo podatke iz vaše prethodne sesije. Želite li ih vratiti?',
      restoreButton: 'Vrati prethodnu sesiju',
      startFreshButton: 'Počni ispočetka',
    },
    getStartedButton: 'Počni',
    orCheckOut: 'ili pogledajte',
    howToGuideLink: 'upute',
  },

  // Participants page
  participants: {
    title: 'Sudionici',
    manageTitle: 'Upravljanje sudionicima',
    addPlaceholder: 'Unesite ime sudionika...',
    addButton: 'Dodaj sudionika',
    adding: 'Dodavanje...',
    noParticipants: 'Još nema sudionika',
    addFirst: 'Dodajte sudionike gore za početak',
    count: '{count} sudionik(a)',
    countSingular: 'sudionik',
    countPlural: 'sudionika',
    remove: 'Ukloni',
    clearAll: 'Očisti sve',
    groups: 'Grupe',
    groupsLabel: 'Grupe:',
    deleteConfirm: 'Obriši?',
    removeTitle: 'Ukloni sudionika',
    confirmTitle: 'Kliknite ponovno za potvrdu',
    clearAllPrompt: 'Jeste li sigurni da želite ukloniti svih {count} sudionika? Ovo će također očistiti sve grupe.',
    breadcrumb: {
      step1: '1. Sudionici',
      step2: '2. Grupe (neobavezno)',
      step3: '3. Generiraj dodjele',
      current: 'Sudionici',
      groups: 'Grupe (neobavezno)',
      assignments: 'Generiraj dodjele',
    },
    nextButton: 'Dalje: Grupe (neobavezno)',
  },

  // Groups page
  groups: {
    title: 'Grupe',
    createTitle: 'Stvaranje grupa (neobavezno)',
    description: 'Grupirajte sudionike koji ne bi trebali izvlačiti jedni druge (npr. parovi, članovi obitelji)',
    createButton: 'Stvori grupu',
    createNewButton: '+ Stvori novu grupu',
    createButtonShort: 'Stvori',
    enterGroupName: 'Unesite naziv grupe...',
    noGroups: 'Još nema stvorenih grupa',
    createFirst: 'Grupe su neobavezne. Stvorite grupe kako biste spriječili određene ljude da izvlače jedni druge.',
    groupName: 'Naziv grupe',
    addParticipant: '+ Dodaj sudionika u grupu',
    removeGroup: 'Ukloni grupu',
    deleteButton: 'Obriši',
    removePrompt: 'Ukloniti grupu "{name}"? Sudionici neće biti obrisani.',
    unassigned: 'Nedodijeljeni sudionici',
    inGroup: 'u {count} grupi/grupa',
    members: 'članova',
    minParticipants: 'Dodajte najmanje 2 sudionika za stvaranje grupa',
    breadcrumb: {
      step1Done: '1. Sudionici ✓',
      step2: '2. Grupe (neobavezno)',
      step2Done: '2. Grupe ✓',
      step3: '3. Generiraj dodjele',
      participants: 'Sudionici',
      current: 'Grupe (neobavezno)',
      assignments: 'Generiraj dodjele',
    },
    nextButton: 'Dalje: Generiraj dodjele',
  },

  // Assignments page
  assignments: {
    title: 'Generiraj dodjele',
    generate: 'Generiraj dodjele',
    regenerate: 'Ponovno generiraj dodjele',
    generating: 'Generiranje...',
    clearCurrent: 'Očisti trenutne',
    clearPrompt: 'Jeste li sigurni da želite očistiti trenutne dodjele? Ovo ih neće obrisati iz povijesti.',
    regeneratePrompt: 'Ponovno generiranje će očistiti trenutne dodjele, uključujući one koje su otkrivene. Nastaviti?',
    minParticipants: 'Dodajte najmanje 2 sudionika za generiranje dodjela',
    oneMore: 'Dodajte još 1 sudionika za generiranje dodjela',
    summary: '{count} sudionika',
    summaryWithGroups: '{count} sudionika, {groups} grupa s isključenjima',
    groupsWithExclusions: 'grupa s isključenjima',
    revealed: 'otkriveno',
    secretSantaAssignments: 'Dodjele Tajnog Djed Mraza',
    clickToReveal: 'Kliknite na ime da provjerite i otkrijete svoju dodjelu Tajnog Djed Mraza',
    revealedAt: 'Otkriveno',
    breadcrumb: {
      step1Done: '1. Sudionici ✓',
      step2Done: '2. Grupe ✓',
      step3: '3. Generiraj dodjele',
      participants: 'Sudionici',
      groups: 'Grupe (neobavezno)',
      current: 'Generiraj dodjele',
    },
  },

  // Assignment viewer
  viewer: {
    title: 'Vaše dodjele',
    verifyIdentity: '🎅 Potvrdite svoj identitet',
    clickToReveal: 'Kliknite na svoje ime da otkrijete svoju Tajni Djed Mraz dodjelu',
    verify: 'Provjeri i otkrij',
    enterName: 'Unesite svoje ime za pregled ove dodjele iz povijesti',
    namePlaceholder: 'Unesite svoje ime...',
    yourName: 'Vaše ime',
    nameRequired: 'Molimo unesite svoje ime',
    nameError: 'Ime se ne podudara. Molimo pokušajte ponovno.',
    revealing: 'Otkrivanje dodjele...',
    revealAssignment: 'Otkrij dodjelu',
    youAreSecretSantaFor: 'bili ste Tajni Djed Mraz za:',
    closeIn: 'Ovo će se zatvoriti za {seconds} sekundi',
    closeNow: 'Zatvori sada',
    timeRemaining: 'Preostalo vrijeme: {seconds}s',
    gives: '{giver} daruje {receiver}',
    givesTo: 'daruje',
    revealed: 'Otkriveno {date}',
  },

  // History
  history: {
    title: 'Povijest dodjela',
    noHistory: 'Još nema povijesti',
    description: 'Generirajte dodjele da počnete graditi povijest',
    lastGenerated: 'Zadnjih',
    generatedLists: 'generiranih lista',
    viewDetails: 'Prikaži detalje',
    loadList: 'Učitaj listu',
    clearAll: 'Očisti svu povijest',
    clearPrompt: 'Jeste li sigurni da želite obrisati svih {count} spremljenih lista? Ovo se ne može poništiti.',
    backToHistory: 'Natrag na povijest',
    current: 'Trenutna',
    participants: 'sudionika',
    revealed: 'otkriveno',
    groups: 'grupa',
    remake: 'Ponovi s istim postavkama',
    remakePrompt: 'Ovo će pokrenuti novu sesiju s istim sudionicima i grupama iz ove povijesne liste. Nastaviti?',
    verificationDisabled: 'Pregled dodjela u povijesti je onemogućen. Omogućite ga u postavkama za korištenje ove značajke.',
    revealedAt: 'Otkriveno',
  },

  // Config page
  config: {
    title: 'Postavke',
    historySettings: 'Postavke povijesti',
    privacySettings: 'Postavke privatnosti',
    sessionManagement: 'Upravljanje sesijom',
    dangerZone: 'Opasna zona',
    maxHistory: {
      label: 'Maksimalan broj povijesti',
      description: 'Broj lista dodjela koje će se čuvati u povijesti (1-50). Stariji unosi će biti automatski uklonjeni.',
      currently: 'Trenutno:',
      inStorage: 'U memoriji:',
      error: 'Maksimalan broj povijesti mora biti između 1 i 50',
      trimmed: 'Povijest skraćena: {count} {count, plural, one {najstariji unos} other {najstarijih unosa}} uklonjeno',
    },
    allowHistoryView: {
      label: 'Dopusti pregled dodjela u povijesti',
      description: 'Kada je omogućeno, možete otkriti dodjele iz prošlih lista na stranici povijesti (ista provjera kao kod trenutnih dodjela).',
    },
    resetSession: {
      label: 'Resetiraj trenutnu sesiju',
      description: 'Resetirajte trenutnu sesiju kako biste počeli ispočetka s novim sudionicima i grupama. Vaše dovršene liste dodjela ostat će u povijesti.',
      button: 'Resetiraj trenutnu sesiju',
      prompt: 'Jeste li sigurni da želite resetirati trenutnu sesiju? Ovo će očistiti sve sudionike, grupe i trenutnu listu dodjela. Trenutna lista će biti spremljena u povijest ako ima dodjela.',
      success: 'Trenutna sesija je resetirana. Možete početi ispočetka s novim sudionicima i grupama.',
    },
    resetDefaults: {
      description: 'Resetirajte sve konfiguracijske postavke na njihove zadane vrijednosti.',
      button: 'Resetiraj sve postavke na zadane',
      prompt: 'Jeste li sigurni da želite resetirati sve postavke na zadane vrijednosti?',
    },
    save: 'Spremi promjene',
    unsavedChanges: 'Imate nespremljene promjene',
  },

  // How To page
  howTo: {
    title: 'Kako koristiti',
    steps: {
      participants: {
        title: 'Dodaj sudionike',
        description: 'Idite na stranicu Sudionici i dodajte sve koji će sudjelovati u Tajnom Djed Mrazu.',
      },
      groups: {
        title: 'Stvori grupe (neobavezno)',
        description: 'Ako želite spriječiti određene ljude da izvlače jedni druge (npr. članove obitelji), stvorite grupe na stranici Grupe.',
      },
      generate: {
        title: 'Generiraj dodjele',
        description: 'Idite na stranicu Dodjele i kliknite "Generiraj dodjele" za stvaranje Tajni Djed Mraz parova.',
      },
      reveal: {
        title: 'Otkrij dodjele',
        description: 'Svaki sudionik klikne svoje ime i unese ga da vidi kome kupuje dar. Dodjela se prikazuje 5 sekundi.',
      },
    },
    tips: {
      title: 'Savjeti',
      privacy: 'Nakon pregleda, dodjela je označena kao "otkrivena"',
      history: 'Sve generirane liste su spremljene u Povijesti',
      groups: 'Ljudi u istoj grupi ne mogu biti dodijeljeni jedni drugima',
      maxHistory: 'Možete konfigurirati maksimalan broj povijesti u Postavkama (zadano: 5)',
      remake: 'Koristite "Ponovi s istim postavkama" u povijesti za ponovnu upotrebu lista sudionika',
    },
  },

  // Common
  common: {
    cancel: 'Odustani',
    confirm: 'Potvrdi',
    save: 'Spremi',
    delete: 'Obriši',
    edit: 'Uredi',
    close: 'Zatvori',
    back: 'Natrag',
    next: 'Dalje',
    loading: 'Učitavanje...',
    error: 'Greška',
    success: 'Uspjeh',
    footer: 'Napravljeno s ❤️ za širenje blagdanske radosti',
  },
};
