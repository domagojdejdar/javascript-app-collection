/**
 * Modal utilities to replace native alert/confirm
 */

/**
 * Show alert modal with translated message
 */
export function showAlert(translationKey: string, options?: any): void {
  const i18nStore = (window as any).Alpine?.store('i18n');
  const modal = (window as any).Alpine?.store('globalModal');

  if (!modal) {
    console.error('Global modal not available');
    return;
  }

  const message = i18nStore?.t(translationKey, options) || translationKey;
  modal.alert(message);
}

/**
 * Show confirm modal with translated message
 */
export function showConfirm(
  translationKey: string,
  onConfirm: () => void,
  options?: any,
  onCancel?: () => void
): void {
  const i18nStore = (window as any).Alpine?.store('i18n');
  const modal = (window as any).Alpine?.store('globalModal');

  if (!modal) {
    console.error('Global modal not available');
    return;
  }

  const message = i18nStore?.t(translationKey, options) || translationKey;
  modal.confirm(message, onConfirm, onCancel);
}
