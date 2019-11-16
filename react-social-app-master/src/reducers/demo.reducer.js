import { REQUEST_RESET_KARMA } from '../actions/demo.actions';

/**
 * This reducer function takes the current application state and
 * handles the actions related to the demo functions
 * then returns the next application state
 * @name demoReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type: REQUEST_RESET_KARMA
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === REQUEST_RESET_KARMA) {
    console.log('🎈🎈 REQUEST_RESET_KARMA REDUCER');
  }
  return state || [];
}
