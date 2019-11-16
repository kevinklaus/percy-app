import { GOOGLE_CONTACTS_SUCCESS } from '../actions/groups.action';

/**
 * This reducer function takes the current application state and
 * handles the actions related to successfully receiving google contacts
 * then returns the next application state
 * @name googleContactsReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type: GOOGLE_CONTACTS_SUCCESS
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === GOOGLE_CONTACTS_SUCCESS) {
    return action.contacts
      ? action.contacts.filter(contact => contact.title.$t)
      : [];
  }
  return state || [];
}
