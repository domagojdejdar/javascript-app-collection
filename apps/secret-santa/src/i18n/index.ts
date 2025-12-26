/**
 * i18next configuration and initialization
 */
import i18next from 'i18next';
import en from './en';
import hr from './hr';
import de from './de';

export type Language = 'en' | 'hr' | 'de';

export const LANGUAGES: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  hr: { name: 'Hrvatski', flag: '🇭🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
};

export const DEFAULT_LANGUAGE: Language = 'en';
export const STORAGE_KEY = 'secret-santa-language';

/**
 * Get language from localStorage or browser
 */
export function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'en' || stored === 'hr' || stored === 'de')) {
      return stored as Language;
    }
  } catch (e) {
    console.error('Failed to get stored language:', e);
  }

  // Try to detect from browser
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('hr')) return 'hr';
  if (browserLang.startsWith('de')) return 'de';
  return DEFAULT_LANGUAGE;
}

/**
 * Save language to localStorage
 */
export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    console.error('Failed to save language:', e);
  }
}

/**
 * Detect language from URL path
 */
export function detectLanguageFromPath(): Language | null {
  const path = window.location.pathname;
  const match = path.match(/^\/(en|hr|de)\/?/);
  if (match) {
    return match[1] as Language;
  }
  return null;
}

/**
 * Initialize i18next
 */
export async function initI18n(initialLanguage?: Language): Promise<void> {
  const lang = initialLanguage || detectLanguageFromPath() || getStoredLanguage();

  await i18next.init({
    lng: lang,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false,
    resources: {
      en: { translation: en },
      hr: { translation: hr },
      de: { translation: de },
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

  // Save the language
  saveLanguage(lang);

  return Promise.resolve();
}

/**
 * Change language
 */
export async function changeLanguage(lang: Language): Promise<void> {
  await i18next.changeLanguage(lang);
  saveLanguage(lang);
}

/**
 * Get translation function
 */
export function t(key: string, options?: any): string {
  return i18next.t(key, options);
}

/**
 * Get current language
 */
export function getCurrentLanguage(): Language {
  return i18next.language as Language;
}

export default i18next;
