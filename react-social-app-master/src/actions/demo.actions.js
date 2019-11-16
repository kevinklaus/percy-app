import { editContact } from './contacts.action';

/**
 * Action creators and functions handling everything happening for demo cases.
 * @namespace
 * @name demoActions
 */
export const demoActions = {
  requestResetKarma,
  resetKarmaSuccess,
  increaseKarma,
  increaseKarmaSuccess,
};

/**
 * @memberof demoActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_RESET_KARMA = 'REQUEST_RESET_KARMA';
/**
 * Action creator to be started when reset karma requested
 * @memberof demoActions
 * @name demoActions.requestResetKarma
 * @returns {object} action type
 */
function requestResetKarma() {
  return {
    type: REQUEST_RESET_KARMA,
  };
}

/**
 * @memberof demoActions
 * @constant
 * @type {string}
 * @default
 */
export const RESET_KARMA_SUCCESS = 'RESET_KARMA_SUCCESS';
/**
 * Action creator to be started when reset karma succeeded
 * @memberof demoActions
 * @name demoActions.resetKarmaSuccess
 * @returns {object} action type and new karma value
 */
function resetKarmaSuccess(value) {
  console.log('🧬🧬 RESET_KARMA_SUCCESS');
  return {
    type: RESET_KARMA_SUCCESS,
    value,
  };
}

/**
 * @memberof demoActions
 * @constant
 * @type {string}
 * @default
 */
export const INCREASE_KARMA_SUCCESS = 'INCREASE_KARMA_SUCCESS';
/**
 * Action creator to be started when increase karma succeeded
 * @memberof demoActions
 * @name demoActions.increaseKarmaSuccess
 * @returns {object} action type and contact for which karma was increased
 */
function increaseKarmaSuccess(contact) {
  return {
    type: INCREASE_KARMA_SUCCESS,
    contact,
  };
}

/**
 * Will attempt to increase karma of given contact
 * @memberof demoActions
 * @name demoActions.increaseKarma
 * @param {object} contact the contact for which to increase karma
 * @param {object} group the group where contact resists
 */
export function increaseKarma(contact, group) {
  return dispatch => {
    const karmaGoal = group.frequency;
    dispatch(editContact({ karma: contact.karma + 1 / karmaGoal }, contact.id));
    dispatch(increaseKarmaSuccess());
  };
}
