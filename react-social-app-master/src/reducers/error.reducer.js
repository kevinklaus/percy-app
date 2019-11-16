import { ERROR, CLEAR } from '../actions/notify.action';

/**
 * This reducer function takes the current application state and
 * handles the actions related to errors
 * then returns the next application state
 * @name errorReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type: ERROR, CLEAR
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === ERROR) {
    let error = action.message.response.data;
    if (error.detail) {
      error = error.detail;
    }
    return error.substring(0, 80);
  }
  if (action.type === CLEAR) {
    return null;
  }
  return state || null;
}
