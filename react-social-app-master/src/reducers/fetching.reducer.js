import { RECEIVE_GROUPS, REQUEST_GROUPS } from '../actions/groups.action';

/**
 * This reducer function takes the current application state and
 * handles the actions related to fetching groups
 * then returns the next application state
 * @name fetchingReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type: REQUEST_GROUPS, RECEIVE_GROUPS
 * @returns {Object} new application state
 */
export default function(state, action) {
  let groups = [];
  if (action.type === REQUEST_GROUPS) {
    return true;
  }
  // TODO: handle failure & success (via action! -> add status to action)
  if (action.type === RECEIVE_GROUPS) {
    return false;
  }
  return groups;
}
