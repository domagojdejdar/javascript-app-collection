/**
 * Alpine component for global modal (replaces alert/confirm)
 */

export default () => ({
  isOpen: false,
  type: 'alert' as 'alert' | 'confirm',
  message: '',
  confirmCallback: null as (() => void) | null,
  cancelCallback: null as (() => void) | null,

  /**
   * Get i18n store
   */
  get i18nStore() {
    return (window as any).Alpine?.store('i18n');
  },

  /**
   * Show alert modal
   */
  alert(message: string) {
    this.type = 'alert';
    this.message = message;
    this.confirmCallback = null;
    this.cancelCallback = null;
    this.isOpen = true;
  },

  /**
   * Show confirm modal
   */
  confirm(message: string, onConfirm: () => void, onCancel?: () => void) {
    this.type = 'confirm';
    this.message = message;
    this.confirmCallback = onConfirm;
    this.cancelCallback = onCancel || null;
    this.isOpen = true;
  },

  /**
   * Handle confirm button click
   */
  handleConfirm() {
    this.isOpen = false;
    if (this.confirmCallback) {
      this.confirmCallback();
    }
  },

  /**
   * Handle cancel button click
   */
  handleCancel() {
    this.isOpen = false;
    if (this.cancelCallback) {
      this.cancelCallback();
    }
  },

  /**
   * Close modal
   */
  close() {
    this.isOpen = false;
  },

  /**
   * Handle escape key
   */
  handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen) {
      if (this.type === 'confirm') {
        this.handleCancel();
      } else {
        this.close();
      }
    }
  },
});
