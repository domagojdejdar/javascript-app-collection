/**
 * Alpine component for name input
 * Handles adding new participants to the Secret Santa
 */

export default () => ({
  name: '',
  isSubmitting: false,

  /**
   * Get the participants store
   */
  get participantsStore() {
    return (window as any).Alpine?.store('participants');
  },

  /**
   * Get error from participants store
   */
  get error() {
    return this.participantsStore?.error || null;
  },

  /**
   * Check if input is valid (not empty after trim)
   */
  get isValid() {
    return this.name.trim().length > 0;
  },

  /**
   * Handle form submission
   */
  submit() {
    if (!this.isValid || this.isSubmitting) return;

    this.isSubmitting = true;

    const success = this.participantsStore?.add(this.name);

    if (success) {
      // Clear input on success
      this.name = '';

      // Show success feedback (optional toast notification)
      this.showSuccessNotification();
    }

    this.isSubmitting = false;
  },

  /**
   * Handle Enter key press
   */
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submit();
    }
  },

  /**
   * Clear error when user starts typing
   */
  clearError() {
    if (this.participantsStore?.error) {
      this.participantsStore.error = null;
    }
  },

  /**
   * Show success notification (can be extended with toast library)
   */
  showSuccessNotification() {
    // Simple feedback - can be enhanced with a toast notification system
    console.log('✅ Participant added successfully');
  },
});
