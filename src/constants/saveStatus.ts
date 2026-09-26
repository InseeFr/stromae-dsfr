export enum SAVE_STATUS {
  /** Initial load or resume of the questionnaire, no modification or save attempted */
  IDLE = 'idle',
  /** Edits present and/or save in progress */
  SAVING = 'saving',
  /** Data successfully saved */
  SAVED = 'saved',
  /** Save failed */
  ERROR = 'error',
}
