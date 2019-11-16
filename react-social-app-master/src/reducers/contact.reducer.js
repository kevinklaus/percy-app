import { RESET_KARMA_SUCCESS } from '../actions/demo.actions';
import { EDIT_CONTACT_SUCCESS } from '../actions/contacts.action';

/**
 * This reducer function takes the current application state and
 * handles the actions related to a contact
 * then returns the next application state
 * @name contactReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handled action types:
 * 'CONTACT_IMAGE_CLICKED', 'CONTACT_REASSIGN'
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === 'CONTACT_IMAGE_CLICKED') {
    return action.contact || state;
  }
  if (action.type === 'CONTACT_REASSIGN') {
    return action.contact || state;
  } else if (action.type === EDIT_CONTACT_SUCCESS) {
    return action.contact || state;
  } else if (action.type === RESET_KARMA_SUCCESS) {
    state.karma = action.value;
    return state;
  }
  return state || {};
}
