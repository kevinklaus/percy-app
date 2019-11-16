// These actions are about notifying for errors and succes
/**
 * Action creators and functions handling everything happening to notify app.
 * @namespace
 * @name notifyActions
 */
export const notifyActions = {
  success,
  error,
  clear,
};

/**
 * @memberof notifyActions
 * @constant
 * @type {string}
 * @default
 */
export const SUCCESS = 'SUCCESS';
/**
 * Action creator for notifying about a success
 * @memberof notifyActions
 * @name notifyActions.success
 * @param {string} message the message to present for success
 * @returns {object} action type and message
 */
function success(message) {
  return { type: SUCCESS, message };
}

/**
 * @memberof notifyActions
 * @constant
 * @type {string}
 * @default
 */
export const ERROR = 'ERROR';
/**
 * Action creator for notifying about a failure
 * @memberof notifyActions
 * @name notifyActions.error
 * @param {object} message the message to present for failure
 * @returns {object} action type and message
 */
function error(message) {
  return { type: ERROR, message };
}

/**
 * @memberof notifyActions
 * @constant
 * @type {string}
 * @default
 */
export const CLEAR = 'CLEAR';
/**
 * Action creator for clearing success or error state
 * @memberof notifyActions
 * @name notifyActions.clear
 * @returns {object} action type
 */
function clear() {
  return { type: CLEAR };
}
