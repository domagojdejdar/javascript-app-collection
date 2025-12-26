/**
 * Alpine.js store for i18n
 */
import { changeLanguage, getCurrentLanguage, t, type Language, LANGUAGES } from '@/i18n';

export interface I18nStore {
  currentLanguage: Language;
  languages: typeof LANGUAGES;

  // Actions
  setLanguage(lang: Language): Promise<void>;
  t(key: string, options?: any): string;
  getLanguageName(lang: Language): string;
  getLanguageFlag(lang: Language): string;
}

export default (): I18nStore => ({
  currentLanguage: getCurrentLanguage(),
  languages: LANGUAGES,

  /**
   * Change the current language
   */
  async setLanguage(lang: Language) {
    await changeLanguage(lang);
    this.currentLanguage = lang;

    // Trigger a re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { language: lang } }));
  },

  /**
   * Translate a key
   */
  t(key: string, options?: any): string {
    return t(key, options);
  },

  /**
   * Get language display name
   */
  getLanguageName(lang: Language): string {
    return LANGUAGES[lang].name;
  },

  /**
   * Get language flag emoji
   */
  getLanguageFlag(lang: Language): string {
    return LANGUAGES[lang].flag;
  },
});
